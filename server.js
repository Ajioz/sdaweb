const express = require("express");
const app = express();

//Extra security
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const log = console.log;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// extra packages
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 1500, //limit each IP to 500 requests per windowMs
  })
);

app.use(xss());

//Static Files
app.use(express.static("assets"));
app.use("/css", express.static(__dirname + "assets/css"));
app.use("/img", express.static(__dirname + "assets/img"));
app.use("/js", express.static(__dirname + "assets/js"));
app.use("/fonts", express.static(__dirname + "assets/fonts"));

//Set views
app.set("views", "./views");
app.set("view engine", "ejs");

//Get Home Page
app.get("/", (req, res) => {
  res.render("index");
});

//Get About Page
app.get("/belief", (req, res) => {
  res.render("belief");
});

//Get Gallery Page
app.get("/policy", (req, res) => {
  res.render("policy");
});

//Get service page
app.get("/worship", (req, res) => {
  res.render("worship");
});

//Get contact page
app.get("/contact", (req, res) => {
  res.render("contact");
});



//Get project page
app.get("/event", (req, res) => {
  res.render("event");
});

//Make a post
app.post("/contact", (req, res) => {
  res.render("contact-success", { data: req.body });
});

let port = process.env.PORT || 2001;

app.listen(port, () =>
  log(`Server communicating on http://localhost:${port}/`)
);
