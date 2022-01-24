const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		jwt.verify(token, "kuNc1", (err, decodedToken) => {
			if (err) {
				res.locals.player = null;
				res.redirect("/login");
			} else {
				res.locals.playerName = decodedToken.username;
				res.locals.playerEmail = decodedToken.email;
				res.locals.playerID = decodedToken.id;
				next();
			}
		});
	} else {
		res.locals.player = null;
		res.redirect("/login");
	}
};

module.exports = isLoggedIn;
