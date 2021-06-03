let maze = new MazeBuilder(5, 5);  // if adjusting these numbers, also change them in Global.CONSTANT

var Global = {
	CONSTANTS: {
		wallHeight: 7,      // height of all walls in game
		wallZ: 0,           // z-coordinate of all walls in game
		areaScale: 2.5,		// number to scale up each wall's base area by, formerly 3
		rows: 5,            // number of rows for maze, minus outer parameter
		cols: 5             // number of columns for maze, minus outer parameter
	},
	colorTiers: [
		"#",	// brown
		"#",	// red
		"#",	// blue
		"#",	// yellow
		"#",	// green
		"#",	// purple
		"#"		// white
	],
	height: 0,				// height of camera, should be 0 when in immersive mode
	maze: maze,				// MazeBuilder instance containing the current maze
	x: 0,					// x-position of player on game grid
	y: 0,					// y-position of player on game grid
	floor: 1				// current floor
}