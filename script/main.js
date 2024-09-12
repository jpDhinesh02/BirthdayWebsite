const birthday = new Date("2024-09-12T00:00:00"); // Change to your birthday date
const now = new Date();
// const now = new Date('2024-09-12');
const countdownElement = document.getElementById("countdown");
const contentElement = document.getElementById("content");
const waitingMessages = [
  "Just a moment...",
  "Hang tight!",
  "Almost there...",
  "Stay tuned!",
  "Counting down...",
  "Hold on tight!",
  "Excitement builds...",
  "The wait is nearly over!",
  "Patience, please...",
  "Any moment now...",
  "We're almost ready...",
  "Anticipation rising...",
  "Get ready...",
  "It's happening soon...",
  "The countdown continues...",
  "Nearly there...",
  "Keep watching...",
  "Not much longer...",
  "On the edge of your seat?",
  "Stay excited!",
  "Moments away...",
  "Hold your breath!",
  "The suspense is real...",
  "Just around the corner...",
  "Brace yourself...",
  "Tick-tock...",
  "The big moment is close...",
  "Hang on...",
  "Almost at the finish line...",
  "Seconds away...",
  "We're getting closer...",
  "Prepare yourself...",
  "Just a few more seconds...",
  "Anticipation...",
  "It's almost time...",
  "The thrill is near...",
  "Ready or not...",
  "Get set...",
  "Final stretch...",
  "Right around the bend...",
  "Moments from now...",
];
function updateCountdown() {
  const now = new Date();
  const timeLeft = birthday - now;
  const timerElement = document.getElementById("timer");
  const waitingMessageElement = document.getElementById("waitingMessage");
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  const randomIndex = Math.floor(Math.random() * waitingMessages.length);
  waitingMessageElement.innerHTML = waitingMessages[randomIndex];
}
function enableAudioOnInteraction() {
  const interactionEvents = [
    "click",
    "scroll",
    "mousemove",
    "keydown",
    "touchstart",
  ];

  interactionEvents.forEach((event) => {
    window.addEventListener(
      event,
      function playOnInteraction() {
        audio.play().catch((error) => {
          console.error("Audio playback failed after interaction:", error);
        });
        // Remove event listener after first successful interaction
        window.removeEventListener(event, playOnInteraction);
      },
      { once: true }
    );
  });
}
let audio;
if (now < birthday) {
  countdownElement.style.display = "block";
  updateCountdown();
  audio = new Audio("audio/wait.mp3");
  audio.preload = "auto";
  audio.loop = true;
  audio.load();
  audio.play().catch((error) => {
    console.warn("Autoplay was blocked:", error);
    enableAudioOnInteraction();
  });
  setInterval(updateCountdown, 1000);
} else {
  countdownElement.style.display = "none";
  contentElement.style.display = "block";
  audio = new Audio("audio/Good_Morning_to_All(chosic.com).mp3");
  audio.preload = "auto";
  audio.loop = true;
  audio.load();
  audio.play().catch((error) => {
    console.warn("Autoplay was blocked:", error);
    enableAudioOnInteraction();
  });
}

// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("customize.json")
    .then((data) => data.json())
    .then((data) => {
      dataArr = Object.keys(data);
      dataArr.map((customData) => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .querySelector(`[data-node-name*="${customData}"]`)
              .setAttribute("src", data[customData]);
          } else {
            document.querySelector(
              `[data-node-name*="${customData}"]`
            ).innerText = data[customData];
          }
        }

        // Check if the iteration is over
        // Run amimation if so
        if (dataArr.length === dataArr.indexOf(customData) + 1) {
          animationTimeline();
        }
      });
    });
};
// Animation Timeline
const animationTimeline = () => {
  // Spit chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  const tl = new TimelineMax();

  tl.to(".container", 0.1, {
    visibility: "visible",
  })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10,
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10,
      // scale: 0.7
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=2"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0,
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0,
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {
        visibility: "visible",
      },
      0.05
    )
    .to(".fake-btn", 0.1, {
      backgroundColor: "rgb(127, 206, 248)",
    })
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150,
      },
      "+=0.7"
    )
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0,
      },
      "+=0.5"
    )
    .to(
      ".idea-5 .smiley",
      0.7,
      {
        rotation: 90,
        x: 8,
      },
      "+=0.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0,
      },
      "+=2"
    )
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut,
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut,
      },
      0.2,
      "+=1"
    )
    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400,
      },
      {
        opacity: 1,
        y: -1000,
      },
      0.2
    )
    .from(
      ".lydia-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45,
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0,
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        // scale: 0.3,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5),
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150,
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut,
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg",
      },
      "party"
    )
    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4,
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1",
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90,
      },
      "+=1"
    );

  // tl.seek("currentStep");
  // tl.timeScale(2);

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
  });
};
// Run fetch and animation in sequence
fetchData();

document.addEventListener("click", (event) => {
  const heartContainer = document.getElementById("heart-container");
  const numHearts = 5; // Number of hearts per click
  const heartSize = 2; // Size multiplier
  const delayBetweenHearts = 100; // Delay between each heart in milliseconds

  for (let i = 0; i < numHearts; i++) {
    setTimeout(() => {
      // Create heart element
      const heart = document.createElement("span");
      heart.className = "heart";
      heart.textContent = "❤️";
      heart.style.fontSize = `${heartSize}rem`;

      // Randomize the position around the click
      const offsetX = (Math.random() - 0.5) * 20; // Adjust range for randomness
      const offsetY = (Math.random() - 0.5) * 20;
      heart.style.left = `${event.clientX + offsetX}px`;
      heart.style.top = `${event.clientY + offsetY}px`;

      // Apply animation
      heart.style.opacity = 1;
      heart.style.animation = `flyUp 1s forwards`;

      // Append heart to container
      heartContainer.appendChild(heart);

      // Remove heart from DOM after animation ends
      heart.addEventListener(
        "animationend",
        () => {
          heart.remove();
        },
        { once: true }
      );
    }, i * delayBetweenHearts); // Stagger heart creation
  }
});

document.addEventListener("click", () => {
  const magicMessage = document.getElementById("magic-message");
  if (magicMessage) {
    magicMessage.style.display = "none";
  }
});
