const search = document.getElementsByTagName("textarea")[0];
const searchContent = document.getElementById("dropdown-content-form");
let books;
let blurBlocked = true;
fetch("/scripts/books.json")
  .then((response) => response.json())
  .then((info) => {
    books = info;
  })
  .then(() => {
    books.forEach((element) => {
      element.name = element.name.split("_").join(" ");
    });
  });
searchContent.onmouseover = () => {
  blurBlocked = true;
};
searchContent.onmouseout = () => {
  blurBlocked = false;
};
search.onfocus = () => {
  if (search.value !== "") {
    Focus();
  }
};
search.addEventListener("keydown", (event) => {
  if (
    ((event.keyCode < 91) & (event.keyCode > 64)) |
    (event.keyCode == 8) |
    (event.keyCode == 32)
  ) {
    if ((event.keyCode < 91) & (event.keyCode > 64)) {
      event.preventDefault();
      search.value += event.key;
    }
    Focus();
  }
});
search.onblur = () => {
  if (!blurBlocked) searchContent.classList.remove("show");
};

function Focus() {
  for (i = 0; i < 3; i++) {
    if (searchContent.firstElementChild) searchContent.removeChild(searchContent.firstElementChild);
  }
  const arr = new Array();
  for (i = 0; i < books.length; i++) {
    if (arr.length >= 3) {
      break;
    }
    if (
      (books[i].name.toLowerCase().indexOf(search.value.toLowerCase()) != -1) |
      (books[i].name.toUpperCase().indexOf(search.value.toUpperCase()) != -1)
    ) {
      const a = document.createElement("a");
      a.href = "catalog?book=" + books[i].name.split(" ").join("_");
      a.innerText = books[i].name;
      arr.push(a);
    }
  }
  for (i = 0; i < arr.length; i++) {
    searchContent.appendChild(arr[i]);
  }
  searchContent.classList.add("show");
}
document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  books.forEach((elem) => {
    if (elem.name.split("_").join(" ").toLowerCase() === search.value.toLowerCase()) {
      location.assign("catalog?book=" + elem.name);
    }
  });
});
