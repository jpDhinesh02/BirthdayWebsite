window.addEventListener("load", function () {
  const audio = document.getElementById("background-music-gift");
  audio.load();
  audio.play().catch((error) => {
    console.error("Audio playback failed:", error);
  });
});
const orderButton = document.getElementById("order");
let clickCount = 0;
let hoverCount = 0;
let moveButtonEnabled = false;
orderButton.addEventListener("click", function () {
  let modal = document.getElementsByClassName("modal")[0];
  clickCount++;
  if (clickCount > 15) {
    orderButton.textContent = "Congrats, you caught me!";
    modal.style.display = "block";
    sendEmail();
    orderButton.removeEventListener("mouseenter", onButtonHover);
  } else {
    moveButtonEnabled = true;
    console.log("Button movement enabled.");
    moveButtonRandomly();
    updateButtonText();
  }
});

function moveButtonRandomly() {
  const container = document.querySelector(".container");
  const maxX = container.clientWidth - orderButton.offsetWidth;
  const maxY = container.clientHeight - orderButton.offsetHeight;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  orderButton.style.left = `${randomX}px`;
  orderButton.style.top = `${randomY}px`;
}
const phrases = [
  "You’re too slow!",
  "Nice try, though!",
  "Almost had me!",
  "Not that easy, huh?",
  "Try again!",
  "I'm still here!",
  "Better move faster!",
  "Is that all you got?",
  "You’re getting warmer!",
  "Catch me if you can!",
  "I'm just out of reach!",
  "Still not quick enough!",
  "You almost got it!",
  "Keep those reflexes sharp!",
  "Think you can catch me?",
  "You’re getting closer!",
  "Don’t give up!",
  "Quick, before I move again!",
  "How's your speed now?",
  "You’re almost there!",
];

let currentPhrase;
const lastPhrase = [];
function updateButtonText() {
  const randomIndex = Math.floor(Math.random() * phrases.length);
  currentPhrase = phrases[randomIndex];
  if (!lastPhrase.includes(currentPhrase)) {
    orderButton.textContent = currentPhrase;
    lastPhrase.push(currentPhrase);
  } else {
    updateButtonText();
  }
}

close.onclick = function () {
  modal.style.display = "none";
};

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

async function sendEmail() {
  try {
    const response = await fetch(
      "https://happieebdaytou.netlify.app/.netlify/functions/send-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "j9894330583@gmail.com,karthikv.healthguru@gmail.com",
          subject: "Subject of the email",
          text: "Body of the email",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
