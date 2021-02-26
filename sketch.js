var balloon;
var database;
var position;
var ballonImage;

function preload(){
 balloonImage = loadImage()
}

function setup() {
  createCanvas(400,400);
  database = firebase.database();
  console.log(database);

 balloon = createSprite(200,200,40,40);
  balloon.shapeColor = "yellow";
  var balloonPosition = database.ref("balloon/position");
  balloonPosition.on("value",readPosition);
}

function draw() {
  background("black");  
  
  if(position !== undefined){
    if(keyDown(UP_ARROW)){
      writePosition(0,-1)
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(LEFT_ARROW)){
      writePosition(1,0);
    }
  }
  drawSprites();
}

function writePosition(x,y){
  database.ref("balloon/position").set({
    "x" : position.x + x,
    "y" : position.y+y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position);
  balloon.x = position.x;
  balloon.y = position.y;
}
