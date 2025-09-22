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
drawEyebrows();
drawNose();
drawMouth();
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
    ellipse(315,550,50,30);
    ellipse(485,550,50,30);
    pop();
}

// draw Eyebrows

function drawEyebrows(){
    push();
    fill("brown");
    ellipse(315,500,80,15);
    ellipse(485,500,80,15);
    pop();    
}

function drawNose(){
    push();
    fill("#FFDDD4");
    ellipse(400,650,60,85);
    pop();
}
