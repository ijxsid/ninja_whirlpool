// particle_1.js

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

// create the partice varibales
var particleCount  = 24, particles = new THREE.sphereGeometry(2, 10, 10), pMaterial = new THREE.MeshBasicMaterial( { color : 0xFFFFFF });

for (var p = 0; p < particleCount ; p++){
    var pX = Math.random() * 500 - 250,
     pY = Math.random() * 500 - 250,
     pZ = Math.random() * 500 - 250,
    particle =  new THREE.Vector3 (pX, pY, pZ);

    particles.vertices.push(particle);

}

var particleSystem = new THREE.ParticleSystem ( particles , pMaterial);
particleSystem.sortParticles =  true;
scene.add(particleSystem);



// Creating the pointLight
var pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

scene.add(pointLight);

// Rendering
renderer.render(scene ,camera);


