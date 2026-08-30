const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const char = document.getElementById("chars");
const dnt = document.getElementById("dnt");

async function get_tests() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    alert("Please login to see your saved tests!");
    window.location.href = `index.html`;
    return;
  }

  const response = await fetch(
    "https://typespeed-cwb6.onrender.com/history/saved",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  const template = document.getElementById("test-template");
  const historyList = document.getElementById("history-list");

  data.forEach((test) => {
    const card = template.cloneNode(true);

    card.removeAttribute("id");

    card.querySelector(".wpm").textContent = test.wpm;
    card.querySelector(".accuracy").textContent = `${test.accuracy}%`;
    card.querySelector(".chars").textContent = test.char;

    card.querySelector(".dnt").textContent = new Date(
      test.date_time,
    ).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    historyList.appendChild(card);
  });
}
get_tests();
