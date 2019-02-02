var container, stats;
var camera, scene, renderer;
var group;
var loader = new THREE.FontLoader();
var cube;
var quaderMiddle, quaderOutside, quader3;

loader.load( 'fonts/optimer_regular.typeface.json', function ( font ) {
  init( font );
  animate();
});

function init( font ) {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 0, 150, 500 );
  scene = new THREE.Scene();
  scene.background = new THREE.Color( "#333" );

  var geometry = new THREE.TextBufferGeometry( "Loading...", {
    font: font,
    size: 80,
    height: 20,
    curveSegments: 0
  });
  geometry.computeBoundingBox();
  var centerOffset = -0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
  var materials = [
    new THREE.MeshBasicMaterial( { color: "#ffcc00", overdraw: 0.5 } ),
    new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: 0.5 } )
  ];

  var mesh = new THREE.Mesh( geometry, materials );
  mesh.position.set(centerOffset, 250, 0);

  //Cube
  cube = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), new THREE.MeshBasicMaterial({color: "#ffcc00",wireframe: true}));
  cube.position.set(0,100,0);

  //Lines
  quaderMiddle = drawLine(600);
  quaderOutside = drawLine(580);
  quader3 = drawLine(560);

  group = new THREE.Group();
  group.add( mesh );
  group.add(cube);
  group.add(quaderMiddle);
  group.add(quaderOutside);
  group.add(quader3);
  scene.add( group );

  renderer = new THREE.CanvasRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  cube.rotation.x += 0.05;
  cube.rotation.y += 0.05;
  renderer.render( scene, camera );
}

function drawLine(value){
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( -value, 150, 0) );
    geometry.vertices.push(new THREE.Vector3( 0, value+150, 0) );
    geometry.vertices.push(new THREE.Vector3( value, 150, 0) );
    geometry.vertices.push(new THREE.Vector3( 0, -value+150, 0) );
    geometry.vertices.push(new THREE.Vector3( -value, 150, 0) );
    return new THREE.Line( geometry, new THREE.LineBasicMaterial({color: "#ffcc00"}));
  }

function showModel(){
  window.location.href = "3dModel.html";
}
