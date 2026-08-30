const input = document.getElementById("typing-input");
const textDisplay = document.getElementById("text-display");
const timer = document.getElementById("timer");
const extraChars = document.getElementById("extra-chars");
const WPM = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const final_wpm = document.getElementById("final-wpm");
const final_accuracy = document.getElementById("final-accuracy");
const total_char = document.getElementById("characters");
const test_end=document.getElementById("end-section");
let para;
let selectedTime = 30;
let startTime = null;
let testStarted = false;
let countdown;
const paragraphs = [
  "He swung back the fishing pole and cast the line which ell twenty five feet away into the river. The lure landed in the perfect spot and he was sure he would soon get a bite. He never expected that the bite would come from behind in the form of a bear.",
  "It was a good idea. At least, they all thought it was a good idea at the time. Hindsight would reveal that in reality, it was an unbelievably terrible idea, but it would take another week for them to understand that. Right now, at this very moment. they all agreed that it was the perfect course of action for the current situation.",
  "April seriously wondered about her sleeping partner choices. She looked at her bed and what a mess it had become. How did she get to the point in her life where she had two dogs, three cats, and a raccoon sleeping with her every night?",
  "That's all the note said. There was no indication from where it came or who may have written it. Had it been meant for someone else? Meghan looked around the room, but nobody made eye contact back. For a brief moment, she thought it might be a message for her to follow her dreams, but ultimately decided it was easier to ignore it as she crumpled it up and threw it away.",
  "It seemed like it should have been so simple. There was nothing inherently difficult with getting the project done. It was simple and straightforward enough that even a child should have been able to complete it on time, but that wasn't the case. The deadline had arrived and the project remained unfinished.",
  "Her mom had warned her. She had been warned time and again, but she had refused to believe her. She had done everything right and she knew she would be rewarded for doing so with the promotion. So when the promotion was given to her main rival, it not only stung, it threw her belief system into disarray. It was her first big lesson in life, but not the last.",
  "It's not his fault. I know you're going to want to, but you can't blame him. He really has no idea how it happened. I kept trying to come up with excuses I could say to mom that would keep her calm when she found out what happened, but the more I tried, the more I could see none of them would work. He was going to get her wrath and there was nothing I could say to prevent it.",
  "They rushed out the door, grabbing anything and everything they could think of they might need. There was no time to double-check to make sure they weren't leaving something important behind. Everything was thrown into the car and they sped off. Thirty minutes later they were safe and that was when it dawned on them that they had forgotten the most important thing of all.",
  "He had three simple rules by which he lived. The first was to never eat blue food. There was nothing in nature that was edible that was blue. People often asked about blueberries, but everyone knows those are actually purple. He understood it was one of the stranger rules to live by, but it had served him well thus far in the fifty years of his life.",
  "Daisy said with a smile on her face. It's often just the little things you do that can change a person's day for the better. Daisy truly believed this to be the way the world worked, but she didn't understand that she was merely a robot that had been programmed to believe this.",
  "There was no ring on his finger. That was a good sign although far from proof that he was available. Still, it was much better than if he had been wearing a wedding ring on his hand. She glanced at his hand a bit more intently to see if there were any tan lines where a ring may have been, and he's simply taken it off. She couldn't detect any which was also a good sign and a relief. The next step would be to get access to his wallet to see if there were any family photos in it.",
  "If you can imagine a furry humanoid seven feet tall, with the face of an intelligent gorilla and the braincase of a man, you'll have a rough idea of what they looked like except for their teeth. The canines would have fitted better in the face of a tiger, and showed at the corners of their wide, thin-lipped mouths, giving them an expression of ferocity.",
  "It was supposed to be a dream vacation. They had planned it over a year in advance so that it would be perfect in every way. It had been what they had been looking forward to through all the turmoil and negativity around them. It had been the light at the end of both their tunnels. Now that the dream vacation was only a week away, the virus had stopped all air travel.",
  "The picket fence had stood for years without any issue. That's all it was. A simple, white, picket fence. Why it had all of a sudden become a lightning rod within the community was still unbelievable to most. Yet a community that had once lived in harmony was now divided in bitter hatred and it had everything to do with the white picket fence.",
  "One can cook on and with an open fire. These are some of the ways to cook with fire outside. Cooking meat using a spit is a great way to evenly cook meat. In order to keep meat from burning, it's best to slowly rotate it. Hot stones can be used to toast bread. Coals are hot and can bring things to a boil quickly.",
  "If one is very adventurous, one can make a hole in the ground, fill it with coals and place foil-covered meat, veggies, and potatoes into the coals, and cover all of it with dirt. In a short period of time, the food will be baked. Campfire cooking can be done in many ways.",
];
function generate_random_para() {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  para = paragraphs[randomIndex];
  textDisplay.innerHTML = para
    .split("")
    .map(
      (char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`,
    )
    .join("");
}
generate_random_para();
function Duration(time) {
  timer.textContent = time;
  selectedTime = Number(time);
  testStarted = false;
  input.disabled = false;
  input.value = "";
  startTime = null;
  clearInterval(countdown);
}
const chars = textDisplay.querySelectorAll(".char");
input.addEventListener("input", () => {
  if (!testStarted) {
    testStarted = true;
    startTime = Date.now();
    countdown = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = selectedTime - elapsed;
      timer.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(countdown);
        timer.textContent = 0;
        input.disabled = true;
        Accuracy_Speed();
        document.getElementById("result-card").classList.add("show");
        test_end.style.display="flex";
      }
    }, 1000);
  }

  const typed = input.value;
  let html = "";
  let i = 0,
    j = 0;
  while (i < typed.length) {
    if (j < para.length && typed[i] === para[j]) {
      html += `<span class="char correct">${typed[i] === " " ? "&nbsp;" : typed[i]}</span>`;
      i++;
      j++;
    } else if (j < para.length && typed[i + 1] === para[j]) {
      html += `<span class="char extra">${typed[i] === " " ? "&nbsp;" : typed[i]}</span>`;
      i++;
    } else {
      html += `<span class="char wrong">${para[j] === " " ? "&nbsp;" : para[j]}</span>`;
      i++;
      j++;
    }
  }
  while (j < para.length) {
    html += `<span class="char">${para[j] === " " ? "&nbsp;" : para[j]}</span>`;
    j++;
  }
  textDisplay.innerHTML = html;
});
if (input.value.length >= para.length) {
  input.disabled = true;
}
function Accuracy_Speed() {
  let count = 0;
  para_input = input.value;
  let char = para_input.length;
  let i = 0;
  let j = 0;

  while (i < char && j < para.length) {
    if (para_input[i] === para[j]) {
      count++;
      i++;
      j++;
    } 
    else if (i + 1 < char && para_input[i + 1] === para[j]) {
      i++;
    } 
    else {
      i++;
      j++;
    }
  }
  let endTime = Date.now();
  let elapsedTime = endTime - startTime;
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  const acc = char === 0 ? "0" : ((count / char) * 100).toFixed(1);
  accuracy.textContent = `${acc}%`;
  const wpm = (char / (5 * (seconds / 60))).toFixed(2);
  WPM.textContent = wpm;
  final_wpm.textContent = wpm;
  final_accuracy.textContent = acc;
  total_char.textContent = i;
}
function Restart() {
  clearInterval(countdown);
  generate_random_para();
  input.value = "";
  input.disabled = false;
  timer.textContent = selectedTime;
  WPM.textContent = "0";
  accuracy.textContent = "0%";
  extraChars.textContent = "";
  testStarted = false;
  startTime = null;
  input.focus();
  document.getElementById("result-card").classList.remove("show");
}
async function checkAuth(){
  const token=localStorage.getItem("access_token");
  const signin=document.getElementById("signin-btn");
  const signup=document.getElementById("signup-btn");
  const profileIcon=document.getElementById("profile-icon");
  if(!token){
    signin.style.display="inline-block";
    signup.style.display="inline-block";
    profileIcon.style.display="none";
    return;
  }
  try{
    const response=await fetch("http://127.0.0.1:8000/users/me",{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    });
    if(!response.ok){
      localStorage.removeItem("access_token")
      signin.style.display="inline-block";
      signup.style.display="inline-block";
      profileIcon.style.display="none";
      return;
    }
    signin.style.display="none";
    signup.style.display="none";
    profileIcon.style.display="inline-block";
  }
  catch(error){
    console.log("Authentication check failed:",error);
  }
}
checkAuth();
const msg=document.getElementById("msg");
function confirm_popup(){
  const popup=document.getElementById("popup");
  popup.classList.add("show");
  setTimeout(()=>{
    popup.classList.remove("show");
  },3000);
}
const params=new URLSearchParams(window.location.search);
if(params.get("signup")==="success"){
  msg.textContent="Account created successfully!";
  confirm_popup();
}
if(params.get("login")==="success"){
  msg.textContent="Logged in successfully!";
  confirm_popup();
}
if(params.get("logout")==="success"){
  msg.textContent="Logged out successfully!";
  confirm_popup();
}
if(params.has("signup") || params.has("login") || params.has("logout")){
  window.history.replaceState({},document.title,'index.html');
}