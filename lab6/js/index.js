(function($) {
    'use strict';
    $(function() {
      console.log("hello");

        let list = [
                {"user":"user","password":"admin"},
                {"user":"user2","password":"password2"},
                {"user":"user3","password":"password3"}
            ];
  
        var UserName = $('.user-name');
        var UserPassword = $('.user-password');
  
        $('.user-login-btn').on('click', function() {
          var user = UserName.val();
          var password = UserPassword.val();
          var userFound = false;
          for (var i = 0; i < list.length; i++) {
              if (list[i].user == user && list[i].password == password) {
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