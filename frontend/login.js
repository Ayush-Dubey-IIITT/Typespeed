const form=document.getElementById("Login-form");
form.addEventListener("submit",async (event)=>{
    event.preventDefault();
    const email=document.getElementById("email").value;
    const pass=document.getElementById("pass").value;
    const login_error=document.getElementById("login-error");
    const response=await fetch("https://typespeed-cwb6.onrender.com/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email:email,
            password:pass
        })
    });
    const data= await response.json()
    if(!response.ok){
        login_error.textContent=data.detail;
        return;
    }
    localStorage.setItem("access_token",data.access_token)
    form.reset();
    window.location.href='index.html';
});