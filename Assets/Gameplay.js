// Attach this to player, the two triggers are the alien and the spaceships

//DECLARATION
//Feedback to participant
var congrat: GUITexture;
var imSorry: GUITexture;
var controlObject: GameObject; // to end it, when time is up TODO
var littleAlienYellow: GUITexture;
var littleAlienBlue: GUITexture;
var myStyle: GUIStyle;
var endTime: float;
public
var NOWTIME: float;


//Colliders
var alien: GameObject;
var yellowSpaceShip: GameObject;
var blueSpaceShip: GameObject;
var takeMe: AudioSource;
var thankYou: AudioSource;
var blueBag: GameObject;
var yellowBag: GameObject;
//var CUBE : GameObject; required for testing


//Gamescenario
var ind = 0;
var location_coord_x = new Array();
var location_coord_y = new Array();
var myColorList = new Array(2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1);
var helyvaltas;
var PositionInd = new Array(4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28);
var task_changed = 1;
public
var real_x;
public
var real_y;
var uncer: float;
var currentColor = 1;
var bonus: String = "";
var bonusp = 0;
var kovetkezo_cam = 0;
var cam_switch = 0;

function Awake() {
    /* Read the possible locations of aliens from an external file
    that is specific to all scenes, the file should be named "level".txt, 
    where level matches the ID of the given level*/
    locations = readLocations(Application.loadedLevel.ToString());

    Debug.Log(locations["coord_y"]); 


    // Find required gameobjects
    congrat = GameObject.Find("congrat").GetComponent(GUITexture);
    imSorry = GameObject.Find("imSorry").GetComponent(GUITexture);
    littleAlienYellow = GameObject.Find("littleAlienYellow").GetComponent(GUITexture);
    littleAlienBlue = GameObject.Find("littleAlienBlue").GetComponent(GUITexture);
    alien = GameObject.Find("Goober_STBH");
    yellowSpaceShip = GameObject.Find("yellowUFO_STBH");
    blueSpaceShip = GameObject.Find("blueUFO_STBH");
    blueBag = GameObject.Find("bluebag");
    yellowBag = GameObject.Find("yellowbag");

    print(GameObject.Find("Player_STBH").GetComponent(Control).Order.length);
    //GameObject.Find("Player").GetComponent(Control).cam = GameObject.Find("Player").GetComponent(Control).Order[kovetkezo_cam];
    if (Application.loadedLevel == 1) { uncer = 3.0;
        location_coord_x = new Array(-30, 30, 30, -30, -15, -30, 0, -30, -30, -15, -15, 15, 0, 30, -30, 30, 15, 30, -30, 0, -15, 15, 0, 15, 0, 15, 30, 30, -15);
        location_coord_y = new Array(30, 30, -30, -30, -30, 15, 30, -15, 0, 15, -15, 0, 15, 30, -30, -30, -15, 0, 30, -30, 30, 30, -15, -30, 0, 15, -15, 15, 0); }
    if (Application.loadedLevel == 2) { uncer = 0.5;
        location_coord_x = new Array(-5, 5, -7, 7, -3.8, -7.6, 0, -7.6, -7.6, -3.8, -3.8, 3.8, 0, 7.6, -7.6, 6, 3.8, 7.6, -7.6, 0, -6, 3.8, 0, 3.8, 0, 3.8, 7.6, 7.3, -3.8);
        location_coord_y = new Array(-5, 5, -7, 7, -7.6, 3.8, 7.6, -3.8, 0, 3.8, -3.8, 0, 3.8, 7.6, -7.6, 6, -3.8, 0, 7.6, -7.6, -6, 7.6, -3.8, -7.6, 0, 3.8, -3.8, 3.8, 0); }
    if (Application.loadedLevel == 3) { uncer = 2.5;
        location_coord_x = new Array(0, 40, -5, 45, 0, -13, 13, -13, -13, 0, 0, 26, 13, 39, -13, 39, 26, 39, -13, 15, 0, 26, 13, 26, 13, 26, 39, 39, 0);
        location_coord_y = new Array(20, -10, 22, -10, -18, 15, 26, -7, 4, 15, -7, 4, 15, 26, -18, -18, -7, 4, 26, -18, 26, 26, -7, -18, 4, 15, -7, 15, 4); }
    if (Application.loadedLevel == 4) { uncer = 2.0;
        location_coord_x = new Array(-26, 12, 5, 5, -15, -25, -5, -25, -25, -15, -15, 5, -5, 15, -25, 15, 5, 15, -25, -5, -15, 5, -5, 5, -5, 5, 15, 15, -15);
        location_coord_y = new Array(-26, -26, -26, -20, -30, 0, 10, -20, -10, 0, -20, -10, 0, 10, -30, -30, -20, -10, 10, -30, 10, 10, -20, -30, -10, 0, -20, 0, -10); }
    if (Application.loadedLevel == 5) { uncer = 2.5;
        location_coord_x = new Array(0, 40, -5, 45, 0, -13, 13, -13, -13, 0, 0, 26, 13, 39, -13, 39, 26, 39, -13, 15, 0, 26, 13, 26, 13, 26, 39, 39, 0);
        location_coord_y = new Array(20, -10, 22, -10, -18, 15, 26, -7, 4, 15, -7, 4, 15, 26, -18, -18, -7, 4, 26, -18, 26, 26, -7, -18, 4, 15, -7, 15, 4); }
    if (Application.loadedLevel == 6) { uncer = 3.0;
        location_coord_x = new Array(-30, 30, 30, -30, -15, -30, 0, -30, -30, -15, -15, 15, 0, 30, -30, 30, 15, 30, -30, 0, -15, 15, 0, 15, 0, 15, 30, 30, -15);
        location_coord_y = new Array(30, 30, -30, -30, -30, 15, 30, -15, 0, 15, -15, 0, 15, 30, -30, -30, -15, 0, 30, -30, 30, 30, -15, -30, 0, 15, -15, 15, 0); }
    if (Application.loadedLevel == 7) { uncer = 0.5;
        location_coord_x = new Array(-5, 5, -7, 7, -3.8, -7.6, 0, -7.6, -7.6, -3.8, -3.8, 3.8, 0, 7.6, -7.6, 6, 3.8, 7.6, -7.6, 0, -6, 3.8, 0, 3.8, 0, 3.8, 7.6, 7.3, -3.8);
        location_coord_y = new Array(-5, 5, -7, 7, -7.6, 3.8, 7.6, -3.8, 0, 3.8, -3.8, 0, 3.8, 7.6, -7.6, 6, -3.8, 0, 7.6, -7.6, -6, 7.6, -3.8, -7.6, 0, 3.8, -3.8, 3.8, 0); }
    if (Application.loadedLevel == 8) {
        uncer = 3.0;
        location_coord_x = new Array(-30, 30, 30, -30, -15, -30, 0, -30, -30, -15, -15, 15, 0, 30, -30, 30, 15, 30, -30, 0, -15, 15, 0, 15, 0, 15, 30, 30, -15);
        location_coord_y = new Array(30, 30, -30, -30, -30, 15, 30, -15, 0, 15, -15, 0, 15, 30, -30, -30, -15, 0, 30, -30, 30, 30, -15, -30, 0, 15, -15, 15, 0);
    }


    if (Application.loadedLevel == 8) {
        var MapLevelCamera = GameObject.Find("1Camera_w_map");
        x_pos = Screen.width * 0.4;
    } else {
        x_pos = Screen.width * .85f;
    }

    littleAlienYellow.pixelInset.x = littleAlienBlue.pixelInset.x = x_pos;
    littleAlienYellow.pixelInset.y = littleAlienBlue.pixelInset.y = Screen.height * .7f;
    littleAlienBlue.pixelInset.size = littleAlienYellow.pixelInset.size = new Vector2(Screen.width * .12f, Screen.width * .12f);
    littleAlienBlue.enabled = littleAlienYellow.enabled = false;

    

    real_x = alien.transform.position.x;
    real_y = alien.transform.position.z;
    var myArray = new Array();
    for (var i = 1; i < 29; i++) {
        myArray.Add(i);
    }
    print(myArray);

    myStyle.normal.textColor = Color.white;
    myStyle.fontSize = 30;

    
    //Shuffle the alienpositions
    shuffleArray(myColorList);


    endTime = Time.time + 60.00 * 60.00;
}

function Update() {
    // adjust the position of the alien to the camera



    //print(ind);

    //change camera in every set
    //if (Input.GetKeyDown("s")) {cam_switch = 1;}
    //change camera in every trial
    if (Input.GetKeyDown("9")) { cam_switch = 2; }

    NOWTIME = Time.time;
    //prihanged);

    if (ind == 2) { bonus = ""; }

    // Check if all alien is collected

    // Check if time is up
    if (endTime < NOWTIME) {
        endTime = NOWTIME + 100;
        controlObject.GetComponent(Control).vege_signal = 1;
        imSorry.enabled = true;
    }


    //testing
    if (Input.GetKeyDown("space")) {
        if (ind == 28) {
            //controlObject.GetComponent(Control).vege_signal = 1;
            //congrat.enabled = true;
            StopCoroutine("Shuffle");
            StartCoroutine("Shuffle");
            bonus = " BONUS!!!";
            kovetkezo_cam++;

            if (kovetkezo_cam == GameObject.Find("Player_STBH").GetComponent(Control).Order.length) { Application.LoadLevel("scenechanger"); } else { print(kovetkezo_cam);
                GameObject.Find("Player_STBH").GetComponent(Control).cam = GameObject.Find("Player_STBH").GetComponent(Control).Order[kovetkezo_cam]; }
            bonusp = ind + 10 + bonusp;
            ind = 0;
        }
        if (ind < 28) {
            //controlObject.GetComponent(Control).vege_signal = 1;
            ind++;
            congrat.enabled = false;
        }
        StartCoroutine("Helyvaltas");
    }

    GameObject.Find("Player_STBH").GetComponent(Control).taskid = task_changed;

};

function OnGUI() {
    var idoke = Mathf.CeilToInt(endTime - NOWTIME);
    var displaySeconds = idoke % 60;
    var displayMinutes = idoke / 60;
    var ido = String.Format("{0:00}:{1:00}", displayMinutes, displaySeconds);
    var points = ind + bonusp;
    GUI.Label(Rect(70, 10, 600, 40), " time left:" + ido + "  / " + points.ToString() + " points " + bonus, myStyle);
};
//COLLIDER
// if collider is alien, then hide it, and activate task
// if collider is spaceship, then activate helyvaltas

function OnTriggerEnter(col: Collider) {

    if (col.gameObject == alien) {
        alien.transform.Translate(0, -4, 0);
        takeMe.Play();
        yellowBag.renderer.enabled = false;
        blueBag.renderer.enabled = false;
        if (currentColor == 2) { //bonus = "                                    Yellow";
            littleAlienYellow.enabled = true;
            yellowSpaceShip.collider.enabled = true;
            taskChanged = task_changed + 1;
        } else if (currentColor == 1) { //bonus = "                                    Blue";
            littleAlienBlue.enabled = true;
            blueSpaceShip.collider.enabled = true;
            taskChanged = task_changed + 1;
        }


    }

    if (col.gameObject == blueSpaceShip) {
        bonus = " ";
        StartCoroutine("Helyvaltas");
        blueSpaceShip.collider.enabled = false;
        yellowSpaceShip.collider.enabled = false;
        if (cam_switch == 2) {
            if (kovetkezo_cam == 5) { kovetkezo_cam = 0; };
            GameObject.Find("Player_STBH").GetComponent(Control).cam = GameObject.Find("Player_STBH").GetComponent(Control).Order[kovetkezo_cam];
            kovetkezo_cam++;
        }
        if (ind == 28) {
            //controlObject.GetComponent(Control).vege_signal = 1;
            //congrat.enabled = true;
            StopCoroutine("Shuffle");
            StartCoroutine("Shuffle");
            bonus = " BONUS!!!";
            if (cam_switch == 1) {
                kovetkezo_cam++;
                if (kovetkezo_cam == GameObject.Find("Player_STBH").GetComponent(Control).Order.length) { Application.LoadLevel("scenechanger"); } else { print(kovetkezo_cam);
                    GameObject.Find("Player_STBH").GetComponent(Control).cam = GameObject.Find("Player_STBH").GetComponent(Control).Order[kovetkezo_cam]; }
            }
            bonusp = ind + 10 + bonusp;
            ind = 0;
        }
        if (ind < 28) {
            //controlObject.GetComponent(Control).vege_signal = 1;
            ind++;
        }
    }

    if (col.gameObject == yellowSpaceShip) {
        bonus = " ";
        StartCoroutine("Helyvaltas");
        blueSpaceShip.collider.enabled = false;
        yellowSpaceShip.collider.enabled = false;
        if (cam_switch == 2) {
            if (kovetkezo_cam == 5) {
                kovetkezo_cam = 0;
                //HERE I AM
                var temp_d = new Array();
                var Order_d = new Array(1, 2, 3, 4, 5);
                while (Order_d.Count != 0) {
                    var index = Random.Range(0, Order_d.Count);
                    var card = Order_d[index];
                    Order_d.RemoveAt(index);
                    temp_d.Add(card);
                }
                GameObject.Find("Player_STBH").GetComponent(Control).Order = temp_d;
                print(GameObject.Find("Player_STBH").GetComponent(Control).Order);
            };
            GameObject.Find("Player_STBH").GetComponent(Control).cam = GameObject.Find("Player_STBH").GetComponent(Control).Order[kovetkezo_cam];
            kovetkezo_cam++;
        }
        if (ind == 28) {
            //controlObject.GetComponent(Control).vege_signal = 1;
            //congrat.enabled = true;
            shuffleArray(myColorList);
            bonus = " BONUS!!!";


            if (cam_switch == 1) {
                kovetkezo_cam++;
                if (kovetkezo_cam == GameObject.Find("Player_STBH").GetComponent(Control).Order.length) { Application.LoadLevel("scenechanger"); } else { print(kovetkezo_cam);
                    GameObject.Find("Player_STBH").GetComponent(Control).cam = GameObject.Find("Player_STBH").GetComponent(Control).Order[kovetkezo_cam]; }
            }
            bonusp = ind + 10 + bonusp;
            ind = 0;
        }
        if (ind < 28) {
            //controlObject.GetComponent(Control).vege_signal = 1;
            ind++;
            congrat.enabled = false;
        }
    }
}



function Helyvaltas() {

    littleAlienBlue.enabled = false;
    littleAlienYellow.enabled = false;
    thankYou.Play();


    //alien reposition
    //print(ind);
    //print(myColorList[ind]);
    //print(PositionInd[ind]);


    //print(location_coord_x[PositionInd[ind]]);
    //print(location_coord_y[PositionInd[ind]]);
    var additional_x = Random.Range(-1.0 * uncer, uncer);
    var additional_y = Random.Range(-1.0 * uncer, uncer);
    //print(ind);
    currentColor = myColorList[ind];
    var xx: float = location_coord_x[PositionInd[ind]];
    var yy: float = location_coord_y[PositionInd[ind]];
    real_x = xx + additional_x;
    real_y = yy + additional_y;
    //print(real_x);
    //print(real_y);
    alien.transform.position = Vector3(real_x, 0, real_y);
    //Bag activate
    //print(myColorList[ind]);

    if (currentColor == 2) {
        yellowBag.renderer.enabled = true;
        blueBag.renderer.enabled = false;
        thanged = 3;
    } else if (currentColor == 1) {
        blueBag.renderer.enabled = true;
        yellowBag.renderer.enabled = false;
        thanged = 1;
    }



}


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
}



function readLocations(fileName){
    /*
    Reads a comma separated file to a 2d location array
    */

    var coord_x = new Array();
    var coord_y = new Array();
    var dataFile= Resources.Load(fileName + '_positions') as TextAsset;
    var dataLines = dataFile.text.Split("\n"[0]);
    for (var dataLine in dataLines) {
     var dataPair = dataLine.Split(","[0]);
     coord_x.Add(int.Parse(dataPair[0]));
     coord_y.Add(int.Parse(dataPair[1]));
    }

    var uncertainty = Resources.Load(fileName + '_uncertainty') as TextAsset;

    var locations = {
        "coord_x": coord_x,
        "coord_y": coord_y,
        "uncertainty" : int.Parse(uncertainty.text)
    };
  
  return locations;
}
