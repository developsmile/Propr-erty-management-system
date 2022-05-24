// get data from user login page 
let id = document.querySelector('.user-id');
let password = document.querySelector('.user-password');
let login = document.querySelector('.login')
login.addEventListener('click',(e)=>{
    if(id.value==="kanha123" && password.value==="1234"){
        let data = {
            id : id.value,
            password :password.value
        }
        localStorage.setItem('user',JSON.stringify(data));
        window.location.href = "/media/kanhaiya/New Volume/Propery Management System/property.html"
    }else{
        window.alert("Your password is wrong");
    }
})


