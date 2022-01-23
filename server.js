const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send(
		"<iframe width='560' height='315' src='https://www.youtube.com/embed/4FIQpVyJ1jo' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
	);
});

const PORT = 7000;
app.listen(PORT, () => {
	console.log(`Server is running at port ${PORT}`);
});
