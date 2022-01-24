const path = require("path");

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));

app.get("/game", (req, res) => {
	res.render("game.ejs", { headTitle: "Game" });
});

app.get("/login", (req, res) => {
	res.render("login.ejs", { headTitle: "Login" });
});

app.get("/register", (req, res) => {
	res.render("register.ejs", { headTitle: "Register" });
});

app.get("/", (req, res) => {
	res.render("main.ejs", { headTitle: "Home" });
});

const PORT = 7000;
app.listen(PORT, () => {
	console.log(`Server is running at port ${PORT}`);
});
