const content = document.createElement("div");
content.classList.add("content");
document.getElementsByTagName("body")[0].appendChild(content);
fetch("/scripts/books.json")
  .then((response) => response.json())
  .then((info) => {
    info.forEach((element) => {
      const wraper = document.createElement("div");
      wraper.classList.add("book");
      const table = document.createElement("table");
      const tr = new Array();
      const td = new Array();
      for (i = 0; i < 5; i++) {
        tr[i] = document.createElement("tr");
        td[i] = document.createElement("td");
      }
      td[5] = document.createElement("td");
      td[0].classList.add("illustration");
      td[0].setAttribute("rowspan", "5");
      const img = document.createElement("img");
      img.src = element.img_url;
      img.alt = "иллюстрация книги";
      td[0].appendChild(img);
      const a = document.createElement("a");
      a.href = "catalog?book=" + element.name;
      a.innerText = element.name.split("_").join(" ");
      console.log(a);
      td[1].appendChild(a);
      tr[0].appendChild(td[0]);
      tr[0].appendChild(td[1]);
      td[2].innerHTML = "Автор: " + element.author;
      td[3].innerHTML = element.description;
      td[4].innerHTML = "Жанр: " + element.genre;
      const a2 = document.createElement("a");
      a2.href = "catalog?book=" + element.name;
      a2.innerText = "О книге";
      td[5].appendChild(a2);
      for (i = 1; i < 5; i++) {
        tr[i].appendChild(td[i + 1]);
      }
      for (i = 0; i < 5; i++) {
        table.appendChild(tr[i]);
      }
      wraper.appendChild(table);
      content.appendChild(wraper);
    });
  });
