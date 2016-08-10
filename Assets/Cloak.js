public
var enable_hiding = true;

function OnTriggerEnter() {
    if (enable_hiding) {
        for (var i = 0; i < transform.childCount; ++i) { transform.GetChild(i).gameObject.SetActive(true); }
    }
}

function OnTriggerExit() {
    if (enable_hiding) {
        for (var i = 0; i < transform.childCount; ++i) { transform.GetChild(i).gameObject.SetActive(false); }
    }
}
