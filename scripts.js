const headerDiv = document.getElementById("header-div");
const hideHeaderDivBtn = document.getElementById("hide-header-div-btn");
const postItFormTemplate = document.querySelector("post-it-form");
const handyScroller = document.querySelector("handy-scroll");
const handyScrollerDiv = document.querySelector("div");
handyScrollerDiv.style.cursor = url('./pictures/icons8-3d-pointer-32.png'), auto;

const form = postItFormTemplate.shadowRoot.querySelector("form");

form.addEventListener("submit", createPostIt);

hideHeaderDivBtn.addEventListener("click", () => {
  if (headerDiv.className === "collapsed") {
    headerDiv.className = "expanded";
    hideHeaderDivBtn.className = "expanded";
  } else {
    headerDiv.className = "collapsed";
    hideHeaderDivBtn.className = "collapsed";
  }
});

function getCookie(name) {
  const cookieArray = document.cookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(`${name}=`) == 0) {
      return cookie.substring(name.length + 1);
    }
  }
  console.log("hello");
  return null;
}

function setCookie(name, value, daysLeft) {
  const date = new Date();
  date.setTime(date.getTime() + daysLeft * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}
function deletePostIt(event) {
  const [header, index] = event.target.id.split(";");
  const cookieJSON = getCookie("postIts");
  const cookieArray = cookieJSON ? JSON.parse(cookieJSON) : [];
  const newCookieArray = cookieArray.filter((valueObj, i) => {
    if (valueObj.header === header && index == i) return false;
    return true;
  });
  setCookie("postIts", JSON.stringify(newCookieArray), 7);
  displayPostIts();
}
function createPostIt(event) {
  event.preventDefault();
  const cookieJSON = getCookie("postIts");
  const cookieArray = cookieJSON ? JSON.parse(cookieJSON) : [];
  const valueObj = {
    header: event.target[0].value,
    paragraph: event.target[1].value,
    backgroundColor: event.target[2].value,
  };
  if (!Array.isArray(cookieArray)) {
    console.log("It wasn't an array for some reason");
  } else {
    cookieArray.push(valueObj);
    setCookie("postIts", JSON.stringify(cookieArray), 7);
  }

  displayPostIts();
  form.reset();
}
function displayPostIts() {
  const cookieArray = JSON.parse(getCookie("postIts"));
  const board = document.getElementById("board");
  board.innerHTML = "";
  !cookieArray
    ? ""
    : cookieArray.forEach((valueObj, i) => {
        const postIt = document.createElement("div");
        const deleteBtn = document.createElement("button");
        deleteBtn.id = valueObj.header + ";" + i;
        deleteBtn.addEventListener("click", deletePostIt);
        deleteBtn.innerHTML = "Delete";
        const header = document.createElement("h3");
        header.innerHTML = valueObj.header;
        const paragraph = document.createElement("p");
        paragraph.innerHTML = valueObj.paragraph;
        postIt.append(header);
        postIt.append(paragraph);
        postIt.append(deleteBtn);
        board.append(postIt);
        postIt.style.backgroundColor = valueObj.backgroundColor;
        postIt.id = `post-it-nr.${i + 1}`;
      });
}

window.onload = displayPostIts;
