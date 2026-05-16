import { state, dom, dirs, TOP, RIGHT, BOTTOM, LEFT } from "./state.js";

export function canMoveDir(x, y, dirIndex) {
    const cell = state.maze[y][x];
    if (cell & dirs[dirIndex].wall) return false;
    const nx = x + dirs[dirIndex].dx,
        ny = y + dirs[dirIndex].dy;
    return nx >= 0 && nx < state.cols && ny >= 0 && ny < state.rows;
}

export function canMove(dx, dy) {
    const { x, y } = state.player;
    const cell = state.maze[y][x];
    if (dx === 0 && dy === -1 && (cell & TOP)) return false;
    if (dx === 1 && dy === 0 && (cell & RIGHT)) return false;
    if (dx === 0 && dy === 1 && (cell & BOTTOM)) return false;
    if (dx === -1 && dy === 0 && (cell & LEFT)) return false;
    const nx = x + dx,
        ny = y + dy;
    return nx >= 0 && nx < state.cols && ny >= 0 && ny < state.rows;
}

export function getOpenDirs(x, y) {
    const result = [];
    for (let i = 0; i < 4; i++) {
        if (canMoveDir(x, y, i)) result.push(i);
    }
    return result;
}

// Pick random exit or default to bottom-right
export function pickExit(w, h) {
    if (!dom.chkRandomExit.checked) {
        state.exitX = w - 1;
        state.exitY = h - 1;
        return;
    }
    // BFS from (0,0) to get distances, pick random cell with dist >= (w+h)/2
    const dist = Array.from({ length: h }, () => Array(w).fill(-1));
    const queue = [{ x: 0, y: 0 }];
    dist[0][0] = 0;
    while (queue.length > 0) {
        const { x, y } = queue.shift();
        for (let i = 0; i < 4; i++) {
            if (!canMoveDir(x, y, i)) continue;
            const nx = x + dirs[i].dx,
                ny = y + dirs[i].dy;
            if (dist[ny][nx] !== -1) continue;
            dist[ny][nx] = dist[y][x] + 1;
            queue.push({ x: nx, y: ny });
        }
    }
    const maxDist = Math.max(...dist.flat());
    const minDist = Math.floor(maxDist / 2);
    const candidates = [];
    for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++)
            if (dist[y][x] >= minDist && !(x === 0 && y === 0))
                candidates.push({ x, y });
    if (candidates.length > 0) {
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        state.exitX = pick.x;
        state.exitY = pick.y;
    } else {
        state.exitX = w - 1;
        state.exitY = h - 1;
    }
}

// Pre-compute BFS distance from every cell to exit
export function computeDistMap() {
    state.distMap = Array.from({ length: state.rows }, () => Array(state.cols).fill(-1));
    const queue = [{ x: state.exitX, y: state.exitY }];
    state.distMap[state.exitY][state.exitX] = 0;
    while (queue.length > 0) {
        const { x, y } = queue.shift();
        for (let i = 0; i < 4; i++) {
            if (!canMoveDir(x, y, i)) continue;
            const nx = x + dirs[i].dx,
                ny = y + dirs[i].dy;
            if (state.distMap[ny][nx] !== -1) continue;
            state.distMap[ny][nx] = state.distMap[y][x] + 1;
            queue.push({ x: nx, y: ny });
        }
    }
}

// Maze difficulty score
export function computeDifficulty() {
    let c1 = 0,
        c2 = 0,
        c3 = 0,
        c4 = 0;
    for (let y = 0; y < state.rows; y++) {
        for (let x = 0; x < state.cols; x++) {
            const cell = state.maze[y][x];
            let open = 0;
            if (!(cell & TOP)) open++;
            if (!(cell & RIGHT)) open++;
            if (!(cell & BOTTOM)) open++;
            if (!(cell & LEFT)) open++;
            if (open === 1) c1++;
            else if (open === 2) c2++;
            else if (open === 3) c3++;
            else if (open === 4) c4++;
        }
    }
    const shortest = state.distMap[0][0];
    const raw = 1 * c1 + 0 * c2 + 3 * c3 + 5 * c4 + 8 * shortest;
    state.mazeDifficulty = raw;
    state.mazeC1 = c1;
    state.mazeC2 = c2;
    state.mazeC3 = c3;
    state.mazeC4 = c4;
    return raw;
}

// Sanity check: verify perfect maze (connected, no cycles)
export function validateMaze() {
    let edges = 0;
    for (let y = 0; y < state.rows; y++) {
        for (let x = 0; x < state.cols; x++) {
            const cell = state.maze[y][x];
            if (x < state.cols - 1 && !(cell & RIGHT)) edges++;
            if (y < state.rows - 1 && !(cell & BOTTOM)) edges++;
        }
    }
    const expectedEdges = state.cols * state.rows - 1;

    const visited = Array.from({ length: state.rows }, () => Array(state.cols).fill(false));
    const queue = [{ x: 0, y: 0 }];
    visited[0][0] = true;
    let reachable = 1;
    while (queue.length > 0) {
        const { x, y } = queue.shift();
        for (let i = 0; i < 4; i++) {
            if (!canMoveDir(x, y, i)) continue;
            const nx = x + dirs[i].dx,
                ny = y + dirs[i].dy;
            if (visited[ny][nx]) continue;
            visited[ny][nx] = true;
            reachable++;
            queue.push({ x: nx, y: ny });
        }
    }

    const totalCells = state.cols * state.rows;
    const errors = [];
    if (reachable < totalCells)
        errors.push(`Not connected: only ${reachable}/${totalCells} cells reachable`);
    if (edges > expectedEdges)
        errors.push(`Has cycles: ${edges} edges (expected ${expectedEdges})`);
    if (edges < expectedEdges)
        errors.push(`Disconnected: ${edges} edges (expected ${expectedEdges})`);

    if (errors.length > 0) {
        alert(`Maze validation failed!\n\n${errors.join("\n")}\n\nPlease regenerate.`);
        return false;
    }
    return true;
}
