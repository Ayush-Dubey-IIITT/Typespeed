const token=localStorage.getItem("access_token");
if(!token){
    window.location.href='login.html';
}
const username=document.getElementById("username");
const email=document.getElementById("email");

async function getProfile(){
    const response= await fetch("http://127.0.0.1:8000/users/me",{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    });
    if(!response.ok){
        window.location.href='login.html';
        return;
    }
    const user=await response.json();
    username.textContent=user.username;
    email.textContent=user.email;
}
getProfile();   