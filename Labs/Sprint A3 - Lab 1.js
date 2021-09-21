let playSound = (e) => {
  const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
  const keys = document.querySelectorAll(".keys");
  const key = document.querySelector(`div.key[data-key='${e.keyCode}']`);
  if (!audio) {
    return;
  }
  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
  keys.forEach((key) => {
    key.addEventListener("transitionend", removeTransition);
  });
};
let removeTransition = (e) => {
  if (e.propertyName !== "transform") {
    return;
  }
  e.target.classList.remove("playing");
};
window.addEventListener("keydown", playSound);
