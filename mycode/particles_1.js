// particle_1.js

// set the screen size

var WIDTH = 400, HEIGHT = 300;
    // set camera attributes 
var VIEW_ANGLE = 45, ASPECT = WIDTH/HEIGHT, NEAR = 0.1, FAR = 10000;

    // get the DOM element to attach to
    // - Yipee! we have jQuery
var $container = $('#container');

                                                                                    
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
var texture = THREE.ImageUtils.loadTexture('ninja.png', {} , function(){renderer.render(scene, camera)});
texture.needsUpdate = true;
var particleCount  = 240, particles = new THREE.Geometry();
var pMaterial = new THREE.ParticleBasicMaterial( { color : 0xFFFFFF, size :32, map : texture , blending : THREE.AdditiveBlending, transparent :true});
for (var p = 0; p < particleCount ; p++){
    var pX = Math.random() * 500 - 250,
     pY = Math.random() * 500 - 250,
     pZ = Math.random() * 500 - 250,
    particle = new THREE.Vector3(pX, pY,pZ) ;
    particle.velocity = new THREE.Vector3(
        0,
        -Math.random(),
        0);


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

update();


function update(){
   
    particleSystem.rotation.y += 0.01;
    particleSystem.rotation.z += 0.05;
    particleSystem.rotation.x += 0.01;
    var pCount = particleCount;
    while(pCount--){
        var particle = particles.vertices[pCount];

        if (particle.y <-200){
            particle.y = 200;
            particle.velocity.y = 0;

        }
        particle.velocity.y -= Math.random()*0.1;
        particle.y += particle.velocity.y;

    }
    particleSystem.geometry.__dirtyVertices = true;

    renderer.render(scene, camera);
    requestAnimationFrame(update);

}

 