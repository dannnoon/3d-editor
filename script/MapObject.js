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

            case 'heart':
                this.mesh = this.createMeshFromShape(this.createHeartShape());
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

    createHeartShape() {
        var x = 0, y = 0;
        var heartShape = new THREE.Shape();
        
		heartShape.moveTo( x + 25, y + 25 );
		heartShape.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y );
		heartShape.bezierCurveTo( x - 30, y, x - 30, y + 35, x - 30, y + 35 );
		heartShape.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 );
		heartShape.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 );
		heartShape.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y );
        heartShape.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 );
        
        return heartShape;
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