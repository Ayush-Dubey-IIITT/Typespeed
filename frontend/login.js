const form=document.getElementById("Login-form");
form.addEventListener("submit",async (event)=>{
    event.preventDefault();
    const email=document.getElementById("email").value;
    const pass=document.getElementById("pass").value;
    const login_error=document.getElementById("login-error");
    const response=await fetch("http://127.0.0.1:8000/login",{
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
    console.log(data);
    form.reset();
    window.location.href='index.html';
});