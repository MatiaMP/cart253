/**
 * Mr. Furious
 * Matia Paki
 * Sophia Andtbacka
 * A guy who becomes visibly furious!
 */

"use strict";

// We set a slow frame rate
const rate = 10;

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 210,
    g: 180,
    b: 140
  }
}

// Our sky
let sky = {
  // Colour
  fill: {
    r: 160,
    g: 180,
    b: 200
  }
};

/**
 * Creates the canvas and calls framerate
 */
function setup() {
  createCanvas(400, 400);

  frameRate(rate);
}



function draw() {

//darkens sky overtime
sky.fill.r += -10;
sky.fill.g += -10;
sky.fill.b += -10;

//our sky
background(sky.fill.r, sky.fill.g, sky.fill.b);

//draw interactive annoying bird
  push();
  noStroke();
  fill(255,255,20);
  ellipse(mouseX,mouseY,50);


// Draw Mr. Furious as a coloured circle
// // turns him red overtime
  mrFurious.fill.r = mrFurious.fill.r + 5;
  mrFurious.fill.g = mrFurious.fill.g - 5;
  mrFurious.fill.b = mrFurious.fill.b - 5;
  
// Makes it so in the first 5 seconds, Mr. Furious shakes less
  if (second()<=5){
push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
  mrFurious.size = mrFurious.size + random(-10,20);
  pop();}

// Makes it so after 5 seconds, Mr. Furious shakes more
else if (second()>5) {
push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
  mrFurious.size = mrFurious.size + random(-30,60);
  pop();
};
}