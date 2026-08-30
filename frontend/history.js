const wpm=document.getElementById("wpm");
const accuracy=document.getElementById("accuracy");
const char=document.getElementById("chars");
const dnt=document.getElementById("dnt");

async function get_tests(){
    const token=localStorage.getItem("access_token")
    if(!token){
        alert("Please login to see your saved tests!");
        window.location.href=`index.html`;
        return;
    }
    
    const response=await fetch("https://typespeed-cwb6.onrender.com/history/saved",{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    });
    const data=await response.json();
    wpm.textContent=data.wpm;
    accuracy.textContent=data.accuracy;
    char.textContent=data.char;
    dnt.textContent=new Date(data.date_time).toLocaleString("en-IN",{
        timeZone:"Asia/Kolkata",
        dateStyle:"medium",
        timeStyle:"short"
    });
}
get_tests();