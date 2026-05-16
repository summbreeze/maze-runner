// Wall bitmask constants
export const TOP = 1, RIGHT = 2, BOTTOM = 4, LEFT = 8;

// Direction vectors: 0=up, 1=right, 2=down, 3=left
export const dirs = [
    { dx: 0, dy: -1, wall: TOP, opposite: BOTTOM },
    { dx: 1, dy: 0, wall: RIGHT, opposite: LEFT },
    { dx: 0, dy: 1, wall: BOTTOM, opposite: TOP },
    { dx: -1, dy: 0, wall: LEFT, opposite: RIGHT },
];

export function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
}

// Shared mutable game state
export const state = {
    maze: [],
    cols: 0,
    rows: 0,
    cellSize: 0,
    player: { x: 0, y: 0 },
    playerDir: { dx: 0, dy: 1 },
    exitX: 0,
    exitY: 0,
    steps: 0,
    startTime: 0,
    timerInterval: null,
    timerStarted: false,
    won: false,
    visits: [],
    uniqueCells: 0,
    originReturns: 0,
    distMap: [],
    distHistory: [],
    genTimer: null,
    genAnimating: false,
    genHighlight: null,
    genWalkTrail: [],
    fogAnim: null,
    solveTimer: null,
    solving: false,
    facing: 2,
    smartDfsQueue: [],
    solvePathQueue: [],
    solvePathIndex: 0,
    mazeDifficulty: 0,
    mazeC1: 0,
    mazeC2: 0,
    mazeC3: 0,
    mazeC4: 0,
    lang: localStorage.getItem("maze-lang") || "en",
};

// DOM element references (populated by initDOM)
export const dom = {};

export function initDOM() {
    dom.canvas = document.getElementById("maze-canvas");
    dom.ctx = dom.canvas.getContext("2d");
    dom.inpW = document.getElementById("inp-w");
    dom.inpH = document.getElementById("inp-h");
    dom.selAlgo = document.getElementById("sel-algo");
    dom.selSolver = document.getElementById("sel-solver");
    dom.chkHeatmap = document.getElementById("chk-heatmap");
    dom.chkTrail = document.getElementById("chk-trail");
    dom.chkFog = document.getElementById("chk-fog");
    dom.rngVision = document.getElementById("rng-vision");
    dom.visionVal = document.getElementById("vision-val");
    dom.chkAnimate = document.getElementById("chk-animate");
    dom.chkRandomExit = document.getElementById("chk-random-exit");
    dom.rngSpeed = document.getElementById("rng-speed");
    dom.speedVal = document.getElementById("speed-val");
    dom.btnGen = document.getElementById("btn-gen");
    dom.btnSolve = document.getElementById("btn-solve");
    dom.btnStop = document.getElementById("btn-stop");
    dom.btnAgain = document.getElementById("btn-again");
    dom.btnNewGame = document.getElementById("btn-newgame");
    dom.resultsEl = document.getElementById("results");
    dom.winMsg = document.getElementById("win-msg");
    dom.chartCanvas = document.getElementById("chart-canvas");
    dom.chartCtx = dom.chartCanvas.getContext("2d");
    dom.stepsEl = document.getElementById("steps-display");
    dom.timeEl = document.getElementById("time-display");
    dom.cellsEl = document.getElementById("cells-display");
    dom.originEl = document.getElementById("origin-display");
    dom.distEl = document.getElementById("dist-display");
    dom.diffEl = document.getElementById("diff-display");
    dom.shortestEl = document.getElementById("shortest-display");
    dom.c1El = document.getElementById("c1-display");
    dom.c2El = document.getElementById("c2-display");
    dom.c3El = document.getElementById("c3-display");
    dom.c4El = document.getElementById("c4-display");
    dom.btnLang = document.getElementById("btn-lang");
}
