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
var bags;
var blueBag: GameObject;
var yellowBag: GameObject;


//Gamescenario
var locations; // object containing positions, uncertainty, color and order
var ind = 0;
var task_changed = 1;
public
var xReal;
public
var yReal;


var bonus: String = "";
var bonusp = 0;
var kovetkezo_cam = 0;
var cam_switch = 0;

function Awake() {
    /* Read the possible locations of aliens from an external file
    that is specific to all scenes, the file should be named "level".txt, 
    where level matches the ID of the given level

    positions are saved now with _position end, uncertainty for positioning
    is saved as a single value with _uncertainty end*/
    
    locations = readLocations(Application.loadedLevel.ToString());
    shuffleArray(locations["order"]);
    shuffleArray(locations["colors"]);

    // Set up GUI
    congrat = GameObject.Find("congrat").GetComponent(GUITexture);
    imSorry = GameObject.Find("imSorry").GetComponent(GUITexture);
    littleAlienYellow = GameObject.Find("littleAlienYellow").GetComponent(GUITexture);
    littleAlienBlue = GameObject.Find("littleAlienBlue").GetComponent(GUITexture);
    if (Application.loadedLevel == 8) {
        // if Map scene, the GUI has to be adapted
        var MapLevelCamera = GameObject.Find("1Camera_w_map");
        littleAlienYellow.pixelInset.x = littleAlienBlue.pixelInset.x = Screen.width * 0.4;
    } else {
        littleAlienYellow.pixelInset.x = littleAlienBlue.pixelInset.x = Screen.width * .85f;
    }

    littleAlienYellow.pixelInset.y = littleAlienBlue.pixelInset.y = Screen.height * .7f;
    littleAlienBlue.pixelInset.size = littleAlienYellow.pixelInset.size = new Vector2(Screen.width * .12f, Screen.width * .12f);
    littleAlienBlue.enabled = littleAlienYellow.enabled = false;

    // Assign GameObjects
    alien = GameObject.Find("Goober_STBH");
    yellowSpaceShip = GameObject.Find("yellowUFO_STBH");
    blueSpaceShip = GameObject.Find("blueUFO_STBH");
    bags[1] = GameObject.Find("bluebag");
    bags[2] = GameObject.Find("yellowbag");

    xReal = alien.transform.position.x;
    yReal = alien.transform.position.z;

    myStyle.normal.textColor = Color.white;
    myStyle.fontSize = 30;

    endTime = Time.time + 60.00 * 60.00;
}

function Update() {
    // adjust the position of the alien to the camera

    //print(locations['coordY']);

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

            if (kovetkezo_cam == GameObject.Find("Player_STBH").GetComponent(Control).Order.length) { Application.LoadLevel("scenechanger"); } else {
                print(kovetkezo_cam);
                GameObject.Find("Player_STBH").GetComponent(Control).cam = GameObject.Find("Player_STBH").GetComponent(Control).Order[kovetkezo_cam];
            }
            bonusp = ind + 10 + bonusp;
            ind = 0;
        }
        if (ind < 28) {
            //controlObject.GetComponent(Control).vege_signal = 1;
            ind++;
            congrat.enabled = false;
        }
        StartCoroutine("replaceAlien");
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
// if collider is spaceship, then activate replaceAlien

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
        StartCoroutine("replaceAlien");
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
                if (kovetkezo_cam == GameObject.Find("Player_STBH").GetComponent(Control).Order.length) { Application.LoadLevel("scenechanger"); } else {
                    print(kovetkezo_cam);
                    GameObject.Find("Player_STBH").GetComponent(Control).cam = GameObject.Find("Player_STBH").GetComponent(Control).Order[kovetkezo_cam];
                }
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
        StartCoroutine("replaceAlien");
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
                if (kovetkezo_cam == GameObject.Find("Player_STBH").GetComponent(Control).Order.length) { Application.LoadLevel("scenechanger"); } else {
                    print(kovetkezo_cam);
                    GameObject.Find("Player_STBH").GetComponent(Control).cam = GameObject.Find("Player_STBH").GetComponent(Control).Order[kovetkezo_cam];
                }
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



function replaceAlien() {
    /*
    Replacement happens once the alien has been delivered

    - First the Little alien figure is hided
    - Sound is played ("Thank you")
    - New position read assigned
    - Bag assigned
    */

    // Hide aliens
    littleAlienBlue.enabled = littleAlienYellow.enabled = false;

    // Sound played
    thankYou.Play();

    // Position assignment
    var xUncertainty = Random.Range(-1.0 * uncer, uncer);
    var yUncertainty = Random.Range(-1.0 * uncer, uncer);
    var xIdeal: float = location_coordX[PositionInd[ind]];
    var yIdeal: float = location_coordY[PositionInd[ind]];
    xReal = xIdeal + xUncertainty;
    yReal = yIdeal + yUncertainty;

    // Alien replaced
    alien.transform.position = Vector3(xReal, 0, yReal);

    // Assign correct bag color
    bags[1].renderer.enabled = bags[2].renderer.enabled = false;
    bags[locations["colors"][locations["currentIndex"]]].renderer.enabled = true;
    task_changed = 3;

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



function readLocations(fileName) {
    /*
    Reads a comma separated files to object

    Generates positions, their order, the positioning uncertainty and the colors too
    */

    var coordX = new Array();
    var coordY = new Array();
    var dataFile = Resources.Load(fileName + '_positions') as TextAsset;
    var dataLines = dataFile.text.Split("\n" [0]);
    for (var dataLine in dataLines) {
        var dataPair = dataLine.Split("," [0]);
        coordX.Add(int.Parse(dataPair[0]));
        coordY.Add(int.Parse(dataPair[1]));
    }

    var uncertainty = Resources.Load(fileName + '_uncertainty') as TextAsset;

    var myOrder = new Array();
    var colorList = new Array();
    for (var i = 1; i <= coordX.length; i++) {
        myOrder.Add(i);
        if (i <= coordY.length/2) {colorList.Add(1);}; else {colorList.Add(2);};
    }

    var currentIndex = 0;

    var locations = {
        "coordX": coordX,
        "coordY": coordY,
        "colors": colorList,
        "uncertainty": float.Parse(uncertainty.text),
        "order": myOrder,
        "currentIndex": currentIndex
    };

    return locations;
}
