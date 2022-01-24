// Import Module
const express = require("express");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const isLoggedIn = require("./middleware/authMiddleware");
const fs = require("fs");

// Inisiasi App untuk bisa menjalankan middleware
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/game", isLoggedIn, (req, res) => {
	res.render("game.ejs", { headTitle: "Game" });
});

app.post("/logout", (req, res) => {
	res.cookie("jwt", "", { maxAge: 1 });
	res.redirect("/login");
});

app.get("/login", (req, res) => {
	const { status } = req.query;
	res.render("login.ejs", { headTitle: "Login", status });
});

app.post("/login", (req, res) => {
	const { email, password } = req.body;
	const data = JSON.parse(fs.readFileSync("./data/players.json", "utf-8"));

	const playerCompatible = data.find((item) => item.email == email);

	if (!playerCompatible) {
		res.redirect("/login?status=emailnotfound");
	} else {
		if (bcrypt.compareSync(password, playerCompatible.password)) {
			const token = jwt.sign(
				{
					username: playerCompatible.username,
					email: playerCompatible.email,
					id: playerCompatible.id,
				},
				"kuNc1",
				{
					expiresIn: 60 * 60 * 24,
				}
			);

			res.cookie("jwt", token, { maxAge: 1000 * 60 * 60 * 24 });
			res.redirect("/game");
		} else {
			res.redirect("/login?status=wrongpassword");
		}
	}
});

app.get("/register", (req, res) => {
	res.render("register.ejs", { headTitle: "Register" });
});

app.post("/register", async (req, res) => {
	const { username, email, password } = req.body;
	const hashedPWD = await bcrypt.hash(password, 10);
	const newUser = { id: uuid(), username, email, password: hashedPWD };
	const data = JSON.parse(fs.readFileSync("./data/players.json", "utf-8"));
	data.push(newUser);
	fs.writeFileSync("./data/players.json", JSON.stringify(data, null, 4));
	res.redirect("/game");
});

app.get("/", (req, res) => {
	res.render("main.ejs", { headTitle: "Home" });
});

const PORT = 7000;
app.listen(PORT, () => {
	console.log(`Server is running at port ${PORT}`);
});
