function OnGUI() {
//GUI.Box (Rect (500,300,100,50), "LOADING");
    if (GUI.Button(Rect(1010,10,100,50),"Open"))
		{Application.LoadLevel ("openscene");
		}
    if (GUI.Button(Rect(1010,70,100,50),"Backyard"))
		{Application.LoadLevel ("backyardscene");}
	if (GUI.Button(Rect(1010,130,100,50),"Luxor"))
		{
         Application.LoadLevel ("luxorscene");}
    if (GUI.Button(Rect(1010,190,100,50),"Louvre"))
		{
         Application.LoadLevel ("louvrescene");}
		 
	if (GUI.Button(Rect(1010,250,100,50),"Rect"))
		{
         Application.LoadLevel ("rectscene");}
	if (GUI.Button(Rect(1010,310,100,50),"Square"))
		{
         Application.LoadLevel ("squarescene");}
	if (GUI.Button(Rect(1010,370,100,50),"Practice"))
		{
         Application.LoadLevel ("practice");}
    if (GUI.Button(Rect(1010,430,100,50),"sample_city"))
		{
         Application.LoadLevel ("sample_city");}
	if (GUI.Button(Rect(1010,500,100,50),"QUIT"))
        { Application.Quit();}
}