AFRAME.registerComponent('tile', {
    dependencies: ['material'],
    
    schema: {
      color: {type: 'string'},
      exit: {type: 'number'}
    },
  
    init: function () {
      this.el.object3D.scale.set(Global.CONSTANTS.areaScale, Global.CONSTANTS.areaScale, 1);
      this.el.object3D.rotation.x = toRads(-90);
      this.el.setAttribute("geometry", "primitive: plane");
    
      // Determine and set color
      let hex = "";
      console.log(this.color, this.el.color)
      if (this.data.color == "light") {
        hex = "#666666";
      } else {
        hex = "#555555";
      }
    
      this.el.setAttribute("material", "color", hex);
    },
  
    update: function () {
      // Do something when component's data is updated.
    },
  
    remove: function () {
      // Do something the component or its entity is detached.
    },
  
    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
  });