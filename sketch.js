
var monkey , monkey_running, jungle ,jungleImage;
var banana ,bananaImage, stone, stoneImage,ground; 
var foodGroup, stoneGroup;
var survivalTime;

function preload(){
  
  
  monkey_running =loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  jungleImage = loadImage("jungle.jpg")
}



function setup(){
  createCanvas(600,350)
  monkey = createSprite(50,300)
  monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.1
  
  ground = createSprite(550,340,2000,20)
  ground.velocityX = -5
  ground.lifeTime = 400
  
  
  jungle = createSprite(300,175,100)
  jungle.addImage("jungle",jungleImage)
  jungle.velocityX = -3
  jungle.scale = 1.5
  jungle.lifeTime = 33
  
  

  stoneGroup = new Group();
  foodGroup = new Group();
  survivalTime = 0
}


function draw() {
  background(220)
  
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,500,30)
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
   if(keyDown("space")&& monkey.y >= 299) {
        monkey.velocityY = -15;
   }
  monkey.velocityY = monkey.velocityY + 0.99
    monkey.collide(ground)
  
   if (jungle.x < 0){
      jungle.x = jungle.width/5;
    }
  
  if(foodGroup.isTouching(monkey)){
    survivalTime = survivalTime + 2
    foodGroup.destroyEach()
    
  }
  
  if(survivalTime === 50){
    monkey.scale = monkey.scale + 0.05
    }
  if(stoneGroup.isTouching(monkey)){
    monkey.scale = monkey.scale - 0.01
    }
  
  ground.visible = false
  
  jungle.depth = monkey.depth - 10
 
  
  stones();
  bananas();
drawSprites()
}

function stones(){
 if(frameCount%300 === 0){
   stone = createSprite(600,300)
   stone.addImage("stone",stoneImage)
   stone.scale = 0.2
   stone.velocityX = -8
  
   stoneGroup.add(stone)
 }
}

function bananas(){
  if(frameCount%120 === 0){
    banana = createSprite(600,300)
    banana.addImage("banana",bananaImage)
    banana.scale = 0.05
    banana.velocityX = -8
    
    banana.y = round(random(200,250))
    
    foodGroup.add(banana)
    
  }
}