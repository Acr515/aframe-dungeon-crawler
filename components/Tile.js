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
		this.hex = "#666666";

		// Determine and set color
		if (this.data.color == "light") {
			this.hex = "#666666";
		} else {
			this.hex = "#555555";
		}
	
		this.el.setAttribute("material", "color", this.hex);

		// Laser pointer now focused on this element
		this.el.addEventListener('raycaster-intersected', evt => {
			get("controller-right").emit("update-tile", { tile: evt.detail.el });
			this.el.setAttribute("material", "color", "#999999");
		});
		// Laser pointer now looking away from this element
		this.el.addEventListener('raycaster-intersected-cleared', evt => {
			get("controller-right").emit("update-tile", { tile: null })
			this.el.setAttribute("material", "color", this.hex);
		});
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