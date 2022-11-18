async function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);
      }
  }
  rawFile.send(null);
}


(function($) {
  'use strict';
  
  $(function() {

    var list = [];

    list = readTextFile("login.json", function(text){
      var data = JSON.parse(text);
      console.log(data);
      list = data;
    }).then((data) => {
      console.log(data);
      // list.push(data);
      return list;
    });


      var UserName = $('.user-name');
      var UserPassword = $('.user-password');

      $('.user-login-btn').on('click', function() {
        console.log(list);
        console.log(list.users);
        let users = list.users;
        // rawFile.open("GET", "login.json", true);
        var user = UserName.val();
        var password = UserPassword.val();
        var userFound = false;
        for (var i = 0; i < users.length; i++) {
            if (users[i].user == user && users[i].password == password) {
                userFound = true;
                break;
          }
        }
        if (userFound) {
          window.location.href = 'http://localhost:3000/todo';
        } else {
          alert('Invalid username or password');
        }
      });
  

  });
})(jQuery);