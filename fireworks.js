let particles = [];
let gravity;
let showGrid = true;
let patterns = [];

function makeFireworks() {
  gravity = createVector(0, 0.2);

  let p5Pattern = [];
  for (let i = 0; i < 5; i++) {
    const a = map(i, 0, 5, 0, TWO_PI);
    const x1 = 2 * sin(a-PI/10);
    const y1 = 2 * -cos(a-PI/10);
    const x2 = 2 * sin(a+PI/10);
    const y2 = 2 * -cos(a+PI/10);
    const x3 = 0.8 * sin(a + PI/5);
    const y3 = 0.8 * -cos(a + PI/5);
    p5Pattern.push(createVector(x1, y1));
    p5Pattern.push(createVector(x2, y2));
    p5Pattern.push(createVector(x3, y3));
  }

  // let p1Pattern = [];
  // for (let i = 0; i <= 48; i++) {
  //   const a = map(i, 0, 48, 0, PI);
  //   const x = sin(a);
  //   const y = cos(a);
  //   p1Pattern.push(createVector(x, y));
  // }
  // for (let i = 0; i <= 48; i++) {
  //   const a = map(i, 0, 48, PI, 0);
  //   const x = 2 * sin(a);
  //   const y = 2 * cos(a);
  //   p1Pattern.push(createVector(x, y));
  // }

  let heartPattern = [];
  for (let i = 0; i < 96; i++) {
    const a = map(i, 0, 96, 0, TWO_PI);
    const x = 0.1 * 16 * sin(a)**3;
    const y = -0.1 * (13 * cos(a) - 5*cos(2*a) - 2*cos(3*a)- cos(4*a));
    heartPattern.push(createVector(x, y));
  }

  patterns.push([p5Pattern]);
  //patterns.push([p1Pattern]);
  patterns.push([heartPattern]);
  patterns.push(null);
}

function updateFireworks() {
  if (random(1) < 0.03) {
    particles.push(new Particle(random(width), height+3, color(random(360), 15, 100), false));
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    if (p.shouldDie()) {
      particles.splice(i, 1);
    } else if (p.shouldExplode()) {
      particles.splice(i, 1);
      const pattern = random(patterns);
      for (let n = 0; n < 100; n++) {
        particles.push(new Particle(p.pos.x, p.pos.y, color(hue(p.col), 100, 100), true, pattern));
      }
    }
    p.render();
  }
}

class Particle {
  constructor(x, y, col, exploded, pattern) {
    this.pos = createVector(x, y);
    if (exploded) {
      this.vel = p5.Vector.random2D();
      if (pattern) {
        const path = random(pattern);
        let intersections = [];
        for (let i = 0; i < path.length; i++) {
          const a = path[i];
          const b = path[(i+1) % path.length];
          const intersection = lineIntersectsLine(0, 0, this.vel.x, this.vel.y, a.x, a.y, b.x, b.y, true, 1, 2);
          if (intersection) {
            intersections.push(intersection);
          }
        }
        this.vel.set(random(intersections));
      } else {
        this.vel.mult((random(1)**2)*2);
      }
    } else {
      this.vel = createVector(0, -random(8, 17));
    }
    this.r = 3;
    this.col = col;
    this.exploded = exploded;
  }

  update() {
    this.vel.add(gravity);
    this.pos.add(this.vel);
  }

  shouldExplode() {
    return this.vel.y > 0 && !this.exploded;
  }

  shouldDie() {
    return this.pos.y > height+this.r;
  }

  render() {
    noStroke();
    fill(this.col);
    circle(this.pos.x, this.pos.y, this.r*2);
  }
}