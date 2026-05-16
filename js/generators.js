import { state, dirs, TOP, RIGHT, BOTTOM, LEFT } from "./state.js";

// ── Instant generators ──

export function generateMaze(w, h) {
    state.cols = w;
    state.rows = h;
    state.maze = Array.from({ length: h }, () => Array.from({ length: w }, () => 15));
    const visited = Array.from({ length: h }, () => Array(w).fill(false));
    const stack = [];
    let cx = 0,
        cy = 0;
    visited[cy][cx] = true;
    stack.push({ x: cx, y: cy });
    while (stack.length > 0) {
        const neighbors = [];
        for (const d of dirs) {
            const nx = cx + d.dx,
                ny = cy + d.dy;
            if (nx >= 0 && nx < w && ny >= 0 && ny < h && !visited[ny][nx]) {
                neighbors.push({ ...d, nx, ny });
            }
        }
        if (neighbors.length > 0) {
            const chosen = neighbors[Math.floor(Math.random() * neighbors.length)];
            state.maze[cy][cx] &= ~chosen.wall;
            state.maze[chosen.ny][chosen.nx] &= ~chosen.opposite;
            visited[chosen.ny][chosen.nx] = true;
            stack.push({ x: cx, y: cy });
            cx = chosen.nx;
            cy = chosen.ny;
        } else {
            const prev = stack.pop();
            cx = prev.x;
            cy = prev.y;
        }
    }
}

export function generateMazeWilson(w, h) {
    state.cols = w;
    state.rows = h;
    state.maze = Array.from({ length: h }, () => Array.from({ length: w }, () => 15));
    const inTree = Array.from({ length: h }, () => Array(w).fill(false));
    inTree[h - 1][w - 1] = true;
    let remaining = w * h - 1;
    while (remaining > 0) {
        let sx = -1,
            sy = -1;
        for (let y = 0; y < h && sx < 0; y++)
            for (let x = 0; x < w && sx < 0; x++)
                if (!inTree[y][x]) {
                    sx = x;
                    sy = y;
                }
        const dirFrom = Array.from({ length: h }, () => Array(w).fill(-1));
        let wx = sx,
            wy = sy;
        while (!inTree[wy][wx]) {
            const neighbors = [];
            for (let i = 0; i < dirs.length; i++) {
                const nx = wx + dirs[i].dx,
                    ny = wy + dirs[i].dy;
                if (nx >= 0 && nx < w && ny >= 0 && ny < h) neighbors.push(i);
            }
            const chosen = neighbors[Math.floor(Math.random() * neighbors.length)];
            dirFrom[wy][wx] = chosen;
            wx += dirs[chosen].dx;
            wy += dirs[chosen].dy;
        }
        let tx = sx,
            ty = sy;
        while (!inTree[ty][tx]) {
            inTree[ty][tx] = true;
            remaining--;
            const di = dirFrom[ty][tx];
            const d = dirs[di];
            state.maze[ty][tx] &= ~d.wall;
            const nx = tx + d.dx,
                ny = ty + d.dy;
            state.maze[ny][nx] &= ~d.opposite;
            tx = nx;
            ty = ny;
        }
    }
}

export function generateMazeDivision(w, h) {
    state.cols = w;
    state.rows = h;
    state.maze = Array.from({ length: h }, () => Array.from({ length: w }, () => 0));
    for (let x = 0; x < w; x++) {
        state.maze[0][x] |= TOP;
        state.maze[h - 1][x] |= BOTTOM;
    }
    for (let y = 0; y < h; y++) {
        state.maze[y][0] |= LEFT;
        state.maze[y][w - 1] |= RIGHT;
    }

    function divide(x1, y1, x2, y2) {
        const width = x2 - x1 + 1;
        const height = y2 - y1 + 1;
        if (width < 2 || height < 2) return;

        const lo = Math.floor((1 / 3) * (width - 1));
        const hi = Math.min(width - 2, Math.ceil((2 / 3) * (width - 1)));
        const wx =
            x1 + (lo >= hi ? lo : lo + Math.floor(Math.random() * (hi - lo + 1)));
        const loY = Math.floor((1 / 3) * (height - 1));
        const hiY = Math.min(height - 2, Math.ceil((2 / 3) * (height - 1)));
        const wy =
            y1 +
            (loY >= hiY ? loY : loY + Math.floor(Math.random() * (hiY - loY + 1)));

        for (let x = x1; x <= x2; x++) {
            state.maze[wy][x] |= BOTTOM;
            state.maze[wy + 1][x] |= TOP;
        }
        for (let y = y1; y <= y2; y++) {
            state.maze[y][wx] |= RIGHT;
            state.maze[y][wx + 1] |= LEFT;
        }

        const skip = Math.floor(Math.random() * 4);
        if (skip !== 0) {
            const py = y1 + Math.floor(Math.random() * (wy - y1 + 1));
            state.maze[py][wx] &= ~RIGHT;
            state.maze[py][wx + 1] &= ~LEFT;
        }
        if (skip !== 1) {
            const py = wy + 1 + Math.floor(Math.random() * (y2 - wy));
            state.maze[py][wx] &= ~RIGHT;
            state.maze[py][wx + 1] &= ~LEFT;
        }
        if (skip !== 2) {
            const px = x1 + Math.floor(Math.random() * (wx - x1 + 1));
            state.maze[wy][px] &= ~BOTTOM;
            state.maze[wy + 1][px] &= ~TOP;
        }
        if (skip !== 3) {
            const px = wx + 1 + Math.floor(Math.random() * (x2 - wx));
            state.maze[wy][px] &= ~BOTTOM;
            state.maze[wy + 1][px] &= ~TOP;
        }

        divide(x1, y1, wx, wy);
        divide(wx + 1, y1, x2, wy);
        divide(x1, wy + 1, wx, y2);
        divide(wx + 1, wy + 1, x2, y2);
    }

    divide(0, 0, w - 1, h - 1);
}

// ── Step-recording generators for animation ──

export function generateStepsDFS(w, h) {
    const steps = [];
    const m = Array.from({ length: h }, () => Array.from({ length: w }, () => 15));
    const visited = Array.from({ length: h }, () => Array(w).fill(false));
    const stack = [];
    let cx = 0,
        cy = 0;
    visited[cy][cx] = true;
    stack.push({ x: cx, y: cy });

    while (stack.length > 0) {
        const neighbors = [];
        for (const d of dirs) {
            const nx = cx + d.dx,
                ny = cy + d.dy;
            if (nx >= 0 && nx < w && ny >= 0 && ny < h && !visited[ny][nx])
                neighbors.push({ ...d, nx, ny });
        }
        if (neighbors.length > 0) {
            const chosen = neighbors[Math.floor(Math.random() * neighbors.length)];
            m[cy][cx] &= ~chosen.wall;
            m[chosen.ny][chosen.nx] &= ~chosen.opposite;
            visited[chosen.ny][chosen.nx] = true;
            stack.push({ x: cx, y: cy });
            steps.push({
                ops: [
                    { y: cy, x: cx, clear: chosen.wall },
                    { y: chosen.ny, x: chosen.nx, clear: chosen.opposite },
                ],
                highlight: { x: chosen.nx, y: chosen.ny },
            });
            cx = chosen.nx;
            cy = chosen.ny;
        } else {
            const prev = stack.pop();
            cx = prev.x;
            cy = prev.y;
            steps.push({ ops: [], highlight: { x: cx, y: cy } });
        }
    }
    return { steps, initVal: 15 };
}

export function generateStepsWilson(w, h) {
    const steps = [];
    const m = Array.from({ length: h }, () => Array.from({ length: w }, () => 15));
    const inTree = Array.from({ length: h }, () => Array(w).fill(false));
    inTree[h - 1][w - 1] = true;
    let remaining = w * h - 1;

    while (remaining > 0) {
        let sx = -1,
            sy = -1;
        for (let y = 0; y < h && sx < 0; y++)
            for (let x = 0; x < w && sx < 0; x++)
                if (!inTree[y][x]) {
                    sx = x;
                    sy = y;
                }

        const dirFrom = Array.from({ length: h }, () => Array(w).fill(-1));
        let wx = sx,
            wy = sy;
        while (!inTree[wy][wx]) {
            const neighbors = [];
            for (let i = 0; i < dirs.length; i++) {
                const nx = wx + dirs[i].dx,
                    ny = wy + dirs[i].dy;
                if (nx >= 0 && nx < w && ny >= 0 && ny < h) neighbors.push(i);
            }
            const chosen = neighbors[Math.floor(Math.random() * neighbors.length)];
            dirFrom[wy][wx] = chosen;
            wx += dirs[chosen].dx;
            wy += dirs[chosen].dy;
            steps.push({ ops: [], highlight: { x: wx, y: wy }, walk: true });
        }

        let tx = sx,
            ty = sy;
        while (!inTree[ty][tx]) {
            inTree[ty][tx] = true;
            remaining--;
            const di = dirFrom[ty][tx];
            const d = dirs[di];
            m[ty][tx] &= ~d.wall;
            const nx = tx + d.dx,
                ny = ty + d.dy;
            m[ny][nx] &= ~d.opposite;
            steps.push({
                ops: [
                    { y: ty, x: tx, clear: d.wall },
                    { y: ny, x: nx, clear: d.opposite },
                ],
                highlight: { x: tx, y: ty },
            });
            tx = nx;
            ty = ny;
        }
    }
    return { steps, initVal: 15 };
}

export function generateStepsDivision(w, h) {
    const steps = [];

    function divide(x1, y1, x2, y2) {
        const width = x2 - x1 + 1,
            height = y2 - y1 + 1;
        if (width < 2 || height < 2) return;

        const lo = Math.floor((1 / 3) * (width - 1));
        const hi = Math.min(width - 2, Math.ceil((2 / 3) * (width - 1)));
        const wx =
            x1 + (lo >= hi ? lo : lo + Math.floor(Math.random() * (hi - lo + 1)));
        const loY = Math.floor((1 / 3) * (height - 1));
        const hiY = Math.min(height - 2, Math.ceil((2 / 3) * (height - 1)));
        const wy =
            y1 +
            (loY >= hiY ? loY : loY + Math.floor(Math.random() * (hiY - loY + 1)));

        const hOps = [];
        for (let x = x1; x <= x2; x++) {
            hOps.push({ y: wy, x, set: BOTTOM });
            hOps.push({ y: wy + 1, x, set: TOP });
        }
        steps.push({ ops: hOps, highlight: { x: wx, y: wy } });

        const vOps = [];
        for (let y = y1; y <= y2; y++) {
            vOps.push({ y, x: wx, set: RIGHT });
            vOps.push({ y, x: wx + 1, set: LEFT });
        }
        steps.push({ ops: vOps, highlight: { x: wx, y: wy } });

        const skip = Math.floor(Math.random() * 4);
        const passOps = [];
        if (skip !== 0) {
            const py = y1 + Math.floor(Math.random() * (wy - y1 + 1));
            passOps.push({ y: py, x: wx, clear: RIGHT });
            passOps.push({ y: py, x: wx + 1, clear: LEFT });
        }
        if (skip !== 1) {
            const py = wy + 1 + Math.floor(Math.random() * (y2 - wy));
            passOps.push({ y: py, x: wx, clear: RIGHT });
            passOps.push({ y: py, x: wx + 1, clear: LEFT });
        }
        if (skip !== 2) {
            const px = x1 + Math.floor(Math.random() * (wx - x1 + 1));
            passOps.push({ y: wy, x: px, clear: BOTTOM });
            passOps.push({ y: wy + 1, x: px, clear: TOP });
        }
        if (skip !== 3) {
            const px = wx + 1 + Math.floor(Math.random() * (x2 - wx));
            passOps.push({ y: wy, x: px, clear: BOTTOM });
            passOps.push({ y: wy + 1, x: px, clear: TOP });
        }
        steps.push({ ops: passOps, highlight: { x: wx, y: wy } });

        divide(x1, y1, wx, wy);
        divide(wx + 1, y1, x2, wy);
        divide(x1, wy + 1, wx, y2);
        divide(wx + 1, wy + 1, x2, y2);
    }

    divide(0, 0, w - 1, h - 1);
    return { steps, initVal: 0, hasBorders: true };
}
