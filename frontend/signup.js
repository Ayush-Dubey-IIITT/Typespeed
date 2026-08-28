const form=document.getElementById("signup-form")
if(form){
  form.addEventListener("submit", async (event)=>{
    event.preventDefault();
    const username=document.getElementById("user").value;
    const email=document.getElementById("email").value;
    const pass=document.getElementById("pass").value;
    const conf_pass=document.getElementById("conf_pass").value;
    const signup_error=document.getElementById("signup-error");
    if(pass!==conf_pass){
      signup_error.textContent="Passwords do not match! Please try again.";
      return;
    }
    const response= await fetch("http://127.0.0.1:8000/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        username:username,
        email:email,
        password:pass
      })
    });
    const data=await response.json();
    if(!response.ok){
      signup_error.textContent=data.detail;
      return;
    }
    console.log(data);
    form.reset();
    window.location.href='index.html';
  });
}