import { state, dom } from "./state.js";

export const i18n = {
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
        hint: "Arrow / WASD: Move | G: Generate | Q: Solve | R: Reset | N: New | F H T: Fog Heatmap Trail",
        congrats: "Congratulations!",
        win_msg: "You escaped the maze!",
        play_again: "Play Again",
        new_game: "New Game",
        gen_dfs: "DFS (Recursive Backtracker)",
        gen_wilson: "Wilson (Uniform Spanning Tree)",
        gen_division: "Recursive Division (Top-Down)",
        sol_random: "Random Walk",
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
        tip_gen_algo: "Choose maze generation algorithm",
        tip_gen_dfs: "DFS: Deep random paths, long corridors, biased distribution",
        tip_gen_wilson: "Wilson: Uniform random spanning tree, balanced structure",
        tip_gen_division: "Division: Top-down recursive split, geometric patterns",
        tip_animate: "Watch the maze being generated step by step",
        random_exit: "Random Exit",
        tip_random_exit: "Place exit at a random location instead of bottom-right",
        tip_sol_algo: "Choose an automatic solving strategy",
        tip_sol_random: "Random Walk: Pick a random direction each step",
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
        hint: "方向键 / WASD: 移动 | G: 生成 | Q: 求解 | R: 重置 | N: 新游戏 | F H T: 迷雾 热力图 轨迹",
        congrats: "恭喜通关!",
        win_msg: "你成功走出了迷宫!",
        play_again: "再来一次",
        new_game: "新游戏",
        gen_dfs: "DFS (递归回溯)",
        gen_wilson: "Wilson (均匀生成树)",
        gen_division: "递归分割 (自顶向下)",
        sol_random: "随机游走",
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
        tip_gen_algo: "选择迷宫生成算法",
        tip_gen_dfs: "DFS: 随机深度优先，长走廊多，分布不均匀",
        tip_gen_wilson: "Wilson: 均匀随机生成树，结构均衡",
        tip_gen_division: "递归分割: 自顶向下切分，几何感强",
        tip_animate: "逐步观看迷宫的生成过程",
        random_exit: "随机终点",
        tip_random_exit: "终点随机放置，不固定在右下角",
        tip_sol_algo: "选择自动求解策略",
        tip_sol_random: "随机游走: 每步随机选方向",
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

export function updateStatLabels() {
    const t = i18n[state.lang];
    dom.stepsEl.textContent = `${t.steps}: ${state.steps}`;
    dom.timeEl.textContent = `${t.time}: ${state.timerStarted ? Math.floor((Date.now() - state.startTime) / 1000) : 0}s`;
    dom.cellsEl.textContent = `${t.cells}: ${state.uniqueCells}/${state.cols * state.rows || 0}`;
    dom.originEl.textContent = `${t.origin}: ${state.originReturns}`;
    dom.distEl.textContent = `${t.dist}: ${state.distMap.length ? (state.distMap[state.player.y]?.[state.player.x] ?? "-") : "-"}`;
}

export function updateMazeInfoLabels() {
    const t = i18n[state.lang];
    dom.diffEl.textContent = `${t.difficulty}: ${state.mazeDifficulty || "-"}`;
    dom.shortestEl.textContent = `${t.shortest}: ${state.distMap.length ? state.distMap[0][0] : "-"}`;
    dom.c1El.textContent = `${t.dead_ends}: ${state.mazeC1 || "-"}`;
    dom.c2El.textContent = `${t.corridors}: ${state.mazeC2 || "-"}`;
    dom.c3El.textContent = `${t.t_junctions}: ${state.mazeC3 || "-"}`;
    dom.c4El.textContent = `${t.crossroads}: ${state.mazeC4 || "-"}`;
}

export function applyLang() {
    const t = i18n[state.lang];
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    dom.btnLang.textContent = state.lang === "en" ? "中文" : "EN";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.dataset.i18n;
        if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll("[data-tip]").forEach((el) => {
        const key = el.dataset.tip;
        if (t[key]) el.title = t[key];
    });
    updateStatLabels();
    updateMazeInfoLabels();
}
