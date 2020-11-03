var ghost, ghostImage;
var tower, towerImage;
var climber, climberImage, climberGroup;
var door, doorImage, doorGroup;
var invisibleBlock, invisibleBlockGroup;
var sound;

var gameState = "play";

var score;

function preload() {
  ghostImage = loadImage("ghost-standing.png");
  towerImage = loadImage("tower.png");
  climberImage = loadImage("climber.png");
  doorImage = loadImage("door.png");
  
  sound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300, 20, 20);
  tower.addImage("tower", towerImage);
  tower.velocityY = 2;

  ghost = createSprite(300, 300, 10, 10);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.4;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(0);
  
  if (gameState === "play") {

    sound.loop();

    if (tower.y > 400) {
      tower.y = 300;
    }

    if(keyDown("space")) {
      ghost.velocityY = -13;
    }

    if(keyDown("left_arrow")) {
      ghost.x -= 3;
    }

    if(keyDown("right_arrow")) {
      ghost.x += 3;
    }

    ghost.velocityY = ghost.velocityY + 0.5; 

    spawnDoor();

    ghost.collide(climberGroup);

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }
  }
  
  if (gameState === "end") {
    tower.destroy();
    textSize(30);
    fill("yellow");
    text("GAME OVER", 200, 300);
    doorGroup.destroyEach();
    climberGroup.destroyEach();
    invisibleBlockGroup.destroyEach(); 
    doorGroup.lifetime = 0;
    invisibleBlockGroup.lifetime = 0;
    climberGroup.lifetime = 0;
  }
  
  drawSprites();
}

function spawnDoor() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50, 10, 10);
    door.addImage("door", doorImage);
    door.x = Math.round(random(100, 300));
    door.velocityY = tower.velocityY;
    door.lifetime = 600;
    doorGroup.add(door);
   
    ghost.depth = door.depth + 1;

    climber = createSprite(200, -50, 10, 10);
    climber.addImage("climber", climberImage);
    climber.x = door.x;
    climber.y = door.y + 50;
    climber.lifetime = 600;
    climber.velocityY = door.velocityY;
    climberGroup.add(climber);
    
    climber.depth = door.depth;
    
    invisibleBlock = createSprite(200, -50, 10, 10);
    invisibleBlock.visible = false;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = climber.height;
    invisibleBlock.x = door.x;
    invisibleBlock.y = climber.y + 5;
    invisibleBlock.velocityY = climber.velocityY; 
    invisibleBlockGroup.add(invisibleBlock)
  }
}
