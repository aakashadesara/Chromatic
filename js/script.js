var wavesurfer;
var numTimes = 0;
var currentSound = null;
var currentSong = null;
var wavebeatArray = [0,0];

function dashboard(user){

	if(numTimes != 0){
		wavesurfer.empty();
	}
	setSoundKeys();

	$("#login-wrapper").hide();
	$("#topRightNavBar").html("<li><a onClick=\"dashboard(Parse.User.current());\">Dashboard</a></li><li><a onClick=\"chromatic();\">Chromatic</a></li><li><a onClick=\"location.reload();\">Signout</a></li>");
	$("#content-wrapper").html("<div style=\" text-align: center;\" class=\"jumbotron col-md-4\">  <img src=\"" + Parse.User.current().get("profileLink") + "\" style=\"width: 200px; height: 200px;\"class=\"img-circle\"> <br>  <h1>" + Parse.User.current().get("firstname") + " " + Parse.User.current().get("lastname") + "</h1><input type=\"text\" style=\"text-align: center;\"class=\"form-control\" id=\"friendFinder\" placeholder=\"Find a friend by username \"><p><br><a class=\"btn btn-primary btn-lg\" onClick=\"findFriend();\">Add Friend</a></p></div>");
	$("#content-wrapper").html($("#content-wrapper").html() + "<div class=\"col-md-8 jumbotron\" id=\"friendsDiv\"></div>");

	for(var i = 0; i < Parse.User.current().get("friendList").length; i++){
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

    		case 32:
    			var audio = new Audio(sounds[currentSound][1]);
				audio.play();
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
	    console.log(obj);
	    $("#friendsDiv").html($("#friendsDiv").html() + "<div style=\"text-align: center;\"class=\"panel panel-primary col-md-4\">  <div class=\"panel-heading\">    <h3 class=\"panel-title\"><img src=\"" + obj.get("profileLink") + "\" style=\"width: 50px; height: 50px;\"class=\"img-circle\"><br>"  + obj.get("username")+ "</h3>  </div>  <div class=\"panel-body\">" + obj.get("firstName") + " " + obj.get("lastname") + "</div><a onClick=\"chromatic(\'" + obj.get("username") + "\',\'" + obj.get("profileLink") + "\');\" class=\"btn btn-primary\">Collaborate</a><a onClick=\"contact(" + obj.get("username") + ");\" class=\"btn btn-success\">Contact</a></div>");
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
	["images/clap.png", "sound/clap.mp3", "Clap"],
	["images/clave.png", "sound/clave.mp3", "Clave"],
	["images/cowbell.png", "sound/cowbell.mp3", "Cowbell"],
	["images/crahs.png", "sound/crash.mp3", "Crash"],
	["images/hihat.png", "sound/hihat.mp3", "Hihat"],
	["images/snare.png", "sound/snaredrum.mp3", "Snare"],
	["images/snare2.png", "sound/snaredrum2.mp3", "Snare (2)"],
	["images/snare3.png", "sound/snaredrum3.mp3", "Snare (3)"]
];

function addSounds(){
	for(var i = 0; i < sounds.length; i++){
		$("#soundHolder").html($("#soundHolder").html() + "<img src=\"" + sounds[i][0] + "\" id=\"soundDisk" + i + "\" style=\"width: 50%; opacity: 0.6;\"class=\"img-circle\">" );
	}
}

function setCurrentSound(num){
	//console.log(num);
	$("#pokeSoundSlot").html("<br><img src=\"" + sounds[num][0] + "\" style=\"width: 90%; opacity: 1;\"class=\"img-circle\"></img><br>");
	if(dolbyCompatability()){
		$("#pokeSoundSlot").html($("#pokeSoundSlot").html() + "<br><br><img src=\"images/dolby.png\" style=\"width: 90%; opacity: 1;\"class=\"\"></img>");
	}
	for(var i = 0; i < 8; i++){
		$("#soundDisk" + i).attr("style", "width: 50%; opacity: 0.6;");
	}
	$("#soundDisk" + num).attr("style", "width: 50%; opacity: 1;");
	currentSound = num;
	
}


function chromatic(uname, plink){

	console.log(Parse.User.current().get("username"));

	var havePlayedBefore = false;
	var UserObj = Parse.Object.extend("UserObj");
	var query = new Parse.Query(UserObj);
	query.equalTo("username", uname);
	query.first({
	  success: function(object) {
	    // Successfully retrieved the object.
	    //console.log(object.get("songsCollection"));
	    var i; 
	    for(i = 0; i < object.get("songsCollection").length; i++){
	    	if(object.get("songsCollection")[i][0] == Parse.User.current().get("username")){
	    		havePlayedBefore = true;
	    		break;
	    	}
	    }

	    if(havePlayedBefore == false){
			if(numTimes != 0){
				wavesurfer.empty();
			}

			$("#content-wrapper").html("");
			$("#login-wrapper").hide();
			$("#content-wrapper").html("<div class=\"col-md-5\" id=\"songHolder\" style=\"overflow: scroll; \"style=\"background-color: red; height: 100%;\"></div>    <div class=\"col-md-2\" id=\"soundHolder\" style=\"padding: 2%; background-color: rgba(50,50,50,1); height: 400px;\"></div>    <iFrame class=\"col-md-5\" id=\"beatMakerHolder\" src=\"http://aakashadesara.com/gestification/cookbook/boilerplate/r5/leap-threejs-template-r5.html\"style=\"background-color: white; height: 400px;\"></iFrame>    <div class=\"col-md-1\" id=\"pokeSoundSlot\" style=\"background-color: rgba(200,200,200,1); height: 250px;\"></div><div class=\"col-md-10\" id=\"waveHolder\" style=\"background-color: white; height: 250px; padding:2%;\" ></div> <div class=\"col-md-1\" id=\"leapHolder\" style=\"background-color: white; height: 250px; padding:2%;\" ></div> ");
			fillSongHolder();
			addSounds();
			setCurrentSound(0);
			if(uname != null)
				$("#titleofSong").html("<img src=\"" + plink + "\" style=\"width: 30px; opacity: 1;\"class=\"img-circle\"></img>   " + uname + " <a onClick=\"saveSong(\'" + uname + "\');\" class=\"btn btn-success\">Save Song</a>");
			else
				$("#titleofSong").html("Chromatic");
		} else {
			if(numTimes != 0){
				wavesurfer.empty();
			}

			$("#content-wrapper").html("");
			$("#login-wrapper").hide();
			$("#content-wrapper").html("<div class=\"col-md-5\" id=\"songHolder\" style=\"overflow: scroll; \"style=\"background-color: red; height: 100%;\"></div>    <div class=\"col-md-2\" id=\"soundHolder\" style=\"padding: 2%; background-color: rgba(50,50,50,1); height: 400px;\"></div>    <iFrame class=\"col-md-5\" id=\"beatMakerHolder\" src=\"http://aakashadesara.com/gestification/cookbook/boilerplate/r5/leap-threejs-template-r5.html\"style=\"background-color: white; height: 400px;\"></iFrame>    <div class=\"col-md-1\" id=\"pokeSoundSlot\" style=\"background-color: rgba(200,200,200,1); height: 250px;\"></div><div class=\"col-md-10\" id=\"waveHolder\" style=\"background-color: white; height: 250px; padding:2%;\" ></div> <div class=\"col-md-1\" id=\"leapHolder\" style=\"background-color: white; height: 250px; padding:2%;\" ></div> ");
			fillSongHolder();
			addSounds();
			//console.log(object.get("songsCollection")[i][1]);
			waveSurfer(object.get("songsCollection")[i][2], object.get("songsCollection")[i][1]);
			setCurrentSound(0);
			if(uname != null)
				$("#titleofSong").html("<img src=\"" + plink + "\" style=\"width: 30px; opacity: 1;\"class=\"img-circle\"></img>   " + uname + " <a onClick=\"saveSong(\'" + uname + "\');\" class=\"btn btn-success\">Save Song</a>");
			else
				$("#titleofSong").html("Chromatic");

		}

	  },
	  error: function(error) {
	    console.log("Error: " + error.code + " " + error.message);
	  }
	});


}

function fillSongHolder(){
	$("#songHolder").html("<div class=\"list-group\">  <a id=\"titleofSong\" class=\"list-group-item active\">      </a><div style=\"max-height: 300px\" id=\"songList\"></div></div>");
	for(var i = 0; i < songs.length; i++){
		var dolby = dolbyCompatability();

		if(dolby){
			$("#songList").html($("#songList").html() + "<a class=\"list-group-item\"><a onClick=\" waveSurfer(\'sound/mp3Files/" + songs[i][2] + ".mp4\', beatsArray);\" class=\"btn btn-info\">Play</a> " + songs[i][0] + " - " + songs[i][1] + "</a>");
		} else {
			$("#songList").html($("#songList").html() + "<a class=\"list-group-item\"><a onClick=\" waveSurfer(\'sound/mp3Files/" + songs[i][2] + ".mp3\', beatsArray);\" class=\"btn btn-info\">Play</a> " + songs[i][0] + " - " + songs[i][1] + "</a>");
		}

	}
}

function saveSong(username){

	var firstTime = false;

	var havePlayedBefore = false;
	var UserObj = Parse.Object.extend("UserObj");
	var query = new Parse.Query(UserObj);
	query.equalTo("username", username);
	query.first({
	  success: function(object) {
	    // Successfully retrieved the object.
	    	    	//console.log(object.get("songsCollection"));

	    var location = null;
	    for(var i = 0; i < object.get("songsCollection").length; i++){
	    	alert(object.get("songsCollection")[i][0].valueOf() == username);
	    	if(object.get("songsCollection")[0][i][0].valueOf() == Parse.User.current().get("username").valueOf()){
	    		havePlayedBefore = true;

	    		location = i;
	    	}
	    }

	    if(havePlayedBefore){
	    	var songArray = [Parse.User.current().get("username"),
							 [beatsArray],
							 currentSong];
			var UserObj = Parse.Object.extend("UserObj");
			var query = new Parse.Query(UserObj);
			query.equalTo("username", username);
			query.first({
			  success: function(object) {
			    // Successfully retrieved the object.
			    object.addUnique("songsCollection", songArray);
			    object.save();
			  },
			  error: function(error) {
			    console.log("Error: " + error.code + " " + error.message);
			  }
			});

			var songArray2 = [username,
							 [beatsArray],
							 currentSong];
			var UserObj = Parse.Object.extend("UserObj");
			var query = new Parse.Query(UserObj);
			query.equalTo("username", Parse.User.current().get("username"));
			query.first({
			  success: function(object) {
			    // Successfully retrieved the object.
			    object.addUnique("songsCollection", songArray2);
			    object.save();
			  },
			  error: function(error) {
			    console.log("Error: " + error.code + " " + error.message);
			  }
			});
		} else {

			var songArray = [Parse.User.current().get("username"),
							 [beatsArray],
							 currentSong];
			var UserObj = Parse.Object.extend("UserObj");
			var query = new Parse.Query(UserObj);
			query.equalTo("username", username);
			query.first({
			  success: function(object) {
			    // Successfully retrieved the object.
			    for(var i = 0; i < object.get("songsCollection").length; i++){
			    	if(object.get("songsCollection")[i][0].valueOf() == Parse.User.current().get("username").valueOf()){
			    		object.remove("songsCollection", object.get("songsCollection")[i]);
			    		object.save();
			    	}
			    }
			    object.addUnique("songsCollection", songArray);
			    object.save();
			  },
			  error: function(error) {
			    console.log("Error: " + error.code + " " + error.message);
			  }
			});

			var songArray2 = [username,
							 [beatsArray],
							 currentSong];
			var UserObj = Parse.Object.extend("UserObj");
			var query = new Parse.Query(UserObj);
			query.equalTo("username", Parse.User.current().get("username"));
			query.first({
			  success: function(object) {
			    // Successfully retrieved the object.
			     for(var i = 0; i < object.get("songsCollection").length; i++){
			    	if(object.get("songsCollection")[i][0].valueOf() == username){
			    		object.remove("songsCollection", object.get("songsCollection")[i]);
			    		object.save();
			    	}
			    }
			    object.addUnique("songsCollection", songArray2);
			    object.save();
			  },
			  error: function(error) {
			    console.log("Error: " + error.code + " " + error.message);
			  }
			});
			
		}











	  },
	  error: function(error) {
	    console.log("Error: " + error.code + " " + error.message);
	  }
	});


}

var beatsArray = [[0,0]];

function waveSurfer(song, beatsArray){

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

    var doItAgain = true;

	wavesurfer.on('ready', function () {
	    wavesurfer.play();

	    var timeline = Object.create(WaveSurfer.Timeline);

	    //console.log("THE ARRAY:" + beatsArray);

	    timeline.init({
	        wavesurfer: wavesurfer,
	        container: "#waveHolder",
	        beatsarray: beatsArray
	    });

	    Leap.loop(function(frame) {

	    if(frame.hands.length == 1){

			if(frame.gestures.length > 0){
				if(frame.gestures[0].type == 'screenTap'){
				    //console.log("Inserted " + sounds[currentSound][2] + " at " + Math.round(wavesurfer.getCurrentTime()));
				    var audio = new Audio(sounds[currentSound][1]);
					audio.play();
					beatsArray.push([currentSound, Math.round(wavesurfer.getCurrentTime()) ]);
					wavebeatArray.push([currentSound, Math.round(wavesurfer.getCurrentTime()) ]);
						//console.log(beatsArray);
				} else if (frame.gestures[0].type == 'keyTap'){
					wavesurfer.playPause();
				}
			}

			doItAgain = true;

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
	currentSong = song;
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


