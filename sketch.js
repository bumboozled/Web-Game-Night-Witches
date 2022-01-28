
var moon,trees,glo, aircraft, flying, title, scoreFont , button,playerPlane, flying, x, y, gameBegin, treesplay, treesX, treesY, treesplay2, treesX2, treesY2, offsetX, playerX, playerY, b, b2, score, endGame, button2, ending, buttonLink;
let airX, airY;
let bX;
let bY;
let bSpeed;
let bX2;
let bY2;
let bSpeed2;


function preload(){
  glo= loadAnimation('images/glo1.png', 'images/glo2.png','images/glo3.png','images/glo4.png');
  
  flying = loadAnimation('assets/aircraft.png','assets/aircrafttwo.png', 'assets/aircraft6.png','assets/aircraft7.png');

  descend = loadAnimation('assets/aircrafttwo.png', 'assets/aircraft6.png','assets/aircraft7.png');

  scoreFont= loadFont('images/Amagro-bold.ttf');

  ending = loadAnimation('end/downPlane1.png','end/downPlane2.png','end/downPlane3.png','end/downPlane4.png','end/downPlane5.png','end/downPlane6.png','end/downPlane7.png','end/downPlane8.png','end/downPlane9.png', 'end/aircraft6.png', 'end/downPlane4.png', 'end/downPlane1.png', 'end/downPlane3.png');
  
};


function setup() {
  
  offsetX=0;
  endGame=false
  createCanvas(windowWidth, windowHeight);
  score= 1
  textFont(scoreFont);
  textSize(30);
  textAlign(LEFT);

  gameBegin=false;

  treesY=height*0.6;
  treesY2=height*0.6;

  
  moon = createSprite(width/3.5, height*.26);
  moon.addImage(loadImage('images/moon.png'));

  title = createSprite(width*0.5,height*.3);
  title.addImage(loadImage('images/title.png'));
  title.scale=0.55;
  
  buttonLink = createButton('HERSTORY');
  buttonLink.position(width*.35, height*.76);
  buttonLink.mouseClicked(goToLink); 
  buttonLink.style('font-size','15px');
  buttonLink.style('font-family', 'Copperplate Gothic Light');
  buttonLink.style('border','0px');
  buttonLink.style('background-color', '#47475e');
  buttonLink.style('color', '#fff')
  buttonLink.mouseOver(highLightLink);
  buttonLink.mouseOut(regularLink);
  
  
  trees = createSprite(width/2,height*.9);
  trees.addImage(loadImage('images/trees.png'));

  airX=-200;
  airY=100;
  aircraft=createSprite(airX,airY);
  aircraft.scale=.8;
  aircraft.addAnimation("default", flying);

  

  button = createButton('PLAY');
  button.position(width*.7, height*.7);
  button.mouseClicked(game); 
  button.style('font-size','80px');
  button.style('font-family', 'Copperplate Gothic Light');
  button.style('border','0px');
  button.mouseOver(highLight);
  button.mouseOut(regular);
  button.style('background-color', '#47475e');
  button.style('color', '#fff')

  

  x=width/3;
  y=height/2;
  playerPlane=createSprite(0,0);
  playerPlane.scale=.8;
  playerPlane.addAnimation("default", flying);
  playerPlane.addAnimation("vertical", descend);
  playerPlane.addAnimation("firePlane", ending);
  playerPlane.setCollider('rectangle',-10,30, 310, 80)
  
  treesplay = createSprite(0, height*.6);
  treesplay.addImage(loadImage('images/treesplay.png'));
  treesplay.scale=1.2;
  treesplay2 = createSprite(0, height*.6);
  treesplay2.addImage(loadImage('images/treesplay.png'));
  treesplay2.scale=1.2;

bX = width
bY = random(height)
bSpeed = 4

b= createSprite(bX,bY);
b.addImage(loadImage('images/bomb.png'));
b.scale=0.5
b.setDefaultCollider()

bX2 = width
bY2 = random(height)
bSpeed2 = 4

b2= createSprite(bX2,bY2);
b2.addImage(loadImage('images/bomb.png'));
b2.scale=0.5
  
  };

function goToLink() {
	window.open('https://www.history.com/news/meet-the-night-witches-the-daring-female-pilots-who-bombed-nazis-by-night');
}
 
 function draw() {
    background(15,25,51);
    
    glow();
    drawSprite(moon)
    drawSprite(trees) 
    drawSprite(aircraft);
    drawSprite(title);
    fly();
    arrowMovement();
    
    if (gameBegin==true){
      clear()
      background(15,25,51)
      glow();
      drawSprite(moon)
      
      drawSprite(playerPlane)
      
      
      b.position.x=bX
      b.position.y=bY
      if (endGame==false){
        bX-=bSpeed
      bY = bY + random(-1, 1)
      }
      
      if (bX <= 0) {
        bX=width+random(50, 200)
        bY=random(height)
        bSpeed+=random(1,2)
        }
     
      drawSprite(b)
      

     
      

      if (bSpeed>10){
      b2.position.x=bX2
      b2.position.y=bY2
        if (endGame==false){
          bX2-=bSpeed
        bY2 = bY2 + random(-1, 1)
        }
      
        if (bX2 <= 0) {
          bX2=width+random(1000, 2000)
          bY2=random(height)
          bSpeed2+=random(0.2,.5)
          }
          drawSprite(b2)
      }
      
    
      if (playerPlane.collide(b)){
        endGame=true
      }

      drawSprite(treesplay)
      drawSprite(treesplay2)
      setInterval(scoreInc, 100)
      fill(255)
      stroke(10,15,41)
      text('Score = '+ floor(score), 50, 50)

    }
    if (endGame==true){

      
      }else{
        playerPlane.changeAnimation('default');
      }
    
    if (endGame==true){
        
        fill(255)
        noStroke()
        textSize(100)
        textAlign(CENTER, CENTER)
        text('GAME OVER',width/2, height/2)
        textSize(30)
        text('Refresh to replay',width/2, height/2+height/8)
        glo.stop()
      }
        
    
  }
      

function scoreInc(){
  if(endGame==false){
    score+=0.003
} 
}

function replay(){
  loop()
}

function collect(sprite){
  sprite.remove();
}
 

 function glow(){
    animation(glo ,width/3 , height*.32,  100, 100);
    fill(255,20);
    noStroke();
    ellipse(width/3.1, height*.25, 600);
 };

 function fly(){
  aircraft.position.x = airX;
  aircraft.position.y= airY;
  airX += 2;
  if (airX > width+400) {
    airX=0
  }
  airY = airY + random(-.9, .9)
 };

function highLight(){

  button.style('background-color','#d996ff')
  button.style('color', '#6e527d')
};

function regular(){
  button.style('background-color', '#47475e');
  button.style('color', '#fff')
  };

function highLightLink(){

  buttonLink.style('background-color','#d996ff')
  buttonLink.style('color', '#6e527d')
};

function regularLink(){
  buttonLink.style('background-color', '#47475e');
  buttonLink.style('color', '#fff')
  };

function arrowMovement(){
  treesplay.position.x=offsetX+width/2
  treesplay.position.y=treesY
  treesplay2.position.x=offsetX+width+width/2
  treesplay2.position.y=treesY2

  playerPlane.position.x = x
  playerPlane.position.y=y
  if (keyIsDown(LEFT_ARROW)&& endGame==false) {
  
    offsetX+=5
    bX+=5
    bX2+=5
    if (x>width*.3){
      x-=3;
    }
    
  }else{}

  

  if (keyIsDown(RIGHT_ARROW)&& endGame==false) {
     offsetX-=5
     bX-=5
     bX2-=5

    

    if (x<width*.7){
        x += 3;

    }
   
  }else{

  }

  if (keyIsDown(UP_ARROW)&& y>0&& endGame==false) {
      y-= 5;
      
  }else{}
  

  if (keyIsDown(DOWN_ARROW)&&y<height-60&&endGame==false) {
      y+= 5;
      playerPlane.changeAnimation('vertical');
      }else if (endGame==true){
        playerPlane.changeAnimation('firePlane')
      }
      else{
        playerPlane.changeAnimation('default')
        }
  if(endGame==false){
    offsetX-=random(0.2, 2)
    }
  
  if(offsetX <= (-width)){
 	offsetX = 0;	
  }
  
  if (offsetX>0){
      offsetX=(-width);}

}

function game(){
  gameBegin=true
  button.remove()
  buttonLink.remove()
}
