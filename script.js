const heartsContainer = document.getElementById('hearts');
const line = document.querySelector("#line");
let textdiv = document.querySelector(".textdiv");

const firsttext = "Happy birthday Rima ";
const secondtext = "Lots of loves and wishes from Debmalya";
const thirdtext = "Do you want to see what I made?";

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (5 + Math.random() * 3) + 's';
  heart.innerText = '💖';
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

setInterval(createHeart, 50);

let count = 1;

let textchange = setInterval(function () {
  if (count === 1) {
    line.innerText = firsttext;
    count++;
  }
  else if (count === 2) {
    line.innerText = secondtext;
    count++;
  }
  else if (count === 3) {
    line.innerText = thirdtext;
    
    // Create button container
    const btnContainer = document.createElement("div");
    btnContainer.style.marginTop = "10px";
    btnContainer.style.position = "relative";
    btnContainer.style.height = "350px"; // more space for movement
    btnContainer.style.width = "350px";

    // Yes button
    const btn1 = document.createElement("button");
    btn1.innerText = "Yes";
    btn1.style.marginRight = "10px";
    btn1.style.backgroundColor = "blue";
    btn1.onclick = () => {
  // Create overlay for countdown
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

  // Create popup box
  const popup = document.createElement("div");
  popup.style.background = "white";
  popup.style.padding = "20px 40px";
  popup.style.borderRadius = "10px";
  popup.style.fontSize = "2rem";
  popup.style.fontWeight = "bold";
  popup.style.textAlign = "center";

  let countdown = 3;
  popup.innerText = countdown;
  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  // Countdown logic
  const interval = setInterval(() => {
    countdown--;
    popup.innerText = countdown;

    if (countdown < 0) {
      clearInterval(interval);
      document.body.removeChild(overlay);

      // Dark theme
      document.body.style.background = "#000";
      document.body.style.color = "#fff";

      // Hide everything except hearts
      Array.from(document.body.children).forEach(child => {
        if (child.id !== "hearts") {
          child.style.display = "none";
        }
      });

      // Create centered blue div
      const blueBox = document.createElement("button");
      blueBox.style.background = "black";
      blueBox.style.height = "50px";
      blueBox.style.width = "200px";
      blueBox.style.position = "fixed";
      blueBox.style.top = "10%";
      blueBox.style.left = "50%";
      blueBox.style.transform = "translate(-50%, -50%)";
      blueBox.style.borderRadius="10px"
      blueBox.innerText="Light on"
      blueBox.style.border="0.5px solid blue"
      blueBox.style.fontSize="20px"
      blueBox.style.color="white"
      blueBox.style.fontWeight="800"
      document.body.appendChild(blueBox);
      blueBox.onclick = () => {
        firstclick()
        blueBox.style.border="none"
        blueBox.style.background="linear-gradient(120deg,seagreen,skyblue)"
      }


    }
  }, 1000);
};




    // No button
    const btn2 = document.createElement("button");
    btn2.innerText = "Yes";
    btn2.style.position = "fixed"; // can move anywhere inside container
   
    btn2.addEventListener("mouseover", () => {
      let randomX = Math.random() * (btnContainer.clientWidth - btn2.offsetWidth);
      let randomY = Math.random() * (btnContainer.clientHeight - btn2.offsetHeight);
      btn2.style.left = randomX+"px";
      btn2.style.top = randomY+"px";
    });

    btn2.onclick = () => alert('This is not the correct buttton lol.🤣🤣🤣');

    // Append
    btnContainer.appendChild(btn1);
    btnContainer.appendChild(btn2);
    textdiv.insertAdjacentElement("afterend", btnContainer);

    count++;
  }
  else {
    clearInterval(textchange);
  }
}, 3000);



function firstclick(){
  document.body.style.background="linear-gradient(0deg,black,skyblue)"
  
}

