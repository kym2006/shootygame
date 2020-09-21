class Bullet {
  constructor(x,y,velx,vely) {
    this.x = x;
    this.y = y;
    this.velx = velx/1.3
    this.vely = vely/1.3
  }
  draw() {
    stroke(237, 5, 74);
	fill(237, 5, 74, 135);
	ellipse(this.x, this.y, 15);
  }
  out() {
    return (this.x>=width||this.x<0||this.y+5>=height||this.y-5<0);
  }
  hitscan(player) {
    var d = dist(player.x,player.y,this.x,this.y);
    return (d<DIAMETER/2+10/2);
  }
  update() {
    this.draw();
    this.x += this.velx;
    this.y += this.vely;    
  }
}