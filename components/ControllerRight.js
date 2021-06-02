AFRAME.registerComponent('controller-right', {
    init: function () {
        // Apply components
        this.el.setAttribute("model", "");
        this.el.setAttribute("laser-controls", { hand: "right" });
        this.el.setAttribute("raycaster", {
            objects: ".tile",
            far: 4
        });


        // Logic
        this.activeTile = null
        this.el.addEventListener('update-tile', function (tile) {
            this.activeTile = tile;
        });

        this.el.addEventListener('abuttondown', function (evt) {
            Global.height = 1.6;
        });

        this.el.addEventListener('bbuttondown', function (evt) {
            Global.height = 0;
        });

        this.el.addEventListener('triggerup', function (evt) {
            if (this.activeTile == null) return;
            processTurn({
                x: this.activeTile.object3D.position.x * Global.CONSTANTS.areaScale,
                y: Global.height,
                z: this.activeTile.object3D.position.z * Global.CONSTANTS.areaScale
            });
        });
    }
});