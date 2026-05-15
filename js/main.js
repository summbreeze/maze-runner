(() => {
                // ── i18n ──
                const i18n = {
                    en: {
                        subtitle: "Generate, Solve, and Explore",
                        size: "Size",
                        generator: "Generator",
                        generate: "Generate",
                        animate: "Animate",
                        heatmap: "Heatmap",
                        fog: "Fog",
                        display: "Display",
                        solver: "Solver",
                        solve: "Solve",
                        stop: "Stop",
                        trail: "Trail",
                        player: "Player",
                        exit: "Exit",
                        hint: "Use arrow keys or WASD to move",
                        congrats: "Congratulations!",
                        win_msg: "You escaped the maze!",
                        play_again: "Play Again",
                        new_game: "New Game",
                        gen_dfs: "DFS (Recursive Backtracker)",
                        gen_wilson: "Wilson (Uniform Spanning Tree)",
                        gen_division: "Recursive Division (Top-Down)",
                        sol_random: "Random Walk",
                        sol_smart: "Smart Random",
                        sol_smartdfs: "Junction Walker",
                        sol_dfs: "DFS",
                        sol_bfs: "BFS (Shortest Path)",
                        sol_righthand: "Right-Hand Rule",
                        steps: "Steps",
                        time: "Time",
                        cells: "Cells",
                        origin: "Origin",
                        dist: "Dist",
                        difficulty: "Difficulty",
                        shortest: "Shortest",
                        dead_ends: "Dead Ends",
                        corridors: "Corridors",
                        t_junctions: "T-Junctions",
                        crossroads: "Crossroads",
                        maze_info: "Maze Info",
                        progress: "Progress",
                        win_stats: (c, t, o, s, d) =>
                            `Cells: ${c} | Origin: ${o} | Shortest: ${s} | Difficulty: ${d}`,
                        win_result: (steps, elapsed) =>
                            `You escaped in ${steps} steps and ${elapsed}s!`,
                        footer: "Created by summbreeze",
                        // Tooltips
                        tip_gen_algo: "Choose maze generation algorithm",
                        tip_gen_dfs: "DFS: Deep random paths, long corridors, biased distribution",
                        tip_gen_wilson: "Wilson: Uniform random spanning tree, balanced structure",
                        tip_gen_division: "Division: Top-down recursive split, geometric patterns",
                        tip_animate: "Watch the maze being generated step by step",
                        tip_sol_algo: "Choose an automatic solving strategy",
                        tip_sol_random: "Random Walk: Pick a random direction each step",
                        tip_sol_smart: "Smart Random: Prefer unvisited cells and direction toward exit",
                        tip_sol_smartdfs: "Junction Walker: Smart choice at junctions, auto-traverse corridors",
                        tip_sol_dfs: "DFS: Find the path instantly using depth-first search",
                        tip_sol_bfs: "BFS: Find the shortest path using breadth-first search",
                        tip_sol_righthand: "Right-Hand Rule: Always keep right hand on wall, guaranteed to solve",
                        tip_heatmap: "Color cells by connectivity: darker = dead end, brighter = junction",
                        tip_trail: "Show visited cells with orange overlay, darker = more visits",
                        tip_fog: "Hide unvisited areas, only see cells within vision range",
                        tip_difficulty: "Difficulty score based on junctions, dead ends, and path length",
                        tip_shortest: "Minimum steps from start to exit",
                        tip_c1: "Dead ends: 1 opening, traps that waste steps",
                        tip_c2: "Corridors: 2 openings, no decision needed",
                        tip_c3: "T-Junctions: 3 openings, 1 wrong choice possible",
                        tip_c4: "Crossroads: 4 openings, 2 wrong choices possible",
                        tip_cells: "Unique cells visited / total cells",
                        tip_origin: "Times returned to the starting cell",
                        tip_dist: "Current Manhattan distance to exit",
                    },
                    zh: {
                        subtitle: "生成、求解、探索",
                        size: "大小",
                        generator: "生成算法",
                        generate: "生成",
                        animate: "动画",
                        heatmap: "热力图",
                        fog: "迷雾",
                        display: "显示",
                        solver: "求解算法",
                        solve: "求解",
                        stop: "停止",
                        trail: "轨迹",
                        player: "玩家",
                        exit: "出口",
                        hint: "使用方向键或 WASD 移动",
                        congrats: "恭喜通关!",
                        win_msg: "你成功走出了迷宫!",
                        play_again: "再来一次",
                        new_game: "新游戏",
                        gen_dfs: "DFS (递归回溯)",
                        gen_wilson: "Wilson (均匀生成树)",
                        gen_division: "递归分割 (自顶向下)",
                        sol_random: "随机游走",
                        sol_smart: "智能随机",
                        sol_smartdfs: "岔路口行者",
                        sol_dfs: "DFS (深度优先)",
                        sol_bfs: "BFS (最短路径)",
                        sol_righthand: "右手法则",
                        steps: "步数",
                        time: "时间",
                        cells: "格子",
                        origin: "回原点",
                        dist: "距离",
                        difficulty: "难度",
                        shortest: "最短路",
                        dead_ends: "死胡同",
                        corridors: "走廊",
                        t_junctions: "三岔路口",
                        crossroads: "十字路口",
                        maze_info: "迷宫信息",
                        progress: "进度",
                        win_stats: (c, t, o, s, d) =>
                            `格子: ${c} | 回原点: ${o} | 最短路: ${s} | 难度: ${d}`,
                        win_result: (steps, elapsed) => `你用了 ${steps} 步，耗时 ${elapsed} 秒!`,
                        footer: "由 夏风之羽 创作",
                        // Tooltips
                        tip_gen_algo: "选择迷宫生成算法",
                        tip_gen_dfs: "DFS: 随机深度优先，长走廊多，分布不均匀",
                        tip_gen_wilson: "Wilson: 均匀随机生成树，结构均衡",
                        tip_gen_division: "递归分割: 自顶向下切分，几何感强",
                        tip_animate: "逐步观看迷宫的生成过程",
                        tip_sol_algo: "选择自动求解策略",
                        tip_sol_random: "随机游走: 每步随机选方向",
                        tip_sol_smart: "智能随机: 偏好未访问格子和出口方向",
                        tip_sol_smartdfs: "岔路口行者: 在岔路口做决策，走廊自动通过",
                        tip_sol_dfs: "DFS: 深度优先搜索，直接找到路径",
                        tip_sol_bfs: "BFS: 广度优先搜索，找到最短路径",
                        tip_sol_righthand: "右手法则: 始终右手贴墙走，保证能到终点",
                        tip_heatmap: "按连通度着色: 暗 = 死胡同，亮 = 交叉口",
                        tip_trail: "显示走过的格子，颜色越深 = 经过次数越多",
                        tip_fog: "隐藏未探索区域，只能看到视野范围内的格子",
                        tip_difficulty: "基于岔路口、死胡同和路径长度计算的难度分数",
                        tip_shortest: "从起点到终点的最少步数",
                        tip_c1: "死胡同: 1个出口，走进去会浪费步数",
                        tip_c2: "走廊: 2个出口，不需要决策",
                        tip_c3: "三岔路口: 3个出口，有1个错误选择",
                        tip_c4: "十字路口: 4个出口，有2个错误选择",
                        tip_cells: "已走过的不同格子数 / 总格子数",
                        tip_origin: "回到起点的次数",
                        tip_dist: "当前位置到终点的距离",
                    },
                };
                let lang = localStorage.getItem("maze-lang") || "en";
                const btnLang = document.getElementById("btn-lang");

                function applyLang() {
                    const t = i18n[lang];
                    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
                    btnLang.textContent = lang === "en" ? "中文" : "EN";
                    document.querySelectorAll("[data-i18n]").forEach((el) => {
                        const key = el.dataset.i18n;
                        if (t[key]) el.textContent = t[key];
                    });
                    // Apply tooltips
                    document.querySelectorAll("[data-tip]").forEach((el) => {
                        const key = el.dataset.tip;
                        if (t[key]) el.title = t[key];
                    });
                    // Update dynamic stat labels
                    updateStatLabels();
                    updateMazeInfoLabels();
                }

                function updateStatLabels() {
                    const t = i18n[lang];
                    // Dynamic (progress)
                    stepsEl.textContent = `${t.steps}: ${steps}`;
                    timeEl.textContent = `${t.time}: ${timerStarted ? Math.floor((Date.now() - startTime) / 1000) : 0}s`;
                    cellsEl.textContent = `${t.cells}: ${uniqueCells}/${cols * rows || 0}`;
                    originEl.textContent = `${t.origin}: ${originReturns}`;
                    distEl.textContent = `${t.dist}: ${distMap.length ? (distMap[player.y]?.[player.x] ?? "-") : "-"}`;
                }

                function updateMazeInfoLabels() {
                    const t = i18n[lang];
                    // Static (maze info)
                    diffEl.textContent = `${t.difficulty}: ${mazeDifficulty || "-"}`;
                    shortestEl.textContent = `${t.shortest}: ${distMap.length ? distMap[0][0] : "-"}`;
                    c1El.textContent = `${t.dead_ends}: ${mazeC1 || "-"}`;
                    c2El.textContent = `${t.corridors}: ${mazeC2 || "-"}`;
                    c3El.textContent = `${t.t_junctions}: ${mazeC3 || "-"}`;
                    c4El.textContent = `${t.crossroads}: ${mazeC4 || "-"}`;
                }

                btnLang.addEventListener("click", () => {
                    lang = lang === "en" ? "zh" : "en";
                    localStorage.setItem("maze-lang", lang);
                    applyLang();
                });
                const canvas = document.getElementById("maze-canvas");
                const ctx = canvas.getContext("2d");
                const inpW = document.getElementById("inp-w");
                const inpH = document.getElementById("inp-h");
                const selAlgo = document.getElementById("sel-algo");
                const selSolver = document.getElementById("sel-solver");
                const chkHeatmap = document.getElementById("chk-heatmap");
                const chkTrail = document.getElementById("chk-trail");
                const chkFog = document.getElementById("chk-fog");
                const rngVision = document.getElementById("rng-vision");
                const visionVal = document.getElementById("vision-val");
                const chkAnimate = document.getElementById("chk-animate");
                const rngSpeed = document.getElementById("rng-speed");
                const speedVal = document.getElementById("speed-val");
                const btnGen = document.getElementById("btn-gen");
                const btnSolve = document.getElementById("btn-solve");
                const btnStop = document.getElementById("btn-stop");
                const btnAgain = document.getElementById("btn-again");
                const btnNewGame = document.getElementById("btn-newgame");
                const resultsEl = document.getElementById("results");
                const winMsg = document.getElementById("win-msg");
                const chartCanvas = document.getElementById("chart-canvas");
                const chartCtx = chartCanvas.getContext("2d");
                const stepsEl = document.getElementById("steps-display");
                const timeEl = document.getElementById("time-display");
                const cellsEl = document.getElementById("cells-display");
                const originEl = document.getElementById("origin-display");
                const distEl = document.getElementById("dist-display");
                const diffEl = document.getElementById("diff-display");
                const shortestEl = document.getElementById("shortest-display");
                const c1El = document.getElementById("c1-display");
                const c2El = document.getElementById("c2-display");
                const c3El = document.getElementById("c3-display");
                const c4El = document.getElementById("c4-display");

                let maze = [];
                let cols, rows, cellSize;
                let player = { x: 0, y: 0 };
                let steps = 0;
                let startTime = 0;
                let timerInterval = null;
                let timerStarted = false;
                let won = false;

                // Visit tracking for trail
                let visits = [];
                let uniqueCells = 0;
                let originReturns = 0;

                // Distance map from exit (pre-computed via BFS)
                let distMap = [];
                let distHistory = [];

                // Generation animation state
                let genTimer = null;
                let genAnimating = false;
                let genHighlight = null; // {x, y} of current cell during generation
                let genWalkTrail = []; // Wilson walk trail positions // distance at each step for convergence chart

                // Auto-solver state
                let solveTimer = null;
                let solving = false;
                let facing = 2; // for right-hand rule: 0=up,1=right,2=down,3=left

                // Walls encoded as bitmask: top=1, right=2, bottom=4, left=8
                const TOP = 1,
                    RIGHT = 2,
                    BOTTOM = 4,
                    LEFT = 8;
                const dirs = [
                    { dx: 0, dy: -1, wall: TOP, opposite: BOTTOM }, // 0 = up
                    { dx: 1, dy: 0, wall: RIGHT, opposite: LEFT }, // 1 = right
                    { dx: 0, dy: 1, wall: BOTTOM, opposite: TOP }, // 2 = down
                    { dx: -1, dy: 0, wall: LEFT, opposite: RIGHT }, // 3 = left
                ];

                function clamp(v, lo, hi) {
                    return Math.max(lo, Math.min(hi, v));
                }

                // ── Maze generation ──

                function generateMaze(w, h) {
                    cols = w;
                    rows = h;
                    maze = Array.from({ length: h }, () => Array.from({ length: w }, () => 15));
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
                            maze[cy][cx] &= ~chosen.wall;
                            maze[chosen.ny][chosen.nx] &= ~chosen.opposite;
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

                function generateMazeWilson(w, h) {
                    cols = w;
                    rows = h;
                    maze = Array.from({ length: h }, () => Array.from({ length: w }, () => 15));
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
                            maze[ty][tx] &= ~d.wall;
                            const nx = tx + d.dx,
                                ny = ty + d.dy;
                            maze[ny][nx] &= ~d.opposite;
                            tx = nx;
                            ty = ny;
                        }
                    }
                }

                function generateMazeDivision(w, h) {
                    cols = w;
                    rows = h;
                    // Start with no internal walls, only borders
                    maze = Array.from({ length: h }, () => Array.from({ length: w }, () => 0));
                    for (let x = 0; x < w; x++) {
                        maze[0][x] |= TOP;
                        maze[h - 1][x] |= BOTTOM;
                    }
                    for (let y = 0; y < h; y++) {
                        maze[y][0] |= LEFT;
                        maze[y][w - 1] |= RIGHT;
                    }

                    function divide(x1, y1, x2, y2) {
                        const width = x2 - x1 + 1;
                        const height = y2 - y1 + 1;
                        if (width < 2 || height < 2) return;

                        // Random cross position, biased toward center (1/3 ~ 2/3 range)
                        // wx must be in [x1, x2-1], wy must be in [y1, y2-1]
                        const lo = Math.floor((1 / 3) * (width - 1));
                        const hi = Math.min(width - 2, Math.ceil((2 / 3) * (width - 1)));
                        const wx =
                            x1 + (lo >= hi ? lo : lo + Math.floor(Math.random() * (hi - lo + 1)));
                        const loY = Math.floor((1 / 3) * (height - 1));
                        const hiY = Math.min(height - 2, Math.ceil((2 / 3) * (height - 1)));
                        const wy =
                            y1 +
                            (loY >= hiY ? loY : loY + Math.floor(Math.random() * (hiY - loY + 1)));

                        // Draw horizontal wall (between row wy and wy+1)
                        for (let x = x1; x <= x2; x++) {
                            maze[wy][x] |= BOTTOM;
                            maze[wy + 1][x] |= TOP;
                        }
                        // Draw vertical wall (between col wx and wx+1)
                        for (let y = y1; y <= y2; y++) {
                            maze[y][wx] |= RIGHT;
                            maze[y][wx + 1] |= LEFT;
                        }

                        // Open passages in 3 of 4 arms (skip one to keep it a tree)
                        const skip = Math.floor(Math.random() * 4);

                        if (skip !== 0) {
                            // top arm of vertical wall
                            const py = y1 + Math.floor(Math.random() * (wy - y1 + 1));
                            maze[py][wx] &= ~RIGHT;
                            maze[py][wx + 1] &= ~LEFT;
                        }
                        if (skip !== 1) {
                            // bottom arm of vertical wall
                            const py = wy + 1 + Math.floor(Math.random() * (y2 - wy));
                            maze[py][wx] &= ~RIGHT;
                            maze[py][wx + 1] &= ~LEFT;
                        }
                        if (skip !== 2) {
                            // left arm of horizontal wall
                            const px = x1 + Math.floor(Math.random() * (wx - x1 + 1));
                            maze[wy][px] &= ~BOTTOM;
                            maze[wy + 1][px] &= ~TOP;
                        }
                        if (skip !== 3) {
                            // right arm of horizontal wall
                            const px = wx + 1 + Math.floor(Math.random() * (x2 - wx));
                            maze[wy][px] &= ~BOTTOM;
                            maze[wy + 1][px] &= ~TOP;
                        }

                        // Recurse on 4 quadrants
                        divide(x1, y1, wx, wy);
                        divide(wx + 1, y1, x2, wy);
                        divide(x1, wy + 1, wx, y2);
                        divide(wx + 1, wy + 1, x2, y2);
                    }

                    divide(0, 0, w - 1, h - 1);
                }

                // ── Step-recording generators for animation ──

                function generateStepsDFS(w, h) {
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

                function generateStepsWilson(w, h) {
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
                            // Record walk step (no wall changes, just highlight)
                            steps.push({ ops: [], highlight: { x: wx, y: wy }, walk: true });
                        }

                        // Trace loop-erased path
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

                function generateStepsDivision(w, h) {
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

                        // Draw horizontal wall
                        const hOps = [];
                        for (let x = x1; x <= x2; x++) {
                            hOps.push({ y: wy, x, set: BOTTOM });
                            hOps.push({ y: wy + 1, x, set: TOP });
                        }
                        steps.push({ ops: hOps, highlight: { x: wx, y: wy } });

                        // Draw vertical wall
                        const vOps = [];
                        for (let y = y1; y <= y2; y++) {
                            vOps.push({ y, x: wx, set: RIGHT });
                            vOps.push({ y, x: wx + 1, set: LEFT });
                        }
                        steps.push({ ops: vOps, highlight: { x: wx, y: wy } });

                        // Open 3 of 4 passages
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

                // ── Animation replay ──

                function stopGenAnimation() {
                    if (genTimer) {
                        clearInterval(genTimer);
                        genTimer = null;
                    }
                    genAnimating = false;
                    genHighlight = null;
                    genWalkTrail = [];
                    btnGen.disabled = false;
                    btnSolve.disabled = false;
                    inpW.disabled = false;
                    inpH.disabled = false;
                    selAlgo.disabled = false;
                }

                function replayGeneration(result, w, h, onDone) {
                    stopGenAnimation();
                    genAnimating = true;
                    btnGen.disabled = true;
                    btnSolve.disabled = true;
                    inpW.disabled = true;
                    inpH.disabled = true;
                    selAlgo.disabled = true;

                    cols = w;
                    rows = h;
                    // Set initial maze state
                    const init = result.initVal;
                    maze = Array.from({ length: h }, () => Array.from({ length: w }, () => init));
                    if (result.hasBorders) {
                        for (let x = 0; x < w; x++) {
                            maze[0][x] |= TOP;
                            maze[h - 1][x] |= BOTTOM;
                        }
                        for (let y = 0; y < h; y++) {
                            maze[y][0] |= LEFT;
                            maze[y][w - 1] |= RIGHT;
                        }
                    }

                    const steps = result.steps;
                    let idx = 0;
                    let stepAccum = 0; // fractional step accumulator

                    // Fixed 60fps, speed controls steps per frame
                    // 1x = 1 step per 300ms = 0.053 steps/frame at 16ms
                    // 10x = 1 step per 30ms = 0.533 steps/frame
                    // 30x = 1 step per 10ms = 1.6 steps/frame
                    genTimer = setInterval(() => {
                        if (idx >= steps.length) {
                            stopGenAnimation();
                            if (onDone) onDone();
                            return;
                        }

                        const s = parseInt(rngSpeed.value);
                        const stepsPerFrame = s * 16 / 300;
                        stepAccum += stepsPerFrame;
                        const stepsThisFrame = Math.floor(stepAccum);
                        stepAccum -= stepsThisFrame;

                        for (let b = 0; b < stepsThisFrame && idx < steps.length; b++) {
                            const step = steps[idx++];
                            for (const op of step.ops) {
                                if (op.clear !== undefined) maze[op.y][op.x] &= ~op.clear;
                                if (op.set !== undefined) maze[op.y][op.x] |= op.set;
                            }
                            genHighlight = step.highlight || null;
                            if (step.walk) {
                                genWalkTrail.push({ x: step.highlight.x, y: step.highlight.y });
                            } else {
                                genWalkTrail = [];
                            }
                        }
                        draw();
                    }, 16);
                }

                // Pre-compute BFS distance from every cell to exit
                function computeDistMap() {
                    distMap = Array.from({ length: rows }, () => Array(cols).fill(-1));
                    const queue = [{ x: cols - 1, y: rows - 1 }];
                    distMap[rows - 1][cols - 1] = 0;
                    while (queue.length > 0) {
                        const { x, y } = queue.shift();
                        for (let i = 0; i < 4; i++) {
                            if (!canMoveDir(x, y, i)) continue;
                            const nx = x + dirs[i].dx,
                                ny = y + dirs[i].dy;
                            if (distMap[ny][nx] !== -1) continue;
                            distMap[ny][nx] = distMap[y][x] + 1;
                            queue.push({ x: nx, y: ny });
                        }
                    }
                }

                // Maze difficulty score
                let mazeDifficulty = 0;
                let mazeC1 = 0, mazeC2 = 0, mazeC3 = 0, mazeC4 = 0;
                function computeDifficulty() {
                    let c1 = 0,
                        c2 = 0,
                        c3 = 0,
                        c4 = 0;
                    for (let y = 0; y < rows; y++) {
                        for (let x = 0; x < cols; x++) {
                            const cell = maze[y][x];
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
                    const shortest = distMap[0][0];
                    const total = cols * rows;
                    // Weighted formula, normalized per cell then scaled
                    // Dead ends (traps): moderate weight
                    // Corridors: zero (no decisions)
                    // T-junctions: high (1 wrong choice possible)
                    // Crossroads: higher (2 wrong choices possible)
                    // Shortest path: dominant factor (measures how winding the solution is)
                    const raw = 1 * c1 + 0 * c2 + 3 * c3 + 5 * c4 + 8 * shortest;
                    mazeDifficulty = raw;
                    mazeC1 = c1; mazeC2 = c2; mazeC3 = c3; mazeC4 = c4;
                    return mazeDifficulty;
                }

                // Sanity check: verify perfect maze (connected, no cycles)
                // A perfect maze on W*H grid is a spanning tree: exactly W*H-1 edges
                function validateMaze() {
                    // Count edges (passages between cells)
                    let edges = 0;
                    for (let y = 0; y < rows; y++) {
                        for (let x = 0; x < cols; x++) {
                            const cell = maze[y][x];
                            // Only count right and bottom to avoid double-counting
                            if (x < cols - 1 && !(cell & RIGHT)) edges++;
                            if (y < rows - 1 && !(cell & BOTTOM)) edges++;
                        }
                    }
                    const expectedEdges = cols * rows - 1;

                    // Check connectivity via BFS
                    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
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

                    const totalCells = cols * rows;
                    const errors = [];
                    if (reachable < totalCells)
                        errors.push(
                            `Not connected: only ${reachable}/${totalCells} cells reachable`,
                        );
                    if (edges > expectedEdges)
                        errors.push(`Has cycles: ${edges} edges (expected ${expectedEdges})`);
                    if (edges < expectedEdges)
                        errors.push(`Disconnected: ${edges} edges (expected ${expectedEdges})`);

                    if (errors.length > 0) {
                        alert(
                            `Maze validation failed!\n\n${errors.join("\n")}\n\nPlease regenerate.`,
                        );
                        return false;
                    }
                    return true;
                }

                // ── Drawing ──

                function computeCellSize() {
                    // Account for panel width (400px) + padding
                    const panelW = 440;
                    const maxW = window.innerWidth - panelW - 80;
                    const maxH = window.innerHeight - 80;
                    cellSize = Math.max(
                        6,
                        Math.min(40, Math.floor(Math.min(maxW / cols, maxH / rows))),
                    );
                }

                function draw() {
                    computeCellSize();
                    const W = cols * cellSize;
                    const H = rows * cellSize;

                    // Only reset canvas dimensions when size actually changes
                    if (canvas.width !== W || canvas.height !== H) {
                        canvas.width = W;
                        canvas.height = H;
                    }

                    ctx.fillStyle = "#12121f";
                    ctx.fillRect(0, 0, W, H);

                    const heatmap = chkHeatmap.checked;
                    const showTrail = chkTrail.checked;
                    const fogOn = chkFog.checked && !genAnimating;
                    const vision = parseInt(rngVision.value);
                    const connColors = ["#12121f", "#12121f", "#181830", "#222245", "#3d3d78"];

                    // Helper: euclidean distance to player
                    function distToPlayer(x, y) {
                        const dx = x - player.x, dy = y - player.y;
                        return Math.sqrt(dx * dx + dy * dy);
                    }

                    // Draw cell backgrounds (heatmap + trail)
                    for (let y = 0; y < rows; y++) {
                        for (let x = 0; x < cols; x++) {
                            if (fogOn && distToPlayer(x, y) > vision) continue;

                            const cx = x * cellSize;
                            const cy = y * cellSize;
                            const cell = maze[y][x];

                            if (heatmap) {
                                let openings = 0;
                                if (!(cell & TOP)) openings++;
                                if (!(cell & RIGHT)) openings++;
                                if (!(cell & BOTTOM)) openings++;
                                if (!(cell & LEFT)) openings++;
                                if (openings > 1) {
                                    ctx.fillStyle = connColors[openings];
                                    ctx.fillRect(cx, cy, cellSize, cellSize);
                                }
                            }

                            if (showTrail && visits[y] && visits[y][x] > 0) {
                                const v = visits[y][x];
                                const alpha = Math.min(0.15 + v * 0.12, 0.85);
                                ctx.fillStyle = `rgba(230,120,58,${alpha})`;
                                ctx.fillRect(cx, cy, cellSize, cellSize);
                            }
                        }
                    }

                    // Batch all walls into a single path (only visible cells)
                    ctx.beginPath();
                    ctx.strokeStyle = "#6868a8";
                    ctx.lineWidth = 3;
                    ctx.lineCap = "round";
                    for (let y = 0; y < rows; y++) {
                        for (let x = 0; x < cols; x++) {
                            if (fogOn && distToPlayer(x, y) > vision) continue;

                            const cx = x * cellSize;
                            const cy = y * cellSize;
                            const cell = maze[y][x];
                            if (cell & TOP) {
                                ctx.moveTo(cx, cy);
                                ctx.lineTo(cx + cellSize, cy);
                            }
                            if (cell & RIGHT) {
                                ctx.moveTo(cx + cellSize, cy);
                                ctx.lineTo(cx + cellSize, cy + cellSize);
                            }
                            if (cell & BOTTOM) {
                                ctx.moveTo(cx, cy + cellSize);
                                ctx.lineTo(cx + cellSize, cy + cellSize);
                            }
                            if (cell & LEFT) {
                                ctx.moveTo(cx, cy);
                                ctx.lineTo(cx, cy + cellSize);
                            }
                        }
                    }
                    ctx.stroke();

                    // Fog edge gradient: dim cells at vision boundary
                    if (fogOn) {
                        for (let y = 0; y < rows; y++) {
                            for (let x = 0; x < cols; x++) {
                                const d = distToPlayer(x, y);
                                if (d === vision) {
                                    ctx.fillStyle = "rgba(15,15,26,0.5)";
                                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                                }
                            }
                        }
                    }

                    // Exit marker (only if visible)
                    if (!fogOn || distToPlayer(cols - 1, rows - 1) <= vision) {
                        const ex = (cols - 1) * cellSize + cellSize / 2;
                        const ey = (rows - 1) * cellSize + cellSize / 2;
                        const glow = ctx.createRadialGradient(ex, ey, 0, ex, ey, cellSize * 0.6);
                        glow.addColorStop(0, "rgba(0,230,118,0.35)");
                        glow.addColorStop(1, "rgba(0,230,118,0)");
                        ctx.fillStyle = glow;
                        ctx.fillRect((cols - 1) * cellSize, (rows - 1) * cellSize, cellSize, cellSize);
                        ctx.beginPath();
                        ctx.arc(ex, ey, cellSize * 0.32, 0, Math.PI * 2);
                        ctx.fillStyle = "#00e676";
                        ctx.fill();
                    }

                    // Player
                    const px = player.x * cellSize + cellSize / 2;
                    const py = player.y * cellSize + cellSize / 2;
                    const pglow = ctx.createRadialGradient(px, py, 0, px, py, cellSize * 0.6);
                    pglow.addColorStop(0, "rgba(108,99,255,0.4)");
                    pglow.addColorStop(1, "rgba(108,99,255,0)");
                    ctx.fillStyle = pglow;
                    ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);
                    ctx.beginPath();
                    ctx.arc(px, py, cellSize * 0.32, 0, Math.PI * 2);
                    ctx.fillStyle = "#6c63ff";
                    ctx.fill();
                    ctx.strokeStyle = "#9d97ff";
                    ctx.lineWidth = 1.5;
                    ctx.stroke();

                    // Wilson walk trail
                    if (genWalkTrail.length > 0) {
                        ctx.fillStyle = "rgba(255,220,50,0.2)";
                        for (const p of genWalkTrail) {
                            ctx.fillRect(p.x * cellSize, p.y * cellSize, cellSize, cellSize);
                        }
                    }

                    // Generation highlight
                    if (genHighlight) {
                        const gx = genHighlight.x * cellSize + cellSize / 2;
                        const gy = genHighlight.y * cellSize + cellSize / 2;
                        ctx.beginPath();
                        ctx.arc(gx, gy, cellSize * 0.35, 0, Math.PI * 2);
                        ctx.fillStyle = "rgba(255,101,132,0.3)";
                        ctx.fill();
                        ctx.beginPath();
                        ctx.arc(gx, gy, cellSize * 0.25, 0, Math.PI * 2);
                        ctx.fillStyle = "#ff6584";
                        ctx.fill();
                    }
                }

                // ── Movement ──

                function canMoveDir(x, y, dirIndex) {
                    const cell = maze[y][x];
                    if (cell & dirs[dirIndex].wall) return false;
                    const nx = x + dirs[dirIndex].dx,
                        ny = y + dirs[dirIndex].dy;
                    return nx >= 0 && nx < cols && ny >= 0 && ny < rows;
                }

                function canMove(dx, dy) {
                    const { x, y } = player;
                    const cell = maze[y][x];
                    if (dx === 0 && dy === -1 && (cell & TOP)) return false;
                    if (dx === 1 && dy === 0 && (cell & RIGHT)) return false;
                    if (dx === 0 && dy === 1 && (cell & BOTTOM)) return false;
                    if (dx === -1 && dy === 0 && (cell & LEFT)) return false;
                    const nx = x + dx,
                        ny = y + dy;
                    return nx >= 0 && nx < cols && ny >= 0 && ny < rows;
                }

                function ensureTimerStarted() {
                    if (timerStarted) return;
                    timerStarted = true;
                    startTime = Date.now();
                    clearInterval(timerInterval);
                    timerInterval = setInterval(() => {
                        if (!won) {
                            timeEl.textContent = `${i18n[lang].time}: ${Math.floor((Date.now() - startTime) / 1000)}s`;
                        }
                    }, 500);
                }

                function doMove(dx, dy) {
                    ensureTimerStarted();
                    player.x += dx;
                    player.y += dy;
                    steps++;
                    visits[player.y][player.x]++;
                    if (visits[player.y][player.x] === 1) uniqueCells++;
                    if (player.x === 0 && player.y === 0) originReturns++;
                    const curDist = distMap[player.y][player.x];
                    distHistory.push(curDist);
                    updateStatLabels();
                    draw();
                    if (player.x === cols - 1 && player.y === rows - 1) {
                        won = true;
                        clearInterval(timerInterval);
                        stopSolving();
                        // Reveal full maze on win (disable fog, enable trail)
                        chkFog.checked = false;
                        chkTrail.checked = true;
                        draw();
                        const elapsed = Math.floor((Date.now() - startTime) / 1000);
                        const t = i18n[lang];
                        winMsg.textContent = t.win_result(steps, elapsed);
                        drawChart();
                        resultsEl.style.display = "";
                        resultsEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    }
                }

                function movePlayer(dx, dy) {
                    if (won || solving || genAnimating) return;
                    if (!canMove(dx, dy)) return;
                    doMove(dx, dy);
                }

                // ── Solvers ──

                // BFS shortest path from (0,0) to exit, returns length
                function getShortestPathLength() {
                    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
                    const dist = Array.from({ length: rows }, () => Array(cols).fill(0));
                    const queue = [{ x: 0, y: 0 }];
                    visited[0][0] = true;
                    while (queue.length > 0) {
                        const { x, y } = queue.shift();
                        if (x === cols - 1 && y === rows - 1) return dist[y][x];
                        for (let i = 0; i < 4; i++) {
                            if (!canMoveDir(x, y, i)) continue;
                            const nx = x + dirs[i].dx,
                                ny = y + dirs[i].dy;
                            if (visited[ny][nx]) continue;
                            visited[ny][nx] = true;
                            dist[ny][nx] = dist[y][x] + 1;
                            queue.push({ x: nx, y: ny });
                        }
                    }
                    return -1;
                }

                function getOpenDirs(x, y) {
                    const result = [];
                    for (let i = 0; i < 4; i++) {
                        if (canMoveDir(x, y, i)) result.push(i);
                    }
                    return result;
                }

                // Random walk: pick a random open direction each step
                function solveRandomStep() {
                    if (won) return;
                    const open = getOpenDirs(player.x, player.y);
                    if (open.length === 0) return;
                    const di = open[Math.floor(Math.random() * open.length)];
                    doMove(dirs[di].dx, dirs[di].dy);
                }

                // Smart random: weighted toward unvisited cells and toward exit (bottom-right)
                function solveSmartRandomStep() {
                    if (won) return;
                    const open = getOpenDirs(player.x, player.y);
                    if (open.length === 0) return;

                    // Check if any neighbor is unvisited
                    const hasUnvisited = open.some((di) => {
                        const nx = player.x + dirs[di].dx;
                        const ny = player.y + dirs[di].dy;
                        return visits[ny][nx] === 0;
                    });

                    const weights = open.map((di) => {
                        const nx = player.x + dirs[di].dx;
                        const ny = player.y + dirs[di].dy;
                        let w = 1;
                        if (visits[ny][nx] === 0) {
                            // Unvisited: strong preference + directional bias toward exit
                            w += 10;
                            if (dirs[di].dx > 0) w += 3;
                            if (dirs[di].dy > 0) w += 3;
                        } else if (hasUnvisited) {
                            // Visited, but unvisited options exist: very low weight
                            w = 0.1;
                        } else {
                            // All visited: prefer least-visited, no directional bias
                            w = 1 / visits[ny][nx];
                        }
                        return w;
                    });

                    // Weighted random pick
                    const total = weights.reduce((a, b) => a + b, 0);
                    let r = Math.random() * total;
                    for (let i = 0; i < open.length; i++) {
                        r -= weights[i];
                        if (r <= 0) {
                            doMove(dirs[open[i]].dx, dirs[open[i]].dy);
                            return;
                        }
                    }
                    doMove(dirs[open[open.length - 1]].dx, dirs[open[open.length - 1]].dy);
                }

                // Junction Walker: pick a weighted random direction at junctions, walk corridors automatically
                // Weights: strongly prefer unvisited, prefer toward exit (right/down)
                let smartDfsQueue = [];

                function solveSmartDfsStep() {
                    if (won) return;

                    // If we have a queued path, follow it
                    if (smartDfsQueue.length > 0) {
                        const di = smartDfsQueue.shift();
                        // Verify still valid (should always be in a perfect maze)
                        if (canMoveDir(player.x, player.y, di)) {
                            doMove(dirs[di].dx, dirs[di].dy);
                            return;
                        }
                        smartDfsQueue = []; // invalidated, re-pick
                    }

                    // Pick a direction using smart weights
                    const open = getOpenDirs(player.x, player.y);
                    if (open.length === 0) return;

                    const hasUnvisited = open.some((di) => {
                        const nx = player.x + dirs[di].dx;
                        const ny = player.y + dirs[di].dy;
                        return visits[ny][nx] === 0;
                    });

                    const weights = open.map((di) => {
                        const nx = player.x + dirs[di].dx;
                        const ny = player.y + dirs[di].dy;
                        let w = 1;
                        if (visits[ny][nx] === 0) {
                            w += 10;
                            if (dirs[di].dx > 0) w += 3;
                            if (dirs[di].dy > 0) w += 3;
                        } else if (hasUnvisited) {
                            w = 0.1;
                        } else {
                            w = 1 / visits[ny][nx];
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
                    let cx = player.x,
                        cy = player.y;
                    const path = [];
                    while (true) {
                        const nx = cx + dirs[chosenDir].dx;
                        const ny = cy + dirs[chosenDir].dy;
                        if (!canMoveDir(cx, cy, chosenDir)) break;
                        path.push(chosenDir);
                        cx = nx;
                        cy = ny;
                        // Stop if we hit a junction (more than 2 openings) or the exit
                        const nextOpen = getOpenDirs(cx, cy);
                        if (nextOpen.length !== 2 || (cx === cols - 1 && cy === rows - 1)) break;
                        // In a corridor, continue in the non-backtrack direction
                        const backDir = (chosenDir + 2) % 4;
                        const forward = nextOpen.find((d) => d !== backDir);
                        if (forward === undefined) break;
                        chosenDir = forward;
                    }

                    // Execute first step, queue the rest
                    if (path.length > 0) {
                        const first = path.shift();
                        smartDfsQueue = path;
                        doMove(dirs[first].dx, dirs[first].dy);
                    }
                }

                // DFS: find path then return full path
                function solveDFS() {
                    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
                    const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
                    const stack = [{ x: player.x, y: player.y }];
                    visited[player.y][player.x] = true;
                    let found = false;
                    while (stack.length > 0 && !found) {
                        const { x, y } = stack.pop();
                        if (x === cols - 1 && y === rows - 1) {
                            found = true;
                            break;
                        }
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
                    // Trace path
                    const path = [];
                    let cx = cols - 1,
                        cy = rows - 1;
                    while (cx !== player.x || cy !== player.y) {
                        path.push({ x: cx, y: cy });
                        const p = parent[cy][cx];
                        cx = p.x;
                        cy = p.y;
                    }
                    path.reverse();
                    return path;
                }

                // BFS: find shortest path
                function solveBFS() {
                    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
                    const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
                    const queue = [{ x: player.x, y: player.y }];
                    visited[player.y][player.x] = true;
                    let found = false;
                    while (queue.length > 0 && !found) {
                        const { x, y } = queue.shift();
                        if (x === cols - 1 && y === rows - 1) {
                            found = true;
                            break;
                        }
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
                    let cx = cols - 1,
                        cy = rows - 1;
                    while (cx !== player.x || cy !== player.y) {
                        path.push({ x: cx, y: cy });
                        const p = parent[cy][cx];
                        cx = p.x;
                        cy = p.y;
                    }
                    path.reverse();
                    return path;
                }

                // Right-hand rule: always try right first relative to facing direction
                // Priority: right, straight, left, back
                function solveRightHandStep() {
                    if (won) return;
                    const tryOrder = [
                        (facing + 1) % 4, // turn right
                        facing, // go straight
                        (facing + 3) % 4, // turn left
                        (facing + 2) % 4, // turn back
                    ];
                    for (const di of tryOrder) {
                        if (canMoveDir(player.x, player.y, di)) {
                            facing = di;
                            doMove(dirs[di].dx, dirs[di].dy);
                            return;
                        }
                    }
                }

                // ── Solver control ──

                let solvePathQueue = [];
                let solvePathIndex = 0;

                function stopSolving() {
                    if (solveTimer) {
                        clearInterval(solveTimer);
                        solveTimer = null;
                    }
                    if (rngSpeed._solveHandler) {
                        rngSpeed.removeEventListener("input", rngSpeed._solveHandler);
                        rngSpeed._solveHandler = null;
                    }
                    solving = false;
                    solvePathQueue = [];
                    solvePathIndex = 0;
                    btnSolve.style.display = "";
                    btnStop.style.display = "none";
                }

                function startSolving() {
                    if (won || genAnimating) return;
                    stopSolving();
                    solving = true;
                    btnSolve.style.display = "none";
                    btnStop.style.display = "";

                    const algo = selSolver.value;
                    function getSolveInterval() {
                        const s = parseInt(rngSpeed.value);
                        return Math.max(10, Math.round(200 / s));
                    }

                    // Re-create interval when speed changes during solving
                    function restartSolveTimer(stepFn) {
                        if (solveTimer) clearInterval(solveTimer);
                        solveTimer = setInterval(() => {
                            if (won) {
                                stopSolving();
                                return;
                            }
                            stepFn();
                        }, getSolveInterval());
                    }

                    if (algo === "random" || algo === "smart" || algo === "smartdfs") {
                        const stepFn =
                            algo === "smart"
                                ? solveSmartRandomStep
                                : algo === "smartdfs"
                                  ? solveSmartDfsStep
                                  : solveRandomStep;
                        if (algo === "smartdfs") smartDfsQueue = [];
                        restartSolveTimer(stepFn);
                        rngSpeed._solveHandler = () => restartSolveTimer(stepFn);
                        rngSpeed.addEventListener("input", rngSpeed._solveHandler);
                    } else if (algo === "dfs" || algo === "bfs") {
                        const path = algo === "dfs" ? solveDFS() : solveBFS();
                        solvePathQueue = path;
                        solvePathIndex = 0;
                        const stepFn = () => {
                            if (won || solvePathIndex >= solvePathQueue.length) {
                                stopSolving();
                                return;
                            }
                            const target = solvePathQueue[solvePathIndex++];
                            const dx = target.x - player.x;
                            const dy = target.y - player.y;
                            doMove(dx, dy);
                        };
                        restartSolveTimer(stepFn);
                        rngSpeed._solveHandler = () => restartSolveTimer(stepFn);
                        rngSpeed.addEventListener("input", rngSpeed._solveHandler);
                    } else if (algo === "righthand") {
                        facing = 2; // start facing down
                        restartSolveTimer(solveRightHandStep);
                        rngSpeed._solveHandler = () => restartSolveTimer(solveRightHandStep);
                        rngSpeed.addEventListener("input", rngSpeed._solveHandler);
                    }
                }

                // ── Convergence chart ──

                function drawChart() {
                    const W = chartCanvas.width;
                    const H = chartCanvas.height;
                    const pad = { top: 20, right: 16, bottom: 28, left: 44 };
                    const plotW = W - pad.left - pad.right;
                    const plotH = H - pad.top - pad.bottom;

                    chartCtx.clearRect(0, 0, W, H);
                    chartCtx.fillStyle = "#12121f";
                    chartCtx.fillRect(0, 0, W, H);

                    if (distHistory.length < 2) return;

                    const maxDist = Math.max(...distHistory);
                    const n = distHistory.length;

                    // Grid lines + labels
                    chartCtx.strokeStyle = "#2a2a4a";
                    chartCtx.lineWidth = 1;
                    chartCtx.fillStyle = "#666";
                    chartCtx.font = "11px monospace";
                    chartCtx.textAlign = "right";
                    const yTicks = 4;
                    for (let i = 0; i <= yTicks; i++) {
                        const val = Math.round(maxDist * (1 - i / yTicks));
                        const y = pad.top + (i / yTicks) * plotH;
                        chartCtx.beginPath();
                        chartCtx.moveTo(pad.left, y);
                        chartCtx.lineTo(W - pad.right, y);
                        chartCtx.stroke();
                        chartCtx.fillText(val, pad.left - 6, y + 4);
                    }

                    // X-axis label
                    chartCtx.textAlign = "center";
                    chartCtx.fillText("0", pad.left, H - 6);
                    chartCtx.fillText(n - 1, W - pad.right, H - 6);
                    chartCtx.fillText("Steps", W / 2, H - 4);

                    // Y-axis label
                    chartCtx.save();
                    chartCtx.translate(12, pad.top + plotH / 2);
                    chartCtx.rotate(-Math.PI / 2);
                    chartCtx.fillText("Distance", 0, 0);
                    chartCtx.restore();

                    // Draw line
                    chartCtx.beginPath();
                    chartCtx.strokeStyle = "#6c63ff";
                    chartCtx.lineWidth = 1.5;
                    for (let i = 0; i < n; i++) {
                        const x = pad.left + (i / (n - 1)) * plotW;
                        const y = pad.top + (1 - distHistory[i] / maxDist) * plotH;
                        if (i === 0) chartCtx.moveTo(x, y);
                        else chartCtx.lineTo(x, y);
                    }
                    chartCtx.stroke();

                    // Fill under curve
                    const lastX = pad.left + plotW;
                    const baseY = pad.top + plotH;
                    chartCtx.lineTo(lastX, baseY);
                    chartCtx.lineTo(pad.left, baseY);
                    chartCtx.closePath();
                    chartCtx.fillStyle = "rgba(108,99,255,0.12)";
                    chartCtx.fill();
                }

                // ── Game control ──

                function resetCounters() {
                    stopSolving();
                    player = { x: 0, y: 0 };
                    steps = 0;
                    won = false;
                    uniqueCells = 1;
                    originReturns = 0;
                    visits = Array.from({ length: rows }, () => Array(cols).fill(0));
                    visits[0][0] = 1;
                    distHistory = [distMap[0][0]];
                    timerStarted = false;
                    startTime = 0;
                    clearInterval(timerInterval);
                    updateStatLabels();
                    resultsEl.style.display = "none";
                    draw();
                }

                function startGame() {
                    stopSolving();
                    stopGenAnimation();
                    resultsEl.style.display = "none";
                    const w = clamp(parseInt(inpW.value) || 15, 5, 100);
                    const h = clamp(parseInt(inpH.value) || 15, 5, 100);
                    inpW.value = w;
                    inpH.value = h;

                    // Clear the grid immediately
                    cols = w;
                    rows = h;
                    maze = Array.from({ length: h }, () => Array.from({ length: w }, () => 15));
                    visits = Array.from({ length: h }, () => Array(w).fill(0));
                    player = { x: 0, y: 0 };
                    steps = 0;
                    won = false;
                    uniqueCells = 0;
                    originReturns = 0;
                    distHistory = [];
                    timerStarted = false;
                    clearInterval(timerInterval);
                    updateStatLabels();
                    draw();

                    if (chkAnimate.checked) {
                        // Animated generation
                        let result;
                        if (selAlgo.value === "wilson") {
                            result = generateStepsWilson(w, h);
                        } else if (selAlgo.value === "division") {
                            result = generateStepsDivision(w, h);
                        } else {
                            result = generateStepsDFS(w, h);
                        }
                        replayGeneration(result, w, h, () => {
                            if (!validateMaze()) return;
                            computeDistMap();
                            computeDifficulty();
                            updateMazeInfoLabels();
                            resetCounters();
                        });
                    } else {
                        // Instant generation
                        if (selAlgo.value === "wilson") {
                            generateMazeWilson(w, h);
                        } else if (selAlgo.value === "division") {
                            generateMazeDivision(w, h);
                        } else {
                            generateMaze(w, h);
                        }
                        if (!validateMaze()) return;
                        computeDistMap();
                        computeDifficulty();
                        updateMazeInfoLabels();
                        resetCounters();
                    }
                }

                // ── Event listeners ──

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
                    }
                });

                document.querySelectorAll(".dpad .btn-dir[data-dir]").forEach((btn) => {
                    btn.addEventListener("click", () => {
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

                btnGen.addEventListener("click", startGame);
                document.querySelectorAll(".btn-preset").forEach((btn) => {
                    btn.addEventListener("click", () => {
                        inpW.value = btn.dataset.w;
                        inpH.value = btn.dataset.h;
                    });
                });
                btnAgain.addEventListener("click", resetCounters);
                btnNewGame.addEventListener("click", startGame);
                btnSolve.addEventListener("click", startSolving);
                btnStop.addEventListener("click", stopSolving);
                chkHeatmap.addEventListener("change", () => {
                    if (maze.length) draw();
                });
                chkTrail.addEventListener("change", () => {
                    if (maze.length) draw();
                });
                chkFog.addEventListener("change", () => {
                    if (maze.length) draw();
                });
                rngVision.addEventListener("input", () => {
                    visionVal.textContent = rngVision.value;
                    if (maze.length) draw();
                });
                rngSpeed.addEventListener("input", () => {
                    speedVal.textContent = rngSpeed.value + "x";
                });
                window.addEventListener("resize", () => {
                    if (maze.length) draw();
                });

                applyLang();
                startGame();
            })();
