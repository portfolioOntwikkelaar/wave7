let yIncrement = 0.05;
let timeIncrement = 0.01;
let timeOffset = 0;
let colorModeIndex = 0;
let stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  // Sterren genereren
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: random(width),
      y: random(height / 2),
      size: random(1, 3),
      twinkle: random(100)
    });
  }
}

function draw() {
  drawSky();
  drawWaves();
}

// --- Sterrenhemel ---
function drawSky() {
  for (let s of stars) {
    fill(255, 255, 255, 180 + sin(frameCount * 0.02 + s.twinkle) * 75);
    ellipse(s.x, s.y, s.size);
  }
}

// --- Oceaangolven ---
function drawWaves() {
  let yOffset = 0;
  let colorShift = sin(frameCount * 0.01) * 60;
  
  beginShape();
  
  for (let x = 0; x <= width; x += 8) {
    let noiseVal = noise(yOffset, timeOffset);
    let waveHeight = height * 0.4 + noiseVal * 300;
    let mouseEffect = map(mouseY, 0, height, -50, 50);
    let y = waveHeight + sin(x * 0.01 + frameCount * 0.02) * 20 + mouseEffect;
    
    // Kleurmodus
    if (colorModeIndex === 0) fill(0, 100 + colorShift, 200 + colorShift, 150);
    else if (colorModeIndex === 1) fill(150 + colorShift, 0, 150, 150);
    else fill(0, 200 + colorShift, 150 + colorShift, 180);
    
    vertex(x, y);
    yOffset += yIncrement;
  }
  
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  
  timeOffset += timeIncrement;
}

// --- Controls ---
function keyPressed() {
  if (key === ' ') {
    colorModeIndex = (colorModeIndex + 1) % 3;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
