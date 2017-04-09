//Name: Sayed Suman
//Student No: 165131

var el = document.getElementById("myBtn");
el.addEventListener("click", modifyText, false);

function modifyText()
{
	 var x = document.getElementById("demo");
	 if (x.style.fontSize == "28px") {
        x.style.fontSize = "14px";
    } 
	else {
        x.style.fontSize = "28px";
    }
}

var txtbox = document.getElementById("myInput");
txtbox.addEventListener("input", myFunction, false);

function myFunction() {
    var x = document.getElementById("myInput").value;
    document.getElementById("demoInput").innerHTML = "Your Text: " + x;
}


var mousedownevnt = document.getElementById("myP");
mousedownevnt.addEventListener("mousedown", mymouseDown, false);


function mymouseDown() {
    document.getElementById("myP").style.color = "red";
}

var mouseupevnt = document.getElementById("myP");
mouseupevnt.addEventListener("mouseup", mymouseUp, false);


function mymouseUp() {
    document.getElementById("myP").style.color = "green";
}



function validate()
{ 
	if (!document.getElementById("userName").value)
	{
		$('#userName').notify('Required Name!');
	}	
	
	if (!document.getElementById("userEmail").value)
	{
		$('#userEmail').notify('Required Email!');
	}
	if (!document.getElementById("userInput").value)
	{
		$('#userInput').notify('Make your Comments!');
	}
}

function checkEmail(str)
{
      var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!re.test(str.value))
	{
		$('#userEmail').notify('Invalid Email Address!');
	}
}



function AddToFavList(str) {
		var leftDiv = document.createElement("div"); 
        a = document.createElement('a');
        a.href =  str;
		a.innerHTML = str
		leftDiv.appendChild(a);
		document.getElementById("myList").appendChild(leftDiv);
}