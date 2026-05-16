import { state, dirs } from "./state.js";
import { canMoveDir, getOpenDirs } from "./maze-utils.js";

// All solver step functions receive `doMove` as a callback to avoid circular imports.

// Random walk: pick a random open direction each step
export function solveRandomStep(doMove) {
    if (state.won) return;
    const open = getOpenDirs(state.player.x, state.player.y);
    if (open.length === 0) return;
    const di = open[Math.floor(Math.random() * open.length)];
    doMove(dirs[di].dx, dirs[di].dy);
}

// Junction Walker: smart at junctions, auto-traverse corridors
export function solveSmartDfsStep(doMove) {
    if (state.won) return;

    // If we have a queued path, follow it
    if (state.smartDfsQueue.length > 0) {
        const di = state.smartDfsQueue.shift();
        if (canMoveDir(state.player.x, state.player.y, di)) {
            doMove(dirs[di].dx, dirs[di].dy);
            return;
        }
        state.smartDfsQueue = [];
    }

    const open = getOpenDirs(state.player.x, state.player.y);
    if (open.length === 0) return;

    const hasUnvisited = open.some((di) => {
        const nx = state.player.x + dirs[di].dx;
        const ny = state.player.y + dirs[di].dy;
        return state.visits[ny][nx] === 0;
    });

    const weights = open.map((di) => {
        const nx = state.player.x + dirs[di].dx;
        const ny = state.player.y + dirs[di].dy;
        let w = 1;
        if (state.visits[ny][nx] === 0) {
            w += 10;
        } else if (hasUnvisited) {
            w = 0.1;
        } else {
            w = 1 / state.visits[ny][nx];
        }
        return w;
    });

    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    let chosenDir = open[open.length - 1];
    for (let i = 0; i < open.length; i++) {
        r -= weights[i];
        if (r <= 0) {
            chosenDir = open[i];
            break;
        }
    }

    // Walk in this direction as far as possible (queue up moves)
    let cx = state.player.x,
        cy = state.player.y;
    const path = [];
    while (true) {
        if (!canMoveDir(cx, cy, chosenDir)) break;
        const nx = cx + dirs[chosenDir].dx;
        const ny = cy + dirs[chosenDir].dy;
        path.push(chosenDir);
        cx = nx;
        cy = ny;
        const nextOpen = getOpenDirs(cx, cy);
        if (nextOpen.length !== 2 || (cx === state.exitX && cy === state.exitY)) break;
        const backDir = (chosenDir + 2) % 4;
        const forward = nextOpen.find((d) => d !== backDir);
        if (forward === undefined) break;
        chosenDir = forward;
    }

    if (path.length > 0) {
        const first = path.shift();
        state.smartDfsQueue = path;
        doMove(dirs[first].dx, dirs[first].dy);
    }
}

// DFS: find path then return full path
export function solveDFS() {
    const visited = Array.from({ length: state.rows }, () => Array(state.cols).fill(false));
    const parent = Array.from({ length: state.rows }, () => Array(state.cols).fill(null));
    const stack = [{ x: state.player.x, y: state.player.y }];
    visited[state.player.y][state.player.x] = true;
    while (stack.length > 0) {
        const { x, y } = stack.pop();
        if (x === state.exitX && y === state.exitY) break;
        for (let i = 0; i < 4; i++) {
            if (!canMoveDir(x, y, i)) continue;
            const nx = x + dirs[i].dx,
                ny = y + dirs[i].dy;
            if (visited[ny][nx]) continue;
            visited[ny][nx] = true;
            parent[ny][nx] = { x, y };
            stack.push({ x: nx, y: ny });
        }
    }
    const path = [];
    let cx = state.exitX,
        cy = state.exitY;
    while (cx !== state.player.x || cy !== state.player.y) {
        path.push({ x: cx, y: cy });
        const p = parent[cy][cx];
        cx = p.x;
        cy = p.y;
    }
    path.reverse();
    return path;
}

// BFS: find shortest path
export function solveBFS() {
    const visited = Array.from({ length: state.rows }, () => Array(state.cols).fill(false));
    const parent = Array.from({ length: state.rows }, () => Array(state.cols).fill(null));
    const queue = [{ x: state.player.x, y: state.player.y }];
    visited[state.player.y][state.player.x] = true;
    while (queue.length > 0) {
        const { x, y } = queue.shift();
        if (x === state.exitX && y === state.exitY) break;
        for (let i = 0; i < 4; i++) {
            if (!canMoveDir(x, y, i)) continue;
            const nx = x + dirs[i].dx,
                ny = y + dirs[i].dy;
            if (visited[ny][nx]) continue;
            visited[ny][nx] = true;
            parent[ny][nx] = { x, y };
            queue.push({ x: nx, y: ny });
        }
    }
    const path = [];
    let cx = state.exitX,
        cy = state.exitY;
    while (cx !== state.player.x || cy !== state.player.y) {
        path.push({ x: cx, y: cy });
        const p = parent[cy][cx];
        cx = p.x;
        cy = p.y;
    }
    path.reverse();
    return path;
}

// Right-hand rule
export function solveRightHandStep(doMove) {
    if (state.won) return;
    const tryOrder = [
        (state.facing + 1) % 4,
        state.facing,
        (state.facing + 3) % 4,
        (state.facing + 2) % 4,
    ];
    for (const di of tryOrder) {
        if (canMoveDir(state.player.x, state.player.y, di)) {
            state.facing = di;
            doMove(dirs[di].dx, dirs[di].dy);
            return;
        }
    }
}
