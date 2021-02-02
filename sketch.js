var horse,horse_running,horse_jumping;
var stick,stick_man;
var ground;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var fence,fence_img;
var obstacles_Group;
var food,food_img;
var food_group;
var score = 0;
var restart_img,gameOver_img;
var restart,gameOver;

function preload(){
  fence_img =loadImage("wooden.png")
  food_img = loadImage("wheate food.jfif"); 
  restart_img = loadImage("ressss.png");
  gameOver_img = loadImage("gammmmmmmmm.png");
horse_running = loadAnimation("horse-run-00.png","horse-run-01.png","horse-run-02.png","horse-run-03.png","horse-run-04.png","horse-run-05.png","horse-run-06.png");
  horse_jumping = loadAnimation("horse-jump-00.png","horse-jump-01.png","horse-jump-02.png","horse-jump-03.png","horse-jump-04.png","horse-jump-05.png","horse-jump-06.png");
stick_man = loadAnimation("layer 1.png","Layer 2.png","Layer 3.png","Layer 4.png","Layer 5.png","Layer 6.png","Layer 7.png","Layer 8.png","Layer 9.png","Layer 10.png","Layer 11.png","Layer 12.png")
 
}

function setup() {
 createCanvas(windowWidth,windowHeight);
   horse = createSprite(windowWidth/3,200,20,20);
  horse.addAnimation("walk",horse_running);
  horse.scale = 0.94;
  
  stick = createSprite(windowWidth/10,200,20,20);
  stick.addAnimation("run",stick_man);
  
  ground = createSprite(windowWidth/2,windowHeight/1.5,windowWidth,20);
  ground.shapeColor = "black";
  
   gameOver = createSprite(300,100,40,20);
   gameOver.addImage("gone",gameOver_img);
   gameOver.visible = false;
  
  restart = createSprite(windowWidth/2,windowHeight/2,40,20);
  restart.addImage("start",restart_img);
  restart.visible = false;
  restart.scale = 0.5;
  
  obstacles_Group = createGroup();
  food_group = createGroup();
}

function draw() {
 
  background(255);
 
  textSize = 40;
  fill("black");
  text("score: "+score,540,20);
  
  if (gamestate === PLAY){
  
    spawn_obstacles();
      spawn_food();
    
    if(((keyDown("space"))||touches.length>0)&&horse.y>=windowHeight/1.9){
    horse.velocityY = horse.velocityY-4.2; 
    console.log("space");
      touches = [];
  }
    
    if(horse.isTouching(food_group)){
    score = score+1;
    food_group[0].destroy();
  }
    
    if(horse.isTouching(obstacles_Group)){
      gamestate = END;
     
    }
  } 
  
  if(gamestate===END){
   
    score = 0;
    
    restart.visible = true;
    gameOver.visible = true;
       
    horse.visible = false;
    stick.visible = false;
    food_group.destroyEach();
    obstacles_Group.destroyEach();     
  }
  
  horse.velocityY=horse.velocityY = horse.velocityY+0.5;
  stick.velocityY=stick.velocityY = stick.velocityY+0.5;

  //stick.debug = true;
  //console.log(horse.y);
  
horse.collide(ground);
  stick.collide(ground);

  spawn_obstacles();
  spawn_food();
  
  stick.setCollider("rectangle",0,0,stick.width+90,stick.height)
  horse.setCollider("rectangle",25,9,140,89)
  
  if((mousePressedOver(restart))||touches.length>0){
    touches = [];
    reset();
  }
 
  drawSprites();
}

function spawn_obstacles(){

  if(frameCount%150===0){
  
    fence = createSprite(windowWidth,windowHeight/1.58,15,5);
    fence.addImage("obs",fence_img);
    fence.scale = 0.1;
    fence.velocityX = -7.8;
    fence.lifetime = 200;
  
    obstacles_Group.add(fence);  
  }
  
  if(stick.isTouching(obstacles_Group)){
  stick.velocityY = stick.velocityY-0.6;
   console.log("touch");
 }
}

function spawn_food(){
  
  if(frameCount%175===0){
  
    food=createSprite(windowWidth,Math.round(random(windowHeight/3,windowHeight/3.5)),15,5)
    food.addImage("fff",food_img);
    food.velocityX = -5.8;
    food.scale = 0.2;
     food.lifetime = 200;
   
    food_group.add(food);   
  }
  if(horse.isTouching(food_group)){
    score = score+1;
    food_group[0].destroy();
  }
}
function reset(){
  horse.visible = true;
  stick.visible = true;
  restart.visible = false;
  gameOver.visible = false;
  gamestate = PLAY;
}
