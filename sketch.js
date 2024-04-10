var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END;
var PLAY;
var gameState = "WAIT";

var distance=0;
var gameOver, restart;

function preload(){
  splashScreen=loadImage("images/CYCLE MASTERS.gif");
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(windowWidth,windowHeight);
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  playButton=createImg('play2.png');
  aboutButton=createImg('abput2.png');
  playButton.position(800,300);
  playButton.size(100,100);
  aboutButton.position(400,300);
  aboutButton.size(100,100);
  playButton.hide();
  aboutButton.hide();
}

function draw() {
  if(gameState=="WAIT")
  {
    background(splashScreen);
   
    playButton.show();
  aboutButton.show();
  }
    aboutButton.mousePressed(()=>
    {
      aboutButton.hide();
      playButton.hide();
      gameState="ABOUT";
    })
    playButton.mousePressed(()=>
    {
      aboutButton.hide();
      playButton.hide();
      gameState="HOLD";
    })
    if(gameState=="ABOUT")
    {
      aboutGame();
    }
  
  if(gameState==="HOLD"){
    path=createSprite(100,150);
    path.addImage(pathImg);

    mainCyclist  = createSprite(70,150);
    mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
    mainCyclist.scale=0.07;
    mainCyclist.visible=false;
    gameState = "PLAY"
  }

  if (gameState==="PLAY"){

    path.velocityX = -5;
    mainCyclist.visible=true;
    distance = distance + Math.round(getFrameRate()/50);
    path.velocityX = -(6 + 2*distance/150);
  
    mainCyclist.y = World.mouseY;
  
    edges= createEdgeSprites();
    mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = "END";
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = "END";
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = "END";
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
  
  }
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  if (gameState === "END") {
        gameOver = createSprite(650,150);
        gameOver.addImage(gameOverImg);
        gameOver.scale = 0.8;
        textSize(20);
        fill(255);
        text("Press Up Arrow to Restart the game!", 500,200);
      
        path.velocityX = 0;
        mainCyclist.velocityY = 0;
        mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
      
        pinkCG.setVelocityXEach(0);
        pinkCG.setLifetimeEach(-1);
      
        yellowCG.setVelocityXEach(0);
        yellowCG.setLifetimeEach(-1);
      
        redCG.setVelocityXEach(0);
        redCG.setLifetimeEach(-1);
        
        if(keyDown("UP_ARROW")) {
          reset();
        }
    }
    /*
    if(distance==1000)
    {
      missionComplete();
    }
    */
  }

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function reset(){
  gameState ="HOLD"
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance = 0;
}
function aboutGame()
{
  swal({
    title:"How to Play",
    text:"Use the mouse to move the cyclist \n Avoid the cyclists in your way",
    textAllign:'center',
    imageUrl:'mouse.png',
    imageSize:'200x200',
    confirmButtonText:'Back',
    confirmButtonColor:'green'
  },
  function()
  {
    gameState="WAIT";
  })
}
function missionComplete()
{
  swal({
    title:"Mission Complete",
    text:"You have completed the race! \n Great Job",
    textAllign:'center',
 

    confirmButtonText:'Back',
    confirmButtonColor:'green'
  },
  function()
  {
    gameState="WAIT";
  })
}