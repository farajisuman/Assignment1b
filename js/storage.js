//Name: Sayed Suman
//Student No: 165131

var usrnam= document.getElementById("userName");
var usrmail = document.getElementById("userEmail");
var usrcomment = document.getElementById("userInput");

var enterSubmit = document.getElementById("enter");
var retrieveSubmit = document.getElementById("readDatabase");
var resetSubmit = document.getElementById("resetDatabase");
var receiverElement = document.getElementById("receiverElement");
var changeSubmit = document.getElementById("change");
var changeInput = document.getElementById("changeIndex");
var regularElement = document.getElementById("regular");
var changeElement = document.getElementById("changeAction");

var myArrayIndex = 0;

addListeners();

function addListeners(){
	
	if(!enterSubmit.addEventListener){
		enterSubmit.attachEvent("onclick", inputButtonListener);
	}else{
		enterSubmit.addEventListener("click", inputButtonListener, false);
	}
	
	
	if(!retrieveSubmit.addEventListener){
		retrieveSubmit.attachEvent("onclick", readButtonListener);
	}else{
		retrieveSubmit.addEventListener("click", readButtonListener, false);
	}
	
	if(!resetSubmit.addEventListener){
		resetSubmit.attachEvent("onclick", resetButtonListener);
	}else{
		resetSubmit.addEventListener("click", resetButtonListener, false);
	}
	
	
	if(!changeSubmit.addEventListener){
		changeSubmit.attachEvent("onclick", updateButtonListener);
	}else{
		changeSubmit.addEventListener("click", updateButtonListener, false);
	}
}


function resetDynamicListenerAtIndex(index){
	var changeSubmitBtn = document.getElementById("change_" + index);
	var deleteSubmitBtn = document.getElementById("delete_" + index);
	

	if(!changeSubmitBtn.removeEventListener){
		changeSubmitBtn.detachEvent("onclick", changeButtonListener);
	}else{
		changeSubmitBtn.removeEventListener("click", changeButtonListener, false);
	}

	if(!deleteSubmitBtn.removeEventListener){
		deleteSubmitBtn.detachEvent("onclick", deleteButtonListener);
	}else{
		deleteSubmitBtn.removeEventListener("click", deleteButtonListener, false);
	}
	
}

function resetAllDynamicListener(){
	if(localStorage.length == 0) return;
	
	for(var i=1; i<=myArrayIndex+1; i++){
		resetDynamicListenerAtIndex(i);
	}
}

function addDynamicListener(){
	if(localStorage.length == 0) return;
	
	for(var i=1; i<=myArrayIndex+1; i++){
		var changeSubmitBtn = document.getElementById("change_" + i);
		var deleteSubmitBtn = document.getElementById("delete_" + i);
		
		if(!changeSubmitBtn.addEventListener){
			changeSubmitBtn.attachEvent("onclick", changeButtonListener);
		}else{
			changeSubmitBtn.addEventListener("click", changeButtonListener, false);
		}
		
		
		if(!deleteSubmitBtn.addEventListener){
			deleteSubmitBtn.attachEvent("onclick", deleteButtonListener);
		}else{
			deleteSubmitBtn.addEventListener("click", deleteButtonListener, false);
		}
	}
}


function checkEvent(e){
	if(typeof e == "undefined"){
		e = window.event;	
	}
	
	if(typeof e.preventDefault != "undefined"){
		e.preventDefault();
	}else{
		e.returnValue = false;	
	}
}

function inputButtonListener(e){
	checkEvent(e);
	storeText();
}

function readButtonListener(e){
	checkEvent(e);
	readText();
}

function resetButtonListener(e){
	checkEvent(e);
	resetText();
}

function changeButtonListener(e){
	checkEvent(e);
	var term = 0;
	
	if(e.currentTarget){
		term = parseInt(e.currentTarget.title);
	}else if(e.srcElement){
		term = parseInt(e.srcElement.title);
	}
	
	if(term > 0){
		changeText(term);
	}
}

function deleteButtonListener(e){
	checkEvent(e);
	var term = 0;
	
	if(e.currentTarget){
		term = parseInt(e.currentTarget.title);
	}else if(e.srcElement){
		term = parseInt(e.srcElement.title);
	}
		
	if(term > 0){
		deleteText(term);
	}
}

function updateButtonListener(e){
	checkEvent(e);
	updateText();
}

function resetAndFocusTextArea(){
	usrnam.value="";
	usrmail.value="";
	usrcomment.value = "";
	usrnam.focus();
}

function toggleChangeView(changeView){
	if(changeView){
		regularElement.style.display = "none";
		changeElement.style.display = "block";
	}else{
		regularElement.style.display = "block";
		changeElement.style.display = "none";
	}
}
function changeText(index){
	if(index > 0){
		changeInput.value = index-1;
		usrcomment.value = localStorage.getItem(index-1);
		toggleChangeView(true);
	}
}

function SyncLocalStorage(){
	if(localStorage.length == 0){
		return;
	}else{
		var count = 0;
		var arrStoredElements = new Array();
		for(var i=0; i<localStorage.length; i++){
			var key = parseInt(localStorage.key(i));
			arrStoredElements[key] = localStorage.getItem(key);
			count++;
		}
		
		localStorage.clear();
		count = 0;
		for(var j=0; j<arrStoredElements.length; j++){
			if(arrStoredElements[j]){
				localStorage.setItem(count, arrStoredElements[j]);
				count++;
			}
		}
	}
}


function deleteText(index){
	if(localStorage.length >= index && index > 0){
		localStorage.removeItem(index-1);
		resetDynamicListenerAtIndex(index);	
		SyncLocalStorage();
	}
	readText();
}


function updateText(){
	var index = parseInt(changeInput.value);
	var input = usrcomment.value;
	if(input != null && input.length > 0){
		localStorage.setItem(index, input);
	}
	resetAndFocusTextArea();
	toggleChangeView(false);
	readText();
}

function storeText(){

	var usrnaminput = usrnam.value;
	var usrmailinput = usrmail.value;
	var input = usrcomment.value;
	
	if(localStorage.length > 0){
		myArrayIndex = localStorage.length;
	}
	
	if(usrnaminput != null && usrnaminput.length > 0 && usrmailinput != null && usrmailinput.length > 0 && input != null && input.length > 0){
		localStorage.setItem(myArrayIndex, input);
		myArrayIndex++;
	}
	resetAndFocusTextArea();
}

function readText(){
	var allElements = "", count = 1;
	
	if(localStorage.length == 0){
		allElements = "No information in the database.";
		myArrayIndex = 0;
	}else{
		allElements = "<table>";
		myArrayIndex = -1;
		for(var i=0; i<localStorage.length; i++){
			allElements += "<tr><td>" + localStorage.getItem(i) + "</td><td style='width:2px'></td><td><a href='#' title='" + count + "' id='change_" + 
				count + "'>Change</a></td><td style='width:2px'></td><td><a href='#' title='" + count + "' id='delete_" + count + "'>Delete</a></td></tr>";
			count++;
			myArrayIndex++;
		}
		allElements += "</table>";
	}
	
	receiverElement.innerHTML = allElements;
	
	resetAllDynamicListener();
	addDynamicListener();
}

function resetText(){
	localStorage.clear();
	myArrayIndex = 0;
	readText();
}