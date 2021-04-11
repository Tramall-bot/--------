const table = document.getElementsByClassName("book_table")[0];
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
      table.appendChild(div);
    }
  });
