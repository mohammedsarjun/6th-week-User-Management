$(document).ready(function(){
let submitBtn=$("#submit-btn")
let emailPattern = /^\w+[@][a-z]{1,}[.][a-z|A-Z]*$/

submitBtn.click((e)=>{
//Email validation
if($("#email").val().length==0){
    e.preventDefault()
    $('#email-error').text("Enter Your Email !")
}
else if(!emailPattern.test($("#email").val())){
    e.preventDefault()
    $('#email-error').text("Enter Your Email Properly !")
}
else{
    $('#email-error').text("")
}
//password validation
if ($("#password").val().length < 8) {
    e.preventDefault()
    $('#password-error').text("Password must be at least 8 characters long.");
}

else{
    $('#password-error').text("");
}
})
})

if (document.referrer.includes('passwordError') || document.referrer.includes('emailError')) {
    const url = window.location.origin + window.location.pathname;
    history.replaceState(null, '', url); // Replace the last history entry with a clean one
  }