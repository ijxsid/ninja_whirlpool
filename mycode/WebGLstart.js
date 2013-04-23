// startWebGL.js

// set the screen size

var WIDTH = 400, HEIGHT = 300;
// set camera attributes 
var VIEW_ANGLE = 45, ASPECT = WIDTH/HEIGHT, NEAR = 0.1, FAR = 10000;

// get the DOM element to attach to
// - Yipee! we have jQuery

var $container = $('#container');

// creating a WebGL renderer, camera and a scene

var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(
    VIEW_ANGLE, ASPECT, NEAR, FAR);

var scene = new THREE.Scene();

scene.add(camera); //adding camera to the scene

//camera starts at 0,0,0 so pull it back 
camera.position.z = 300;

// start the renderer
renderer.setSize(WIDTH , HEIGHT);
//attach the render-supplied DOM element.
$container.append( renderer.domElement);

// set up sphere vars 
var radius = 50, segments = 16 ,rings = 16;

// create the new mesh with sphere Geometry 
var sphereMaterial = new THREE.MeshLambertMaterial( { color : 0xDDAACC});

var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(
        radius,
        segments,
        rings),
    sphereMaterial);

scene.add(sphere);

var pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

scene.add(pointLight);

renderer.render(scene ,camera);

sphere.geometry.dynamic = true;
sphere.geometry.__dirtyVertices = true;
sphere.geometry.__dirtyNormals = true;


