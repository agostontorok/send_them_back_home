// TODO: 
// scenechanger 
// see if touch input is changed in Unity 5
// http://answers.unity3d.com/questions/354401/save-audio-to-a-file.html

//DECLARATION

// Define variables needed for trajectory
var trajectoryData = new Array();

// Define variables needed for triggerfile
var pulseSound = new AudioSource();
var triggerSoundArray = new Array();
var VisualTrigger: GameObject;

// Physics variables for movement
var stepSound = new AudioSource();
var Hero: GameObject;

//Camera changer
var mapWatcherCamera: Camera;
public
var cameras = {};
public
var cameraName;


//FUNCTIONS
function Awake() {
	/*
	Prepare sounds	
	*/
	pulseSound = gameObject.AddComponent("AudioSource") as AudioSource;
	stepSound = gameObject.AddComponent("AudioSource") as AudioSource;
	pulseSound.clip = Resources.Load("pulse25msec");
	stepSound.clip = Resources.Load("step2");
	stepSound.loop = true;
    /*
	Assign cameras
	*/
	cameras[1] = GameObject.Find("1Camera").GetComponent(Camera);
    cameras[2] = GameObject.Find("3Camera").GetComponent(Camera);
    cameras[3] = GameObject.Find("UpCamera").GetComponent(Camera);
    cameras[4] = GameObject.Find("UPAllo_STBH_tobeassignedtoPlayer").GetComponent(Camera);
    cameras[5] = GameObject.Find("3rdAllo_STBH_tobeassignedtoPlayer").GetComponent(Camera);
    if (GameObject.Find("Map_watcher")) {
    	cameras[6] = GameObject.Find("1Camera_w_map").GetComponent(Camera);
    	mapWatcherCamera = GameObject.Find("Map_watcher").GetComponent(Camera);
    }
    cameras[5].fieldOfView = cameras[2].fieldOfView = 54;
    cameras[3].transform.position.y = cameras[4].transform.position.y = 19.5 + 1.702;
    changeCamera(1);

    Hero = GameObject.Find("avatar");
    // create visual trigger
    VisualTrigger = GameObject.CreatePrimitive(PrimitiveType.Cube);
    VisualTrigger.transform.position = Vector3(cameras[1].transform.position.x, cameras[1].transform.position.y, cameras[1].transform.position.z + 1);
    VisualTrigger.transform.localScale += new Vector3(10, 10, 0);

    
}

function FixedUpdate() {
	/*
	FixedUpdate is used to save positions in every 0.05 sec
	*/
    Invoke("Oneplace", 0.05); //Position saving
}



function Update() {
	/*
	This script is responsible for the windows version, where buttonpresses move the avatar
	currently up-left-right keys are available

	T = gives trigger
	1-2-3-4-5-6 activates camera with the given cameraId
	C = activates cloaking
	S = switch camera in every trial
	
	// Application.CaptureScreenshot(cam + "-" + l + ".jpg"); l++;} // use it for recording
	*/

	if (GameObject.Find("Map_watcher")) {
		// the map enabled follows its proprietary cameraview
		mapWatcherCamera.enabled = cameras[6].enabled;}

	// set up the controller properties
	var moveDirection = Vector3.zero;
	
    var controller: CharacterController = GetComponent(CharacterController);
    if (controller.isGrounded) {
        moveDirection = transform.TransformDirection(Vector3.forward);
    }

    /////////////////////////////////////////////////
    //KEYBOARD CONTROL
    ////////////////////////////////////////////////
    if (Input.GetKey("up")) {
    	var gravity = 20.0;
        moveDirection.y -= gravity * Time.deltaTime;
        var flags = controller.Move(moveDirection * 6 * Time.deltaTime);
        cameras[4].transform.position = cameras[3].transform.position;
        cameras[5].transform.position = Vector3(transform.position.x, transform.position.y + 5.3, transform.position.z - 5.3);
    }
    if (Input.GetKeyDown("up")) { stepSound.Play();
        Hero.GetComponent(Animator).SetFloat("Speed", 2); }
    if (Input.GetKeyUp("up")) { stepSound.Stop();
        Hero.GetComponent(Animator).SetFloat("Speed", 0); }
    if (Input.GetKey("left")) { 
    	transform.Rotate(0, -80 * Time.deltaTime, 0); } 
    if (Input.GetKey("right")) { 
    	transform.Rotate(0, 80 * Time.deltaTime, 0); }
    

    // for compatibility with the epileptic studies
    if (Input.GetKeyDown("t")) { triggerSound(); } 

    if (Input.GetKeyDown("c")) { var cloakScript : Cloak[] = FindObjectsOfType(Cloak); 
    	for (var l = 0; l < cloakScript.length; ++l){
	    		cloakScript[l].enable_hiding = false;	    		
	    	}
	    }
    
    // change camera and triggers sound for sync
    for (var i = 1; i <= cameras.Count; ++i) {
	    if (Input.GetKeyDown("" + i)) {
	    	triggerSound();
	    	changeCamera(i);
	   	    }
	}

	// finishes scene and saves data
    if (Input.GetKeyDown("escape")) { saveDataToFile(); }

}

function Oneplace() {
    var oneTrajectorySample = cameraName + "\t" + 
    						  transform.eulerAngles.y + "\t" +
    						  transform.position.x + "\t" + 
    						  transform.position.z + "\t" + 
    						  GameObject.Find("Player_STBH").GetComponent(Gameplay).taskId + "\t" +
    						  GameObject.Find("Player_STBH").GetComponent(Gameplay).xReal + "\t" + 
    						  GameObject.Find("Player_STBH").GetComponent(Gameplay).yReal + "\t" + 
    						  Time.time + "\n";

    trajectoryData.Add(oneTrajectorySample);
}

function triggerSound() {
	/*
	Used to give sync signals for the neural acquisition device
	*/
	Destroy(VisualTrigger); // Used for double trigger, sync also with video
	pulseSound.Play(); // sound Sync signal

	// Populate trigger signals to be later saved to a file
    triggerSoundArray.Add(Time.time);

    
}

function saveDataToFile() {
    /*
	Saves three files
	- Sound trigger times
	- Trajectories
	- Master data of the scene

	Nomenclature - every file starts with the time of escape button press
	- has txt extension
	- contains a reference for its contents
    */

    // General setup for files
    var currentTimeString = System.DateTime.Now.ToString("hh-mm-dd-MM-yyyy");

    // Writing trigger file
    var stream = System.IO.StreamWriter(currentTimeString + "triggers" + Application.loadedLevelName + ".txt");
    stream.WriteLine(triggerSoundArray);
    stream.Close();
    print(triggerSoundArray);

    // Writing trajectories file
    stream = System.IO.StreamWriter(currentTimeString + "scene_task" + Application.loadedLevelName + ".txt");
    trajectoryData[0] = "Camera" + "\t" + "Heading" + "\t" + "Pos_x" + "\t" + "Pos_y" + "\t" + "Task" + "\t" + "Alien_Pos_x" + "\t" + "Alien_Pos_y" + "\t" + "Time" + "\n";
    stream.WriteLine(trajectoryData);
    stream.Close();
    print(trajectoryData);

    // Writing master file
    /*
	Master file contains all the necessary info about the scene layout and the context of the playing
	Contains Walls, Obstacles, Lights and the location of spaceships

    */

    var masterFileText = "Date of recording: " + currentTimeString + "\n";
    masterFileText = masterFileText + "Scene: " + Application.loadedLevelName + "\n";
    masterFileText = masterFileText + "Duration of game: " + Time.time + "\n";
    masterFileText = masterFileText + "Triggers: " + triggerSoundArray + "\n";
    masterFileText = masterFileText + "Name" + "\t" + "Pos_x" + "\t" + "Pos_y" + "\t" + "Pos_z" + "\t" + "Size coordinates (x-y-z)" + "\n";
    masterFileText = masterFileText + "Spaceships:" + "\n";
    var gameObjectArray = GameObject.FindGameObjectsWithTag("Spaceship");
    for (var i = 0; i < gameObjectArray.Length; i++) {
        masterFileText = masterFileText + gameObjectArray[i].name + gameObjectArray[i].transform.position + gameObjectArray[i].transform.lossyScale + "\n";
    }
    masterFileText = masterFileText + "Walls:" + "\n";
    gameObjectArray = GameObject.FindGameObjectsWithTag("Wall");
    for (i = 0; i < gameObjectArray.Length; i++) {
        masterFileText = masterFileText + gameObjectArray[i].name + gameObjectArray[i].transform.position + gameObjectArray[i].transform.lossyScale + "\n";
    }
    masterFileText = masterFileText + "Obstacles:" + "\n";
    gameObjectArray = GameObject.FindGameObjectsWithTag("Obstacle");
    for (i = 0; i < gameObjectArray.Length; i++) {
        masterFileText = masterFileText + gameObjectArray[i].name + gameObjectArray[i].transform.position + gameObjectArray[i].transform.lossyScale + "\n";
    }
    masterFileText = masterFileText + "Lights and directions:" + "\n";
    masterFileText = masterFileText + "Name" + "\t" + "Direction coordinates (x-y-z)" + "\n";
    gameObjectArray = GameObject.FindGameObjectsWithTag("Light");
    for (i = 0; i < gameObjectArray.Length; i++) {
        masterFileText = masterFileText + gameObjectArray[i].name + gameObjectArray[i].transform.eulerAngles + "\n";
    }
    stream = System.IO.StreamWriter(Application.persistentDataPath + "/" + currentTimeString + "scene" + Application.loadedLevelName + "masterfile.txt");
    stream.WriteLine(masterFileText);
    stream.Close();
    print(masterFileText);

    // Takes back to home screen
    yield WaitForSeconds(1);
    Application.LoadLevel("scenechanger");
};


function shuffleArray(array) {
    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     * Based on: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
     */
    for (var i = array.length - 1; i > 0; i--) {
        var j = Mathf.Floor(Random.value * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

function changeCamera(cameraId) {
	for (var l = 1; l <= cameras.Count; ++l){
	    		cameras[l].enabled = false;	    		
	    	}
	    	cameras[cameraId].enabled = true;
	    	cameraName = cameras[cameraId].name;
	    	if (GameObject.Find("roof")) { GameObject.Find("roof").renderer.enabled = true; }
	    	GameObject.Find("avatar").transform.position.y = 0.5;

	    	// remove avatar from view for the 1st person views
	    	if (cameraId == 1 || cameraId == 6) {
	    		GameObject.Find("avatar").transform.position.y = -2;
	    	}
	    	// disable roof for bird's eye viewpoints
	    	if (cameraId == 3 || cameraId == 4) {
	    	    if (GameObject.Find("roof")) { 
	    	    	GameObject.Find("roof").renderer.enabled = false; 
	    	    }
	    	}

}