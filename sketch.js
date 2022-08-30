var DIAMETER = 30; //diameter of the player
var started = 0;
var PLAYER_SPEED = 0.5 //player speed
var LIMIT = 5//which score to win
bullets = []
var stop = 0
var single = false 
button = 0 
button2 = 0
konami = 0
replaybutton = 0
var players = []
var writer;
function mouseClicked() {
  button.remove()
  button2.remove()
  
 
  if(started==false){
    started=true;
    writer = createWriter(`Recording of game at ${day()}_${month()}_${year()}: ${hour()} ${minute()} ${second()}.txt`)
  }
  else{
    
    if(stop) {
      writer.clear()
      frames = 0
      replaybutton.hide()
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
var command;
function setup() {
  command=[UP_ARROW, UP_ARROW, DOWN_ARROW, DOWN_ARROW, LEFT_ARROW, LEFT_ARROW, RIGHT_ARROW, RIGHT_ARROW, 66, 65]
  let c = createCanvas(windowHeight, windowHeight);
  replaybutton = createButton("Download replay")
  replaybutton.hide()
  replaybutton.mousePressed(()=>(writer.close()))
  rectMode(CENTER)
  player1=new Player(windowHeight/4,windowHeight/2, 87, 68, 83, 65, 'gold', 86, 67) // WASD keys player
  player2=new Player(windowHeight*3/4,windowHeight/2,73, 76, 75, 74, 'purple', 221, 219)
  textAlign(CENTER, CENTER);
  textSize(20)
  text("UPDATE: CHANGED OUR CONTROLS!!",250, 100)
  textSize(20)
  text("PLAYER 1: W/A/S/D/C/V ", 250, 250)
  text("PLAYER 2: I/J/K/L/[/] ", 250, 275)
  text("First to the score limit of 5 wins!", 250,300)
  textSize(10)
  text("Game made by: Kang Yiming, 2K 2020", 250,  325)
  text("Credits: Bryan Wu(Usage of Player and Bullet class)", 250, 350)
  button = createButton("Single player")
  button.position(200,400)
  button.mousePressed(()=> (single=1))
  button2 = createButton("2 Players")
  button2.position(300,400)
  button2.mousePressed(()=>(single=0))
  
  
}

frames = 0

function HUD() {
  textSize(20)
  fill('red')
  textAlign(LEFT)
  text("Player 1: " + str(player1.score), 0, 10)
  text("Player 2: " + str(player2.score), 0, 30)
  text("FPS: " + str(frameRate().toFixed(0)), 0, 50)
  textAlign(CENTER)
}
function draw() {
  if(!started || stop)return
  if(single){
    player2.bot = 1
  }
  frames += 1
  background("DarkTurquoise");  
  player1.update()
  player2.update()
  writer.write(`Frame ${frames}:\n`)
  writer.write(`Player1: ${player1.x.toFixed(1)} ${player1.y.toFixed(1)} ${player1.g}\n`)
  writer.write(`Player2: ${player2.x.toFixed(1)} ${player2.y.toFixed(1)} ${player2.g}\n`)
  writer.write(`Score: ${player1.score}|${player2.score}\n`)
  writer.write('Bullets: [')
  for (var i = 0; i < bullets.length; i++) {
    writer.write(`(${bullets[i].x.toFixed(1)}, ${bullets[i].y.toFixed(1)}) `)
  }
  writer.write(']\n')
  HUD();
  if(player1.score == LIMIT) {
      text("Player 1 won! Click to play again!", 200 ,200)
      replaybutton.show()
      stop=1
  }
  if(player2.score == LIMIT) {
      text("Player2 won! Click to play again!", 200 ,200)
      replaybutton.show()
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
  

}


function keyPressed() {
  if (keyCode == command[konami]) konami+=1
  else konami = 0
  if (keyCode === player1.gright) {
    player1.g+=1
  } 
  if (keyCode === player1.gleft) {
    player1.g-=1
  }
  
  if (keyCode == player2.gleft) {
    player2.g-=1
  } 
  if (keyCode == player2.gright) {
    player2.g+=1
  }
  
  
  if (keyCode == 32) {
     //fullscreen(true);
     mouseClicked()
  }
  if (konami == command.length) {
    console.log("lol hacks")
    konami = 0
    player1.score = 5
  }
}