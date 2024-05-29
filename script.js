const toggleBtn = document.getElementById("line-bar");
const memoSec = document.querySelector("aside");
const mainSec = document.querySelector(".sub1-container");
const darkShadow = document.querySelector(".dark");
const saveBtn = document.querySelector(".save");
let historyItemList = document.querySelector(".add-items");
let inputThoughts = document.querySelector("#thoughts");

// creating toggle button
toggleBtn.addEventListener("click", () => {
  const crossBtn = document.querySelector(".icon-x");

  memoSec.style.display = "block";
  memoSec.classList.add("toggleEff");
  darkShadow.classList.add("shadow");
  crossBtn.style.display = "block";
  crossBtn.addEventListener("click", () => {
    memoSec.style.display = "none";
    darkShadow.classList.remove("shadow");
  });
});

function closeSideBar() {
  memoSec.style.display = "none";
  darkShadow.classList.remove("shadow");
}

// Date function
let date = document.querySelector(".date");
let getDate = new Date();
let day = String(getDate.getDate()).padStart(2, "0");
let month = String(getDate.getMonth() + 1).padStart(2, "0");
let year = getDate.getFullYear();
const dateForm = `${day}-${month}-${year}`;
date.value = dateForm;

// show warning on empty input
function showWarning() {
  const warn = document.querySelector(".warning");
  warn.style.display = "block";
  setTimeout(() => {
    warn.style.display = "none";
  }, 2500);
}

// save function
saveBtn.addEventListener("click", () => {
  if (inputThoughts.value !== "") {
    location.reload();
    saveDate();
    saveMessage();
    historyContainer();
  } else {
    showWarning();
  }
});

var arrOfDate = JSON.parse(localStorage.getItem("arrOfDate")) || [];
var arrOfMsg = JSON.parse(localStorage.getItem("arrOfMsg")) || [];

// saving date on local storage
function saveDate() {
  let dateValue = date.value;

  let checkIndex = arrOfDate.findIndex((item) => item.title === dateValue);
  if (checkIndex === -1) {
    arrOfDate.push({ title: dateValue });
    localStorage.setItem("arrOfDate", JSON.stringify(arrOfDate));
  }
}

// saving message written on local storage
function saveMessage() {
  let msgValue = inputThoughts.value;

  let dateIdx = arrOfDate.findIndex((item) => item.title === date.value);
  if (dateIdx !== -1) {
    let msgIdx = arrOfMsg.findIndex((item, index) => index === dateIdx);

    // date already exists then override the message
    if (msgIdx !== -1) {
      arrOfMsg[msgIdx] = { msg: msgValue };
    } else {
      arrOfMsg.push({ msg: msgValue });
    }

    localStorage.setItem("arrOfMsg", JSON.stringify(arrOfMsg));
  }
}

// create date title in sidebar
function historyContainer() {
  let dateValue = date.value;

  let container = document.querySelectorAll(".historyList");
  let checkDate = Array.from(container).some(
    (list) => list.textContent === dateValue
  );

  if (!checkDate) {
    let newEl = document.createElement("div");
    newEl.classList.add("historyList");
    newEl.textContent = dateValue;
    historyItemList.appendChild(newEl);
  }
}

// var newEl;
// display data when the window loads
window.addEventListener("load", () => {
  if (arrOfDate.length > 0) {
    arrOfDate.forEach((item) => {
      let newEl = document.createElement("div");
      newEl.classList.add("historyList");
      newEl.textContent = item.title;
      historyItemList.appendChild(newEl);
    });
  }

  // show data on the inputBox when clicked on Historydiv
// adding eventListener on each history container item
  let memoDiv = historyItemList.children;
  memoDiv = Array.from(memoDiv);
  memoDiv.forEach((childDiv, index) => {
    childDiv.addEventListener("click", () => {
      let arrDate = JSON.parse(localStorage.getItem("arrOfDate"));
      let arrMsg = JSON.parse(localStorage.getItem("arrOfMsg"));

      let title = arrDate[index].title;
      let message = arrMsg[index].msg;

      date.value = title;
      inputThoughts.value = message;

      const allDltBtn = document.querySelector(".btn-alldlt");
      allDltBtn.addEventListener("click", () => {
        let title = date.value;
        for(let i = 0; i < arrOfDate.length; i++) {
          if(title == arrOfDate[i].title) {
            arrOfDate.splice(i, 1);
            arrOfMsg.splice(i, 1);

            localStorage.setItem("arrOfDate", JSON.stringify(arrOfDate));
            localStorage.setItem("arrOfMsg", JSON.stringify(arrOfMsg));
            location.reload();
            closeSideBar();
          }
        }
      })
    });
  });
});

let dltBtn = document.querySelector(".clear");
dltBtn.addEventListener("click", () => {
  location.reload();
})