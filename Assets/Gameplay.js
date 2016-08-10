// Attach this to player, the two triggers are the alien and the spaceships

//DECLARATION
//Colliders
var alien: GameObject;
var takeMe: AudioSource;
var thankYou: AudioSource;
var bags = {};
var spaceShips = {};
var alienFigures = {};

//Gamescenario
var locations = {}; // object containing positions, uncertainty, color and order
var score = -1;
var currentIndex = -1;
public
var taskId = 1;
public
var xReal;
public
var yReal;
var changeCameraInEveryTrial = false;
var cameraArray = new Array();

function Awake() {
    /* Read the possible locations of aliens from an external file
    that is specific to all scenes, the file should be named "level".txt, 
    where level matches the ID of the given level

    positions are saved now with _position end, uncertainty for positioning
    is saved as a single value with _uncertainty end*/
    
    locations = readLocations(Application.loadedLevel.ToString());
    shuffleArray(locations["order"]);
    shuffleArray(locations["colors"]);

    // Set up GUI Components
    alienFigures[1] = GameObject.Find("littleAlienYellow").GetComponent(GUITexture);
    alienFigures[2] = GameObject.Find("littleAlienBlue").GetComponent(GUITexture);

    alienFigures[1].pixelInset.y = alienFigures[2].pixelInset.y = Screen.height * .7f;
    alienFigures[1].pixelInset.size = alienFigures[2].pixelInset.size = new Vector2(Screen.width * .12f, Screen.width * .12f);
    alienFigures[1].enabled = alienFigures[2].enabled = false;

    // Assign GameObjects
    alien = GameObject.Find("Goober_STBH");
    spaceShips[1] = GameObject.Find("yellowUFO_STBH");
    spaceShips[2] = GameObject.Find("blueUFO_STBH");
    bags[1] = GameObject.Find("yellowbag");
    bags[2] = GameObject.Find("bluebag");

    replaceAlien();
};


function OnGUI() {
    /*
    Display timer and points
    */
    var secondsLeft = Mathf.CeilToInt(Time.time);
    var displaySeconds = secondsLeft % 60;
    var displayMinutes = secondsLeft / 60;
    var formattedTime = String.Format("{0:00}:{1:00}", displayMinutes, displaySeconds);

    var myStyle = new GUIStyle();
    myStyle.normal.textColor = Color.white;
    myStyle.fontSize = 30;
    GUI.Label(Rect(70, 10, 600, 40), "Time: " + formattedTime + "  / "  + " Score: " + score.ToString(), myStyle);
};


function Update() {
    /*
    Here only the test features are placed
    */

    // replace alien by pressing space >> only for testing
    if (Input.GetKeyDown("space")) { replaceAlien(); };

    // change camera in every trial
    if (Input.GetKeyDown("s")) { changeCameraInEveryTrial = true; }

    // change position if the mapcamera is enabled
    var mapWatcherCamera = GameObject.Find("Map_watcher").GetComponent(Camera);
    if (mapWatcherCamera.enabled) {
        // if Map scene, the GUI has to be adapted
        alienFigures[1].pixelInset.x = alienFigures[2].pixelInset.x = Screen.width * 0.4;
    } else {
        alienFigures[1].pixelInset.x = alienFigures[2].pixelInset.x = Screen.width * .85f;
    }
    
};



function OnTriggerEnter(col: Collider) {
    /*
    Handling of collision events

    - colision w/ alien displace alien and activate GUI
    - collision w/ spaceship changes camera and steps with the camera counter
    */

    if (col.gameObject == alien) {
        if (taskId % 2 == 1) {
            takeMe.Play(); // play signal
            alien.transform.Translate(0, -4, 0); // remove alien from sight
            alienFigures[locations["colors"][currentIndex]].enabled = true; // ena
            taskId ++; // taskId either 2 or 4 in the memory phase
        }
    }

    if (col.gameObject == spaceShips[locations["colors"][currentIndex]]) {
        if (taskId % 2 == 0) {
            // Sound played
            thankYou.Play();

            replaceAlien();

            if (changeCameraInEveryTrial) { 
                if (cameraArray.length == 0) {
                    // refill camera array if empty
                    availableCameras = GameObject.Find("Player_STBH").GetComponent(Control).cameras.Count;
                    for (var camNum = 1; camNum < availableCameras; camNum++) { // never assign the map camera, also this means that the map camera has to be the last
                        cameraArray.Add(camNum);
                    }
                    shuffleArray(cameraArray);
                }
                currentCamera = cameraArray.Pop();
                GameObject.Find("Player_STBH").GetComponent(Control).changeCamera(currentCamera);
            }
        }
    }
        
};

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


    var locations = {
        "coordX": coordX,
        "coordY": coordY,
        "colors": colorList,
        "uncertainty": float.Parse(uncertainty.text),
        "order": myOrder
    };

    return locations;
};



function replaceAlien() {
    /*
    Replacement happens once the alien has been delivered

    - First the Little alien figure is hided
    - Sound is played ("Thank you")
    - New position read assigned
    - Bag assigned
    */

    // step in the index

        currentIndex++;
        if (currentIndex == locations["coordX"].length) { 
            shuffleArray(locations["order"]);
            shuffleArray(locations["colors"]);
            currentIndex = 0;
        }

        score++; // add one point

        // Hide aliens
        alienFigures[1].enabled = alienFigures[2].enabled = false;

        // Position assignment
        var xUncertainty = Random.Range(-1.0 * locations["uncertainty"], 
            locations["uncertainty"]);
        var yUncertainty = Random.Range(-1.0 * locations["uncertainty"], 
            locations["uncertainty"]);
        var xIdeal: float = locations["coordX"][currentIndex];
        var yIdeal: float = locations["coordY"][currentIndex];
        xReal = xIdeal + xUncertainty;
        yReal = yIdeal + yUncertainty;

        // Alien replaced
        alien.transform.position = Vector3(xReal, 0, yReal);

        // Assign correct bag color
        bags[1].renderer.enabled = bags[2].renderer.enabled = false;
        bags[locations["colors"][currentIndex]].renderer.enabled = true;

        // taskid
        taskId = (locations["colors"][currentIndex]-0.5)*2; // taskId either 1 or 3 in the search phase

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




