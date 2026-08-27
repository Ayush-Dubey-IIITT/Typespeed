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
    signup_error.style.display="none";
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
    console.log(data);
  });
}