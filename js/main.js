import { state, dom, initDOM } from "./state.js";
import { applyLang } from "./i18n.js";
import { draw, startFogAnim, getFogFullRadius } from "./renderer.js";
import { startGame, movePlayer, resetCounters, startSolving, stopSolving } from "./game.js";

// ── Initialize DOM references ──
initDOM();

// ── Keyboard controls ──
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
            e.preventDefault();
            movePlayer(0, -1);
            break;
        case "ArrowDown":
        case "s":
        case "S":
            e.preventDefault();
            movePlayer(0, 1);
            break;
        case "ArrowLeft":
        case "a":
        case "A":
            e.preventDefault();
            movePlayer(-1, 0);
            break;
        case "ArrowRight":
        case "d":
        case "D":
            e.preventDefault();
            movePlayer(1, 0);
            break;
        case "f":
        case "F":
            dom.chkFog.checked = !dom.chkFog.checked;
            dom.chkFog.dispatchEvent(new Event("change"));
            break;
        case "h":
        case "H":
            dom.chkHeatmap.checked = !dom.chkHeatmap.checked;
            if (state.maze.length) draw();
            break;
        case "t":
        case "T":
            dom.chkTrail.checked = !dom.chkTrail.checked;
            if (state.maze.length) draw();
            break;
        case "g":
        case "G":
            startGame();
            break;
        case "r":
        case "R":
            resetCounters();
            break;
        case "q":
        case "Q":
            if (state.solving) stopSolving();
            else startSolving();
            break;
        case "n":
        case "N":
            startGame();
            break;
    }
});

// ── D-Pad controls (pointer events for instant mobile response) ──
document.querySelectorAll(".dpad .btn-dir[data-dir]").forEach((btn) => {
    btn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        switch (btn.dataset.dir) {
            case "up":
                movePlayer(0, -1);
                break;
            case "down":
                movePlayer(0, 1);
                break;
            case "left":
                movePlayer(-1, 0);
                break;
            case "right":
                movePlayer(1, 0);
                break;
        }
    });
});

// ── Swipe gesture support on canvas ──
let touchStartX = 0,
    touchStartY = 0;
const SWIPE_THRESHOLD = 30;

dom.canvas.addEventListener(
    "touchstart",
    (e) => {
        const t = e.touches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
        e.preventDefault();
    },
    { passive: false },
);

dom.canvas.addEventListener(
    "touchmove",
    (e) => {
        e.preventDefault();
    },
    { passive: false },
);

dom.canvas.addEventListener(
    "touchend",
    (e) => {
        const t = e.changedTouches[0];
        const dx = t.clientX - touchStartX;
        const dy = t.clientY - touchStartY;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        if (Math.max(absDx, absDy) < SWIPE_THRESHOLD) return;
        if (absDx > absDy) {
            movePlayer(dx > 0 ? 1 : -1, 0);
        } else {
            movePlayer(0, dy > 0 ? 1 : -1);
        }
    },
    { passive: false },
);

// ── Button listeners ──
dom.btnGen.addEventListener("click", startGame);
dom.btnAgain.addEventListener("click", resetCounters);
dom.btnNewGame.addEventListener("click", startGame);
dom.btnSolve.addEventListener("click", startSolving);
dom.btnStop.addEventListener("click", stopSolving);
document.querySelectorAll(".btn-preset").forEach((btn) => {
    btn.addEventListener("click", () => {
        dom.inpW.value = btn.dataset.w;
        dom.inpH.value = btn.dataset.h;
    });
});

// ── Display toggles ──
dom.chkHeatmap.addEventListener("change", () => {
    if (state.maze.length) draw();
});
dom.chkTrail.addEventListener("change", () => {
    if (state.maze.length) draw();
});
dom.chkFog.addEventListener("change", () => {
    if (!state.maze.length) return;
    const v = parseInt(dom.rngVision.value);
    if (dom.chkFog.checked) {
        startFogAnim(getFogFullRadius(), v);
    } else {
        startFogAnim(v, getFogFullRadius());
    }
});
dom.rngVision.addEventListener("input", () => {
    dom.visionVal.textContent = dom.rngVision.value;
    if (state.maze.length) draw();
});
dom.rngSpeed.addEventListener("input", () => {
    dom.speedVal.textContent = dom.rngSpeed.value + "x";
});

// ── Language toggle ──
dom.btnLang.addEventListener("click", () => {
    state.lang = state.lang === "en" ? "zh" : "en";
    localStorage.setItem("maze-lang", state.lang);
    applyLang();
});

// ── Resize handler ──
window.addEventListener("resize", () => {
    if (state.maze.length) draw();
});

// ── Start ──
applyLang();
startGame();
