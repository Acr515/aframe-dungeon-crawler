AFRAME.registerComponent('controller-right', {
    init: function () {
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

        this.el.addEventListener('triggerup'), function (evt) {
            if (this.activeTile == null) return;
            get("rig").object3D.position.set(this.activeTile.object3D.position.x * Global.CONSTANTS.areaScale, Global.height, this.activeTile.object3D.position.z * Global.CONSTANTS.areaScale);
        }
    }
});