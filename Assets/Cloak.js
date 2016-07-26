function OnTriggerEnter()
{
for( var i = 0; i < transform.childCount; ++i )
{transform.GetChild(i).gameObject.SetActive (true);}
}

function OnTriggerExit()
{
for( var i = 0; i < transform.childCount; ++i )
{transform.GetChild(i).gameObject.SetActive (false);}
}