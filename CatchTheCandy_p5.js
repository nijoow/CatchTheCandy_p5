let gameStartBG,
  gameName,
  backGround,
  scoreTime,
  candyBlue,
  candyRed,
  candyGreen,
  candyBlack,
  basketRed,
  basketBlue;

let selectBasket = "";
let basketX;
let basketY;
let startTimer = 240;
let maxStartTimer = 240;
let startTimerSec;

let gameTimer = 2400;
let maxGameTimer = 2400;
let gameTimerSec;

let gameOverTimer = 1080;
let maxGameOverTimer = 1080;

let score = 0;
let gameStart;
let gameOver;

function preload() {
  gameName = loadImage("./src/image/gameName.png");
  gameStartBG = loadImage("./src/image/gameStartBG.png");
  backGround = loadImage("./src/image/backGround.png");
  scoreTime = loadImage("./src/image/scoreTime.png");
  candyRed = loadImage("./src/image/candyRed.png");
  candyBlue = loadImage("./src/image/candyBlue.png");
  candyGreen = loadImage("./src/image/candyGreen.png");
  candyBlack = loadImage("./src/image/candyBomb.png");
  basketRed = loadImage("./src/image/basketRed.png");
  basketBlue = loadImage("./src/image/basketBlue.png");

  font = loadFont("./src/font/Pixellari.ttf");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  smooth();
  imageMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  background(100);
  frameRate(60);
  gameStartText = new GameStartText();
  gameStart = false;
  gameOver = false;
  basketX = windowWidth / 2;
  basketY = windowHeight / 2 + windowHeight / 3;
}

function draw() {
  if (gameStart == false && gameOver == false) {
    image(
      gameStartBG,
      windowWidth / 2,
      windowHeight / 2,
      windowWidth,
      windowHeight
    );
    image(
      gameName,
      windowWidth / 2,
      windowHeight / 2 - windowHeight / 5,
      (windowWidth / 3) * 2,
      windowHeight / 4
    );
    gameStartText.move();
    gameStartText.opacity();
    gameStartText.display();
    // if (gameStartBGM.isPlaying() == false) {
    //   gameStartBGM.rewind();
    // }
    // gameStartBGM.play();
    // gameOverBGM.pause();
    // gameOverBGM.rewind();
    gameTimer = maxGameTimer;
    score = 0;
    gameOverTimer = maxGameOverTimer;
    // scoreText = new ScoreText(0, 0, "");
    if (selectBasket === "red") {
      basket = new Basket(selectBasket);
      gameStart = true;
    } else if (selectBasket === "blue") {
      basket = new Basket(selectBasket);
      gameStart = true;
    }
  }
}
function mouseClicked() {
  if (gameStart == false && gameOver == false) {
    if (
      mouseY > windowHeight / 2 &&
      mouseY < windowHeight / 2 + windowHeight / 3
    ) {
      if (mouseX < windowWidth / 3) {
        selectBasket = "red";
        console.log(selectBasket);
      }
      if (mouseX > (windowWidth / 3) * 2) {
        selectBasket = "blue";
        console.log(selectBasket);
      }
    }
  }

  if (gameStart == false && gameOver == true && gameOverTimer <= 0) {
    selectBasket = "";
    gameOverRedVideo.pause();
    gameOverBlueVideo.pause();
    gameOverRedVideo.jump(0);
    gameOverBlueVideo.jump(0);
    gameOver = false;
  }
}
class GameStartText {
  constructor() {
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
    this.w = (windowWidth / 5) * 2;
    this.h = windowHeight / 8;
    this.amount = 0.3;
    this.rectOpacity = 100;
    this.textOpacity = 255;
    this.opacityAmount = 5;
  }
  move() {
    this.y += this.amount;
    if (this.y >= windowHeight / 2 + 10 || this.y <= windowHeight / 2 - 10) {
      this.amount *= -1;
    }
  }
  opacity() {
    this.textOpacity -= this.opacityAmount;
    if (this.textOpacity >= 500 || this.textOpacity <= 0) {
      this.opacityAmount *= -1;
    }

    let rectOpacityAmount;
    rectOpacityAmount = map(this.opacityAmount, 0, 255, 0, 100);

    if (this.textOpacity >= 255) {
      this.rectOpacity = 100;
    } else {
      this.rectOpacity -= rectOpacityAmount;
    }
  }
  display() {
    fill(0, 0, 0, this.rectOpacity);
    strokeWeight(2);
    stroke(255, 255, 255, this.rectOpacity);
    rect(
      windowWidth / 2,
      this.y + windowHeight / 5,
      (windowWidth / 5) * 2,
      (this.h = windowHeight / 8)
    );
    rect(
      windowWidth / 6,
      this.y + windowHeight / 5,
      windowWidth / 5,
      windowHeight / 3
    );
    rect(
      windowWidth - windowWidth / 6,
      this.y + windowHeight / 5,
      windowWidth / 5,
      windowHeight / 3
    );
    noStroke();
    textFont(font, windowWidth / 50);
    fill(0, 0, 0, this.textOpacity);
    text(
      "PICK UP ONE BASKET TO START GAME",
      windowWidth / 2 + 4,
      this.y + windowHeight / 5 + 4
    );
    fill(255, 255, 255, this.textOpacity);
    text(
      "PICK UP ONE BASKET TO START GAME",
      windowWidth / 2,
      this.y + windowHeight / 5
    );
    fill(0, 100);

    image(
      basketRed,
      windowWidth / 6,
      this.y + windowHeight / 5,
      windowWidth / 4,
      windowHeight / 2
    );
    image(
      basketBlue,
      windowWidth - windowWidth / 6,
      this.y + windowHeight / 5,
      windowWidth / 4,
      windowHeight / 2
    );
  }
}

class Basket {
  constructor(basketColor) {
    this.x = basketX;
    this.y = basketY;
    this.w = 300;
    this.y = 300;
    this.c = basketColor;
  }
  display() {
    this.x = basketX;
    if (this.c === "red") {
      image(basketRed, this.x, this.y, this.w, this.h);
    } else if (c === "blue") image(basketBlue, this.x, this.y, this.w, this.h);
  }
}
