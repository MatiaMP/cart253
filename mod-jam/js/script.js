/**
 * Frogfrogfrog
 * Matia Paki
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

let gameState = "title";
let arcadeSong;
let score = 0;

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

const badFly = {
    x: 0,
    y: 100,
    size: 20,
    speed: 2
}
function preload(){
    arcadeSong = loadSound('/assets/sounds/arcadeSong.mp3'); 
}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
}

function draw() {
    if(gameState === "title"){
        drawTitleScreen();
    }

    else if(gameState === "game"){
    background("#87ceeb");
    moveFly();   
    drawFly();
    moveBadFly();
    drawBadFly();
    moveFrog();
    moveTongue();
    drawFrog();   
    checkTongueFlyOverlap();
    checkTongueBadFlyOverlap();
    drawScore();

    if(score <= -5){
        gameState = "gameover";
    }
    }  

    else if (gameState === "gameover"){
        drawGameOver();
    }
    
}

function drawScore(){
     //score

    fill("black");
    textSize(15);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text("Score: " + score, 10, 10); 
}


function drawTitleScreen(){
    background("#000000");
    fill("green");
    textAlign(CENTER, CENTER);
    textSize(40);
    text("THIS IS FROGFROGFROG", width / 2, height / 2 - 60);
    textSize(17);
    fill("lightgreen");
    text("MOVE FROG WITH MOUSE, CLICK TO SHOOT TONGUE OUT AND EAT", width / 2, height /2);
    textSize(15);
    fill("white"); 
    text("MOVE THE FROG WITH MOUSE, LMB (LEFT MOUSE BUTTON) TO USE TONGUE TO EAT", width / 2, height / 2 +50);
    textSize(20);
    text("CLICK SPACEBAR TO START", width / 2, height / 2 + 100);
}

function drawGameOver(){
    background("#000000");
    fill("red");
    textAlign(CENTER, CENTER);
    textSize(50);
    text("GAME OVER", width / 2, height / 2);
    textSize(20);
    fill("white");
    text("YOU ATE TOO MANY BAD FLIES", width / 2, height / 2 + 60);
    text("PRESS THE SPACEBAR TO GO BACK TO THE START SCREEN", width / 2, height / 2 + 90);

}
/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */ 
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}


function moveBadFly(){
    badFly.x += badFly.speed;

    if(badFly.x > width){
        resetBadFly();
    }
}

function drawBadFly() {
    push();
    noStroke();
    fill("red");
    ellipse(badFly.x, badFly.y, badFly.size);
    pop();
}

function resetBadFly(){
    badFly.x = 0;
    badFly.y = random(0, 300);
}


/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + fly.size/2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
        score++;
    }
}

function checkTongueBadFlyOverlap(){
    const d = dist(frog.tongue.x, frog.tongue.y, badFly.x, badFly.y);

    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + badFly.size/2);
    if(eaten){
        // Reset the bad fly
        resetBadFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
        score--;
    }
}
/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}

function keyPressed(){
    if(gameState === "title" && key === " "){
        gameState = "game";
        score = 0;
        resetFly();
        resetBadFly();
        
    if(!arcadeSong.isPlaying()){
        arcadeSong.loop();
    }
    }

    else if(gameState === "gameover" && key === " "){
        gameState = "title";
        score = 0;
        resetFly();
        resetBadFly();
    }
}