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
});

function login(username, password){
	Parse.User.logIn(username, password, {
	  success: function(user) {
	    // Do stuff after successful login.
	    dashboard(user);
	    
	  },
	  error: function(user, error) {
	    // The login failed. Check error to see why.
	    alert("Error: " + error.code + " " + error.message);
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

	user.signUp(null, {
	  success: function(user) {
	    // Hooray! Let them use the app now.
	    dashboard(user);
	  },
	  error: function(user, error) {
	    // Show the error message somewhere and let the user try again.
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}