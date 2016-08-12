var Player : GameObject;

function Update()
{

	transform.position.x = Player.transform.position.x;
	transform.position.z = Player.transform.position.z + 10;
	print(transform.position);
	}
