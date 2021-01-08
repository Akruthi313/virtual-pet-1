var dog,dogIma, happyDog, database;
var foodS, foodStock;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  dog=createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale=0.3;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
}


function draw() { 
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDog);
  }
  push()
  textSize(30);
  strokeWeight(3);
  fill("white");
  text("foodStock :"+foodS,200,120);
  pop()
  fill("white");
  text("NOTE:PRESS UP ARROW KEY TO FEED DOLLY MILK",100,50);

  drawSprites();
  
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

      if(x<=0){
        x=0;
      }else {
        x=x-1;
      }

    database.ref('/').update({
      food:x
    })
}



