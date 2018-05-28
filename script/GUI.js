class GUI {

    constructor(scene) {
        var parent = this;

        this.gui = new dat.GUI( {autoplace : false});
        this.counter = 0;

        var addBoxObject = {
            add : function() {
                var mapObject = new MapObject('square');
                parent.addObjectToMenu(mapObject);
            }
        };
        var addSphereObject = {
            add : function() {
                var mapObject = new MapObject('sphere');
                parent.addObjectToMenu(mapObject);
            }
        }

        this.gui.add(addBoxObject, 'add').name('Add box');
        this.gui.add(addSphereObject, 'add').name('Add sphere');

        this.objectsMenu = this.gui.addFolder('Objects');
        this.objectsMenu.open();

        var container = document.getElementById("gui-container");
        container.appendChild(this.gui.domElement);
    }

    addObjectToMenu(mapObject) {
        scene.add(mapObject.mesh);
        var name = mapObject.type + this.counter;
        var objectsMenu = this.objectsMenu;
        var folder = this.objectsMenu.addFolder(name);

        var objectConfig = { x : 0, y : 0, z : 0, color : mapObject.mesh.material.color.getHex() };

        folder.add(objectConfig, 'x').name('X axis').min(-600).max(600).step(1).onChange(
            function(value) {
                mapObject.mesh.position.x = value;
            }
        );
        folder.add(objectConfig, 'y').name('Y axis').min(-600).max(600).step(1).onChange(
            function(value) {
                mapObject.mesh.position.y = value;
            }
        );
        folder.add(objectConfig, 'z').name('Z axis').min(-600).max(600).step(1).onChange(
            function(value) {
                mapObject.mesh.position.z = value;
            }
        );
        folder.addColor(objectConfig, 'color').name('Color').onChange(
            function(value) {
                mapObject.mesh.material.color.setHex(value);
            }
        )

        var deleteAction = {
            delete : function() {
                objectsMenu.removeFolder(name);
                scene.remove(mapObject.mesh);
            }
        }
        folder.add(deleteAction, 'delete').name('Delete');

        this.counter++;
    }
}