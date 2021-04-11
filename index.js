const { response } = require("express");
var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();
var port = 3000;

app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/logout", (req, res) => {
  fs.readFile(__dirname + "/public/scripts/profile.json", "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
    } else {
      const prof = JSON.parse(data);
      prof.active = false;
      fs.writeFile(__dirname + "/public/scripts/profile.json", JSON.stringify(prof), (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
  res.render("index");
});

app.get("/loginUser", (req, res) => {
  const prof_config = JSON.parse(
    fs.readFileSync(__dirname + "/public/scripts/profile.json", {
      encoding: "utf8",
      flag: "r",
    })
  );
  const users = JSON.parse(
    fs.readFileSync(__dirname + "/public/scripts/users.json", {
      encoding: "utf8",
      flag: "r",
    })
  );
  users.forEach((element) => {
    if ((req.query.name == element.name) & (req.query.password == element.password)) {
      prof_config.active = true;
      prof_config.name = element.name;
      prof_config.password = element.password;
    }
  });
  if (prof_config.active) {
    fs.writeFile(__dirname + "/public/scripts/profile.json", JSON.stringify(prof_config), (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.render("index");
  } else {
    res.redirect("login?err");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/registerUser", (req, res) => {
  const users = JSON.parse(
    fs.readFileSync(__dirname + "/public/scripts/users.json", {
      encoding: "utf8",
      flag: "r",
    })
  );
  let flag = true;
  let errid;
  users.forEach((element) => {
    if (element.name === req.query.name) {
      flag = false;
      errid = "0";
    }
  });
  if (req.query.name.length >= 20) {
    flag = false;
    errid = "1";
  }
  if (req.query.password.length < 4) {
    flag = false;
    errid = "3";
  }
  if (req.query.password === "") {
    flag = false;
    errid = "2";
  }
  if (req.query.name === "") {
    flag = false;
    errid = "4";
  }
  if (req.query.password.length > 20) {
    flag = false;
    errid = "5";
  }
  if (flag) {
    let id;
    if (users.length == 0) {
      id = 0;
      users.push({
        id: 0,
        name: req.query.name,
        password: req.query.password,
      });
    } else
      users.push({
        id: users[users.length - 1].id + 1,
        name: req.query.name,
        password: req.query.password,
      });
    fs.writeFile(__dirname + "/public/scripts/users.json", JSON.stringify(users), (err) => {
      if (err) {
        console.log(err);
      }
    });
    const prof_config = JSON.parse(
      fs.readFileSync(__dirname + "/public/scripts/profile.json", {
        encoding: "utf8",
        flag: "r",
      })
    );
    prof_config.active = true;
    prof_config.name = req.query.name;
    prof_config.password = req.query.password;
    fs.writeFile(__dirname + "/public/scripts/profile.json", JSON.stringify(prof_config), (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.render("index");
  }
  res.redirect("register?" + errid);
});

app.get("/comment", (req, res) => {
  const books = JSON.parse(
    fs.readFileSync(__dirname + "/public/scripts/books.json", {
      encoding: "utf8",
      flag: "r",
    })
  );
  let book;
  books.forEach((elem) => {
    if (elem.name === req.query.url) {
      book = elem;
    }
  });
  const comments = JSON.parse(
    fs.readFileSync(__dirname + "/public/scripts/comments.json", {
      encoding: "utf8",
      flag: "r",
    })
  );
  comments.forEach((element) => {
    if (req.query.url.split("_").join(" ") === element.book) {
      element.comments.unshift({
        name: req.query.user,
        date: req.query.date,
        comment: req.query.area,
      });
    }
  });
  fs.writeFile(__dirname + "/public/scripts/comments.json", JSON.stringify(comments), (err) => {
    if (err) {
      console.log(err);
    }
  });
  if (book) {
    console.log();
    res.redirect("catalog?book=" + book.name);
  } else res.render("index");
});

app.get("/catalog", (req, res) => {
  let iscatalog = true;
  const books = JSON.parse(
    fs.readFileSync(__dirname + "/public/scripts/books.json", {
      encoding: "utf8",
      flag: "r",
    })
  );
  books.forEach((elem) => {
    if (elem.name === req.query.book) {
      elem.visited++;
      const date = new Date();
      if (date.getMonth() != elem.Month) {
        elem.Month = date.getMonth();
        elem.visitedThisMonth = 0;
      }
      elem.visitedThisMonth++;
      const prof_config = JSON.parse(
        fs.readFileSync(__dirname + "/public/scripts/profile.json", {
          encoding: "utf8",
          flag: "r",
        })
      );
      let newUser = true;
      if (prof_config.active) {
        elem.visitedUsers.forEach((user) => {
          if (user.user === prof_config.name) {
            user.visits++;
            newUser = false;
          }
        });
        if (newUser) {
          elem.visitedUsers.push({
            user: prof_config.name,
            visits: 1,
          });
        }
      }
      fs.writeFile(__dirname + "/public/scripts/books.json", JSON.stringify(books), (err) => {
        if (err) {
          console.log(err);
        }
      });
      iscatalog = false;
      res.render(elem.url);
      return;
    }
  });
  if (iscatalog) res.render("catalog");
});

app.get("/genres", (req, res) => {
  res.render("genres");
});

app.get("/about_us", (req, res) => {
  res.render("about_us");
});

app.get("/books_new", (req, res) => {
  res.render("books_new");
});

app.get("/search", (req, res) => {
  const books = JSON.parse(
    fs.readFileSync(__dirname + "/public/scripts/books.json", {
      encoding: "utf8",
      flag: "r",
    })
  );
  let book;
  books.forEach((elem) => {
    if (elem.name.split("_").join(" ") === req.query.book) {
      book = elem;
    }
  });
  if (book) {
    res.render(book.url);
  } else {
    res.render("test");
  }
});

app.get("/stats", (req, res) => {
  res.render("stats");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
