/**
 * Lines
 * Matia Paki
 * 
 * A series of lines across the canvas
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
    background("pink");
    
    let x = 0;
    let color = 0;
    let separation = 50;

    while (x <= width){
        stroke(color);
        line(x, 0, x, height);
        x += separation;
        color += 25;
    }
}