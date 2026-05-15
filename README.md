# Maze Runner

Generate, Solve, and Explore perfect mazes.

A browser-based maze playground with multiple generation algorithms, solving strategies, and real-time visualization.

## Features

**Maze Generation**
- DFS (Recursive Backtracker) - long winding corridors
- Wilson (Uniform Spanning Tree) - mathematically uniform random mazes
- Recursive Division (Top-Down) - structured geometric patterns
- Animated generation with adjustable speed

**Maze Solving**
- Random Walk
- Smart Random (weighted toward unvisited cells and exit)
- Junction Walker (smart decisions at intersections, auto-traverse corridors)
- DFS / BFS (optimal path)
- Right-Hand Rule (wall follower)

**Visualization & Stats**
- Connectivity heatmap (dead ends, corridors, junctions, crossroads)
- Trail overlay with visit frequency coloring
- Distance-to-exit convergence chart on completion
- Difficulty score, step count, timer, unique cells visited

**Other**
- EN / CN language toggle
- Mobile D-Pad support
- Maze validation (perfect maze sanity check)
- Play Again (same maze) / New Game (regenerate)

## Getting Started

### Option 1: GitHub Pages (Recommended)

Visit the live demo: [https://summbreeze.github.io/maze-runner/](https://summbreeze.github.io/maze-runner/)

### Option 2: Local Development

Clone the repo:

```bash
git clone git@github.com:summbreeze/maze-runner.git
cd maze-runner
```

Since the project uses separate CSS/JS files, you need a local server. Pick any of these:

**VS Code Live Server** (easiest)
- Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
- Right-click `index.html` -> "Open with Live Server"

**Python**
```bash
python -m http.server 8080
# Open http://localhost:8080
```

**Node.js**
```bash
npx serve
# Open http://localhost:3000
```

## Project Structure

```
maze-runner/
├── index.html      # Page structure
├── css/
│   └── style.css   # Styles
├── js/
│   └── main.js     # All game logic
├── LICENSE          # MIT License
└── README.md
```

## License

MIT - see [LICENSE](LICENSE) for details.
