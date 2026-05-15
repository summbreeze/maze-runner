# Development Log

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
