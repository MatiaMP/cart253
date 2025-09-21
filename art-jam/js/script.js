/**
 * Art Jam - Self-Portrait
 * Matia Paki
 * 
 * This is a project using js and p5 to make a self-portrait
 * 
 */

"use strict";

/**
 * create the canvas
*/
function setup() {
    createCanvas(800, 1200);
}


/**
 * sets the background & other elements of the drawing
*/
function draw() {
background("blue");

drawFace();
drawEyes();
drawNose();
drawMouth();
drawEyebrows();
drawMoustache();

}

// draw Face

function drawFace(){
    push();
    fill("#FFDDD4");
    ellipse(400, 600, 400, 550);
    pop();

}

// draw Eyes

function drawEyes(){
    push();
    fill("white");
    ellipse(300,550,40,20);
    ellipse(500,550,40,20);
    pop();
}