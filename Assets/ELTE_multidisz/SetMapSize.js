#pragma strict

/*
In development phase: requires an environment, a marker and the player
TODO dynamically look for the environment tag, and generate the map on the fly
TODO2 get real map from resources using the name of the scene
*/

var environment: GameObject;
var Marker: GameObject;
var Player: GameObject;
private
var conversion_ratio: int;
private
var map_location: float;

function Awake() {
	Player = GameObject.Find("Player_STBH");
	Marker = GameObject.CreatePrimitive(PrimitiveType.Sphere);

    map_location = 10000.0;
    //create map
    var map = Instantiate(environment, new Vector3(map_location, map_location, map_location), Quaternion.identity);
    Marker.transform.position = new Vector3(map_location, map_location + 1, map_location);
    transform.position = new Vector3(map_location, map_location + 100, map_location);

    // scale map to camera size
    var height = camera.orthographicSize * 2;
    var width = height * Screen.width / Screen.height;
    var magnification_ratio = (height / 10.0) / map.transform.localScale.z;
    map.transform.localScale.z *= magnification_ratio;
    map.transform.localScale.x *= magnification_ratio;

    // get conversion ratio between environment and map
    conversion_ratio = environment.transform.localScale.z / map.transform.localScale.z;
    // resize the marker to propriate size
    Marker.renderer.material.color = Color.red;
    Marker.transform.localScale.z *= magnification_ratio*40;
    Marker.transform.localScale.x *= magnification_ratio*40;
}

function Update() {
	Marker.transform.localScale.z += Mathf.Sin(Time.time)/1000;
	Marker.transform.localScale.x += Mathf.Sin(Time.time)/1000;

    Marker.transform.position.x = Player.transform.position.x / conversion_ratio + map_location;
    Marker.transform.position.z = Player.transform.position.z / conversion_ratio + map_location;
}
