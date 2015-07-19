function dashboard(user){
	$.each($('audio'), function () {
	    this.pause();
	});
	$("#login-wrapper").hide();
	$("#topRightNavBar").html("<li><a onClick=\"dashboard(Parse.User.current());\">Dashboard</a></li><li><a onClick=\"chromatic();\">Chromatic</a></li><li><a onClick=\"location.reload();\">Signout</a></li>");
	$("#content-wrapper").html("<div style=\" text-align: center;\" class=\"jumbotron col-md-4\">  <img src=\"" + user.get("profileLink") + "\" style=\"width: 200px; height: 200px;\"class=\"img-circle\"> <br>  <h1>" + user.get("firstname") + " " + user.get("lastname") + "</h1><input type=\"text\" style=\"text-align: center;\"class=\"form-control\" id=\"friendFinder\" placeholder=\"Find a friend by username \"><p><br><a class=\"btn btn-primary btn-lg\" onClick=\"findFriend();\">Add Friend</a></p></div>");
	$("#content-wrapper").html($("#content-wrapper").html() + "<div class=\"col-md-8 jumbotron\" id=\"friendsDiv\"></div>");

	for(var i = 0; i < user.get("friendList").length; i++){
		getFriendInfo(user.get("friendList")[i]);
	}
}

function getFriendInfo(username){
	var UserObj = Parse.Object.extend("UserObj");
	var userObj = new Parse.Query(UserObj);
	userObj.equalTo("username", username);
	userObj.find({
	  success: function(results) {
	    alert("Successfully retrieved " + results.length + " scores.");
	    // Do something with the returned Parse.Object values
	    /*for (var i = 0; i < results.length; i++) {
	      var object = results[i];
	      alert(object.id + ' - ' + object.get('playerName'));
	    }*/
	    var obj = results[0];
	    $("#friendsDiv").html($("#friendsDiv").html() + "<div style=\"text-align: center;\"class=\"panel panel-primary col-md-4\">  <div class=\"panel-heading\">    <h3 class=\"panel-title\"><img src=\"" + obj.get("profileLink") + "\" style=\"width: 50px; height: 50px;\"class=\"img-circle\"><br>"  + obj.get("username")+ "</h3>  </div>  <div class=\"panel-body\">" + obj.get("firstName") + " " + obj.get("lastname") + "</div><a onClick=\"collab(" + obj.get("username") + ");\" class=\"btn btn-primary\">Collaborate</a><a onClick=\"contact(" + obj.get("username") + ");\" class=\"btn btn-success\">Contact</a></div>");
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}

var songs = [
	["All About That Bass", "Meghan Trainor", ""],
	["Hey Brother", "Avicii", ""],
	["Wake Me Up", "Avicii", ""],
	["Sail", "Awolnation", ""],
	["Bailando", "Enrique Iglesias", ""],
	["Blank Space", "Taylor Swift", ""],
	["Boom Clap", "Charlie Xcx", ""],
	["Centuries", "Fall Out Boys", ""],
	["Can't Hold Us Down", "Christina Aguilera", ""],
	["Cool Kids", "Echosmith", ""],
	["Counting Stars", "One Republic", ""],
	["Get Lucky", "Daft Punk", ""],
	["Get Low", "DJ Snake", ""],
	["Thinking Out Loud", "Ed Sheeran", ""],
	["Happy", "Pharrell Williams", ""],
	["I Gotta Feeling", "Black Eyed Peas", ""],
	["Jaded", "DeadMau5", ""],
	["Dark Horse", "Katy Perry", ""],
	["Levels", "Avicii", ""],
	["Royals", "Lorde", ""],
	["Pompei", "Bastille", ""],
	["Pumped Up Kicks", "Foster the People", ""],
	["Radioactive", "Imagine Dragons", ""],
	["Raise Your Hands", "DeadMau5", ""],
	["Reduction", "DeadMau5", ""],
	["Remember", "DeadMau5", ""],
	["Riptide", "Vance Joy", ""],
	["Rude", "MAGIC!", ""],
	["Shake it Off", "Taylor Swift", ""],
	["Heights", "The Postal Service", ""]
];

function chromatic(){
	$("#content-wrapper").html("");
	$("#login-wrapper").hide();
	$("#content-wrapper").html("<div class=\"col-md-5\" id=\"songHolder\" style=\"overflow: scroll; \"style=\"background-color: red; height: 100%;\"></div>    <div class=\"col-md-2\" id=\"soundHolder\" style=\"background-color: blue; height: 400px;\"></div>    <div class=\"col-md-5\" id=\"beatMakerHolder\" style=\"background-color: green; height: 400px;\"></div>    <div class=\"col-md-12\" id=\"waveHolder\" style=\"background-color: rgba(99,159, 212, 1); height: 250px; padding:2%;\" ></div>  ");
	fillSongHolder();
	wavesurfer();
}

function fillSongHolder(){
	$("#songHolder").html("<div class=\"list-group\">  <a href=\"#\" class=\"list-group-item active\">    Song List  </a><div style=\"max-height: 325px\" id=\"songList\"></div></div>");
	for(var i = 0; i < songs.length; i++){
		$("#songList").html($("#songList").html() + "<a href=\"#\" class=\"list-group-item\"><a class=\"btn btn-info\">Play</a> " + songs[i][0] + " - " + songs[i][1] + "</a>");
	}
}

function wavesurfer(){
	var wavesurfer = Object.create(WaveSurfer);

	wavesurfer.init({
	    container: document.querySelector('#waveHolder'),
	    waveColor: '#1254AA',
	    progressColor: '#34DE12'
	});

	wavesurfer.on('ready', function () {
	    wavesurfer.play();
	});

	wavesurfer.load('test.mp3');
}



