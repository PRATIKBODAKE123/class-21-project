//Game States
var PLAY=1;
var END=0;
var gameState=1;

var player,enemy,ground,invisground,score,restart,obstacleGrp;
var playerImg,enemyImg,enemyImg_2,restartImg,obstacleImg,obstacleImg_2,obstacleImg_3,bgImg;

var checkpointSound,jumpSound,dieSound;

function preload(){
 
  bgImg = loadImage("final.jpg")
  enemyImg = loadAnimation("sample1.png","sample2.png","sample3.png","sample4.png");
  enemyImg_2 = loadImage("killImg.png");
  playerImg = loadAnimation("run_1.png","run2.png","run_3.png","run_4.png");
  obstacleImg = loadImage("obstacle_1.png");
  obstacleImg_2 = loadImage("obstacle_2.png");
  obstacleImg_3 = loadImage("obstacle_3.png");
  diedImg = loadImage("died.png"); 
  restartImg = loadImage("restart.png");
  
  checkpointSound = loadSound("checkpoint.mp3");
  jumpSound= loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");

}



function setup() {
  
  createCanvas(windowWidth,windowHeight);

  

  ground = createSprite(windowWidth/2,windowHeight/2)
  ground.addImage(bgImg);
  ground.scale=2.3;


  invisground = createSprite(60,windowHeight/2+245,windowWidth);
  invisground.visible = false;

  player = createSprite(400,windowHeight/2+175,20,20);
  player.addAnimation("run",playerImg);
  player.addImage(diedImg)
  player.scale = 0.2

  enemy = createSprite(100,windowHeight/2+175,20,20)
  enemy.addAnimation("run fast as u can",enemyImg);
  enemy.addImage(enemyImg_2);
  enemy.scale = 0.2;
  //enemy.debug=true;
  enemy.setCollider("rectangle",1000,0,10,1000);

  restart = createSprite(windowWidth/2,windowHeight/2,20,20)
  restart.addImage(restartImg);
  restart.visible = false;
  
  score = 0;
  obstacleGrp= new Group();


}

function draw() {

  background(255,255,255);

  drawSprites();
  //Display score
  textSize(30);
  fill("black")
  text("Score:"+score,1100,50);

  
  enemy.collide(invisground);
  player.collide(invisground);

  
  if(gameState === PLAY){ 

    enemy.x = 100;
    player.x =400
  

  ground.velocityX = -(5 + 2* score/100);

  score = score + Math.round(frameCount/60);

  //console.log(player.y)

  player.velocityY = player.velocityY + 0.50;
  enemy.velocityY = enemy.velocityY + 0.5;
  
  if(keyWentDown("space")){
      jumpSound.play();
      player.velocityY = player.velocityY - 15;
  }


  if(score>0 && score % 200 === 0){
    checkpointSound.play();
  }

    if(enemy.isTouching(obstacleGrp)){

    enemy.velocityY = enemy.velocityY - 3;

  }

  restart.visible=false;




 if(ground.x < 0){ 
    ground.x = width/2;
   }

   if (player.isTouching(obstacleGrp)) {
    gameState = END;
    dieSound.play();
  }

  spawncat();

 }

 else if(gameState === END ){

   player.addImage("run",diedImg);
   player.y = windowHeight/2+190;
   player.x= 600
   player.scale = 0.2;

   restart.visible=true;

   obstacleGrp.set
   ground.velocityX = 0;

   obstacleGrp.setVelocityXEach(0)
   obstacleGrp.setlifetimeEach =-1;

   enemy.x = 400;
   enemy.y= 400,windowHeight/2+175;
   enemy.addImage("run fast as u can",enemyImg_2);

   textSize(40);
   fill("black");
   text("The wolf caught you",450,250);

  if(mousePressedOver(restart)){
    reset();
  }

 }

}

function spawncat(){

if(World.frameCount % 150 === 0){

 var obstacle = createSprite(windowWidth+10,windowHeight/2+175);
 obstacle.velocityX = -(5 + 2* score/100);  
 obstacle.lifetime = 400;
 obstacleGrp.add(obstacle);
 obstacle.debug=true;
 
 var randomImg = Math.round(random(1,3))
 switch (randomImg) {
   case 1: obstacle.addImage(obstacleImg);
           obstacle.scale=0.1;
           obstacle.setCollider("circle",0,0,400);
   break; 
   
   case 2 : obstacle.addImage(obstacleImg_2);
            obstacle.scale=0.1   
            obstacle.setCollider("circle",0,0,350);
   break;

   case 3 : obstacle.addImage(obstacleImg_3);
            obstacle.scale=0.1;
            obstacle.setCollider("circle",50,0,500);
   break;
   
   default: break;
 
 
  }

}
}

function reset(){

  gameState = PLAY

  obstacleGrp.destroyEach();
  

  score = 0;

   player.addAnimation("run",playerImg);
   enemy.addAnimation("run fast as u can",enemyImg);

   
 
}
