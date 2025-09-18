/**
 * Mr. Furious
 * Matia Paki
 * Sophia Andtbacka
 * A guy who becomes visibly furious!
 */

"use strict";

const rate = 2;

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

let sky = {
  // Colour
  fill: {
    r: 160,
    g: 180,
    b: 200
  }
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);

  //set the framerate
  frameRate(rate);
}

/**
 * Draw (and update) Mr. Furious
 */
//darkens sky overtime
function draw() {
  sky.fill.r += -10;
  sky.fill.g += -10;
  sky.fill.b += -10;
  
    background(sky.fill.r, sky.fill.g, sky.fill.b);

  
  // Draw Mr. Furious as a coloured circle
  // turns him red overtime
  mrFurious.fill.r = mrFurious.fill.r + 5;
  mrFurious.fill.g = mrFurious.fill.g - 5;
  mrFurious.fill.b = mrFurious.fill.b - 5;
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
  pop();

  //draw bird
  push();
  noStroke();
  fill(255,255,20);
  ellipse(mouseX,mouseY,50);
}