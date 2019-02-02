var scene, camera, renderer;
//3D Objects
var meshLars, meshPatrik, meshFloor, meshBackWall, meshFrontWall, meshLeftWall, meshRightWall, meshRoofWall;
//Lightsource
var ambientLight, light;
var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, 1280/720, 0.01, 1000);
	camera.position.set(0, player.height, -5);
	camera.lookAt(new THREE.Vector3(0,player.height,0));


	meshFloor = new createPanel();
	meshFloor.rotation.x -= Math.PI / 2;
	scene.add(meshFloor);

	meshBackWall = createPanel();
	setDefaultProperties(meshBackWall,5, 10, 3.1);
	scene.add(meshBackWall);

	meshFrontWall = createPanel();
	setDefaultProperties(meshFrontWall,5, -10, 6.3);
	scene.add(meshFrontWall);

	meshLeftWall = createPanel();
	setDefaultProperties(meshLeftWall,5, 0, 4.7);
	meshLeftWall.position.x = 9;
	scene.add(meshLeftWall);

	meshRightWall = createPanel();
	setDefaultProperties(meshRightWall,5,0, 1.575);
	meshRightWall.position.x = -10;
	scene.add(meshRightWall);

	meshRoofWall = createPanel();
	setDefaultProperties(meshRoofWall,14, 0, 6.3);
	meshRoofWall.rotation.x = 1.6;
	scene.add(meshRoofWall);

	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);

	light = new THREE.PointLight(0xffffff, 0.8, 18);
	light.position.set(0,6,0);
	light.castShadow = true;
	scene.add(light);

	//Model Lars
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load("obj/Lars/Lars.mtl", function(materials){

		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);

		objLoader.load("obj/Lars/Lars.obj", function(mesh){
      this.meshLars = mesh;
			meshLars.traverse(function(node){
				if( node instanceof THREE.Mesh ){
					node.castShadow = true;
					node.receiveShadow = true;
				}
			});
			set3dObjectProperties(meshLars, -1, 8, 1);
			scene.add(meshLars);
		});
	});

	//Model Patrik
	var mtlLoader2 = new THREE.MTLLoader();
	mtlLoader2.load("obj/Patrik/Patrik.mtl", function(materials){

		materials.preload();
		var objLoader2= new THREE.OBJLoader();
		objLoader2.setMaterials(materials);

		objLoader2.load("obj/Patrik/Patrik.obj", function(mesh){
			this.meshPatrik = mesh;
			meshPatrik.traverse(function(node){
				if( node instanceof THREE.Mesh ){
					node.castShadow = true;
					node.receiveShadow = true;
				}
			});
			set3dObjectProperties(meshPatrik, 5, 7, 1);
			scene.add(meshPatrik);
		});
	});

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(1280, 720);
	document.body.appendChild(renderer.domElement);
	animate();
}

function createPanel(){
	return new THREE.Mesh(
		new THREE.PlaneGeometry(20,20, 10,10),
		new THREE.MeshPhongMaterial({color:0xffffff, wireframe:false})
	);
}

function setDefaultProperties(object, yPos, zPos, yRot){
	object.position.y = yPos;
	object.position.z = zPos;
	object.rotation.y = yRot;
	object.receiveShadow = true;
}

function set3dObjectProperties(object, xPos, yPos, zPos){
	object.position.set(xPos, yPos, zPos);
	object.scale.set(15,15,15);
	object.rotation.set(3.15,2.7,0);
}

function showIndex(){
	window.location.href = "Index.html";
}

function animate(){
	requestAnimationFrame(animate);

	if(keyboard[87]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65]){ // A key
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68]){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}

	if(keyboard[37]){ // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += player.turnSpeed;
	}
	renderer.render(scene, camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;
