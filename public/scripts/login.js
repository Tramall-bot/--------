const btn = document.getElementsByTagName("form")[0];
btn.addEventListener("submit", func);
function func() {
  fetch("/scripts/profile.json")
    .then((response) => response.json())
    .then((info) => {
      info.active = true;
      fs.writeFile(__dirname + "/public/scripts/profile.json", JSON.stringify(info), (err) => {
        if (err) {
          console.log(err);
        }
      });
      window.location.replace("/");
    });
}
