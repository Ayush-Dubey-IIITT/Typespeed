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
    const data= await response.json();
    if(!response.ok){
        login_error.textContent=data.detail;
        return;
    }
    localStorage.setItem("access_token",data.access_token);

    const pendingTest=sessionStorage.getItem("pendingTest");
    if(pendingTest){
        const testData=JSON.parse(pendingTest);
        const saveResponse=fetch("https://typespeed-cwb6.onrender.com/history",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify(testData)
        });
        if(saveResponse.ok){
            sessionStorage.removeItem("pendingTest");
            window.location.href='index.html';
        }
    }
    form.reset();
    window.location.href='index.html?login=success';
});
function togglePassword(inputId,btn){
  const input=document.getElementById(inputId);
  if(input.type==="password"){
    input.type="text";
    btn.textContent="Hide";
  }
  else{
    input.type="password";
    btn.textContent="Show";
  }
}