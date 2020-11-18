var DIAMETER = 30; //diameter of the player
var started = 0;
var PLAYER_SPEED = 0.3 //player speed
var LIMIT = 5//which score to win
bullets = []
var stop = 0
var single = false 
button = 0 
function mouseClicked() {
  button.remove()
  if(started==false)started=true;
  else{
    if(stop) {
      stop = false
      player1.score = 0
      player2.score = 0
      while(bullets.length) {
        bullets.pop()
      }
      player1.g = 0
      player2.g = 0
      player1.x = 50
      player1.y = 200
      player2.x = 350
      player2.y = 200
    }
  }

}
function setup() {
  createCanvas(500, 500);
  rectMode(CENTER)
  player1=new Player(50,200, 87, 68, 83, 65, 'gold', 86, 66) // WASD keys player
  player2=new Player(350,200,UP_ARROW, RIGHT_ARROW, DOWN_ARROW, LEFT_ARROW, 'purple', 190, 191)
  textAlign(CENTER, CENTER);
  textSize(14)
  text("PLAYER 1: WASD TO MOVE, V AND B TO CHANGE GUN DIRECTION", 250, 250)
  text("PLAYER 2: ARROW KEYS TO MOVE, . AND / TO CHANGE GUN DIRECTION", 250, 275)
  text("First to the score limit of 5 wins!", 250,300)
  text("Game made by: Kang Yiming, 2K 2020", 250,  325)
  text("Credits: Bryan Wu(Usage of Player and Bullet class)", 250, 350)
  button = createButton("Single player")
  button.position(200,400)
  button.mousePressed(()=> (single=1))
  
}

frames = 0

function HUD() {
  textSize(20)
  fill('red')
  textAlign(LEFT)
  text("Player 1: " + str(player1.score), 0, 10)
  text("Player 2: " + str(player2.score), 0, 30)
  textAlign(CENTER)
}

function draw() {
  if(!started || stop)return
  if(single){
    player2.bot = 1
  }
  background("DarkTurquoise");  
  player1.update()
  player2.update()
  HUD();
  if(player1.score == LIMIT && player2.score == LIMIT) {
    text("Player 1 and Player 2 won! Click to play again!", 200, 200)
  }
  if(player1.score == LIMIT) {
      text("Player 1 won! Click to play again!", 200 ,200)
      stop=1
  }
  if(player2.score == LIMIT) {
      text("Player2 won! Click to play again!", 200 ,200)
      stop=1
  }

  for (var i = 0; i < bullets.length; i++) {
      bullets[i].update();
    
      if (bullets[i].hitscan(player1)) {
        bullets.splice(i,1)
        player2.score += 1;
        continue
      }
      if (bullets[i].hitscan(player2)) {
        bullets.splice(i,1)
        player1.score += 1;
        continue
      }
      if (bullets[i].out()) {
        bullets.splice(i,1);
      }
  }
  frames += 1

}


function keyPressed() {
  if (keyCode === player1.gleft) {
    player1.g+=1
  } 
  if (keyCode === player1.gright) {
    player1.g-=1
  }
  
  if (keyCode == player2.gleft) {
    player2.g-=1
  } 
  if (keyCode == player2.gright) {
    player2.g+=1
  }
  
  
  if (keyCode == 32) {
     mouseClicked()
  }
}