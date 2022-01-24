class Player {
	constructor(batu, kertas, gunting) {
		this.batu = batu;
		this.kertas = kertas;
		this.gunting = gunting;
	}
}

class Computer {
	constructor(pilihan) {
		this.pilihan = pilihan;
	}
}

class Result {
	constructor(sign, win, lose, draw) {
		this.sign = sign;
		this.win = win;
		this.lose = lose;
		this.draw = draw;
	}
}

// Mengambil element html untuk player 1
const playerOne = new Player(document.getElementById("batu"), document.getElementById("kertas"), document.getElementById("gunting"));

// Mengambil element html untuk player computer
const com = new Computer(document.querySelectorAll(".pilihan-com"));

// Mengambil element html sebagai penanda hasil permainan
const result = new Result(
	document.querySelector(".game-content__sign h1:nth-child(1)"),
	document.querySelector(".game-content__sign h1:nth-child(2)"),
	document.querySelector(".game-content__sign h1:nth-child(3)"),
	document.querySelector(".game-content__sign h1:nth-child(4)")
);

// Mengambil element html untuk tombol refresh permainan
const refresh = document.getElementById("refresh");

// Membuat sebuah event click pada salah satu gambar di mana me-return argumen ke parameter fungsi game
playerOne.batu.addEventListener("click", () => {
	return game("batu");
});

playerOne.kertas.addEventListener("click", () => {
	return game("kertas");
});

playerOne.gunting.addEventListener("click", () => {
	return game("gunting");
});

// Fungsi untuk mengambil pilihan gambat suit dari computer
function getPilihanComputer() {
	const pilihan = ["batu", "kertas", "gunting"];
	const pilihanRandom = Math.floor(Math.random(pilihan) * 3);

	// Menampilkan pilihan suit dengan menunjukkan warna background
	if (pilihanRandom == 0) {
		com.pilihan.item(0).style.backgroundColor = "#c4c4c4";
		com.pilihan.item(0).style.borderRadius = "30px";
		com.pilihan.item(1).style.backgroundColor = "transparent";
		com.pilihan.item(2).style.backgroundColor = "transparent";
	} else if (pilihanRandom == 1) {
		com.pilihan.item(1).style.backgroundColor = "#c4c4c4";
		com.pilihan.item(1).style.borderRadius = "30px";
		com.pilihan.item(0).style.backgroundColor = "transparent";
		com.pilihan.item(2).style.backgroundColor = "transparent";
	} else {
		com.pilihan.item(2).style.backgroundColor = "#c4c4c4";
		com.pilihan.item(2).style.borderRadius = "30px";
		com.pilihan.item(0).style.backgroundColor = "transparent";
		com.pilihan.item(1).style.backgroundColor = "transparent";
	}

	return pilihan[pilihanRandom];
}

// Fungsi untuk menampilkan papan "Player 1 Win" dan menghilangkan element yg tak terpakai
function win() {
	result.sign.style.display = "none";
	result.win.removeAttribute("style");
	result.lose.style.display = "none";
	result.draw.style.display = "none";
}

// Fungsi untuk menampilkan papan "Com Win" dan menghilangkan element yg tak terpakai
function lose() {
	result.sign.style.display = "none";
	result.lose.removeAttribute("style");
	result.win.style.display = "none";
	result.draw.style.display = "none";
}

// Fungsi untuk menampilkan papan "Draw" dan menghilangkan element yg tak terpakai
function draw() {
	result.sign.style.display = "none";
	result.draw.removeAttribute("style");
	result.win.style.display = "none";
	result.lose.style.display = "none";
}

// Fungsi untuk mendapatkan hasil dari permainan
function game(pilihanPlayer) {
	const pilihanComputer = getPilihanComputer();
	// Pengkondisian untuk mengetahui hasil dari permainan, serta memberikan warna kepada pilihan suit player 1
	switch (pilihanPlayer + pilihanComputer) {
		case "batugunting":
			playerOne.batu.style.backgroundColor = "#c4c4c4";
			playerOne.kertas.style.backgroundColor = "transparent";
			playerOne.gunting.style.backgroundColor = "transparent";
			return win();
		case "kertasbatu":
			playerOne.kertas.style.backgroundColor = "#c4c4c4";
			playerOne.batu.style.backgroundColor = "transparent";
			playerOne.gunting.style.backgroundColor = "transparent";
			return win();
		case "guntingkertas":
			playerOne.gunting.style.backgroundColor = "#c4c4c4";
			playerOne.batu.style.backgroundColor = "transparent";
			playerOne.kertas.style.backgroundColor = "transparent";
			return win();
		case "batukertas":
			playerOne.batu.style.backgroundColor = "#c4c4c4";
			playerOne.kertas.style.backgroundColor = "transparent";
			playerOne.gunting.style.backgroundColor = "transparent";
			return lose();
		case "kertasgunting":
			playerOne.kertas.style.backgroundColor = "#c4c4c4";
			playerOne.batu.style.backgroundColor = "transparent";
			playerOne.gunting.style.backgroundColor = "transparent";
			return lose();
		case "guntingbatu":
			playerOne.gunting.style.backgroundColor = "#c4c4c4";
			playerOne.batu.style.backgroundColor = "transparent";
			playerOne.kertas.style.backgroundColor = "transparent";
			return lose();
		case "batubatu":
			playerOne.batu.style.backgroundColor = "#c4c4c4";
			playerOne.kertas.style.backgroundColor = "transparent";
			playerOne.gunting.style.backgroundColor = "transparent";
			return draw();
		case "kertaskertas":
			playerOne.kertas.style.backgroundColor = "#c4c4c4";
			playerOne.batu.style.backgroundColor = "transparent";
			playerOne.gunting.style.backgroundColor = "transparent";
			return draw();
		case "guntinggunting":
			playerOne.gunting.style.backgroundColor = "#c4c4c4";
			playerOne.batu.style.backgroundColor = "transparent";
			playerOne.kertas.style.backgroundColor = "transparent";
			return draw();
	}
}

// Membuat event ketika icon refresh dipencet, tampilan kembali seperti awal mula
refresh.addEventListener("click", () => {
	playerOne.batu.style.backgroundColor = "transparent";
	playerOne.kertas.style.backgroundColor = "transparent";
	playerOne.gunting.style.backgroundColor = "transparent";
	com.pilihan.item(0).style.backgroundColor = "transparent";
	com.pilihan.item(1).style.backgroundColor = "transparent";
	com.pilihan.item(2).style.backgroundColor = "transparent";
	result.sign.style.display = "block";
	result.win.style.display = "none";
	result.lose.style.display = "none";
	result.draw.style.display = "none";
});
