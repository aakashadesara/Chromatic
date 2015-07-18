function dashboard(user){
	$("#login-wrapper").hide();
	$("#topRightNavBar").html("<li><a onClick=\"dashboard();\">Dashboard</a></li><li><a onClick=\"chromatic();\">Chromatic</a></li><li><a onClick=\"location.reload();\">Signout</a></li>");
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