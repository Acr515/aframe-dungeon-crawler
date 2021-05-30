AFRAME.registerComponent('wall', {
    dependencies: ['material'],
    
    schema: {
      secretDoor: {type: 'number'}
    },
  
    init: function () {
      this.el.object3D.scale.set(Global.CONSTANTS.areaScale, Global.CONSTANTS.wallHeight, Global.CONSTANTS.areaScale);
      this.el.setAttribute("geometry", "primitive: box");
      this.el.setAttribute("material", "color", "#00aa00");
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