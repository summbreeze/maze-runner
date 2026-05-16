# Development Log

- 2026-05-16 Modularize codebase + mobile fixes + code cleanup
  - Refactor: split single IIFE main.js (1754 lines) into 8 ES Modules (state, i18n, generators, maze-utils, renderer, solvers, game, main)
  - Fix: computeCellSize() mobile bug — no longer subtracts 440px panel width on mobile layout
  - Fix: mobile flex layout collapse — grid-area gets `flex: none; overflow: visible` on mobile
  - Add: canvas HiDPI/Retina support via devicePixelRatio scaling
  - Add: swipe gesture support on maze canvas for mobile movement
  - Add: dynamic wall thickness and player eye scaling based on cellSize
  - Add: viewport zoom prevention, touch-action, overscroll-behavior for mobile
  - Fix: D-Pad uses pointerdown instead of click for instant mobile response
  - Fix: language button moved from fixed overlay into panel header (no longer obscures maze)
  - Remove: Smart Random solver (superseded by Junction Walker with identical heuristic)
  - Remove: hardcoded bottom-right direction bias from solvers
  - Fix: resetCounters now resets playerDir
  - Fix: misc cleanup — unused imports, dead variables, duplicate CSS declarations

- 2026-05-16 Keyboard shortcuts
  - Add shortcuts: G(generate) Q(solve/stop) R(reset) N(new game) F(fog) H(heatmap) T(trail)
  - Show all shortcuts in hint-box (EN/ZH)
  - Q toggles solve on/off

- 2026-05-16 Random exit, player eyes, fog animation, state machine fixes
  - Add random exit toggle: exit placed at random distant cell (distance >= maxDist/2)
  - Add player direction eyes: two dots (up/down) or one dot (left/right) on player circle
  - Add fog toggle animation: smooth vision expand/shrink over 0.4s
  - Fix fog state on win: use render-level suppression instead of mutating checkbox
  - Fix solve button after winning: reset game state and re-solve
  - Remove dead code (getShortestPathLength)
  - Simplify text colors to 2 tiers (--text + --text-muted)

- 2026-05-16 Left-right layout, fog of war, tooltips, stats reorganization
  - Restructure UI to left-right layout (grid left, panel right)
  - Replace overlay dialog with inline results section in panel
  - Add circular fog of war with adjustable vision range
  - Add hover tooltips for all controls and algorithms (EN/ZH)
  - Split stats into Maze Info (static) and Progress (dynamic)
  - Add connectivity counts (dead ends, corridors, T-junctions, crossroads)
  - Increase maze size limit to 100x100 for 4K displays
  - Add size preset buttons (S/M/L)
  - Mobile responsive fallback (stack vertically < 768px)

- 2026-05-15 Add fog of war with adjustable vision range
  - Fog toggle with manhattan distance-based visibility
  - Vision range slider (1-10)
  - Exit and trail hidden outside fog
  - Fog auto-disabled during generation animation

- 2026-05-15 Initial release: maze runner
  - 3 maze generators: DFS, Wilson, Recursive Division
  - 6 solvers: Random Walk, Smart Random, Junction Walker, DFS, BFS, Right-Hand Rule
  - Animated generation with adjustable speed
  - Connectivity heatmap, trail overlay, convergence chart
  - Difficulty score, distance tracking, maze validation
  - EN/ZH language toggle with localStorage persistence
  - Play Again (same maze) / New Game (regenerate)
  - Mobile D-Pad support
