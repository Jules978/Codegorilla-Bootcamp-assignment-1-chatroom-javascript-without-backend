var mykey = "";  //name of the chatroom, used in submitchat(), getmessage(), refreshChat(), to access API.
var xmlhttp = new XMLHttpRequest(); //new request variable. Used in submitchat(), getmessage(), getids(), refreshchat().
var highestId = 0; //sets the highestId to 0, used and updated by refreshchat().
var correctids = []; //array with message IDs for the chatroom. updated by getids(), used by refreshchat() to access all messages in the chatroom.

function scrollToBottom(){ //makes sure the chat div automatically scrolls to the bottom (thanks Ewout!).
   var div = document.getElementById("chatbox");
   div.scrollTop = div.scrollHeight - div.clientHeight;
}

function submitchat() { //submits a string containing the username and message to the API.
	var username= form2.mykey.value; //gets username from form.
	var d = new Date();
	var time = d.toLocaleTimeString();
	var value = "(" +time +") " +username + ": " + document.getElementById('msg').value;  //makes a string from the time, username, and the message.
	var surl = "https://codegorilla.nl/read_write/api.php?action=write&mykey=" + mykey + "&value="+value; //generates url with string.
	xmlhttp.open('post',surl, false); //post request to api
	xmlhttp.send();
		
	document.getElementById("name").style.display = "none"; //hides username form, after first input.
	document.getElementById('msg').value = ''; //reset text input.
		
	scrollToBottom(); //autoscroll not really needed here, but why not.
}

function getmessage(id){ 	//gets messages from the API via generated url with id.
 	var gurl = "https://codegorilla.nl/read_write/api.php?action=read&mykey=" + mykey + "&id="+id; 	//generates url with chatroomname and id.
	var chat = document.getElementById("chat");	//gets the chat box element, so messages can be displayed there by other functions.
	xmlhttp.open('GET',gurl,false);	//get request using the generated url, false, because it won't work otherwise. 
	xmlhttp.send(); 
}

function getids(){	//accesses a string of all ids that belong to the specified mykey.
	var idurl = "https://www.codegorilla.nl/read_write/api.php?action=list&mykey="+mykey; //generates url with mykey.
	xmlhttp.open('post',idurl, false); //post request.
	xmlhttp.send();
	
	var responseids= xmlhttp.response; //saves string of IDs as a variable.
	correctids=responseids.split(","); //splits string of IDs, so it can be saved in an array.
	for (i = 0; i < correctids.length; i++) {
		correctids[i] = parseInt(correctids[i]); //saves IDs in the array as integers, so they can be used in other functions.
	}
}

function refreshchat() {  

	getids(); //getid function gets all ids that belong to mykey from API, so they can be used to access the messages.
	var chat = document.getElementById("chat"); //access to chat div
	for (i = 0; i < correctids.length; i++) { //for loop, calls getmessage(id) for every ID that is higher then the highestId variable.
		if (correctids[i] > highestId) {
			
			getmessage(correctids[i]);
			var newMessage = xmlhttp.response; //saves response from every request as a variable.
			chat.innerHTML += newMessage + "<br>"; //posts the new message into the chat div as a new line.
			scrollToBottom(); // automatically scrolls to the last message (at the bottom of the div)
			
			highestId = correctids[i]; //saves the last id in the array as the highestid, so the loop doesn't repeat until there is a new message (new higher id).
			
		}
	}
}


function start(){ //starts chat function after chatroom key has been chosen.
mykey = document.getElementById("chatroominput").value; //saves input as mykey variable.
document.getElementById("chatpickscreen").style.display = "none"; //hides chatroom pick div.
document.getElementById("allchat").style.display = "block"; //shows chatroom div.
window.setInterval(function(){ // calls refreshchat every second, so chat is updated automatically.
	refreshchat();
}, 1000);   


}

