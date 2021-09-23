let setDate = () => {
  const d = new Date();
  console.log("setDate: ", d);
  secHand(d);
  minHand(d);
  hourHand(d);
};

let secHand = (d) => {
  const s = d.getSeconds();
  const sDeg = (s / 60) * 360 + 90;
  const secondHand = document.querySelector(".second-hand");
  secondHand.style.transform = `rotate(${sDeg}deg)`;
  console.log("secHand: ", s);
  console.log("secHand: ", sDeg);
};
let minHand = (d) => {
  const m = d.getMinutes();
  const mDeg = (m / 60) * 360 + 90;
  const minuteHand = document.querySelector(".min-hand");
  minuteHand.style.transform = `rotate(${mDeg}deg)`;
  console.log("minuteHand: ", m);
  console.log("minuteHand: ", mDeg);
};
let hourHand = (d) => {
  const h = d.getHours();
  const hDeg = (h / 12) * 360 + 90;
  const hourHand = document.querySelector(".hour-hand");
  hourHand.style.transform = `rotate(${hDeg}deg)`;
  console.log("hourHand: ", h);
  console.log("hourHand: ", hDeg);
};
setInterval(setDate, 1000);
