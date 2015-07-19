$( document ).ready(function() {

	Parse.initialize("LiehTjg3LRu4wBRW8UxyVbdRcEa4ya5ehirwmpA7", "RPsGYoxIl4hpdHjkD2ZSN49Jgmp7mPj6rbvTz2l0");

	Parse.User.logOut();

    $("#loginButton").click(function(){
    	login($("#usernameLogin").val(), $("#passwordLogin").val());
    });

    $("#signupButton").click(function(){
    	var fName = $("#firstNameSignup").val();
    	var lName = $("#lastNameSignup").val();
    	var email = $("#emailSignup").val();
    	var pLink = $("#profileSignup").val();
    	var username = $("#usernameSignup").val();
    	var password = $("#passwordSignup").val();

    	signup(fName, lName, email, pLink, username, password);
    });

    Leap.loop(function(frame) {

    if(frame.hands.length == 1){

      xpos = Math.floor(frame.hands[0].palmPosition[0]);
      ypos = frame.hands[0].palmPosition[1]/200 - .15;

      //console.log("Leap X: (" + Math.round((frame.hands[0].palmPosition[0]/1000 * 1000))/1 + ")"); 
      //console.log("Leap Y: (" + frame.hands[0].palmPosition[1]/1000 * 1000 + ")"); 
      //console.log("Leap Z: (" + frame.hands[0].palmPosition[2]/1000 * 1000 + ")"); 

      $("#leapHolder").html("Leap X: (" + Math.round((frame.hands[0].palmPosition[0]/1000 * 1000))/1 + ")" + "<br>" + "Leap Y: (" + frame.hands[0].palmPosition[1]/1000 * 1000 + ")" + "<br>" + "Leap Z: (" + frame.hands[0].palmPosition[2]/1000 * 1000 + ")");

     }


});
});

function login(username, password){

	if(false){
		$.ajax({
			url       : 'https://api-us.clusterpoint.com/ACCOUNT_ID/DATABASE/_COMMAND',
			type      : 'POST',
			dataType  : 'json',
			data      : '{"query": "<name>Test</name>"}',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', 'Basic ' + btoa('USERNAME:PASSWORD'));
			},
			success   : function (data) {
				if (typeof success != 'undefined') {
					success(data);
				}
			},
			fail      : function (data) {
				console.log(data.error);
				if (typeof fail != 'undefined') {
					fail(data);
				}
			}
		});
	}

	Parse.User.logIn(username, password, {
	  success: function(user) {
	    // Do stuff after successful login.
	    dashboard(user);
	    
	  },
	  error: function(user, error) {
	    // The login failed. Check error to see why.
	    console.log("Error: " + error.code + " " + error.message);
	  }
	});
}

function signup(fName, lName, email, pLink, username, password){

	var user = new Parse.User();
	user.set("firstname", fName);
	user.set("lastname", lName);
	user.set("email", email);
	user.set("profileLink", pLink);
	user.set("username", username);
	user.set("password", password);
	user.set("friendList", []);
	user.set("soungArray", []);

	var UserObj = Parse.Object.extend("UserObj");
	var userObj = new UserObj();

	userObj.set("firstName", fName);
	userObj.set("lastname", lName);
	userObj.set("username", username);
	userObj.set("profileLink", pLink);

	userObj.save(null, {
	  success: function(userObj) {
	    // Execute any logic that should take place after the object is saved.
	    console.log('New object created with objectId: ' + gameScore.id);
	  },
	  error: function(userObj, error) {
	    // Execute any logic that should take place if the save fails.
	    // error is a Parse.Error with an error code and message.
	    console.log('Failed to create new object, with error code: ' + error.message);
	  }
	});

	user.signUp(null, {
	  success: function(user) {
	    // Hooray! Let them use the app now.
	    dashboard(user);
	  },
	  error: function(user, error) {
	    // Show the error message somewhere and let the user try again.
	    console.log("Error: " + error.code + " " + error.message);
	  }
	});
}

function findFriend(){
	var UserObj = Parse.Object.extend("UserObj");
	var query = new Parse.Query(UserObj);
	query.equalTo("username", $("#friendFinder").val());
	query.find({
	  success: function(results) {
	    alert("Successfully retrieved " + results.length + " scores.");
	    // Do something with the returned Parse.Object values
	   
	    var userObj = Parse.User.current();

	    var newFriendList = userObj.get("friendList");
	    newFriendList.push($("#friendFinder").val());

	    console.log(newFriendList);

	    userObj.set("friendList", newFriendList);
	    userObj.save(null, {
	    	success: function(userObj) {
			    // Execute any logic that should take place after the object is saved.
			    console.log('New object created with objectId: ' + gameScore.id);
			 },
			 error: function(userObj, error) {
			    // Execute any logic that should take place if the save fails.
			    // error is a Parse.Error with an error code and message.
			    console.log('Failed to create new object, with error code: ' + error.message);
			 }
	    });

	    /*for (var i = 0; i < results.length; i++) {
	      var object = results[i];
	      console.log(object.id + ' - ' + object.get('playerName'));
	    }*/
	  },
	  error: function(error) {
	    console.log("Error: " + error.code + " " + error.message);
	  }
	});

	dashboard(Parse.User.current());
}