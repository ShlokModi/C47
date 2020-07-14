const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;

var doodler,platforms,doodlerVelocity;
var platformList = [];
var platYChange = 0;
var gameState;
var score = 0;
var highScore = 0;
var backgroundImg;
var numOfPlatforms = 5;
function preload() {

  backgroundImg = loadImage("1024px-Graph-paper.svg.png");
  monster1 = loadImage("doodle_monsters.png");
  monster2 = loadImage("doodle_monsters2.png");
  monster3 = loadImage("doodle_monsters3.png");
  monster4 = loadImage("doodle_monsters4.png");
  monster5 = loadImage("doodle_monsters5.png");
  monster6 = loadImage("doodle_monsters6.png");
}

function setup() {
  createCanvas(400, 600);
  frameRate(60);
  engine = Engine.create();
  world = engine.world;
  gameState = 0;
  doodler = new Doodler();
  platforms = new Platform(480);
}

function draw() {
  background(247, 239, 231);
  image(backgroundImg, 0, 0, 400, 600);
  Engine.update(engine);
  console.log(doodler.doodler.position.x);
   console.log(doodler.doodler.position.y);
  if(gameState === 1) {
    platforms.drawPlatforms();
    doodler.display();
    platforms.Platform(360);
    checkCollision();
    moveDoodler();
    moveScreen();
  } 
  else {
    fill(0);
    textSize(60);
    text("Start", 140, 275);
    textSize(30);
    text("Score: " + score, 150, 325);
    textSize(20);
    text("High Score: " + highScore, 150, 360);
  }
  //console.log(platformList);
   //spawnMonsters();
   mousePressed()
}
function moveScreen() {
  if(doodler.doodler.position.y < 250) {
    platYChange = 3;
    doodlerVelocity += 0.25;
  } else {
    platYChange = 0;
  }
}

function mousePressed() {
    console.log(gameState);
  if(gameState === 0) {
    score = 0;
    platforms.setupPlatforms()
    doodler.doodler.position.y =  350;
    console.log(platformList);
    doodler.doodler.position.x = 99.2926029586105;
    console.log(doodler);
    doodlerVelocity = 0.1;
    gameState = 1;
    
  }
}

function moveDoodler() {
  doodlerVelocity += 0.2;
  doodlerVelocity += 0.2;
  doodler.doodler.position.y += doodlerVelocity;
  doodler.doodler.position.y += doodlerVelocity;
  if (keyIsDown(LEFT_ARROW)) {
    doodler.doodler.position.x -= doodler.doodler.speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    doodler.doodler.position.x += doodler.doodler.speed;
  }
}
function checkCollision() {
  platformList.forEach(function(plat) {
    if(
      doodler.doodler.position.x < plat.platform.position.x + plat.platform.width &&
      doodler.doodler.position.x + 60 > plat.platform.position.x &&
      doodler.doodler.position.y + 60 < plat.platform.position.y + plat.platform.height &&
      doodler.doodler.position.y + 60 > plat.platform.position.y
    ) {
     doodlerVelocity = -10;
     doodlerVelocity = -10;
    }
  });
  
  if(doodler.doodler.position.y > height) {
    if(score > highScore) {
      highScore = score;
    }
    gameState = 0;
    platformList = [];
  }
  
  if(doodler.doodler.position.x < -60) {
    doodler.doodler.position.x = width;
  } else if(doodler.doodler.position.x > width) {
    doodler.doodler.position.x = -60;
  }
}

function spawnMonsters(){
  if(frameCount % 100 === 0) {
    var monster = createSprite(200,300,10,40);
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: image(monster1,random(50,350),random(100,500),50,20);
              break;
      case 2: image(monster2,random(50,350),random(100,500),10,50);
              break;
      case 3: image(monster3,random(50,350),random(100,500),50,15);
              break;
      case 4: image(monster4,random(50,350),random(100,500),20,40);
              break;
      case 5: image(monster5,random(50,350),random(100,500),40,40);
              break;
      case 6: image(monster6,random(50,350),random(100,500),20,40);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    //add each obstacle to the group

  }
}