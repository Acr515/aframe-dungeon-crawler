AFRAME.registerComponent('controller-left', {
    init: function () {
        // Components
        this.el.setAttribute("model", "");
        this.el.setAttribute("oculus-touch-controls", { hand: "left" });

        // Local variables
        this.state = "idle";
        this.item = null;

        // Logic
        this.el.addEventListener('xbuttondown', function (evt) {
            get("rig").object3D.position.set(Global.CONSTANTS.areaScale * 2, Global.height, Global.CONSTANTS.areaScale * 2);
        });
        this.el.addEventListener('ybuttondown', function (evt) {
            get("rig").object3D.position.set(0, Global.height, 0);
        });
    }
});