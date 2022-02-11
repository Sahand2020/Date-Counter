const endDate = document.querySelector("input[name = 'endDate']");
const Clock = document.querySelector("#clock");
var TimeInterval;
let TimeStop = true;
const saveValue = localStorage.getItem("countDown") || false;

if (saveValue) {
  StartClock(saveValue);
  let InputValue = new Date(saveValue);
  endDate.valueAsDate = InputValue;
}

function DateCounter() {
  const paramTime = new Date(endDate.value);
  localStorage.setItem("countDown", paramTime);
  clearInterval(TimeInterval);
  StartClock(paramTime);
  TimeStop = true;
}

function StartClock(date) {
  function UpdateClock() {
    let tl = TimeLeft(date);
    if (tl.total <= 0) {
      TimeStop = false;
    }
    for (let item in tl) {
      let replace = Clock.querySelector("." + item);
      replace.innerHTML = tl[item];
    }
  }
  UpdateClock();
  if (TimeStop) {
    TimeInterval = setInterval(UpdateClock, 1000);
  } else {
    clearInterval(TimeInterval);
  }
}

function TimeLeft(date) {
  let currentTime = new Date();
  let total = Date.parse(date) - Date.parse(currentTime);

  let seconds = Math.floor((total / 1000) % 60);
  let minutes = Math.floor((total / 1000 / 60) % 60);
  let hours = Math.floor((total / 1000 / 60 / 60) % 24);
  let days = Math.floor((total / 1000 / 60 / 60 / 24) % 30);
  let months = Math.floor(total / 1000 / 60 / 60 / 24 / 30);

  return {
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}

endDate.addEventListener("change", DateCounter);
