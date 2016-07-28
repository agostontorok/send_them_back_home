//Important changes: 
//					no FPS in the trajectory file, columns are Direction PositionX PositionY Time
//					trigger timing should be measured again
//					waits three seconds if EXIT is pressed
//					TODO Gives trigger when camera changed 
//					playback button TODO

//DECLARATION
// Define GUItextures needed
var ArrowUp : GUITexture;
var ArrowLeft : GUITexture;
var ArrowRight : GUITexture;
var ButtonExit : GUITexture;
var TriggerPulse : GUITexture;

// Define variables needed for trajectory
public var dataall = new Array();
public var dataall2 = new Array();
var DataSorszam = 1;
public var vege_signal =0; //Gameplay activates this when time is up our all aliens were found
var taskid = 1;
var scene_name : String;
var camera_id : String;


// Define variables needed for triggerfile
var pulsesound : AudioSource;
var TriggerSzam =1;
var TriggerIdok = new Array();
var VisualTrigger : GameObject;
 

// Physics variables for movement
var stepsound : AudioSource;
var Hero : GameObject;
var gravity = 20.0;
private var myTransform : Transform;
private var moveDirection = Vector3.zero;

//Camera changer
var cam = 0;
var fps : Camera;
var tps : Camera;
var upcam : Camera;
var lockupcam : Camera;
var tpsallo : Camera;
var fps_w_map : Camera;
var map_looker : Camera;
public var current_camera : Camera;

var Order = new Array (1,2,3,4,5);
var SetTime : float;
var Ord_ind = 0;
//for the screenshoots
//var l = 0;

//FUNCTIONS
function Awake () {
	// Find required gameobjects
	ArrowUp = GameObject.Find("GO").GetComponent(GUITexture);
	ArrowLeft = GameObject.Find("LEFT").GetComponent(GUITexture);
	ArrowRight = GameObject.Find("RIGHT").GetComponent(GUITexture);
	ButtonExit  = GameObject.Find("Exit").GetComponent(GUITexture);
	TriggerPulse  = GameObject.Find("trigger").GetComponent(GUITexture);
	lockupcam = GameObject.Find("UPAllo_STBH_tobeassignedtoPlayer").GetComponent(Camera);
	tpsallo  = GameObject.Find("3rdAllo_STBH_tobeassignedtoPlayer").GetComponent(Camera);
	
	ArrowLeft.enabled = false;
	ArrowRight.enabled = false;
	ArrowUp.enabled = false;
	ButtonExit.enabled = false;
	TriggerPulse.enabled = false;

	if (Application.loadedLevel  == 1){scene_name = "-OS";}
	if (Application.loadedLevel  == 2){scene_name = "-BY";}
	if (Application.loadedLevel  == 3){scene_name = "-LV";}
	if (Application.loadedLevel  == 4){scene_name = "-LX";}
	
	//upcam.enabled = false;
	myTransform = transform;
	tpsallo.fieldOfView = 54;
	tps.fieldOfView = 54;
	lockupcam.transform.position.y = 19.5+1.702;
	upcam.transform.position.y = 19.5+1.702;
	
	// shuffle camera 
	var temp = new Array();
	while (Order.Count != 0) {
	    var index = Random.Range(0, Order.Count);
	    var card = Order[index];
		Order.RemoveAt(index);
		temp.Add(card);
		}
		Order = temp;
	 
	// create visual trigger
	VisualTrigger  = GameObject.CreatePrimitive(PrimitiveType.Cube);
	VisualTrigger.transform.position = Vector3(fps.transform.position.x,fps.transform.position.y,fps.transform.position.z+1);
	VisualTrigger.transform.localScale += new Vector3(10, 10, 0);

	
	}
	
function FixedUpdate()
{
Invoke("Oneplace", 0.05); //Position saving
}	

function Update()
{


if (Ord_ind > Order.Count) {StopCoroutine("AdatMentes");
	StartCoroutine("AdatMentes"); }
	
	


//lockupcam.transform.rotation.x =0;
//lockupcam.transform.rotation.z =0;
//print(taskid);
//camerachange
if (cam == 1) {fps.enabled = true;
		tps.enabled = false;tpsallo.enabled = false;
		upcam.enabled = false;
		lockupcam.enabled = false;
		fps_w_map.enabled = false;
		map_looker.enabled = false;
		camera_id = "fps";
		GameObject.Find("avatar").transform.position.y=-2;
		if (GameObject.Find("roof")){GameObject.Find("roof").renderer.enabled = true; }}
if (cam == 2) {tps.enabled = true;
		fps.enabled = false;tpsallo.enabled = false;
		upcam.enabled = false;
		lockupcam.enabled = false;
		fps_w_map.enabled = false;
		map_looker.enabled = false;
		camera_id = "tps";
		GameObject.Find("avatar").transform.position.y=0.5;
		if (GameObject.Find("roof")){GameObject.Find("roof").renderer.enabled = true; }}
if (cam == 3) { upcam.enabled = true;
		fps.enabled = false;tpsallo.enabled = false;
		tps.enabled = false;
		lockupcam.enabled = false;
		fps_w_map.enabled = false;
		map_looker.enabled = false;
		camera_id = "upcam";
		GameObject.Find("avatar").transform.position.y=0.5;
		if (GameObject.Find("roof")){GameObject.Find("roof").renderer.enabled = false; }}
if (cam == 4) {lockupcam.enabled = true;
		tpsallo.enabled = false;
		upcam.enabled = false;
		fps.enabled = false;
		tps.enabled = false;
		fps_w_map.enabled = false;
		map_looker.enabled = false;
		camera_id = "lockupcam";
		GameObject.Find("avatar").transform.position.y=0.5;
		if (GameObject.Find("roof")){GameObject.Find("roof").renderer.enabled = false; }}
if (cam == 5) {cam = 0; tpsallo.enabled = true;
		lockupcam.enabled = false;
		upcam.enabled = false;
		fps.enabled = false;
		tps.enabled = false;
		fps_w_map.enabled = false;
		map_looker.enabled = false;
		camera_id = "tpsallo";
		GameObject.Find("avatar").transform.position.y=0.5;
		if (GameObject.Find("roof")){GameObject.Find("roof").renderer.enabled = true; }}
if (cam == 6) {
		tpsallo.enabled = false;
		lockupcam.enabled = false;
		upcam.enabled = false;
		fps.enabled = false;
		tps.enabled = false;
		fps_w_map.enabled = true;
		map_looker.enabled = true;
		camera_id = "maplooker";
		GameObject.Find("avatar").transform.position.y=-2;
		if (GameObject.Find("roof")){GameObject.Find("roof").renderer.enabled = true; }}	




if (vege_signal == 1)
{
	StopCoroutine("AdatMentes");
	StartCoroutine("AdatMentes");
}
	
	
var controller : CharacterController = GetComponent(CharacterController);
if (controller.isGrounded) 
{
	var moveDirection = myTransform.TransformDirection(Vector3.forward);
}

//KEYBOARD CONTROL
	//if (Input.GetKey("q")){
		if (Input.GetKey("up")){moveDirection.y -= gravity * Time.deltaTime; var flags = controller.Move(moveDirection * 6 * Time.deltaTime);
		lockupcam.transform.position= upcam.transform.position; tpsallo.transform.position= Vector3(transform.position.x,transform.position.y+3.5,transform.position.z-3.5); }
		if(Input.GetKeyDown("up")){stepsound.Play();Hero.GetComponent(Animator).SetFloat("Speed", 2);}
		if(Input.GetKeyUp("up")){stepsound.Stop();Hero.GetComponent(Animator).SetFloat("Speed", 0);}
		if (Input.GetKey("left")){transform.Rotate (0,-80*Time.deltaTime, 0);}// Application.CaptureScreenshot(cam + "-" + l + ".jpg"); l++;}
		if (Input.GetKey("right")) {transform.Rotate (0,80*Time.deltaTime, 0);}
		if (Input.GetKeyDown("t")) {StopCoroutine("Triggertad");StartCoroutine("Triggertad"); if (Ord_ind == 5) {Ord_ind = 0;};cam=Order[Ord_ind];Ord_ind++;} //cam ++;
		if (Input.GetKeyDown("1")) {StopCoroutine("Triggertad");StartCoroutine("Triggertad");cam=1;}
		if (Input.GetKeyDown("2")) {StopCoroutine("Triggertad");StartCoroutine("Triggertad");cam=2;}
		if (Input.GetKeyDown("3")) {StopCoroutine("Triggertad");StartCoroutine("Triggertad");cam=3;}
		if (Input.GetKeyDown("4")) {StopCoroutine("Triggertad");StartCoroutine("Triggertad");cam=4;}
		if (Input.GetKeyDown("5")) {StopCoroutine("Triggertad");StartCoroutine("Triggertad");cam=5;}
		if (Input.GetKeyDown("6")) {StopCoroutine("Triggertad");StartCoroutine("Triggertad");cam=6;}
		
		if (Input.GetKeyDown("escape")) {vege_signal =1;}
		//}

	 
	
	

}

function Oneplace () {
	var data1= myTransform.eulerAngles.y + "\t" + myTransform.position.x + "\t" + myTransform.position.z +  "\t" + Time.time + "\n";  
	dataall [DataSorszam] = data1;
	var data2 = camera_id+ "\t"+ myTransform.eulerAngles.y + "\t" + myTransform.position.x + "\t" + myTransform.position.z +  "\t" + taskid + "\t"+GameObject.Find("Player_STBH").GetComponent(Gameplay).real_x+ "\t"+ GameObject.Find("Player_STBH").GetComponent(Gameplay).real_y +"\t" + Time.time + "\n";
	dataall2 [DataSorszam] = data2;
	//print(data2);
	DataSorszam = DataSorszam + 1;
}

function Triggertad() {TriggerIdok[TriggerSzam] = Time.time;
	TriggerSzam = TriggerSzam +1;
	//print (TriggerIdok);
	//VisualTrigger.renderer.enabled = false;
	Destroy(VisualTrigger);
	pulsesound.Play();
	}

function AdatMentes(){
//print ("vege");
vege_signal=0;
	print("END");
	//print(dataall2);
	var ido = System.DateTime.Now.ToString("hh-mm-dd-MM-yyyy");
	var stream = System.IO.StreamWriter(ido + "scene" + scene_name + ".txt");
	stream.WriteLine(dataall);
	stream.Close();					
	stream = System.IO.StreamWriter(ido + "triggers" + scene_name + ".txt");
	stream.WriteLine(TriggerIdok);
	stream.Close();
	print(TriggerIdok);
	stream = System.IO.StreamWriter(ido + "scene_task" + scene_name + ".txt");
	dataall2[0] = "Heading" + "\t" + "Pos_x" + "\t" + "Pos_y" +  "\t" + "Task" + "\t"+ "Alien_Pos_x" + "\t"+ "Alien_Pos_y" +"\t" + "Time" + "\n";
	stream.WriteLine(dataall2);
	stream.Close();
	print(dataall2);

	var data3 = GameObject.Find("Player_STBH").GetComponent(Gameplay).szincsoport + '\n' + GameObject.Find("Player_STBH").GetComponent(Gameplay).PositionInd;
	//print (data3);
	stream = System.IO.StreamWriter(ido + "positions" + scene_name + ".txt");
	stream.WriteLine(data3);
	stream.Close();
	
	//Master file
	var masterfile_text = new Array();
	var text = "Date of recording: " + ido + "\n";
	text = text + "Scene: " + scene_name + "\n";
	text = text + "Duration of game: " + GameObject.Find("Player_STBH").GetComponent(Gameplay).mosttime + "\n";
	text = text + "Triggers: " + TriggerIdok + "\n";
	text = text + "Name" + "\t" + "Pos_x" + "\t" + "Pos_y" +  "\t" + "Pos_z" + "\t"+ "Size coordinates (x-y-z)"  + "\n";
	text = text + "Spaceships:" + "\n";
	var gos = GameObject.FindGameObjectsWithTag("Spaceship");
     for (var i = 0; i < gos.Length; i++)
         {text = text + gos[i].name + gos[i].transform.position + gos[i].transform.lossyScale + "\n";
			}
	text = text + "Walls:" + "\n";
	gos = GameObject.FindGameObjectsWithTag("Wall");
     for ( i = 0; i < gos.Length; i++)
         {text = text + gos[i].name + gos[i].transform.position + gos[i].transform.lossyScale + "\n";
			}
	text = text + "Obstacles:" + "\n";
	gos = GameObject.FindGameObjectsWithTag("Obstacle");
     for ( i = 0; i < gos.Length; i++)
         {text = text + gos[i].name + gos[i].transform.position + gos[i].transform.lossyScale + "\n";
			}
	text = text + "Lights and directions:" + "\n"; 
	text = text + "Name" + "\t"+ "Direction coordinates (x-y-z)" + "\n";
	gos = GameObject.FindGameObjectsWithTag("Light");
     for ( i = 0; i < gos.Length; i++)
         {text = text + gos[i].name + gos[i].transform.eulerAngles + "\n";
			}
	stream = System.IO.StreamWriter(Application.persistentDataPath + "/" + ido + "scene" + scene_name + "masterfile.txt");
	stream.WriteLine(text);
	stream.Close();
	print (text);
	yield WaitForSeconds(1);
	Application.LoadLevel ("scenechanger"); 
}












