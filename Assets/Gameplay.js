// Attach this to player, the two triggers are the alien and the spaceships

//DECLARATION
//Feedback to participant
var Congrat : GUITexture;
var Imsorry : GUITexture;
var ControlObject : GameObject; // to end it, when time is up TODO
var LilAlienYellow : GUITexture;
var LilAlienBlue : GUITexture;
var Style : GUIStyle;
var endtime : float;
public var mosttime : float;


//Colliders
var Alien : GameObject;
var YellowSpaceShip : GameObject;
var BlueSpaceShip : GameObject;
var Takeme : AudioSource;
var Thankyou : AudioSource;
var BlueBag : GameObject;
var YellowBag : GameObject;
//var CUBE : GameObject; required for testing


//Gamescenario
var ind =0;
var helyekx = new Array();
var helyeky = new Array();
var szincsoport = new Array (2,1,2,1,2,1,2,1,2,1,2,1,1,2,1,1,2,2,1,2,1,2,1,1,2,2,1,2,2,1);
var helyvaltas;
var PositionInd = new Array (4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28);
var task_changed = 1;
public var real_x;
public var real_y;
var uncer : float;
var szine = 1;
var bonus : String ="";
var bonusp =0;
var kovetkezo_cam = 0;
var cam_switch = 0;

function Awake()
{
	// Find required gameobjects
	Congrat = GameObject.Find("Congrat").GetComponent(GUITexture);
	Imsorry = GameObject.Find("Imsorry").GetComponent(GUITexture);
	LilAlienYellow = GameObject.Find("alienkeyellow").GetComponent(GUITexture);
	LilAlienBlue = GameObject.Find("alienkeblue").GetComponent(GUITexture);
	Alien = GameObject.Find("Goober_STBH");
	YellowSpaceShip = GameObject.Find("yellowUFO_STBH");
	BlueSpaceShip = GameObject.Find("blueUFO_STBH");
	BlueBag = GameObject.Find("bluebag");
	YellowBag = GameObject.Find("yellowbag");

	LilAlienYellow.pixelInset.x = Screen.width*.85f;
	LilAlienYellow.pixelInset.y = Screen.height*.7f;
	LilAlienBlue.pixelInset.x = Screen.width*.85f;
	LilAlienBlue.pixelInset.y = Screen.height*.7f;
	LilAlienBlue.enabled = false;
	LilAlienYellow.enabled = false;
	var width = Screen.width*.12f;
	var height = Screen.width*.12f;
	LilAlienBlue.pixelInset.size = new Vector2(width,height);
	LilAlienYellow.pixelInset.size = new Vector2(width,height);

	//CUBE : GameObject; GameObject.Find("GO").GetComponent(GUITexture);

	print(GameObject.Find("Player_STBH").GetComponent(Control).Order.length );
//GameObject.Find("Player").GetComponent(Control).cam = GameObject.Find("Player").GetComponent(Control).Order[kovetkezo_cam];
	if (Application.loadedLevel  == 1){uncer=3.0; helyekx = new Array ( -30, 30, 30, -30, -15, -30, 0, -30, -30, -15, -15, 15, 0, 30, -30, 30, 15, 30, -30, 0, -15, 15, 0, 15, 0, 15, 30, 30, -15); helyeky= new Array (30, 30, -30, -30, -30, 15, 30, -15, 0, 15, -15, 0, 15, 30, -30, -30, -15, 0, 30, -30, 30, 30, -15, -30, 0, 15, -15, 15, 0);}
	if (Application.loadedLevel  == 2){uncer=0.5; helyekx = new Array (-5, 5, -7, 7, -3.8, -7.6, 0, -7.6, -7.6, -3.8, -3.8, 3.8, 0, 7.6, -7.6, 6, 3.8, 7.6, -7.6, 0, -6, 3.8, 0, 3.8, 0, 3.8, 7.6, 7.3, -3.8 );  helyeky = new Array (-5, 5, -7, 7, -7.6, 3.8, 7.6, -3.8, 0, 3.8, -3.8, 0, 3.8, 7.6, -7.6, 6, -3.8, 0, 7.6, -7.6, -6, 7.6, -3.8, -7.6, 0, 3.8, -3.8, 3.8, 0 ); }
	if (Application.loadedLevel  == 3){uncer=2.5; helyekx = new Array (0, 40, -5, 45, 0, -13, 13, -13, -13, 0, 0, 26, 13, 39, -13, 39, 26, 39, -13, 15, 0, 26, 13, 26, 13, 26, 39, 39, 0 ); helyeky = new Array (20, -10, 22, -10, -18, 15, 26, -7, 4, 15, -7, 4, 15, 26, -18, -18, -7, 4, 26, -18, 26, 26, -7, -18, 4, 15, -7, 15, 4);}
	if (Application.loadedLevel  == 4){uncer=2.0; helyekx = new Array (-26, 12, 5, 5, -15, -25, -5, -25, -25, -15, -15, 5, -5, 15, -25, 15, 5, 15, -25, -5, -15, 5, -5, 5, -5, 5, 15, 15, -15 );helyeky = new Array ( -26, -26, -26, -20, -30, 0, 10, -20, -10, 0, -20, -10, 0, 10, -30, -30, -20, -10, 10, -30, 10, 10, -20, -30, -10, 0, -20, 0, -10);}
	if (Application.loadedLevel  == 5){uncer=2.5; helyekx = new Array (0, 40, -5, 45, 0, -13, 13, -13, -13, 0, 0, 26, 13, 39, -13, 39, 26, 39, -13, 15, 0, 26, 13, 26, 13, 26, 39, 39, 0 ); helyeky = new Array (20, -10, 22, -10, -18, 15, 26, -7, 4, 15, -7, 4, 15, 26, -18, -18, -7, 4, 26, -18, 26, 26, -7, -18, 4, 15, -7, 15, 4);}
	if (Application.loadedLevel  == 6){uncer=3.0; helyekx = new Array ( -30, 30, 30, -30, -15, -30, 0, -30, -30, -15, -15, 15, 0, 30, -30, 30, 15, 30, -30, 0, -15, 15, 0, 15, 0, 15, 30, 30, -15); helyeky= new Array (30, 30, -30, -30, -30, 15, 30, -15, 0, 15, -15, 0, 15, 30, -30, -30, -15, 0, 30, -30, 30, 30, -15, -30, 0, 15, -15, 15, 0);}
	if (Application.loadedLevel  == 7){uncer=0.5; helyekx = new Array (-5, 5, -7, 7, -3.8, -7.6, 0, -7.6, -7.6, -3.8, -3.8, 3.8, 0, 7.6, -7.6, 6, 3.8, 7.6, -7.6, 0, -6, 3.8, 0, 3.8, 0, 3.8, 7.6, 7.3, -3.8 );  helyeky = new Array (-5, 5, -7, 7, -7.6, 3.8, 7.6, -3.8, 0, 3.8, -3.8, 0, 3.8, 7.6, -7.6, 6, -3.8, 0, 7.6, -7.6, -6, 7.6, -3.8, -7.6, 0, 3.8, -3.8, 3.8, 0 ); }

	real_x = Alien.transform.position.x;
	real_y = Alien.transform.position.z;
	
	print(helyekx.length);
//	var whitebox = new Texture2D (1,1);
//	var color = new Color (255,255,255);
//	whitebox.SetPixel(1,1,color);
//	Style.normal.background =whitebox;
	Style.normal.textColor = Color.white;
	Style.fontSize = 30;
	
//print(PositionInd);
		/////TESTING CUBES FOR POSITIONS//////
		/*for (var i = 0; i < helyeky.length; i++)
		{Instantiate (CUBE, Vector3(helyekx[PositionInd[i]],2,helyeky[PositionInd[i]]), Quaternion.identity);
		}*/
	
//Shuffle the alienpositions
	StopCoroutine("Shuffle");
	StartCoroutine("Shuffle");
	
	//SAVE THE MASTER DATA
	 // if (Input.GetKeyDown(KeyCode.A)) {
	
		endtime = Time.time + 60.00*60.00;
		//print(endtime);
}

function Update()
{	
//print(ind);

//change camera in every set
//if (Input.GetKeyDown("s")) {cam_switch = 1;}
//change camera in every trial
if (Input.GetKeyDown("9")) {cam_switch = 2;}

mosttime = Time.time;
//print(task_changed);

if (ind == 2){ bonus= "";}

// Check if all alien is collected

// Check if time is up
if (endtime < mosttime)
{
endtime = mosttime+100;
ControlObject.GetComponent(Control).vege_signal = 1;
Imsorry.enabled = true;
}

	
	//testing
	if (Input.GetKeyDown("space"))
	{if (ind == 28)
	{
	//ControlObject.GetComponent(Control).vege_signal = 1;
	//Congrat.enabled = true;
	StopCoroutine("Shuffle");
	StartCoroutine("Shuffle");
	bonus = " BONUS!!!";
	kovetkezo_cam++;
	
	if ( kovetkezo_cam == GameObject.Find("Player_STBH").GetComponent(Control).Order.length ) {Application.LoadLevel ("scenechanger");}
	else { print(kovetkezo_cam);GameObject.Find("Player_STBH").GetComponent(Control).cam = GameObject.Find("Player_STBH").GetComponent(Control).Order[kovetkezo_cam]; }
	bonusp = ind +10 + bonusp;
	ind= 0;
	}
	if (ind < 28)
	{
	//ControlObject.GetComponent(Control).vege_signal = 1;
	ind ++;
	Congrat.enabled = false;
	}StartCoroutine("Helyvaltas");
	}
	
	GameObject.Find("Player_STBH").GetComponent(Control).taskid = task_changed;

};

function OnGUI()
{
var idoke = Mathf.CeilToInt(endtime - mosttime);
var displaySeconds = idoke % 60;
var displayMinutes = idoke / 60;
var ido = String.Format ("{0:00}:{1:00}", displayMinutes, displaySeconds); 
var points = ind + bonusp;
GUI.Label (Rect (70, 10, 600, 40), " time left:" + ido + "  / " + points.ToString() + " points " + bonus, Style);
};
//COLLIDER
// if collider is alien, then hide it, and activate task
// if collider is spaceship, then activate helyvaltas

function OnTriggerEnter(col:Collider){

if (col.gameObject == Alien)
	{
	Alien.transform.Translate(0,-4,0);
	Takeme.Play();
	YellowBag.renderer.enabled= false;
	BlueBag.renderer.enabled= false;
	if (szine == 2)
	{//bonus = "                                    Yellow";
	LilAlienYellow.enabled = true;
	YellowSpaceShip.collider.enabled= true;
	task_changed = task_changed +1;}
	else if (szine == 1)
	{//bonus = "                                    Blue";
	LilAlienBlue.enabled = true;
	BlueSpaceShip.collider.enabled= true;
	task_changed = task_changed +1;}
	
		
}

if (col.gameObject == BlueSpaceShip)
{	bonus = " ";
	StartCoroutine("Helyvaltas");
	BlueSpaceShip.collider.enabled= false;
	YellowSpaceShip.collider.enabled= false;
	if (cam_switch == 2){
	if (kovetkezo_cam == 5) {kovetkezo_cam = 0;};
	GameObject.Find("Player_STBH").GetComponent(Control).cam = GameObject.Find("Player_STBH").GetComponent(Control).Order[kovetkezo_cam];kovetkezo_cam++;
	}
	if (ind == 28)
	{
	//ControlObject.GetComponent(Control).vege_signal = 1;
	//Congrat.enabled = true;
	StopCoroutine("Shuffle");
	StartCoroutine("Shuffle");
	bonus = " BONUS!!!";
		if (cam_switch == 1){
		kovetkezo_cam++;
			if ( kovetkezo_cam == GameObject.Find("Player_STBH").GetComponent(Control).Order.length ) {Application.LoadLevel ("scenechanger");}
			else { print(kovetkezo_cam);GameObject.Find("Player_STBH").GetComponent(Control).cam = GameObject.Find("Player_STBH").GetComponent(Control).Order[kovetkezo_cam]; }
		}
	bonusp = ind +10 + bonusp;
	ind= 0;
	}
	if (ind < 28)
	{
	//ControlObject.GetComponent(Control).vege_signal = 1;
	ind ++;
	}
}

if (col.gameObject == YellowSpaceShip)
{	bonus = " ";
	StartCoroutine("Helyvaltas");
	BlueSpaceShip.collider.enabled= false;
	YellowSpaceShip.collider.enabled= false;
	if (cam_switch == 2){
	if (kovetkezo_cam == 5) {kovetkezo_cam = 0; 
	//HERE I AM
	var temp_d = new Array();
	var Order_d = new Array (1,2,3,4,5);
	while (Order_d.Count != 0) {
	    var index = Random.Range(0, Order_d.Count);
	    var card = Order_d[index];
		Order_d.RemoveAt(index);
		temp_d.Add(card);
		}
		GameObject.Find("Player_STBH").GetComponent(Control).Order = temp_d;
		print(GameObject.Find("Player_STBH").GetComponent(Control).Order);
	};
	GameObject.Find("Player_STBH").GetComponent(Control).cam = GameObject.Find("Player_STBH").GetComponent(Control).Order[kovetkezo_cam];kovetkezo_cam++;
	}
	if (ind == 28)
	{
	//ControlObject.GetComponent(Control).vege_signal = 1;
	//Congrat.enabled = true;
	StopCoroutine("Shuffle");
	StartCoroutine("Shuffle");
	bonus = " BONUS!!!";
	
	
		if (cam_switch == 1){
		kovetkezo_cam++;
			if ( kovetkezo_cam == GameObject.Find("Player_STBH").GetComponent(Control).Order.length ) {Application.LoadLevel ("scenechanger");}
			else { print(kovetkezo_cam);GameObject.Find("Player_STBH").GetComponent(Control).cam = GameObject.Find("Player_STBH").GetComponent(Control).Order[kovetkezo_cam]; }
		}
	bonusp = ind +10 + bonusp;
	ind= 0;
	}
	if (ind < 28)
	{
	//ControlObject.GetComponent(Control).vege_signal = 1;
	ind ++;
	Congrat.enabled = false;
	}
}
}



function Helyvaltas ()
{
	
	LilAlienBlue.enabled = false;
	LilAlienYellow.enabled = false;
	Thankyou.Play();
	
	
	//Alien reposition
	//print(ind);
	//print(szincsoport[ind]);
	//print(PositionInd[ind]);
	
	
	//print(helyekx[PositionInd[ind]]);
	//print(helyeky[PositionInd[ind]]);
	var additional_x = Random.Range(-1.0*uncer,uncer);
	var additional_y = Random.Range(-1.0*uncer,uncer);
	//print(ind);
	szine = szincsoport[ind];
	var xx :float = helyekx[PositionInd[ind]];var yy :float = helyeky[PositionInd[ind]];
	real_x = xx + additional_x;
	real_y = yy + additional_y;
	//print(real_x);
	//print(real_y);
	Alien.transform.position = Vector3(real_x,0,real_y);	
	//Bag activate
	//print(szincsoport[ind]);
	
	if (szine == 2)
		{YellowBag.renderer.enabled= true;
		BlueBag.renderer.enabled= false;
		task_changed = 3;}
		else if (szine == 1)
		{BlueBag.renderer.enabled= true;
		YellowBag.renderer.enabled= false;
		task_changed = 1;}
		
	
		
}

function Shuffle()
{var temp = new Array();
	while (PositionInd.Count != 0) {
	    var index = Random.Range(0, PositionInd.Count);
	    var card = PositionInd[index];
	    PositionInd.RemoveAt(index);
		temp.Add(card);
		}
		//print(szincsoport);
		//print(temp[0]);
		var temp2 = new Array();
	var i = 1; 
	while (i != temp[0]) {
		temp2.Add(szincsoport[0]);
		szincsoport.Shift();
		i++;
		}
		//print(temp2);
		szincsoport = szincsoport.Concat(temp2);
		//szincsoport.Add(1);
		szincsoport.Reverse();
		
		//print(szincsoport);
		
		PositionInd = new Array(0,1,2,3);
		PositionInd = PositionInd.Concat(temp);
		
		//print(PositionInd);
		}