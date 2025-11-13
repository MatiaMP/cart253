/**
 * Terrible New Car
 * Matia Paki 
 * A program to generate new car model names using dinosaurs.
 * 
 * Uses:
 * Darius Kazemi's corpora repository
 * https://github.com/dariusk/corpora/tree/master
 */

"use strict";

let carData = undefined;
let dinosaurData = undefined;
let langData = undefined;
let lang = "fr";

// Starts with the instruction
let carDinoName = "Click to generate a car-dino name.";

/**
 * Load the car and dinosaur data
 */
function preload() {
    carData = loadJSON("assets/data/cars.json");
    dinosaurData = loadJSON("assets/data/dinosaurs.json");
}

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 400);
}

/**
 * Display the current main text (either instructions or a car)
*/
function draw() {
    background(0);

    push();
    fill("pink");
    textAlign(CENTER, CENTER);
    textSize(32);
    text(carDinoName, width / 2, height / 2);
    pop();
}

/**
 * Generate a new car name
 */
function mousePressed() {
    const car = random(carData.cars);
    const dino = random(dinosaurData.dinosaurs);
    carDinoName = car + " " + dino;
}