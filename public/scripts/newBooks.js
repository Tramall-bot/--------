const latest = document.getElementsByClassName("latest")[0].lastElementChild;
const mounthly = document.getElementsByClassName("mounthly")[0].lastElementChild;
fetch("/scripts/books.json")
  .then((response) => response.json())
  .then((info) => {
    info.reverse();
    for (i = 0; i < 4; i++) {
      const div = document.createElement("div");
      const a = document.createElement("a");
      a.href = "catalog?book=" + info[i].name;
      const img = document.createElement("img");
      img.src = info[i].img_url;
      img.alt = info[i].name.split("_").join(" ");
      img.classList.add("display_pic");
      a.appendChild(img);
      div.appendChild(a);
      latest.appendChild(div);
    }
    info.reverse();
    const date = new Date();
    info.forEach((element) => {
      if (element.dateAdded === date.getFullYear() + " " + date.getMonth()) {
        const div = document.createElement("div");
        const a = document.createElement("a");
        a.href = "catalog?book=" + element.name;
        const img = document.createElement("img");
        img.src = element.img_url;
        img.alt = element.name.split("_").join(" ");
        img.classList.add("display_pic");
        a.appendChild(img);
        div.appendChild(a);
        mounthly.appendChild(div);
      }
    });
  });
