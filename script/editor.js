var scene, camera, renderer;
var startCamera = { x: 0, y: 0, z: 0, rx: 0, ry: 0, upx: 0, upy: 0, upz: 0 };
var gui;

function init() {
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(70, aspect, 0.1, 10000);
    camera.position.z = 300;

    startCamera.x = camera.position.x;
    startCamera.y = camera.position.y;
    startCamera.z = camera.position.z;
    startCamera.rx = camera.rotation.x;
    startCamera.ry = camera.rotation.y;
    startCamera.upx = camera.up.x;
    startCamera.upy = camera.up.y;
    startCamera.upz = camera.up.z;

    scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );
    var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( pointLight );
    scene.add( camera );

    gui = new GUI(scene);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var helper = new THREE.GridHelper(1200, 60, 0xFF4444, 0x404040);
    helper.position.y = 0;
    this.scene.add(helper);

    scene.add(camera);

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 2.0;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 0.4;
    
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}