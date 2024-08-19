const deleteAllButton = document.getElementById("delete-all");
deleteAllButton.addEventListener("click", () => {
  setCookie("postIts", null, null);
  displayPostIts();
});
const form = document.getElementById("form");
form.addEventListener("submit", createPostIt);

function getCookie(name) {
  const cookieArray = document.cookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(`${name}=` == 0)){
        console.log(cookie.substring(name.length + 1));
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
  console.log(event.target);
}
function createPostIt(event) {
  event.preventDefault();
  console.log(document.cookie);
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
}
function displayPostIts() {
  const cookieArray = JSON.parse(getCookie("postIts"));
  const board = document.getElementById("board");
  board.innerHTML = "";
  cookieArray.forEach((valueObj, i) => {
    const postIt = document.createElement("div");
    const deleteBtn = document.createElement("button");
    deleteBtn.id = valueObj.header + ";" + i;
    deleteBtn.addEventListener("click", deletePostIt);
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
