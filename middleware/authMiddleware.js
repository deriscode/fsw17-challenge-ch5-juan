const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		jwt.verify(token, "kuNc1", (err, decodedToken) => {
			if (err) {
				res.locals.player = null;
				res.redirect("/login");
			} else {
				res.locals.player = decodedToken.username;
				next();
			}
		});
	} else {
		res.locals.player = null;
		res.redirect("/login");
	}
};

module.exports = isLoggedIn;
