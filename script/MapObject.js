class MapObject {

    constructor(type) {
        this.extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        this.color = 0xf00000;
        this.type = type;

        switch(type) {
            case 'square':
                this.mesh = this.createMeshFromShape(this.createSquareShape());
            break;

            case 'sphere':
                this.mesh = this.createMeshFromShape(this.createSphereShape());
            break;
        }
    }

    createSquareShape() {
        var sqLength = 80;
        var squareShape = new THREE.Shape();

        squareShape.moveTo( 0, 0 );
        squareShape.lineTo( 0, sqLength );
        squareShape.lineTo( sqLength, sqLength );
        squareShape.lineTo( sqLength, 0 );
        squareShape.lineTo( 0, 0 );

        return squareShape;
    }

    createSphereShape() {
        var circleRadius = 40;
        var circleShape = new THREE.Shape();

        circleShape.moveTo( 0, circleRadius );
        circleShape.quadraticCurveTo( circleRadius, circleRadius, circleRadius, 0 );
        circleShape.quadraticCurveTo( circleRadius, - circleRadius, 0, - circleRadius );
        circleShape.quadraticCurveTo( - circleRadius, - circleRadius, - circleRadius, 0 );
        circleShape.quadraticCurveTo( - circleRadius, circleRadius, 0, circleRadius );

        return circleShape;
    }

    createMeshFromShape(shape) {
        var geometry = new THREE.ExtrudeGeometry( shape, this.extrudeSettings );

        var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: this.color } ) );
		mesh.position.set( 0, 0, 0 );
		mesh.rotation.set( 0, 0, 0 );
        mesh.scale.set( 1, 1, 1 );

        return mesh;
    }
}