var email = $("#email");
var password = $("#password");
var loginButton = $("#loginButton");

loginButton.on('click', function(e) {

    $.ajax({
    
        type: "POST",
        url: "/api/login",
        data: {
    
            email,
            password
    
        },
    
        success: function() {
    
            console.log(arguments);
    
        }
    
    });
});