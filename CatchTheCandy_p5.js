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
let gameOverRedVideo, gameOverBlueVideo;
let candySound, bombSound, gameStartBGM, gameOnBGM, gameOverBGM;

let gameStart, gameOver;
let startTimer = 240;
let maxStartTimer = 240;
let startTimerSec;

let gameTimer = 2400;
let maxGameTimer = 2400;
let gameTimerSec;

let gameOverTimer = 1080;
let maxGameOverTimer = 1080;

let score = 0;

let selectBasket = "";
let basketX, basketY, basketWidth, basketHeight, candyWidth, candyHeight;

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
  candySound = createAudio("./src/sound/candy.mp3");
  bombSound = createAudio("./src/sound/bomb.mp3");
  gameStartBGM = createAudio("./src/sound/gameStartBGM.mp3");
  gameOnBGM = createAudio("./src/sound/gameOnBGM.mp3");
  gameOverBGM = createAudio("./src/sound/gameOverBGM.mp3");

  gameOverRedVideo = createVideo("./src/video/gameOverRedVideo.mp4");
  gameOverBlueVideo = createVideo("./src/video/gameOverBlueVideo.mp4");

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

  gameStart = false;
  gameOver = false;
  basketX = windowWidth / 2;
  basketY = windowHeight / 2 + (windowHeight / 5) * 2;
  basketWidth = windowWidth / 6;
  basketHeight = basketWidth;
  candyWidth = windowWidth / 14;
  candyHeight = candyWidth / 2;

  gameStartText = new GameStartText();
  bomb = new Bomb(candyWidth, candyHeight);
  candys = new Array(6);
  for (let i = 0; i < candys.length; i++) {
    candys[i] = new Candy(candyWidth, candyHeight);
    candys[i].init();
  }
  bomb.init();

  gameOverRedVideo.hide();
  gameOverBlueVideo.hide();
}

function draw() {
  if (gameStart == false && gameOver == false) {
    //  게임 시작전 화면
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

    playBgm = gameStartBGM.loop();
    gameOverBGM.pause();
    gameOverBGM.time(0);

    gameTimer = maxGameTimer;
    score = 0;
    gameOverTimer = maxGameOverTimer;
    scoreText = new ScoreText(0, 0, "");
    if (selectBasket === "red") {
      basket = new Basket(selectBasket);
      gameStart = true;
    } else if (selectBasket === "blue") {
      basket = new Basket(selectBasket);
      gameStart = true;
    }
  }
  if (gameStart == true && gameOver == false) {
    //  게임 실행 화면
    gameStartBGM.pause();
    gameStartBGM.time(0);
    gameOnBGM.play();
    image(
      backGround,
      windowWidth / 2,
      windowHeight / 2,
      windowWidth,
      windowHeight
    );
    fill(59, 20, 93);
    textFont(font, windowWidth / 25);
    text(score, windowWidth / 10.5, windowHeight / 5);
    gameTimerSec = Math.floor(gameTimer / 60) % 60;
    text(gameTimerSec, windowWidth - windowWidth / 13.5, windowHeight / 5);
    textFont(font, windowWidth / 15);
    fill(255);
    startTimerSec = Math.floor(startTimer / 60) % 60;
    if (startTimerSec < 4 && startTimerSec > 0)
      text(startTimerSec, windowWidth / 2, windowHeight / 2);
    startTimer -= 1;
    basketX = mouseX;
    basket.display();
    if (startTimerSec < 1 && startTimerSec >= 0)
      text("Game Start!", width / 2, height / 2);
    if (startTimerSec <= 0) {
      for (let i = 0; i < candys.length; i++) {
        candys[i].move();
        candys[i].display();
        candys[i].catched();
      }
      bomb.move();
      bomb.display();
      bomb.catched();
      basket.display();
      scoreText.display();

      image(scoreTime, width / 2, height / 2, windowWidth, windowHeight);
      fill(59, 20, 93);
      textFont(font, windowWidth / 25);
      text(score, windowWidth / 10.5, windowHeight / 5);
      gameTimerSec = floor(gameTimer / 60) % 60;
      text(gameTimerSec, windowWidth - windowWidth / 13.5, windowHeight / 5);
      noFill();
      gameTimer -= 1;
      if (gameTimer <= 0) {
        gameStart = false;
        gameOver = true;
      }
    }
  }
  if (gameStart == false && gameOver == true) {
    //  게임 끝 화면
    startTimer = maxStartTimer;
    for (let i = 0; i < candys.length; i++) {
      candys[i].init(random(2, 4));
    }
    bomb.init(random(2, 4));

    gameOverTimer -= 1;
    if (gameOverTimer <= 1080 && gameOverTimer >= 900) {
      image(
        backGround,
        windowWidth / 2,
        windowHeight / 2,
        windowWidth,
        windowHeight
      );
      fill(59, 20, 93);
      textFont(font, windowWidth / 25);
      text(score, windowWidth / 10.5, windowHeight / 5);
      text("0", windowWidth - windowWidth / 13.5, windowHeight / 5);
      textFont(font, windowWidth / 15);
      fill(255, 0, 0);
      if (gameOverTimer <= 1080 && gameOverTimer >= 1040) {
        text("GAME OVER", windowWidth / 2, windowHeight / 2);
      }
      if (gameOverTimer <= 1020 && gameOverTimer >= 980) {
        text("GAME OVER", windowWidth / 2, windowHeight / 2);
      }
      if (gameOverTimer <= 960 && gameOverTimer >= 900) {
        text("GAME OVER", windowWidth / 2, windowHeight / 2);
      }
    }
    if (selectBasket == "red" && gameOverTimer < 900) {
      if (gameOverRedVideo.time() < gameOverRedVideo.duration())
        gameOverRedVideo.play();
      image(
        gameOverRedVideo,
        windowWidth / 2,
        windowHeight / 2,
        windowWidth,
        windowHeight
      );
      if (gameOverTimer <= 600) {
        if (gameOverBGM.time() < gameOverBGM.duration()) gameOverBGM.play();
        gameOnBGM.pause();
        gameOnBGM.time(0);
      }
    }
    if (selectBasket == "blue" && gameOverTimer < 900) {
      if (gameOverBlueVideo.time() < gameOverBlueVideo.duration())
        gameOverBlueVideo.play();
      image(
        gameOverBlueVideo,
        windowWidth / 2,
        windowHeight / 2,
        windowWidth,
        windowHeight
      );
      if (gameOverTimer <= 600) {
        if (gameOverBGM.time() < gameOverBGM.duration()) gameOverBGM.play();
        gameOnBGM.pause();
        gameOnBGM.time(0);
      }
    }
  }
}

function mouseClicked() {
  if (gameStart == false && gameOver == false) {
    // 바구니 선택 & 게임 실행
    if (
      mouseY > windowHeight / 2 &&
      mouseY < windowHeight / 2 + windowHeight / 3
    ) {
      if (mouseX < windowWidth / 3) {
        selectBasket = "red";
      }
      if (mouseX > (windowWidth / 3) * 2) {
        selectBasket = "blue";
      }
    }
  }
  // 게임 초기화
  if (gameStart == false && gameOver == true && gameOverTimer <= 0) {
    selectBasket = "";
    gameOverRedVideo.pause();
    gameOverBlueVideo.pause();
    gameOverRedVideo.time(0);
    gameOverBlueVideo.time(0);
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
    this.w = basketWidth;
    this.h = basketHeight;
    this.c = basketColor;
  }
  display() {
    this.x = basketX;
    if (this.c === "red") {
      image(basketRed, this.x, this.y, this.w, this.h);
    } else if (this.c === "blue") {
      image(basketBlue, this.x, this.y, this.w, this.h);
    }
  }
}
class Candy {
  constructor(candyWidth, candyHeight) {
    this.x;
    this.y;
    this.angle = 0;
    this.angleAmount;
    this.w = candyWidth;
    this.h = candyHeight;
    this.speed = random(2, 4);
    this.gravity = 0.003;
    this.candyScore = 0;
    this.rand;
    this.c;
  }
  init(newSpeed = this.speed) {
    this.x = random(50, width - 50);
    this.y = random(-width / 2, 0);
    this.speed = newSpeed;
    this.angleAmount = random(-2, 2);
    this.rand = parseInt(random(1, 4));
    if (this.rand == 1) this.c = "Red";
    else if (this.rand == 2) this.c = "Blue";
    else if (this.rand == 3) this.c = "Green";
    if (selectBasket == "red" && this.rand == 4) this.c = "Red";
    if (selectBasket == "blue" && this.rand == 4) this.c = "Blue";
  }
  // speedInit() {
  //   this.speed = random(2, 4);
  // }
  move() {
    if (this.y > height) {
      this.init();
    }
    this.y += this.speed;
    this.speed += this.gravity;
  }
  catched() {
    if (
      this.y > basketY - basketHeight / 4 &&
      this.y < basketY &&
      this.x > basketX - basketWidth / 3 &&
      this.x < basketX + basketWidth / 3
    ) {
      if (candySound.time() < candySound.duration()) candySound.time(0);
      candySound.play();
      let randomScore = parseInt(random(1, 4));
      this.candyScore = 10 * randomScore;
      score += this.candyScore;
      scoreText = new ScoreText(this.candyScore, this.x, this.c);
      this.init();
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.angle));
    this.angle += this.angleAmount;
    if (this.c == "Red") image(candyRed, 0, 0, this.w, this.h);
    else if (this.c == "Blue") image(candyBlue, 0, 0, this.w, this.h);
    else if (this.c == "Green") image(candyGreen, 0, 0, this.w, this.h);
    pop();
  }
}
class Bomb {
  constructor(candyWidth, candyHeight) {
    this.x;
    this.y;
    this.angle;
    this.angleAmount;
    this.w = candyWidth;
    this.h = candyHeight;
    this.speed = random(2, 4);
    this.bombScore = -50;
    this.c = "Black";
    this.gravity = 0.003;
  }
  init(newSpeed = this.speed) {
    this.x = random(50, width - 50);
    this.y = -100;
    this.speed = newSpeed;
    this.angle = 0;
    this.angleAmount = random(-2, 2);
  }
  speedInit() {
    this.speed = random(2, 4);
  }
  move() {
    if (this.y > windowHeight) {
      this.init();
    }
    this.y += this.speed;
    this.speed += this.gravity;
  }
  catched() {
    if (
      this.y > basketY - basketHeight / 4 &&
      this.y < basketY &&
      this.x > basketX - basketWidth / 3 &&
      this.x < basketX + basketWidth / 3
    ) {
      bombSound.play();
      score += this.bombScore;
      scoreText = new ScoreText(this.bombScore, this.x, this.c);
      this.init();
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.angle));
    this.angle += this.angleAmount;
    image(candyBlack, 0, 0, this.w, this.h);
    pop();
  }
}
class ScoreText {
  constructor(thisScore, thisX, thisColor) {
    this.x = thisX;
    this.y = basketY - basketHeight / 3;
    this.o = 300;
    this.s = thisScore;
    this.c = thisColor;
  }

  display() {
    this.o -= 10;
    textFont(font, windowWidth / 35);
    if (this.s > 0) {
      if (this.c == "Red") fill(255, 0, 0, this.o);
      else if (this.c == "Blue") fill(0, 0, 255, this.o);
      else if (this.c == "Green") fill(0, 255, 0, this.o);
      text("+" + this.s, this.x, this.y);
    } else if (this.s < 0) {
      fill(0, 0, 0, this.o);
      text(this.s, this.x, this.y);
    }
  }
}
