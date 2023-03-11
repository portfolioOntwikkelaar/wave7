let yIncrement =    0.05;
let timeIncrement = 0.01;
let timeOffset =    0;


function setup() {
	createCanvas(1200, 800);
    // noLoop();


}


function draw() {
	background(180);

	fill(50);
	noStroke();
	beginShape();

	let yOffset = 0;
	for (let x=0; x<=width; x+=10) {


		let y = noise(yOffset, timeOffset) * height;
		vertex(x, y);


		yOffset += yIncrement;
	}


	vertex(width, height);
	vertex(0, height);
	endShape(CLOSE);

	
	timeOffset += timeIncrement;
}
