let candles = [];
let logos = [];
const numCandles = 20;

function makeCandles() {
  for (let i = 0; i < numCandles; i++) {
    candles.push(new Candle(i));
  }
}

function updateCandles() {
  for (let i = logos.length - 1; i >= 0; i--) {
    const l = logos[i];
    l.update();
    if (l.life <= 0) {
      logos.splice(i, 1);
    }
    l.render();
  }
  for (const c of candles) {
    c.update();
    c.render();
  }
  strokeWeight(7);
  stroke("#8945d1");
  line(0, height - 3, width, height - 3);
}

class Candle {
  constructor(i) {
    this.x = map(i, -1, numCandles, 0, width);
    this.w = width / (numCandles * 2);
    this.h = random(height / 5 - this.w / 2, height / 5 + this.w / 2);
    this.y = height - this.h / 2 - 5;
    this.roundedness = random(4, 20);
    this.index = i;
  }

  update() {
    if (random(1) < 0.08) {
      logos.push(
        new Logo(
          images[this.index % images.length],
          this.x,
          this.y - this.h / 2
        )
      );
    }
  }

  render() {
    push();
    noStroke();
    fill(204);
    rectMode(CENTER);
    rect(
      this.x,
      this.y,
      this.w,
      this.h,
      this.roundedness,
      this.roundedness,
      0,
      0
    );

    pop();
  }
}

class Logo {
  constructor(img, x, y) {
    this.img = img;
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-4, -2));
    this.size = width / 40;
    this.life = 255;
  }

  update() {
    this.pos.add(this.vel);
    this.life -= 12;
  }

  render() {
    tint(255, this.life);
    imageMode(CENTER);
    image(this.img, this.pos.x, this.pos.y, this.size, this.size);
  }
}