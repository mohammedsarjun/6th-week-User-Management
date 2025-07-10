$(document).ready(function(){
    
    //Form Validation--------------------------------
    let submitBtn=$("#submit-btn")
    let emailPattern = /^\w+[@][a-z]{1,}[.][a-z|A-Z]*$/
     submitBtn.click((e)=>{
    
        //name validation
        if($("#user-name").val().length==0){
            e.preventDefault()
            $("#name-error").text("Enter your name !")
        }
        else{
            $("#name-error").text("")
        }
        //email validation
        if($('#email').val().length==0){
            e.preventDefault()
            $('#email-error').text("Enter Your Email !")
        }
        else if(!emailPattern.test($('#email').val())){
            e.preventDefault()
            $('#email-error').text("Enter Your Email Properly !")
        }
        else{
            $('#email-error').text("")  
        }
         //gender validation
         if(!$("input[name='gender']:checked").length>0){
            e.preventDefault()
            $('#gender-error').text("Select Your gender")
         }
         else{
            $('#gender-error').text("")
         }
    
    //password validation
    
    //--------------regex for password------------------///
    
    if ($('#password').val().length < 8) {
        e.preventDefault()
        $('#password-error').text("Password must be at least 8 characters long.");
    }
    
    else if (!/(?=.*[a-z])/.test($('#password').val())) {
        e.preventDefault()
        $('#password-error').text("Password must contain at least one lowercase letter.");
    }
    
    else if (!/(?=.*[A-Z])/.test($('#password').val())) {
        e.preventDefault()
        $('#password-error').text("Password must contain at least one uppercase letter.");
    }
    
    else if (!/(?=.*\d)/.test($('#password').val())) {
        e.preventDefault()
        $('#password-error').text("Password must contain at least one digit.");
    }
    
    else if (!/(?=.*[@$!%*?&])/.test($('#password').val())) {
        e.preventDefault()
        $('#password-error').text("Password must contain at least one special character (@, $, !, %, *, ?, &).");
    }
    
    else{
        $('#password-error').text("");
    }
    //--------------regex for password end here------------------///
    
    //confirm password validation
    if ($('#confirm-password').val().length==0) {
        e.preventDefault()
        $('#confirm-password-error').text("Enter Confirm password");
    }
    else if($('#password').val()!=$("#confirm-password").val()){
        e.preventDefault()
        $('#confirm-password-error').text("Entered password doesn't match !")
    }
    else{
        $('#confirm-password-error').text("")
    }
     })
    
     //Form Validation Completed Here--------------------------------
    })