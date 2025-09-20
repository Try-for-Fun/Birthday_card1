// ====================== VARIABLES ======================
const heartsContainer = document.getElementById("hearts");
const line = document.querySelector("#line");
const textdiv = document.querySelector(".textdiv");

const firsttext = "Happy birthday Rima ";
const secondtext = "Lots of loves and wishes from Debmalya";
const thirdtext = "Do you want to see what I made?";

let count = 1;
let textchange;
let audio;

// ====================== HEARTS ======================
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 5 + Math.random() * 3 + "s";
  heart.innerText = "🐼";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}

function startHearts() {
  setInterval(createHeart, 50);
}

// ====================== TEXT SEQUENCE ======================
function startTextChange() {
  textchange = setInterval(() => {
    if (count === 1) {
      line.innerText = firsttext;
      count++;
    } else if (count === 2) {
      line.innerText = secondtext;
      count++;
    } else if (count === 3) {
      line.innerText = thirdtext;
      createButtons();
      clearInterval(textchange);
    }
  }, 2000);
}

// ====================== BUTTONS ======================
function createButtons() {
  const btnContainer = document.createElement("div");
  btnContainer.style.marginTop = "5px";
  btnContainer.style.position = "relative";
  btnContainer.style.height = "5vh";
  btnContainer.style.width = "50vw";
  btnContainer.style.margin = "auto";

  const yesBtn = createYesButton();
  const noBtn = createNoButton(btnContainer);

  btnContainer.appendChild(yesBtn);
  btnContainer.appendChild(noBtn);

  textdiv.insertAdjacentElement("afterend", btnContainer);
}

function createYesButton() {
  const btn = document.createElement("button");
  btn.innerText = "Yes";
  btn.style.position = "absolute";
  btn.style.left = "10%";
  btn.style.top = "0";
  btn.style.backgroundColor = "blue";
  btn.style.color = "white";

  btn.onclick = () => startYesFlow();
  return btn;
}

function createNoButton(container) {
  const btn = document.createElement("button");
  btn.innerText = "No";
  btn.style.position = "absolute";
  btn.style.left = "50%";
  btn.style.top = "0";
  btn.style.backgroundColor = "red";
  btn.style.color = "white";
  btn.style.transition = "all 0.3s ease";

  btn.addEventListener("mouseover", () => {
    let randomX = Math.random() * (container.clientWidth - btn.offsetWidth);
    let randomY = Math.random() * (container.clientHeight - btn.offsetHeight);
    btn.style.left = randomX + "px";
    btn.style.top = randomY + "px";
  });

  btn.onclick = () => {
    const overlays = createOverlay();
    const popups = createPopup(
      "Dekhbina mane ato kosto kore banalam ar tui dekhbina, Toke dekhtei hobe 🤣🤣"
    );

    const okButton = document.createElement("button");
    okButton.innerText = "OK";
    okButton.style.marginTop = "20px";
    okButton.style.padding = "10px 20px";
    okButton.style.fontSize = "1.2rem";
    okButton.style.cursor = "pointer";
    okButton.onclick = () => document.body.removeChild(overlays);

    popups.appendChild(okButton);
    overlays.appendChild(popups);
    document.body.appendChild(overlays);
  };

  return btn;
}

// ====================== YES FLOW ======================
function startYesFlow() {
  const overlay = createOverlay();
  const popup = createPopup("1");
  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  let countdown = 1;
  const interval = setInterval(() => {
    countdown--;
    popup.innerText = countdown;
    if (countdown < 0) {
      clearInterval(interval);
      document.body.removeChild(overlay);
      showSurprisePopup();
    }
  }, 1000);
}

function showSurprisePopup() {
  const okOverlay = createOverlay();
  const okPopup = createPopup("Surprise! 🎉");

  const okButton = document.createElement("button");
  okButton.innerText = "OK";
  okButton.style.marginTop = "20px";
  okButton.style.padding = "10px 20px";
  okButton.style.fontSize = "1.2rem";
  okButton.style.cursor = "pointer";

  okButton.onclick = () => {
    document.body.removeChild(okOverlay);
    heartsContainer.style.display = "none"; // hide pandas
    activateDarkMode();
  };

  okPopup.appendChild(okButton);
  okOverlay.appendChild(okPopup);
  document.body.appendChild(okOverlay);
}

// ====================== DARK MODE & ACTION BUTTON ======================
function activateDarkMode() {
  document.body.style.background = "#000";
  document.body.style.color = "#fff";

  Array.from(document.body.children).forEach((child) => {
    if (child.id !== "hearts") child.style.display = "none";
  });

  const actionBtn = document.createElement("button");
  actionBtn.style.background = "black";
  actionBtn.style.height = "50px";
  actionBtn.style.width = "200px";
  actionBtn.style.position = "fixed";
  actionBtn.style.top = "10%";
  actionBtn.style.left = "50%";
  actionBtn.style.transform = "translate(-50%, -50%)";
  actionBtn.style.borderRadius = "10px";
  actionBtn.innerText = "Light on";
  actionBtn.style.border = "0.5px solid blue";
  actionBtn.style.fontSize = "20px";
  actionBtn.style.color = "white";
  actionBtn.style.fontWeight = "800";
  setInterval(skyFirecracker, 50);
  // First click: Light on
  actionBtn.onclick = () => {
    firstclick();
    // heartsContainer.style.display = "block"; // show pandas again
    

    actionBtn.style.border = "none";
    actionBtn.style.background = "linear-gradient(120deg,seagreen,skyblue)";
    actionBtn.innerText = "Play Music";

    // Second click: Play Music
    actionBtn.onclick = () => {
      playMusic();
      actionBtn.innerText = "Decorate 🎉";

      // Third click: Decoration
      actionBtn.onclick = () => {
        decoratePage();
        actionBtn.disabled = true;
      };
    };
  };

  document.body.appendChild(actionBtn);
}

// ====================== UTILITIES ======================
function createOverlay() {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "9999";
  return overlay;
}

function createPopup(text) {
  const popup = document.createElement("div");
  popup.style.background = "white";
  popup.style.padding = "20px 40px";
  popup.style.borderRadius = "10px";
  popup.style.fontSize = "2rem";
  popup.style.fontWeight = "bold";
  popup.style.textAlign = "center";
  popup.innerText = text;
  return popup;
}

function firstclick() {
  document.body.style.background = "linear-gradient(0deg,black,skyblue)";
}

// ====================== MUSIC ======================
function playMusic() {
  audio = new Audio("music.mp3"); // replace with your music file
  audio.play()
    .then(() => console.log("Music is playing 🎵"))
    .catch(err => console.error("Music play failed:", err));
}

// ====================== DECORATIONS ======================
function decoratePage() {
  // Balloons
  for (let i = 0; i < 100; i++) {
    const balloon = document.createElement("div");
    balloon.innerText = "🎈";
    balloon.style.position = "fixed";
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.top = "100vh";
    balloon.style.fontSize = "4rem";
    balloon.style.animation = `floatUp ${5 + Math.random() * 5}s linear forwards`;
    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 10000);
  }

  // Confetti
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.innerText = "✨";
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-10px";
    confetti.style.fontSize = "4rem";
    confetti.style.animation = `fallDown ${3 + Math.random() * 3}s linear forwards`;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 10000);
  }

  // Animation styles
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes floatUp { from { transform: translateY(0); } to { transform: translateY(-110vh); } }
    @keyframes fallDown { from { transform: translateY(0); } to { transform: translateY(110vh); } }
  `;
  document.head.appendChild(style);
}

// ====================== SKY FIRECRACKERS (READY TO CALL) ======================
// Launch firecracker from bottom
// Launch firecracker from bottom
function skyFirecracker() {
  const rocket = document.createElement("div");
  rocket.style.position = "fixed";
  rocket.style.bottom = "0";
  rocket.style.left = Math.random() * 80 + "vw";
  rocket.style.width = "6px";
  rocket.style.height = "12px";
  rocket.style.borderRadius = "3px";
  rocket.style.zIndex = "999";

  // Assign a random color for this rocket
  rocket.style.backgroundColor = getRandomBrightColor();

  document.body.appendChild(rocket);

  const explodeHeight = 40 + Math.random() * 30; // in vh
  const launchDuration = 800 + Math.random() * 40;

  rocket.animate(
    [{ bottom: "0vh" }, { bottom: explodeHeight + "vh" }],
    { duration: launchDuration, easing: "ease-out", fill: "forwards" }
  );

  setTimeout(() => {
    createExplosion(parseFloat(rocket.style.left), explodeHeight);
    document.body.removeChild(rocket);
  }, launchDuration);
}

// Create explosion with particles of different colors
function createExplosion(xPercent, yVh) {
  const numberOfParticles = 25;

  for (let i = 0; i < numberOfParticles; i++) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.left = xPercent + "vw";
    particle.style.bottom = yVh + "vh";
    particle.style.width = "6px";
    particle.style.height = "6px";
    particle.style.borderRadius = "50%";
    particle.style.backgroundColor = getRandomBrightColor();
    particle.style.zIndex = "999";
    document.body.appendChild(particle);

    const angle = Math.random() * 2 * Math.PI;
    const distance = 30 + Math.random() * 50;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    particle.animate(
      [
        { transform: "translate(0,0)", opacity: 1 },
        { transform: `translate(${dx}px, ${-dy}px)`, opacity: 0 }
      ],
      { duration: 1000 + Math.random() * 500, easing: "ease-out", fill: "forwards" }
    );

    setTimeout(() => particle.remove(), 1500);
  }
}

// Helper: generate bright random colors
function getRandomBrightColor() {
  const colors = ["#ff3b3b","#ffde3b","#3bff6f","#3bb1ff","#d23bff","#ff6fd2","#ff8c00","#00ffe5"];
  return colors[Math.floor(Math.random() * colors.length)];
}


// ====================== INIT ======================
startHearts();
startTextChange();
