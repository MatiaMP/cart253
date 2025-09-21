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
background("beige");

drawFace();
drawEyes();
drawNose();
drawMouth();
drawEyebrows();
drawMoustache();

}