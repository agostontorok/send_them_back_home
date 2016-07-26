function Update()
{
	if (Input.GetKey("1"))
		{
		GameObject.Find("1Camera").camera.enabled = true;
		GameObject.Find("3Camera").camera.enabled = false;
		GameObject.Find("UpCamera").camera.enabled = false;
		GameObject.Find("avatar").transform.position.y=-2;
		GameObject.Find("roof").renderer.enabled = true;
		}
	
	if (Input.GetKey("2"))
		{
		GameObject.Find("3Camera").camera.enabled = true;
		GameObject.Find("1Camera").camera.enabled = false;
		GameObject.Find("UpCamera").camera.enabled = false;
		GameObject.Find("avatar").transform.position.y=0.5;
		GameObject.Find("roof").renderer.enabled = true;
		}
	
	if (Input.GetKey("3"))
		{
		GameObject.Find("UpCamera").camera.enabled = true;
		GameObject.Find("1Camera").camera.enabled = false;
		GameObject.Find("3Camera").camera.enabled = false;
		GameObject.Find("avatar").transform.position.y=0.5;
		GameObject.Find("roof").renderer.enabled = false;
		}
}
