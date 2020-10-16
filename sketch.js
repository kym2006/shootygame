var DIAMETER = 30; //diameter of the player
var started = 0;
var PLAYER_SPEED = 0.3 //player speed
var LIMIT = 5//which score to win
bullets = []
var stop = 0
function mouseClicked() {
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
      this.x = 50
      this.y = 200
      this.x = 350
      this.y = 200
    }
  }

}
function setup() {
  createCanvas(500, 500);
  rectMode(CENTER)
  player1=new Player(50,200, 87, 68, 83, 65, 'gold', 82, 70) // WASD keys player
  player2=new Player(350,200,UP_ARROW, RIGHT_ARROW, DOWN_ARROW, LEFT_ARROW, 'purple', 190, 191)
  textAlign(CENTER, CENTER);
  text("PLAYER 1: WASD TO MOVE, R AND F TO CHANGE GUN DIRECTION", 250, 250)
  text("PLAYER 2: ARROW KEYS TO MOVE, . AND / TO CHANGE GUN DIRECTION", 250, 275)
  text("Game made by: Kang Yiming, 2K 2020", 250,  300)
  text("First to the score limit of 5 wins!", 250,325)
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
  if (keyCode === 82) {
    player1.g+=1
  } 
  if (keyCode === 70) {
    player1.g-=1
  }
  if (keyCode == 191) {
    player2.g-=1
  } 
  if (keyCode == 190) {
    player2.g+=1
  }
  if (keyCode == 32) {
     mouseClicked()
  }
}

//Click on the canvas, and type "A" to increase the donut size
//and type "B" to decrease the donut size
