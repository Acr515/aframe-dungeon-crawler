let maze = new MazeBuilder(5, 5);  // if adjusting these numbers, also change them in Global.CONSTANT

var Global = {
  CONSTANTS: {
    wallHeight: 7,                              // height of all walls in game
    wallZ: 0,                                   // z-coordinate of all walls in game
    areaScale: 3.5,                               // number to scale up each wall's base area by
    rows: 5,                                    // number of rows for maze, minus outer parameter
    cols: 5                                     // number of columns for maze, minus outer parameter
  },
  maze: maze
}