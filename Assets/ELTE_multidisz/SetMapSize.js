#pragma strict

var environment : GameObject;
var Marker : GameObject;
var Player : GameObject;
private var conversion_ratio : int;
private var map_location : float;

function Start () {
map_location = 10000.0f;
//create map
var map = Instantiate(environment, new Vector3(map_location, map_location, map_location), Quaternion.identity);
Marker.transform.position = new Vector3(map_location, map_location + 1, map_location);
transform.position = new Vector3(map_location, map_location + 100, map_location);

// scale map to camera size
var height = camera.orthographicSize * 2;
var width = height * Screen.width/ Screen.height;
var magnification_ratio = (height / 10f) /map.transform.localScale.z ;
map.transform.localScale.z *= magnification_ratio;
map.transform.localScale.x *= magnification_ratio;

// get conversion ratio between environment and map
conversion_ratio = environment.transform.localScale.z / map.transform.localScale.z;
// resize the marker to propriate size
Marker.renderer.material.color = Color.black;
}

function Update () {
Marker.transform.position.x = Player.transform.position.x/conversion_ratio+map_location;
Marker.transform.position.z = Player.transform.position.z/conversion_ratio+map_location;
}