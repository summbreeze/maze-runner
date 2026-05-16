import { state, dom, clamp, TOP, RIGHT, BOTTOM, LEFT } from "./state.js";
import { i18n, updateStatLabels, updateMazeInfoLabels } from "./i18n.js";
import { generateMaze, generateMazeWilson, generateMazeDivision, generateStepsDFS, generateStepsWilson, generateStepsDivision } from "./generators.js";
import { canMove, validateMaze, pickExit, computeDistMap, computeDifficulty } from "./maze-utils.js";
import { draw, startFogAnim, getFogFullRadius, drawChart } from "./renderer.js";
import { solveRandomStep, solveSmartDfsStep, solveDFS, solveBFS, solveRightHandStep } from "./solvers.js";

// ── Generation animation control ──

export function stopGenAnimation() {
    if (state.genTimer) {
        clearInterval(state.genTimer);
        state.genTimer = null;
    }
    state.genAnimating = false;
    state.genHighlight = null;
    state.genWalkTrail = [];
    dom.btnGen.disabled = false;
    dom.btnSolve.disabled = false;
    dom.inpW.disabled = false;
    dom.inpH.disabled = false;
    dom.selAlgo.disabled = false;
}

export function replayGeneration(result, w, h, onDone) {
    stopGenAnimation();
    state.genAnimating = true;
    dom.btnGen.disabled = true;
    dom.btnSolve.disabled = true;
    dom.inpW.disabled = true;
    dom.inpH.disabled = true;
    dom.selAlgo.disabled = true;

    state.cols = w;
    state.rows = h;
    const init = result.initVal;
    state.maze = Array.from({ length: h }, () => Array.from({ length: w }, () => init));
    if (result.hasBorders) {
        for (let x = 0; x < w; x++) {
            state.maze[0][x] |= TOP;
            state.maze[h - 1][x] |= BOTTOM;
        }
        for (let y = 0; y < h; y++) {
            state.maze[y][0] |= LEFT;
            state.maze[y][w - 1] |= RIGHT;
        }
    }

    const steps = result.steps;
    let idx = 0;
    let stepAccum = 0;

    state.genTimer = setInterval(() => {
        if (idx >= steps.length) {
            stopGenAnimation();
            if (onDone) onDone();
            return;
        }

        const s = parseInt(dom.rngSpeed.value);
        const stepsPerFrame = (s * 16) / 300;
        stepAccum += stepsPerFrame;
        const stepsThisFrame = Math.floor(stepAccum);
        stepAccum -= stepsThisFrame;

        for (let b = 0; b < stepsThisFrame && idx < steps.length; b++) {
            const step = steps[idx++];
            for (const op of step.ops) {
                if (op.clear !== undefined) state.maze[op.y][op.x] &= ~op.clear;
                if (op.set !== undefined) state.maze[op.y][op.x] |= op.set;
            }
            state.genHighlight = step.highlight || null;
            if (step.walk) {
                state.genWalkTrail.push({ x: step.highlight.x, y: step.highlight.y });
            } else {
                state.genWalkTrail = [];
            }
        }
        draw();
    }, 16);
}

// ── Timer ──

function ensureTimerStarted() {
    if (state.timerStarted) return;
    state.timerStarted = true;
    state.startTime = Date.now();
    clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
        if (!state.won) {
            dom.timeEl.textContent = `${i18n[state.lang].time}: ${Math.floor((Date.now() - state.startTime) / 1000)}s`;
        }
    }, 500);
}

// ── Movement ──

export function doMove(dx, dy) {
    ensureTimerStarted();
    state.playerDir = { dx, dy };
    state.player.x += dx;
    state.player.y += dy;
    state.steps++;
    state.visits[state.player.y][state.player.x]++;
    if (state.visits[state.player.y][state.player.x] === 1) state.uniqueCells++;
    if (state.player.x === 0 && state.player.y === 0) state.originReturns++;
    const curDist = state.distMap[state.player.y][state.player.x];
    state.distHistory.push(curDist);
    updateStatLabels();
    draw();
    if (state.player.x === state.exitX && state.player.y === state.exitY) {
        state.won = true;
        clearInterval(state.timerInterval);
        stopSolving();
        if (dom.chkFog.checked) {
            startFogAnim(parseInt(dom.rngVision.value), getFogFullRadius());
        } else {
            draw();
        }
        const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
        const t = i18n[state.lang];
        dom.winMsg.textContent = t.win_result(state.steps, elapsed);
        drawChart();
        dom.resultsEl.style.display = "";
        dom.resultsEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
}

export function movePlayer(dx, dy) {
    if (state.won || state.solving || state.genAnimating) return;
    if (!canMove(dx, dy)) return;
    doMove(dx, dy);
}

// ── Solver control ──

export function stopSolving() {
    if (state.solveTimer) {
        clearInterval(state.solveTimer);
        state.solveTimer = null;
    }
    if (dom.rngSpeed._solveHandler) {
        dom.rngSpeed.removeEventListener("input", dom.rngSpeed._solveHandler);
        dom.rngSpeed._solveHandler = null;
    }
    state.solving = false;
    state.solvePathQueue = [];
    state.solvePathIndex = 0;
    dom.btnSolve.style.display = "";
    dom.btnStop.style.display = "none";
}

export function startSolving() {
    if (state.genAnimating) return;
    if (state.won) resetCounters();
    stopSolving();
    state.solving = true;
    dom.btnSolve.style.display = "none";
    dom.btnStop.style.display = "";

    const algo = dom.selSolver.value;
    function getSolveInterval() {
        const s = parseInt(dom.rngSpeed.value);
        return Math.max(10, Math.round(200 / s));
    }

    function restartSolveTimer(stepFn) {
        if (state.solveTimer) clearInterval(state.solveTimer);
        state.solveTimer = setInterval(() => {
            if (state.won) {
                stopSolving();
                return;
            }
            stepFn();
        }, getSolveInterval());
    }

    if (algo === "random" || algo === "smartdfs") {
        let stepFn;
        if (algo === "smartdfs") {
            state.smartDfsQueue = [];
            stepFn = () => solveSmartDfsStep(doMove);
        } else {
            stepFn = () => solveRandomStep(doMove);
        }
        restartSolveTimer(stepFn);
        dom.rngSpeed._solveHandler = () => restartSolveTimer(stepFn);
        dom.rngSpeed.addEventListener("input", dom.rngSpeed._solveHandler);
    } else if (algo === "dfs" || algo === "bfs") {
        const path = algo === "dfs" ? solveDFS() : solveBFS();
        state.solvePathQueue = path;
        state.solvePathIndex = 0;
        const stepFn = () => {
            if (state.won || state.solvePathIndex >= state.solvePathQueue.length) {
                stopSolving();
                return;
            }
            const target = state.solvePathQueue[state.solvePathIndex++];
            const dx = target.x - state.player.x;
            const dy = target.y - state.player.y;
            doMove(dx, dy);
        };
        restartSolveTimer(stepFn);
        dom.rngSpeed._solveHandler = () => restartSolveTimer(stepFn);
        dom.rngSpeed.addEventListener("input", dom.rngSpeed._solveHandler);
    } else if (algo === "righthand") {
        state.facing = 2;
        const stepFn = () => solveRightHandStep(doMove);
        restartSolveTimer(stepFn);
        dom.rngSpeed._solveHandler = () => restartSolveTimer(stepFn);
        dom.rngSpeed.addEventListener("input", dom.rngSpeed._solveHandler);
    }
}

// ── Game control ──

export function resetCounters() {
    stopSolving();
    state.fogAnim = null;
    state.player = { x: 0, y: 0 };
    state.playerDir = { dx: 0, dy: 1 };
    state.steps = 0;
    state.won = false;
    state.uniqueCells = 1;
    state.originReturns = 0;
    state.visits = Array.from({ length: state.rows }, () => Array(state.cols).fill(0));
    state.visits[0][0] = 1;
    state.distHistory = [state.distMap[0][0]];
    state.timerStarted = false;
    state.startTime = 0;
    clearInterval(state.timerInterval);
    updateStatLabels();
    dom.resultsEl.style.display = "none";
    draw();
}

export function startGame() {
    stopSolving();
    stopGenAnimation();
    dom.resultsEl.style.display = "none";
    const w = clamp(parseInt(dom.inpW.value) || 15, 5, 100);
    const h = clamp(parseInt(dom.inpH.value) || 15, 5, 100);
    dom.inpW.value = w;
    dom.inpH.value = h;

    state.cols = w;
    state.rows = h;
    state.exitX = w - 1;
    state.exitY = h - 1;
    state.maze = Array.from({ length: h }, () => Array.from({ length: w }, () => 15));
    state.visits = Array.from({ length: h }, () => Array(w).fill(0));
    state.player = { x: 0, y: 0 };
    state.steps = 0;
    state.won = false;
    state.uniqueCells = 0;
    state.originReturns = 0;
    state.distHistory = [];
    state.timerStarted = false;
    clearInterval(state.timerInterval);
    updateStatLabels();
    draw();

    if (dom.chkAnimate.checked) {
        let result;
        if (dom.selAlgo.value === "wilson") {
            result = generateStepsWilson(w, h);
        } else if (dom.selAlgo.value === "division") {
            result = generateStepsDivision(w, h);
        } else {
            result = generateStepsDFS(w, h);
        }
        replayGeneration(result, w, h, () => {
            if (!validateMaze()) return;
            pickExit(w, h);
            computeDistMap();
            computeDifficulty();
            updateMazeInfoLabels();
            resetCounters();
        });
    } else {
        if (dom.selAlgo.value === "wilson") {
            generateMazeWilson(w, h);
        } else if (dom.selAlgo.value === "division") {
            generateMazeDivision(w, h);
        } else {
            generateMaze(w, h);
        }
        if (!validateMaze()) return;
        pickExit(w, h);
        computeDistMap();
        computeDifficulty();
        updateMazeInfoLabels();
        resetCounters();
    }
}
