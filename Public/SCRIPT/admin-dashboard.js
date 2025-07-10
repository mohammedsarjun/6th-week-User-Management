$(document).ready(()=>{
    $(".pf-logo").click(()=>{
        $('.profile-box').toggleClass('display-flex')
    })

    //Form Validation--------------------------------
    let submitBtn=$("#submit-btn")
    let emailPattern = /^\w+[@][a-z]{1,}[.][a-z|A-Z]*$/
     submitBtn.click((e)=>{
    
        //name validation
        if($("#user-name").val().length==0){
            e.preventDefault()
            $("#name-error").text("Enter user name !")
        }
        else{
            $("#name-error").text("")
        }
        //email validation
        if($('#email').val().length==0){
            e.preventDefault()
            $('#email-error').text("Enter user Email !")
        }
        else if(!emailPattern.test($('#email').val())){
            e.preventDefault()
            $('#email-error').text("Enter user Email Properly !")
        }
        else{
            $('#email-error').text("")  
        }
         //gender validation
         if(!$("input[name='gender']:checked").length>0){
            e.preventDefault()
            $('#gender-error').text("Select user gender")
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

})


let tableBody=document.getElementById("table-body")


async function fetchUser(){
    await fetch("admin/userDB").then(res=>res.json()).then(data=>{
        let tableRows=`<tr>
           <td>${1}</td>
            <td>${data[0].name}</td>
            <td>${data[0].email}</td>
            <td>${data[0].gender}</td>
            <td>
                <button onclick="editUser('${data[0]._id}', '${data[0].name}', '${data[0].email}', '${data[0].gender}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#userUpdateModal">Edit</button>
            </td>
            <td> <button onclick="deleteUser('${data[0]._id}')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#userDeleteModal">Delete</button></td>
        </tr>`;
        for(let i=1;i<data.length;i++){
           tableRows+= `<tr>
           <td>${i+1}</td>
            <td>${data[i].name}</td>
            <td>${data[i].email}</td>
            <td>${data[i].gender}</td>
            <td>
                <button onclick="editUser('${data[i]._id}', '${data[i].name}', '${data[i].email}', '${data[i].gender}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#userUpdateModal">Edit</button>
            </td>
            <td> <button onclick="deleteUser('${data[i]._id}')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#userDeleteModal">Delete</button></td>
        </tr>`
        }

        tableBody.innerHTML=tableRows
       
    }).catch(err => console.log(err));

    
}

window. deleteUser=async function (userId){
    let deleteConfirmButton=document.getElementById("deleteConfirmButton")
    const userIdParam=new URLSearchParams({userId:userId})
    deleteConfirmButton.addEventListener("click",async ()=>{
        try {
            const res = await fetch(`admin/deleteUser?${userIdParam}`, { method: "DELETE" });
    
            if (res.ok) {
                console.log(`User with ID ${userId} deleted successfully`);
                // Optionally, you can refresh the page or redirect after successful deletion
                window.location.href = '/admin';  // This will refresh the admin page
            } else {
                console.error("Failed to delete user:", res.statusText);
            }
        } catch (error) {
            console.error("Error during delete operation:", error);
        }
    })
}

window.editUser=function(userId,userName,userEmail,userGender){
    $("#update-user-name").val(userName)
    $("#update-email").val(userEmail)
    if(userGender=="male"){
        $("#update-gender1").prop("checked",true)
    }
    else{
        $("#update-gender2").prop("checked",true)
    }
    $("#update-user-name").val(userName)

    $("#update-submit-btn").click(()=>{
        const updatedUsers={
            id:userId,
            name:$("#update-user-name").val(),
            email: $("#update-email").val(),
            gender: $("input[name='gender']:checked").val(),
            password:$("#update-password").val()||null
        }
        

        try {
            const res = fetch("admin/update-user",{
                method:"PUT",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(updatedUsers)
            });
    
            if (res.ok) {
                console.log(`User with ID ${userId} deleted successfully`);
                // Optionally, you can refresh the page or redirect after successful deletion
                window.location.href = '/admin';  // This will refresh the admin page
            } else {
                console.error("Failed to delete user:", res.statusText);
            }
        } catch (error) {
            console.error("Error during delete operation:", error);
        }
    })
}

// search functionality


//clearing old tables for sorted tables
function clearTable() {
    $("#table-body").empty(); 
}

async function displaySearchResults(results){
    clearTable()

    if(results.length==0){
        $("#table-body").append("<tr><td colspan='4' class='error-mes'>No matching users found.</td></tr>");
        return
    }
    results.forEach((user,i) => {
        $("#table-body").append(`
            <tr>
            <td>${i+1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.gender}</td>
                <td>
                    <button onclick="editUser('${user._id}', '${user.name}', '${user.email}', '${user.gender}')" class="btn btn-success"data-bs-toggle="modal" data-bs-target="#userUpdateModal" >Edit</button>
                </td>
                 <td> <button onclick="deleteUser('${user._id}')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#userDeleteModal">Delete</button></td>
            </tr>
        `);
    });

}
$("#adminSearchBtn").click(async (e)=>{
e.preventDefault()
const query=$("#adminSearchBox").val().trim()

if (!query) {
    alert("Please enter a username to search!");
    return;
}

try{
const response= await fetch(`admin/search-user?query=${query}`,{
    method:"GET",
})

if(response.ok){
    const results= await response.json()
    displaySearchResults(results)
}

}
catch(error){
    console.error("Error fetching search results:", error);
}
})

fetchUser()



})







