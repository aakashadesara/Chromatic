var wavesurfer;
var numTimes = 0;
var currentSound = null;

function dashboard(user){
	
	if(numTimes != 0){
		wavesurfer.empty();
	}
	setSoundKeys();

	$("#login-wrapper").hide();
	$("#topRightNavBar").html("<li><a onClick=\"dashboard(Parse.User.current());\">Dashboard</a></li><li><a onClick=\"chromatic();\">Chromatic</a></li><li><a onClick=\"location.reload();\">Signout</a></li>");
	$("#content-wrapper").html("<div style=\" text-align: center;\" class=\"jumbotron col-md-4\">  <img src=\"" + user.get("profileLink") + "\" style=\"width: 200px; height: 200px;\"class=\"img-circle\"> <br>  <h1>" + user.get("firstname") + " " + user.get("lastname") + "</h1><input type=\"text\" style=\"text-align: center;\"class=\"form-control\" id=\"friendFinder\" placeholder=\"Find a friend by username \"><p><br><a class=\"btn btn-primary btn-lg\" onClick=\"findFriend();\">Add Friend</a></p></div>");
	$("#content-wrapper").html($("#content-wrapper").html() + "<div class=\"col-md-8 jumbotron\" id=\"friendsDiv\"></div>");

	for(var i = 0; i < user.get("friendList").length; i++){
		getFriendInfo(user.get("friendList")[i]);
	}
}

function setSoundKeys(){
	window.addEventListener("keydown", dealWithKeyboard, false);
	 
	function dealWithKeyboard(e) {
	    // gets called when any of the keyboard events are overheard
	    switch(e.keyCode){
	    	case 49:
	    		setCurrentSound(0);
	    		break;
	    	case 50:
	    		setCurrentSound(1);
	    		break;
	    	case 81:
	    		setCurrentSound(2);
	    		break;
	    	case 87:
	    		setCurrentSound(3);
	    		break;
	    	case 65:
	    		setCurrentSound(4);
	    		break;
    		case 83:
    			setCurrentSound(5);
    			break;
    		case 90:
    			setCurrentSound(6);
    			break;
    		case 88:
    			setCurrentSound(7);
    			break;
    		default:
    			break;
	    }
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
	["Hey Brother", "Avicii", "HeyBrother"],
	["Wake Me Up", "Avicii", "WakemeUp"],
	["Sail", "Awolnation", "Sail"],
	["Bailando", "Enrique Iglesias", "Bailando"],
	["Blank Space", "Taylor Swift", "BlankSpace"],
	["Boom Clap", "Charlie Xcx", "BoomClap"],
	["Centuries", "Fall Out Boys", "Centuries"],
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

var sounds = [
	["images/clap.png", "sound/clap.wav"],
	["images/clave.png", "sound/clave.wav"],
	["images/cowbell.png", "sound/cowbell.wav"],
	["images/crahs.png", "sound/crash.wav"],
	["images/hihat.png", "sound/hihat.wav"],
	["images/snare.png", "sound/snaredrum.wav"],
	["images/snare2.png", "sound/snaredrum2.wav"],
	["images/snare3.png", "sound/snaredrum3.wav"]
];

function addSounds(){
	for(var i = 0; i < sounds.length; i++){
		$("#soundHolder").html($("#soundHolder").html() + "<img src=\"" + sounds[i][0] + "\" id=\"soundDisk" + i + "\" style=\"width: 50%; opacity: 0.6;\"class=\"img-circle\">" );
	}
}

function setCurrentSound(num){
	//alert(num);
	for(var i = 0; i < 8; i++){
		$("#soundDisk" + i).attr("style", "width: 50%; opacity: 0.6;");
	}
	$("#soundDisk" + num).attr("style", "width: 50%; opacity: 1;");
}


function chromatic(){
	$("#content-wrapper").html("");
	$("#login-wrapper").hide();
	$("#content-wrapper").html("<div class=\"col-md-5\" id=\"songHolder\" style=\"overflow: scroll; \"style=\"background-color: red; height: 100%;\"></div>    <div class=\"col-md-2\" id=\"soundHolder\" style=\"padding: 2%; background-color: rgba(50,50,50,1); height: 400px;\"></div>    <div class=\"col-md-5\" id=\"beatMakerHolder\" style=\"background-color: green; height: 400px;\"></div>    <div class=\"col-md-1\" style=\"background-color: purple; height: 250px;\"></div><div class=\"col-md-10\" id=\"waveHolder\" style=\"background-color: white; height: 250px; padding:2%;\" ></div> <div class=\"col-md-1\" id=\"leapHolder\" style=\"background-color: white; height: 250px; padding:2%;\" ></div> ");
	fillSongHolder();
	addSounds();
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

	var options = {
        container     : document.querySelector('#waveHolder'),
        waveColor     : '#1254AA',
        progressColor : '#34DE12',
        cursorColor   : 'navy'
    };

    if (true) {
        options.minPxPerSec = 50;
        options.scrollParent = true;
    }

    // Init
    wavesurfer.init(options);



	wavesurfer.on('ready', function () {
	    wavesurfer.play();

	    var timeline = Object.create(WaveSurfer.Timeline);

	    timeline.init({
	        wavesurfer: wavesurfer,
	        container: "#waveHolder"
	    });

	    Leap.loop(function(frame) {

	    if(frame.hands.length == 1){

			if(frame.gestures.length > 0){
				if(frame.gestures[0].type == 'screenTap'){
				    alert("Inserted " + "instrument name" + " at " + Math.round(wavesurfer.getCurrentTime()));
				}
			}

	      xPos = Math.round((frame.hands[0].palmPosition[0]/1000 * 1000))/1;
	      yPos = frame.hands[0].palmPosition[1]/1000 * 1000;
	      zPos = frame.hands[0].palmPosition[2]/1000 * 1000;
	      $("#leapHolder").html("Leap X: (" + Math.round((frame.hands[0].palmPosition[0]/1000 * 1000))/1 + ")" + "<br>" + "Leap Y: (" + frame.hands[0].palmPosition[1]/1000 * 1000 + ")" + "<br>" + "Leap Z: (" + frame.hands[0].palmPosition[2]/1000 * 1000 + ") <br>" + " Current Time:" + Math.round(wavesurfer.getCurrentTime()));

	      if(zPos > 0){
		      if(xPos > 100){
		      	wavesurfer.skip(xPos / 1000);
		      } else if (xPos < -100){
		      	wavesurfer.skip(xPos /1000);
		      } 

		      var v = yPos / 400;
		      if(v < 0){
		      	v = 0;
		      } else if (v > 1){
		      	v = 1;
		      }

		      wavesurfer.setVolume(v);
		     }


	     }


	});
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


