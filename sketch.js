let images = [];

function preload() {
  images[0] = loadImage("pfoundation.png");
  images[1] = loadImage("processingLOGO.png");
  images[2] = loadImage("p5logo.png");
  images[3] = loadImage("pandroid.png");
  images[4] = loadImage("ppy.png");
  images[5] = loadImage("processing3logo.png");
  
}

function setup() {
  let canv=createCanvas(windowWidth, windowHeight);
  let value=10/100*windowHeight;
  let stuff=document.getElementsByClassName('.container')
  
  //canv.style('margin-left','0.3vw');
  canv.position(0,0);

  colorMode(RGB);
  makeCandles();
  colorMode(HSB);
  makeFireworks();
}

function draw() {
  clear();
  colorMode(RGB);
  updateCandles();
  strokeWeight(2.3);
  textAlign(CENTER);
  textSize(20);
  fill('cyan');
  text('Made with ❤️ by Abhay and Simon', width / 2, height - 50);
  colorMode(HSB);
  updateFireworks();
}