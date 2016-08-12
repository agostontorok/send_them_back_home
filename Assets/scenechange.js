var logo : GUITexture;

function OnGUI() {
	magnifiyRatio = Screen.height / logo.pixelInset.height;
	logo.pixelInset.height = Screen.height;
	logo.pixelInset.width = logo.pixelInset.width * magnifiyRatio;
	
	verticalPosition = Screen.height * 0.01;
	horizontalPosition = Screen.width *0.05;
    if (GUI.Button(Rect(horizontalPosition,verticalPosition,100,50),"Open"))
		{Application.LoadLevel ("openscene");
		}
	verticalPosition = verticalPosition + Screen.height * 0.1;
    if (GUI.Button(Rect(horizontalPosition,verticalPosition,100,50),"Backyard"))
		{Application.LoadLevel ("backyardscene");}
	verticalPosition = verticalPosition + Screen.height * 0.1;
	if (GUI.Button(Rect(horizontalPosition,verticalPosition,100,50),"Luxor"))
		{
         Application.LoadLevel ("luxorscene");}
    verticalPosition = verticalPosition + Screen.height * 0.1;
    if (GUI.Button(Rect(horizontalPosition,verticalPosition,100,50),"Louvre"))
		{
         Application.LoadLevel ("louvrescene");}
	verticalPosition = verticalPosition + Screen.height * 0.1;	 
	if (GUI.Button(Rect(horizontalPosition,verticalPosition,100,50),"Rect"))
		{
         Application.LoadLevel ("rectscene");}
    verticalPosition = verticalPosition + Screen.height * 0.1;
	if (GUI.Button(Rect(horizontalPosition,verticalPosition,100,50),"Square"))
		{
         Application.LoadLevel ("squarescene");}
    verticalPosition = verticalPosition + Screen.height * 0.1;
	if (GUI.Button(Rect(horizontalPosition,verticalPosition,100,50),"Practice"))
		{
         Application.LoadLevel ("practice");}
    verticalPosition = verticalPosition + Screen.height * 0.1;
    if (GUI.Button(Rect(horizontalPosition,verticalPosition,100,50),"sample_city"))
		{
         Application.LoadLevel ("sample_city");}
    verticalPosition = Screen.height * 0.01;
	horizontalPosition = Screen.width *0.9;
	if (GUI.Button(Rect(horizontalPosition,verticalPosition,100,50),"QUIT"))
        { Application.Quit();}
}