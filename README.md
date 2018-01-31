# javascript-chat
a chatroom application, build in HTML, CSS, and Javascript. It works with backend provided by CodeGorilla.  
Live version available here: http://wijzijncodegorilla.nl/julia/breakchat/. Enter a chatroom name (e.g. chat) to enter.
This chat application was made for the first CodeGorilla bootcamp assignment.

# how it works

enter a chatroom name. The chatroom will load automatically.
You can chat by entering a username and chat message.

## sending messages

1. the javascript code combines the username, timestamp and message into a single string.
2. The message string (saved as "value") and chatroom name (saved as "mykey") are send to the provided api (method=write) via a GET request. 
3. the backend returns an id integer associated with the message.

## requesting messages

1. the chatroom name (mykey) s send to the api via a GET request (method=list)
2. the api returns a string containing all ids associated with that chatroom name. javascript code then converts the string to an array of integers. this array is saved as a global variable.
3. By looping through this array of ids, the js code writes all messages to the chatroom div, and stores the highest id as a global variable.
4. The refresh chat function starts every second, and checks whether the requested array contains ids higher than the highestid variable.

