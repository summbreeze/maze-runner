import { state, dom, TOP, RIGHT, BOTTOM, LEFT } from "./state.js";

// ── Cell size computation (FIXED for mobile) ──

export function computeCellSize() {
    const isMobile = window.innerWidth <= 768;
    const panelW = isMobile ? 0 : 440;
    const hPadding = isMobile ? 32 : 80;
    const maxW = window.innerWidth - panelW - hPadding;
    const maxH = isMobile ? window.innerHeight - 160 : window.innerHeight - 80;
    const minCell = isMobile ? 3 : 6;
    state.cellSize = Math.max(
        minCell,
        Math.min(40, Math.floor(Math.min(maxW / state.cols, maxH / state.rows))),
    );
}

// ── Main draw ──

export function draw() {
    computeCellSize();
    const dpr = window.devicePixelRatio || 1;
    const { cols, rows, cellSize, maze, player, playerDir, exitX, exitY, visits, genHighlight, genWalkTrail, fogAnim, genAnimating, won } = state;
    const { canvas, ctx, chkHeatmap, chkTrail, chkFog, rngVision } = dom;

    const W = cols * cellSize;
    const H = rows * cellSize;

    // HiDPI canvas scaling
    const bufW = Math.round(W * dpr);
    const bufH = Math.round(H * dpr);
    if (canvas.width !== bufW || canvas.height !== bufH) {
        canvas.width = bufW;
        canvas.height = bufH;
        canvas.style.width = W + "px";
        canvas.style.height = H + "px";
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.fillStyle = "#12121f";
    ctx.fillRect(0, 0, W, H);

    const heatmap = chkHeatmap.checked;
    const showTrail = chkTrail.checked || won;
    const fogOn = fogAnim !== null || (chkFog.checked && !genAnimating && !won);
    const vision = fogAnim ? fogAnim.current : parseInt(rngVision.value);
    const connColors = ["#12121f", "#12121f", "#181830", "#222245", "#3d3d78"];

    function distToPlayer(x, y) {
        const dx = x - player.x,
            dy = y - player.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Cell backgrounds (heatmap + trail)
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

    // Batch all walls into a single path
    const wallWidth = Math.max(1, Math.min(3, cellSize * 0.12));
    ctx.beginPath();
    ctx.strokeStyle = "#6868a8";
    ctx.lineWidth = wallWidth;
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

    // Fog edge gradient
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

    // Exit marker
    if (!fogOn || distToPlayer(exitX, exitY) <= vision) {
        const ex = exitX * cellSize + cellSize / 2;
        const ey = exitY * cellSize + cellSize / 2;
        const glow = ctx.createRadialGradient(ex, ey, 0, ex, ey, cellSize * 0.6);
        glow.addColorStop(0, "rgba(0,230,118,0.35)");
        glow.addColorStop(1, "rgba(0,230,118,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(exitX * cellSize, exitY * cellSize, cellSize, cellSize);
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
    ctx.lineWidth = Math.max(1, cellSize * 0.06);
    ctx.stroke();

    // Player eyes (scaled with minimum size for mobile)
    const eyeR = Math.max(1.5, cellSize * 0.07);
    const eyeSpread = Math.max(2, cellSize * 0.13);
    const eyeOffset = Math.max(2, cellSize * 0.12);
    ctx.fillStyle = "#1a1a2e";
    if (playerDir.dy < 0) {
        ctx.beginPath();
        ctx.arc(px - eyeSpread, py - eyeOffset, eyeR, 0, Math.PI * 2);
        ctx.arc(px + eyeSpread, py - eyeOffset, eyeR, 0, Math.PI * 2);
        ctx.fill();
    } else if (playerDir.dy > 0) {
        ctx.beginPath();
        ctx.arc(px - eyeSpread, py + eyeOffset, eyeR, 0, Math.PI * 2);
        ctx.arc(px + eyeSpread, py + eyeOffset, eyeR, 0, Math.PI * 2);
        ctx.fill();
    } else if (playerDir.dx < 0) {
        ctx.beginPath();
        ctx.arc(px - eyeOffset, py - eyeR * 1.5, eyeR, 0, Math.PI * 2);
        ctx.fill();
    } else if (playerDir.dx > 0) {
        ctx.beginPath();
        ctx.arc(px + eyeOffset, py - eyeR * 1.5, eyeR, 0, Math.PI * 2);
        ctx.fill();
    }

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

// ── Fog animation ──

export function startFogAnim(from, to, onDone) {
    const frames = 25;
    state.fogAnim = {
        current: from,
        target: to,
        step: (to - from) / frames,
        onDone: onDone || null,
    };
    function tick() {
        if (!state.fogAnim) return;
        state.fogAnim.current += state.fogAnim.step;
        const done =
            (state.fogAnim.step > 0 && state.fogAnim.current >= state.fogAnim.target) ||
            (state.fogAnim.step < 0 && state.fogAnim.current <= state.fogAnim.target);
        if (done) {
            const cb = state.fogAnim.onDone;
            state.fogAnim = null;
            if (cb) cb();
            draw();
            return;
        }
        draw();
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

export function getFogFullRadius() {
    return Math.sqrt(state.cols * state.cols + state.rows * state.rows);
}

// ── Convergence chart ──

export function drawChart() {
    const { chartCanvas, chartCtx } = dom;
    const W = 320;
    const H = 140;

    // HiDPI for chart
    const dpr = window.devicePixelRatio || 1;
    chartCanvas.width = Math.round(W * dpr);
    chartCanvas.height = Math.round(H * dpr);
    chartCanvas.style.height = H + "px";
    chartCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    chartCtx.clearRect(0, 0, W, H);
    chartCtx.fillStyle = "#12121f";
    chartCtx.fillRect(0, 0, W, H);

    if (state.distHistory.length < 2) return;

    const pad = { top: 20, right: 16, bottom: 28, left: 44 };
    const plotW = W - pad.left - pad.right;
    const plotH = H - pad.top - pad.bottom;
    const maxDist = Math.max(...state.distHistory);
    const n = state.distHistory.length;

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

    chartCtx.textAlign = "center";
    chartCtx.fillText("0", pad.left, H - 6);
    chartCtx.fillText(n - 1, W - pad.right, H - 6);
    chartCtx.fillText("Steps", W / 2, H - 4);

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
        const y = pad.top + (1 - state.distHistory[i] / maxDist) * plotH;
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
