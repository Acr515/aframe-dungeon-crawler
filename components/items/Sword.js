AFRAME.registerComponent('item-sword', {
	dependencies: ['material'],
	
	schema: {
		color: {type: 'string'},
		size: {type: 'number'},
        usage: {type: 'string'} // either ui, holding, or dropped
	},

	init: function () {
		this.el.object3D.scale.set(this.data.size, this.data.size, this.data.size);

        var handle = create("a-entity", {
            geometry: { primitive: "box", width: .25, height: .9, depth: .25 },
            material: { color: this.data.color }
        });
        this.el.appendChild(handle);

        var guard = create("a-entity", {
            geometry: { primitive: "box", width: 1, height: .25, depth: .25 },
            position: { x: 0, y: .4, z: 0 },
            material: { color: this.data.color }
        });
        this.el.appendChild(guard);

        var bladeThick = create("a-entity", {
            geometry: { primitive: "box", width: .6, height: 2, depth: .15 },
            position: { x: 0, y: 1.5, z: 0 },
            material: { color: "#999999" }
        });
        this.el.appendChild(bladeThick);

        var bladeThin = create("a-entity", {
            geometry: { primitive: "box", width: .3, height: .5, depth: .15 },
            position: { x: 0, y: 2.75, z: 0 },
            material: { color: "#999999" }
        });
        this.el.appendChild(bladeThin);
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