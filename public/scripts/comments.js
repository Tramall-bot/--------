const id = document.getElementsByClassName("content")[0].firstElementChild;
const date = new Date();
let book;
let _logged = false;
let prof_name;
fetch("/scripts/profile.json")
  .then((response) => response.json())
  .then((info) => {
    if (info.active) {
      _logged = true;
      prof_name = info.name;
    }
  });
if (id) {
  fetch("/scripts/comments.json")
    .then((response) => response.json())
    .then((info) => {
      info.forEach((elem) => {
        if (elem.book === id.innerHTML) {
          book = elem.comments;
        }
      });
    })
    .then(() => {
      loadComments();
    });
}

function loadComments() {
  book.forEach((elem) => {
    const newComment = document.createElement("div");
    newComment.classList.add("commentWrapper");
    const info = document.createElement("div");
    info.classList.add("commentInfo");
    info.innerText = elem.name + " " + elem.date;
    newComment.appendChild(info);
    const comment = document.createElement("div");
    comment.classList.add("comment");
    comment.innerText = elem.comment;
    newComment.appendChild(comment);
    document.getElementById("commentSection").appendChild(newComment);
  });
}

document.getElementById("submit").addEventListener("click", function (event) {
  saveComment();
  if (document.getElementById("commentSection").firstChild.elements[0].value) addComment();
  else {
    event.preventDefault();
  }
});

function saveComment() {
  const form = document.getElementById("commentForm");
  form.elements[2].value = id.innerHTML.split(" ").join("_");
  if (_logged) {
    form.elements[3].value = prof_name;
  } else {
    form.elements[3].value = "Гость";
  }
  form.elements[4].value =
    date.getDate() + "." + (date.getMonth() + 1) + ". " + date.getHours() + ":" + date.getMinutes();
}

function addComment() {
  const newComment = document.createElement("div");
  newComment.classList.add("commentWrapper");
  const info = document.createElement("div");
  info.classList.add("info");
  if (_logged)
    info.innerText =
      prof_name +
      " " +
      date.getDate() +
      "." +
      (date.getMonth() + 1) +
      ". " +
      date.getHours() +
      ":" +
      date.getMinutes();
  else
    info.innerText =
      "Гость " +
      date.getDate() +
      " " +
      (date.getMonth() + 1) +
      " " +
      date.getHours() +
      " " +
      date.getMinutes();
  newComment.appendChild(info);
  const comment = document.createElement("div");
  comment.classList.add("comment");
  comment.innerText = document.getElementById("commentForm").elements[0].value;
  newComment.appendChild(comment);
  document.getElementById("commentSection").appendChild(newComment);
}
