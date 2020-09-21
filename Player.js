// I am hosting this game on shootygame.glitch.me
gunpos = [[0, -DIAMETER/2], [-DIAMETER/5*2, -DIAMETER/5*2], [-DIAMETER/5*2, 0], [-DIAMETER/5*2, DIAMETER/5*2], [0, DIAMETER/2], [DIAMETER/5*2, DIAMETER/5*2], [DIAMETER/5*2, 0], [DIAMETER/5*2, -DIAMETER/5*2]]

class Player {
  constructor(x,y, up, right, down, left, color, gleft, gright) {
    this.x = x;
    this.y = y;
    this.up = up
    this.right = right
    this.down = down 
    this.left = left
    this.velx = 0;
    this.vely = 0;
    this.color = color
    this.gleft = gleft
    this.gright = gright
    this.g = 0
    this.score = 0
  }
  draw() {
    strokeWeight(2);
    stroke(0);
    fill(this.color);
    ellipse(this.x,this.y,DIAMETER,DIAMETER);
    this.g%=8;
    this.g+=8;
    this.g%=8;
    rect(this.x+gunpos[this.g][0], this.y+gunpos[this.g][1], 7, 7);
  }
  shoot() {
    if (frames % 20 == 0) {
      var bullet = new Bullet(this.x+gunpos[this.g][0], this.y + gunpos[this.g][1], gunpos[this.g][0], gunpos[this.g][1])
      bullets.push(bullet)
    }
  }   
  move() {
    if (keyIsDown(this.up)) {
      this.vely -= PLAYER_SPEED;
    }
    if (keyIsDown(this.down)) {
      this.vely += PLAYER_SPEED;
    }
    if (keyIsDown(this.left)) {
      this.velx -= PLAYER_SPEED;
    }
    if (keyIsDown(this.right)) {
      this.velx += PLAYER_SPEED;
    }
    
    
    this.velx *= 0.9;
    this.vely *= 0.9;
    this.x += this.velx;
    this.y += this.vely;
    if (this.x < DIAMETER/2) this.x = DIAMETER/2;
    if (this.x + DIAMETER/2 >= width) this.x = width-DIAMETER/2;
    if (this.y < DIAMETER/2) this.y = DIAMETER/2;
    if (this.y + DIAMETER/2 >= height) this.y = height-DIAMETER/2;
  }
  update() {
    this.draw();
    this.move();
    this.shoot();
  }
}