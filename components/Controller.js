AFRAME.registerComponent('controller', {
    schema: {
        hand: { type: 'string' },
        beginState: { type: 'string', default: 'move' },
        beginItem: { type: 'string', default: 'default' }
    },

    init: function () {
        // Components
        this.el.setAttribute("model", "");
        this.el.setAttribute("laser-controls", { hand: this.data.hand });
        this.el.setAttribute("raycaster", {
            objects: ".tile",
            far: 4
        });

        // Local variables
        this.activeTile = null;
        this.state = this.data.beginState;
        this.item = this.data.beginItem;
        this.prevItem = this.data.beginItem;

        // Listeners that will always be active
        this.el.addEventListener('change-state', function(event) {
            if (event.detail.state != "") this.state = event.detail.state;
            if (event.detail.state != "") this.item = event.detail.item;
            this.updateState();
        });
        this.el.addEventListener('abuttondown', this.moveListener_AddSword);
        this.el.addEventListener('bbuttondown', this.moveListener_UseModel);

        this.updateState();
    },

    // Gets whether or not the buttons are x-y or a-b
    buttonLetter: function(num) {
        if (num == 1) {
            if (this.data.hand == "left") return "x"; else return "a";
        } else {
            if (this.data.hand == "left") return "y"; else return "b";
        }
    },
    
    // Adds and removes models and listeners
    updateState: function() {
        // Redundantly remove every single possible listener... thanks JS
        this.el.removeEventListener('update-tile', this.moveListener_UpdateTile);
        this.el.removeEventListener('gripup', this.moveListener_MovePlayer);

        // Remove any attributes
        this.el.removeAttribute("laser-controls");

        switch (this.state) {
            case "move":
                this.el.addEventListener('update-tile', this.moveListener_UpdateTile);
                this.el.addEventListener('gripup', this.moveListener_MovePlayer);

                this.el.setAttribute("laser-controls", { hand: this.data.hand });
                break;
        }

        // Change the appearance
        if (this.prevItem != this.item) {
            this.prevItem = this.item;
            this.el.textContent = "";

            switch (this.item) {
                case "none":
                    this.removeAttribute("model");
                    break;
                case "default":
                    this.setAttribute("model", "");
                    break;
                default:
                    // item is an object, for now we'll assume it's just a sword
                    this.el.appendChild(create("a-entity", {
                        "item-sword": {
                            size: .2,
                            color: "#7a5b11"
                        },
                        "position": {
                            x: 0,
                            y: .2,
                            z: 0
                        }
                    }));
            }
        }
    },


    // EVENT HANDLERS - move state
    // Handles the update-tile event to set the active tile
    moveListener_UpdateTile: function(event) {
        this.activeTile = event.detail.tile;
        console.log("tile updated to ", event.detail);
    },

    // Handles the trigger event 
    moveListener_MovePlayer: function(event) {
        console.log("Click found, target was:", this.activeTile);
        if (this.activeTile == null) return;
        
        processTurn({
            x: this.activeTile.object3D.position.x,
            y: Global.height,
            z: this.activeTile.object3D.position.z
        });
    },

    // Adds an item to the player's hand
    moveListener_AddSword: function(event) {
        this.el.emit("change-state", { state: "", item: "sword" });
    },

    // Adds the controller back to the player's hand
    moveListener_UseModel: function(event) {
        this.el.emit("change-state", { state: "", item: "default" });
    }
});