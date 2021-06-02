// Substitution for document.getElementById()
function get(id) {
	return document.getElementById(id);
}

// Substitution for document.getElementsByClassName()
function getAll(cl) {
	return document.getElementsByClassName(cl);
}

// Substitution for document.querySelector("a-scene")
function scene() {
	return document.querySelector("a-scene");
}

// Creates an element with any number of attributes that need to be added to it
function create(name, attributes) {
	let elm = document.createElement(name);
	
	Object.keys(attributes).map(function(key, index) {
		var val = attributes[key];
		elm.setAttribute(key, val);
	});
	
	return elm;
}

// Converts degrees to radians
function toRads(deg) {
	return deg * (Math.PI / 180);
}

// Adds a wall to the scene
function addWall(coords) {
	let wall = create("a-entity", {
		wall: "",
		class: "wall"
	});
	// Currently adds directly to scene, this will change in the future
	scene().appendChild(wall);
	wall.object3D.position.set(coords[0], coords[1], coords[2]);
}

// Adds a floor tile to the scene
function addFloor(coords, color) {
	let floor = create("a-entity", {
		tile: {color: color},
		class: "tile"
	});
	// Currently adds directly to scene, this will change in the future
	scene().appendChild(floor);
	floor.object3D.position.set(coords[0], coords[1], coords[2]);
}

// Fills in the scene with walls for the maze, takes in the Global.maze.maze array to build
function createMaze(maze) {
	let fac = Global.CONSTANTS.areaScale;
	const getFloorColor = function(x, y) {
		return ((x % 2 == 0 && y % 2 == 0) || (x % 2 != 0 && y % 2 != 0)) ? "dark" : "light";
	}
	
	for (let x = 0; x < maze.length; x += 1) {
		for (let y = 0; y < maze[x].length; y += 1) {
			let cell = maze[x][y];
			if (cell.includes("wall") || cell.includes("outer-wall")) 
				addWall([x * fac + fac, Global.CONSTANTS.wallZ + Global.CONSTANTS.wallHeight / 2, y * fac + fac]);
			else {
				addFloor([x * fac + fac, 0, y * fac + fac], getFloorColor(x, y));
			}
		}
	}
}


// Moves the camera
function moveRig(pos) {
	get("rig").object3D.position.set(pos.x, pos.y, pos.z);
}

// Processes an in-game turn after the user makes a move
function processTurn(pos) {
	moveRig(pos);
}