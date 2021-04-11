const nav = document.getElementById("dropdown").firstElementChild;
let logged = false;
fetch("/scripts/profile.json")
  .then((response) => response.json())
  .then((info) => {
    if (info.active) {
      logged = true;
      nav.textContent = info.name;
      nav.href = "#";
    } else {
      logged = false;
      nav.textContent = "Войти";
      nav.href = "login";
    }
  })
  .then(() => {
    if (logged) {
      document.getElementById("dropdown").addEventListener("mouseenter", showDropdownTable);
      document.getElementById("dropdown").addEventListener("mouseleave", showDropdownTable);
    }
  });
function showDropdownTable() {
  document.getElementById("dropdown-content").classList.toggle("show");
}
window.onclick = function (event) {
  if (!event.target.matches(".dropdown")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
