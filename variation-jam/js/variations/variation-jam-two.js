/**
 * Frog on a Diet
 * Matia Paki
 * 
 * A game of putting a frog on a diet
 * Every burger eaten makes the frog bigger
 * Every broccoli eaten makes the frog smaller
 * The goal is to make the frog stay on a good diet
 * If the score reaches -5, the game will end as too many burgers have been eaten
 * If the score reaches 5, the game will end as you have successfully fixed the frog's diet
 * 
 * 
 * Instructions:
 * - Move the frog with your mouse or with arrowkeys
 * - Click LMB or Spacebar to launch the tongue
 * - Eat
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

let variationTwoGameState = "title";
let variationTwoArcadeSong; // song playing in the background
let variationTwoScore = 0; // start score
let variationTwoFlyMovement = 0; // movement of fly, sine wave
let variationTwoFrogOffsetX = 0; // allow frog to move with mouse + arrows
let variationTwoEatSoundEffect; // good sound effect when eats broccoli
let variationTwoEwSoundEffect; // bad sound effect when eat burger
let variationTwoEyeOffsetX; // x eye offset from the frog's body
let variationTwoEyeOffsetY; // y eye offset from the frog's body
let variationTwoEyeSize; // size of frog eyes
let variationTwoFlies = []; // array for good flies aka broccoli
let variationTwoBadFlies = []; // array for bad flies aka burgers
let variationTwoFly = variationTwoFlies[0]; // first fly
let variationTwoOffsetX = 0; // x offset for pupil to follow fly
let variationTwoOffsetY = 0; // y offset for pupil to follow fly
let variationTwoPupilSize; // size of pupils

// Our frog
const variationTwoFrog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 200
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
/**const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};
*/
/**const badFly = {
    x: 0,
    y: 100,
    size: 20,
    speed: 2
}
    */
// Assets preloaded
function variationTwoPreload(){
    variationTwoArcadeSong = loadSound('assets/sounds/arcadeSong.mp3'); 

    variationTwoEatSoundEffect = loadSound('assets/sounds/yumyum.mp3');

    variationTwoEwSoundEffect = loadSound('assets/sounds/eww.mp3');
}

/**
 * Creates the canvas and initializes the fly
 * Replaced setup() with variationTwoSetup() for menu/variation
 */
function variationTwoSetup() {
    // Sound
    variationTwoArcadeSong.setVolume(0.2);
    variationTwoEatSoundEffect.setVolume(1.0);
    variationTwoEwSoundEffect.setVolume(1.0);
    // Creates good flies aka broccoli
    for (let i = 0; i < 2; i++){
        variationTwoFlies.push({
            x: random(width),
            y: random(50,300),
            size: 10,
            speed: random(2,4)
        })
    }
    // Creates bad flies aka burgers
    for (let i = 0; i < 5; i++){
        variationTwoBadFlies.push({
            x: random(width),
            y: random(50,300),
            size: 40,
            speed: random(3,5)
        })
    }
}

// Draw
function variationTwoDraw() {
    if(variationTwoGameState === "title"){
        drawTitleScreen();
    }

    else if(variationTwoGameState === "game"){
    background("#87ceeb");
    // Ground
    push();
    fill("darkgreen");
    noStroke();
    rect(0, height - 80, width, 80);
    pop();
    // Clouds
    push();
    fill("white");
    ellipse(100, 80, 80, 50);
    ellipse(150, 70, 60, 40);
    ellipse(500, 50, 100, 60);
    pop();
    // Move flies aka broccoli
    for (let variationTwoFly of variationTwoFlies){
        variationTwoFly.x += variationTwoFly.speed;
        variationTwoFly.y += sin(variationTwoFlyMovement) * 0.5;
        if(variationTwoFly.x > width) variationTwoFly.x = 0;
    }
    // Move bad flies aka burgers
    for (let badFly of variationTwoBadFlies){
        badFly.x += badFly.speed;
        badFly.y += sin(variationTwoFlyMovement) * 0.5;
        if(badFly.x > width) badFly.x = 0;
    }
    // Sine-wave movement
    variationTwoFlyMovement += 0.1;

    for(let variationTwoFly of variationTwoFlies){
        push();
        noStroke();
    
        // Broccoli body
        fill("green");
        ellipse(variationTwoFly.x, variationTwoFly.y, variationTwoFly.size, variationTwoFly.size);
    
        // Broccoli stalk
        fill("#7CFC00");
        rect(variationTwoFly.x - variationTwoFly.size/6, variationTwoFly.y + variationTwoFly.size/2, variationTwoFly.size/3, variationTwoFly.size/2, 2);
    
        pop();
    }

    for(let badFly of variationTwoBadFlies){
        push();
        noStroke();
    
        // Burger bun top
        fill("#DEB887");
        ellipse(badFly.x, badFly.y - badFly.size/6, badFly.size, badFly.size/4);
    
        // Burger patty
        fill("#8B4513"); 
        rect(badFly.x - badFly.size/2, badFly.y - badFly.size/12, badFly.size, badFly.size/6);
    
        // Burger bun bottom
        fill("#DEB887");
        ellipse(badFly.x, badFly.y + badFly.size/6, badFly.size, badFly.size/4);
    
        pop();
    }

    moveFrog();
    moveTongue();
    drawFrog();   
    checkTongueFlyOverlap();
    checkTongueBadFlyOverlap();
    drawScore();

    // Checks if win or lose depending on score
    if(variationTwoScore <= -5){
        variationTwoGameState = "gameover";
    }

    else if(variationTwoScore >= 5){
        variationTwoGameState = "win";
    }
}  

    else if (variationTwoGameState === "gameover"){
        drawGameOver();
    }
    
    else if (variationTwoGameState === "win"){
        drawWin();
    }
}

// Draws the score in the top left
function drawScore(){
     //score

    fill("black");
    textSize(30);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text("SCORE: " + variationTwoScore, 10, 10); 
}

// Draws the first screen
function drawTitleScreen(){
    background("lightblue");
    push();
    fill("darkgreen");
    noStroke();
    rect(0, height - 80, width, 80);
    pop();
    push();
    fill("white");
    ellipse(100, 80, 80, 50);
    ellipse(150, 70, 60, 40);
    ellipse(500, 50, 100, 60);
    pop();
    fill("green"); 
    textAlign(CENTER, CENTER);
    textFont('Lucida Console');
    textSize(60);
    text("FROG ON A DIET", width / 2, height / 2 - 60);
    textSize(15);
    fill("darkgreen");
    text("MOVE THE FROG WITH MOUSE OR ARROW KEYS", width / 2, height / 2);
    text("USE LMB (LEFT MOUSE BUTTON) OR SPACEBAR TO USE TONGUE TO EAT", width / 2, height / 1.8);
    text("FIX THE FROG'S DIET BY EATING THE BROCCOLI", width / 2, height / 1.6);
    textSize(25);
    text("CLICK SPACEBAR TO START", width / 2, height / 2 + 130);
}

// Draws the game over screen
function drawGameOver(){
    background("#000000");
    fill("red");
    textAlign(CENTER, CENTER);
    textSize(50);
    text("GAME OVER", width / 2, height / 2);
    textSize(20);
    fill("white");
    text("YOU RUINED THE FROG'S DIET", width / 2, height / 2 + 60);
    text("PRESS THE SPACEBAR TO GO BACK TO THE START SCREEN", width / 2, height /  2 + 90);
}

// Draws the win screen
function drawWin(){
    background("lightgreen");
    fill("green");
    textAlign(CENTER, CENTER);
    textSize(40);
    text("YOU FIXED THE FROG'S DIET", width / 2, height / 2);
    textSize(20);
    fill("white");
    text("SUCCESS", width / 2, height / 2 + 60);
    text("PRESS THE SPACEBAR TO GO BACK TO THE START SCREEN", width / 2, height /  2 + 90);
}
/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
/**function moveFly() {
    // Move the fly
    fly.x += fly.speed;

    // Fly movement

    fly.y += sin(variationTwoFlyMovement) * 5;
    variationTwoFlyMovement += 0.1;

    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

 * Draws the fly as a black circle
 */ 
/**function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}
/**
 * Resets the fly to the left with a random y
 */

/**function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**function moveBadFly(){
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
*/

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    variationTwoFrog.body.x = mouseX;

    if(keyIsDown(LEFT_ARROW)) variationTwoFrogOffsetX -= 10;
    if(keyIsDown(RIGHT_ARROW)) variationTwoFrogOffsetX += 10;

    variationTwoFrog.body.x = mouseX + variationTwoFrogOffsetX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    variationTwoFrog.tongue.x = variationTwoFrog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (variationTwoFrog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (variationTwoFrog.tongue.state === "outbound") {
        variationTwoFrog.tongue.y += -variationTwoFrog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (variationTwoFrog.tongue.y <= 0) {
            variationTwoFrog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (variationTwoFrog.tongue.state === "inbound") {
        variationTwoFrog.tongue.y += variationTwoFrog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (variationTwoFrog.tongue.y >= height) {
            variationTwoFrog.tongue.state = "idle";
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
    ellipse(variationTwoFrog.tongue.x, variationTwoFrog.tongue.y, variationTwoFrog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(variationTwoFrog.tongue.size);
    line(variationTwoFrog.tongue.x, variationTwoFrog.tongue.y, variationTwoFrog.body.x, variationTwoFrog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(variationTwoFrog.body.x, variationTwoFrog.body.y, variationTwoFrog.body.size);
    pop();

    // Draws frog eyes
    push();
    fill("white");
    variationTwoEyeOffsetX = variationTwoFrog.body.size * 0.25;
    variationTwoEyeOffsetY = variationTwoFrog.body.size * -0.35;
    variationTwoEyeSize = variationTwoFrog.body.size * 0.2;

    ellipse(variationTwoFrog.body.x - variationTwoEyeOffsetX, variationTwoFrog.body.y + variationTwoEyeOffsetY, variationTwoEyeSize);

    ellipse(variationTwoFrog.body.x + variationTwoEyeOffsetX, variationTwoFrog.body.y + variationTwoEyeOffsetY, variationTwoEyeSize);

    pop();

    // Draws pupils
    push();
    fill("black");
    variationTwoPupilSize = variationTwoEyeSize * 0.5;
    // Makes pupils follow "flies", 0.05 makes it follow it slightly
    if(variationTwoFlies.length > 0){
        variationTwoOffsetX = variationTwoFlies[0].x - variationTwoFrog.body.x;
        variationTwoOffsetY = variationTwoFlies[0].y - variationTwoFrog.body.y;

        ellipse(variationTwoFrog.body.x - variationTwoEyeOffsetX + variationTwoOffsetX * 0.05, variationTwoFrog.body.y + variationTwoEyeOffsetY + variationTwoOffsetY * 0.05, variationTwoPupilSize);
        ellipse(variationTwoFrog.body.x + variationTwoEyeOffsetX + variationTwoOffsetX * 0.05, variationTwoFrog.body.y + variationTwoEyeOffsetY + variationTwoOffsetY * 0.05, variationTwoPupilSize);
    }

    pop();


}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    for (let variationTwoFly of variationTwoFlies){
    // Get distance from tongue to fly
    const d = dist(variationTwoFrog.tongue.x, variationTwoFrog.tongue.y, variationTwoFly.x, variationTwoFly.y);
    // Check if it's an overlap
    const eaten = (d < variationTwoFrog.tongue.size/2 + variationTwoFly.size/2);
    if (eaten) {
        // Reset the fly
        variationTwoFly.x = 0;
        variationTwoFly.y = random(50,300);
        // Bring back the tongue
        variationTwoFrog.tongue.state = "inbound";
        variationTwoScore++;

        variationTwoFrog.body.size -= 10;

        variationTwoEatSoundEffect.play();
    }
    }
}

function checkTongueBadFlyOverlap(){
    for (let badFly of variationTwoBadFlies){
        const d = dist(variationTwoFrog.tongue.x, variationTwoFrog.tongue.y, badFly.x, badFly.y);

    // Check if it's an overlap
    const eaten = (d < variationTwoFrog.tongue.size/2 + badFly.size/2);
    if(eaten){
        // Reset the bad fly
        badFly.x = 0;
        badFly.y = random(50,300);
        // Bring back the tongue
        variationTwoFrog.tongue.state = "inbound";
        variationTwoScore--;

        variationTwoFrog.body.size += 25;

        variationTwoEwSoundEffect.play();
    }
    }
}
/**
 * Launch the tongue on click (if it's not launched yet)
 * You can use mouse press and spacebar to launch tongue
 */
function variationTwoMousePressed() {
    if (variationTwoFrog.tongue.state === "idle") {
        variationTwoFrog.tongue.state = "outbound";
    }
}

function variationTwoKeyPressed(){
    if(variationTwoGameState === "title" && key === " "){
        variationTwoGameState = "game";
        variationTwoScore = 0;

        
    if(variationTwoArcadeSong && !variationTwoArcadeSong.isPlaying()){
        variationTwoArcadeSong.loop();
    }
    }

    else if (variationTwoGameState === "game" && key === " "){
        if(variationTwoFrog.tongue.state === "idle"){
            variationTwoFrog.tongue.state = "outbound";
        }
    }
    

    else if((variationTwoGameState === "gameover" || variationTwoGameState === "win") && key === " "){
        variationTwoGameState = "title";
        variationTwoScore = 0;
        for(let variationTwoFly of variationTwoFlies){
            variationTwoFly.x = random(width);
            variationTwoFly.y = random(50,300);
        }
        for (let badFly of variationTwoBadFlies){
            badFly.x = random(width);
            badFly.y = random(50,300);
        }
        variationTwoFrog.body.size = 200;
    }
}

