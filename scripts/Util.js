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
        if (cell.includes("wall")) 
          addWall([x * fac + fac, Global.CONSTANTS.wallZ + Global.CONSTANTS.wallHeight / 2, y * fac + fac]);
        else {
          addFloor([x * fac + fac, 0, y * fac + fac], getFloorColor(x, y));
        }
      }
    }
    
    // Add outer parameter walls
    for (let x = -1; x < maze.length + 3; x += 1) {
      addWall([x * fac, Global.CONSTANTS.wallZ + Global.CONSTANTS.wallHeight / 2, -fac]);
      addWall([x * fac, Global.CONSTANTS.wallZ + Global.CONSTANTS.wallHeight / 2, maze[0].length * fac + 2 * Global.CONSTANTS.areaScale]);
    }
    
    for (let y = 0; y < maze[0].length + 2; y += 1) {
      addWall([-fac, Global.CONSTANTS.wallZ + Global.CONSTANTS.wallHeight / 2, y * fac]);
      addWall([maze.length * fac + 2 * fac, Global.CONSTANTS.wallZ + Global.CONSTANTS.wallHeight / 2, y * fac]); 
    }
    
    // Add outer parameter floors
    for (let x = 0; x < maze.length + 2; x += 1) {
      addFloor([x * fac, 0, 0], getFloorColor(x, 0));
      addFloor([x * fac, 0, maze[0].length * fac + Global.CONSTANTS.areaScale], getFloorColor(x, maze[0].length));
    }
    
    for (let y = 1; y < maze[0].length + 1; y += 1) {
      addFloor([0, 0, y * fac], getFloorColor(0, y));
      addFloor([maze.length * fac + 1 * fac, 0, y * fac], getFloorColor(maze.length, y)); 
    }
  }