const content = document.createElement("div");
content.classList.add("content");
document.getElementsByTagName("body")[0].appendChild(content);
if (document.URL.indexOf("?book") < 0)
  fetch("/scripts/books.json")
    .then((response) => response.json())
    .then((info) => {
      info.forEach((element) => {
        const wraper = document.createElement("div");
        wraper.classList.add("book");
        wraper.classList.add("stats");
        const table = document.createElement("table");
        const tr = new Array();
        const td = new Array();
        for (i = 0; i < 3; i++) {
          tr[i] = document.createElement("tr");
          td[i] = document.createElement("td");
        }
        td[3] = document.createElement("td");
        td[0].classList.add("illustration");
        td[0].setAttribute("rowspan", "3");
        const img = document.createElement("img");
        img.src = element.img_url;
        img.alt = "иллюстрация книги";
        td[0].appendChild(img);
        const a = document.createElement("a");
        a.href = "catalog?book=" + element.name;
        a.innerText = element.name.split("_").join(" ");
        td[1].appendChild(a);
        tr[0].appendChild(td[0]);
        tr[0].appendChild(td[1]);
        td[2].innerHTML = "Посящений: " + element.visited;
        tr[1].appendChild(td[2]);
        const details = document.createElement("a");
        details.href = document.location.pathname.split("/")[1] + "?book=" + element.url;
        details.innerText = "Подробнее";
        td[3].appendChild(details);
        tr[2].appendChild(td[3]);
        for (i = 0; i < 3; i++) {
          table.appendChild(tr[i]);
        }
        wraper.appendChild(table);
        content.appendChild(wraper);
      });
    });
else
  fetch("/scripts/books.json")
    .then((response) => response.json())
    .then((info) => {
      info.forEach((elem) => {
        if (elem.url === document.URL.split("book=")[1]) {
          const h1 = document.createElement("h1");
          h1.innerText = "Статистика по книге\n" + elem.name.split("_").join(" ");
          content.appendChild(h1);
          console.log(elem.img_url);
          const wraper = document.createElement("div");
          wraper.classList.add("book");
          wraper.classList.add("stats");
          const table = document.createElement("table");
          const tr = new Array();
          const td = new Array();
          for (i = 0; i < 3 + elem.visitedUsers.length; i++) {
            tr[i] = document.createElement("tr");
            td[i] = document.createElement("td");
          }
          td[0].classList.add("illustration");
          const img = document.createElement("img");
          img.src = elem.img_url;
          img.alt = "иллюстрация книги";
          td[0].appendChild(img);
          tr[0].appendChild(td[0]);
          td[1].innerHTML = "Общих посящений: " + elem.visited;
          td[1].setAttribute("colspan", "2");
          tr[1].appendChild(td[1]);
          for (i = 0; i < elem.visitedUsers.length; i++) {
            td[i + 3].innerText = elem.visitedUsers[i].user + ": " + elem.visitedUsers[i].visits;
            td[i + 3].setAttribute("colspan", "2");
          }
          for (i = 2; i < tr.length - 1; i++) {
            tr[i].appendChild(td[i + 1]);
          }
          for (i = 0; i < tr.length - 1; i++) {
            table.appendChild(tr[i]);
          }
          wraper.appendChild(table);
          content.appendChild(wraper);
        }
      });
    });
