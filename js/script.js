var wavesurfer;
var numTimes = 0;

function dashboard(user){
	
	if(numTimes != 0){
		wavesurfer.empty();
	}

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
	    console.log("Successfully retrieved " + results.length + " scores.");
	    // Do something with the returned Parse.Object values
	    /*for (var i = 0; i < results.length; i++) {
	      var object = results[i];
	      console.log(object.id + ' - ' + object.get('playerName'));
	    }*/
	    var obj = results[0];
	    $("#friendsDiv").html($("#friendsDiv").html() + "<div style=\"text-align: center;\"class=\"panel panel-primary col-md-4\">  <div class=\"panel-heading\">    <h3 class=\"panel-title\"><img src=\"" + obj.get("profileLink") + "\" style=\"width: 50px; height: 50px;\"class=\"img-circle\"><br>"  + obj.get("username")+ "</h3>  </div>  <div class=\"panel-body\">" + obj.get("firstName") + " " + obj.get("lastname") + "</div><a onClick=\"collab(" + obj.get("username") + ");\" class=\"btn btn-primary\">Collaborate</a><a onClick=\"contact(" + obj.get("username") + ");\" class=\"btn btn-success\">Contact</a></div>");
	  },
	  error: function(error) {
	    console.log("Error: " + error.code + " " + error.message);
	  }
	});
}

var songs = [
	["All About That Bass", "Meghan Trainor", "AllAboutThatBass"],
	["Hey Brother", "Avicii", "HeyBrother"],
	["Wake Me Up", "Avicii", "WakemeUp"],
	["Sail", "Awolnation", "Sail"],
	["Bailando", "Enrique Iglesias", "Bailando"],
	["Blank Space", "Taylor Swift", "BlankSpace"],
	["Boom Clap", "Charlie Xcx", "BoomClap"],
	["Centuries", "Fall Out Boys", "Centuries"],
	["Can't Hold Us Down", "Christina Aguilera", "CantHoldUsDown"],
	["Cool Kids", "Echosmith", "CoolKids"],
	["Counting Stars", "One Republic", "CountingStars"],
	["Get Lucky", "Daft Punk", "GetLucky"],
	["Get Low", "DJ Snake", "GetLow"],
	["Thinking Out Loud", "Ed Sheeran", "ThinkingOutLoud"],
	["Happy", "Pharrell Williams", "Happy"],
	["I Gotta Feeling", "Black Eyed Peas", "IGottaFeeling"],
	["Jaded", "DeadMau5", "Jaded"],
	["Dark Horse", "Katy Perry", "DarkHorse"],
	["Levels", "Avicii", "Levels"],
	["Royals", "Lorde", "Royals"],
	["Pompei", "Bastille", "Pompeii"],
	["Pumped Up Kicks", "Foster the People", "FosterThePeople"],
	["Radioactive", "Imagine Dragons", "Radioactive"],
	["Raise Your Weapons", "DeadMau5", "RaiseYourWeapons"],
	["Reduction", "DeadMau5", "Reduction"],
	["Remember", "DeadMau5", "Remember"],
	["Riptide", "Vance Joy", "Riptide"],
	["Rude", "MAGIC!", "Rude"],
	["Shake it Off", "Taylor Swift", "ShakeItOff"],
];

function chromatic(){
	$("#content-wrapper").html("");
	$("#login-wrapper").hide();
	$("#content-wrapper").html("<div class=\"col-md-5\" id=\"songHolder\" style=\"overflow: scroll; \"style=\"background-color: red; height: 100%;\"></div>    <div class=\"col-md-2\" id=\"soundHolder\" style=\"background-color: blue; height: 400px;\"></div>    <div class=\"col-md-5\" id=\"beatMakerHolder\" style=\"background-color: green; height: 400px;\"></div>    <div class=\"col-md-12\" id=\"waveHolder\" style=\"background-color: rgba(99,159, 212, 1); height: 250px; padding:2%;\" ></div>  ");
	fillSongHolder();
}

function fillSongHolder(){
	$("#songHolder").html("<div class=\"list-group\">  <a href=\"#\" class=\"list-group-item active\">    Song List  </a><div style=\"max-height: 325px\" id=\"songList\"></div></div>");
	for(var i = 0; i < songs.length; i++){
		var dolby = dolbyCompatability();

		if(dolby){
			$("#songList").html($("#songList").html() + "<a class=\"list-group-item\"><a onClick=\" waveSurfer(\'sound/mp3Files/" + songs[i][2] + ".mp4\');\" class=\"btn btn-info\">Play</a> " + songs[i][0] + " - " + songs[i][1] + "</a>");
		} else {
			$("#songList").html($("#songList").html() + "<a class=\"list-group-item\"><a onClick=\" waveSurfer(\'sound/mp3Files/" + songs[i][2] + ".mp3\');\" class=\"btn btn-info\">Play</a> " + songs[i][0] + " - " + songs[i][1] + "</a>");
		}

	}
}

function waveSurfer(song){

	$("#waveHolder").html("");

	if(numTimes != 0){
		wavesurfer.empty();
	}

	numTimes++;
	

	wavesurfer = Object.create(WaveSurfer);

	wavesurfer.init({
	    container: document.querySelector('#waveHolder'),
	    waveColor: '#1254AA',
	    progressColor: '#34DE12'
	});

	wavesurfer.on('ready', function () {
	    wavesurfer.play();
	});

	wavesurfer.load(song);
}

function dolbyCompatability(){
	var getDDSupport = function (callback) {
     
    if (video.canPlayType('audio/mp4;codecs="ec-3"') === '' || video.canPlayType('audio/mp4;codecs="ac-3"') === '') {
         
        supportDDPlus = false;
        callback();
         
    } else {
         
        var audio = new Audio();
        audio.muted = true;
        audio.addEventListener('error', function () {
             
            supportDDPlus = false;
            callback();
             
        }, false);
         
        audio.addEventListener('seeked', function () {
            supportDDPlus = true;
            callback();
        });
     
        audio.src = 'silence.mp4';
        audio.play();
         
        try {
            audio.currentTime = 2;
            return true;
        } catch (e) {
            //eslint-disable-line no-empty
            return false;
        }
	         
	    }
	};
}

