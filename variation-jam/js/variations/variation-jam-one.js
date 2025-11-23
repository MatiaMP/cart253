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

let variationOneGameState = "title";
let variationOneArcadeSong; // song playing in the background
let variationOneScore = 0; // start score
let variationOneFlyMovement = 0; // movement of fly, sine wave
let variationOneFrogOffsetX = 0; // allow frog to move with mouse + arrows
let variationOneEatSoundEffect; // good sound effect when eats broccoli
let variationOneEwSoundEffect; // bad sound effect when eat burger
let variationOneEyeOffsetX; // x eye offset from the frog's body
let variationOneEyeOffsetY; // y eye offset from the frog's body
let variationOneEyeSize; // size of frog eyes
let variationOneFlies = []; // array for good flies aka broccoli
let variationOneBadFlies = []; // array for bad flies aka burgers
let variationOneFly = variationOneFlies[0]; // first fly
let variationOneOffsetX = 0; // x offset for pupil to follow fly
let variationOneOffsetY = 0; // y offset for pupil to follow fly
let variationOnePupilSize; // size of pupils

// Our frog
const variationOneFrog = {
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
function variationOnePreload(){
    variationOneArcadeSong = loadSound('assets/sounds/arcadeSong.mp3'); 

    variationOneEatSoundEffect = loadSound('assets/sounds/yumyum.mp3');

    variationOneEwSoundEffect = loadSound('assets/sounds/eww.mp3');
}

/**
 * Creates the canvas and initializes the fly
 * Replaced setup() with variationOneSetup() for menu/variation
 */
function variationOneSetup() {
    // Sound
    variationOneArcadeSong.setVolume(0.2);
    variationOneEatSoundEffect.setVolume(1.0);
    variationOneEwSoundEffect.setVolume(1.0);
    // Creates good flies aka broccoli
    for (let i = 0; i < 2; i++){
        variationOneFlies.push({
            x: random(width),
            y: random(50,300),
            size: 10,
            speed: random(2,4)
        })
    }
    // Creates bad flies aka burgers
    for (let i = 0; i < 5; i++){
        variationOneBadFlies.push({
            x: random(width),
            y: random(50,300),
            size: 40,
            speed: random(3,5)
        })
    }
}

// Draw
function variationOneDraw() {
    if(variationOneGameState === "title"){
        drawTitleScreen();
    }

    else if(variationOneGameState === "game"){
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
    for (let variationOneFly of variationOneFlies){
        variationOneFly.x += variationOneFly.speed;
        variationOneFly.y += sin(variationOneFlyMovement) * 0.5;
        if(variationOneFly.x > width) variationOneFly.x = 0;
    }
    // Move bad flies aka burgers
    for (let badFly of variationOneBadFlies){
        badFly.x += badFly.speed;
        badFly.y += sin(variationOneFlyMovement) * 0.5;
        if(badFly.x > width) badFly.x = 0;
    }
    // Sine-wave movement
    variationOneFlyMovement += 0.1;

    for(let variationOneFly of variationOneFlies){
        push();
        noStroke();
    
        // Broccoli body
        fill("green");
        ellipse(variationOneFly.x, variationOneFly.y, variationOneFly.size, variationOneFly.size);
    
        // Broccoli stalk
        fill("#7CFC00");
        rect(variationOneFly.x - variationOneFly.size/6, variationOneFly.y + variationOneFly.size/2, variationOneFly.size/3, variationOneFly.size/2, 2);
    
        pop();
    }

    for(let badFly of variationOneBadFlies){
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
    if(variationOneScore <= -5){
        variationOneGameState = "gameover";
    }

    else if(variationOneScore >= 5){
        variationOneGameState = "win";
    }
}  

    else if (variationOneGameState === "gameover"){
        drawGameOver();
    }
    
    else if (variationOneGameState === "win"){
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
    text("SCORE: " + variationOneScore, 10, 10); 
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

    fly.y += sin(variationOneFlyMovement) * 5;
    variationOneFlyMovement += 0.1;

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
    variationOneFrog.body.x = mouseX;

    if(keyIsDown(LEFT_ARROW)) variationOneFrogOffsetX -= 10;
    if(keyIsDown(RIGHT_ARROW)) variationOneFrogOffsetX += 10;

    variationOneFrog.body.x = mouseX + variationOneFrogOffsetX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    variationOneFrog.tongue.x = variationOneFrog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (variationOneFrog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (variationOneFrog.tongue.state === "outbound") {
        variationOneFrog.tongue.y += -variationOneFrog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (variationOneFrog.tongue.y <= 0) {
            variationOneFrog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (variationOneFrog.tongue.state === "inbound") {
        variationOneFrog.tongue.y += variationOneFrog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (variationOneFrog.tongue.y >= height) {
            variationOneFrog.tongue.state = "idle";
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
    ellipse(variationOneFrog.tongue.x, variationOneFrog.tongue.y, variationOneFrog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(variationOneFrog.tongue.size);
    line(variationOneFrog.tongue.x, variationOneFrog.tongue.y, variationOneFrog.body.x, variationOneFrog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(variationOneFrog.body.x, variationOneFrog.body.y, variationOneFrog.body.size);
    pop();

    // Draws frog eyes
    push();
    fill("white");
    variationOneEyeOffsetX = variationOneFrog.body.size * 0.25;
    variationOneEyeOffsetY = variationOneFrog.body.size * -0.35;
    variationOneEyeSize = variationOneFrog.body.size * 0.2;

    ellipse(variationOneFrog.body.x - variationOneEyeOffsetX, variationOneFrog.body.y + variationOneEyeOffsetY, variationOneEyeSize);

    ellipse(variationOneFrog.body.x + variationOneEyeOffsetX, variationOneFrog.body.y + variationOneEyeOffsetY, variationOneEyeSize);

    pop();

    // Draws pupils
    push();
    fill("black");
    variationOnePupilSize = variationOneEyeSize * 0.5;
    // Makes pupils follow "flies", 0.05 makes it follow it slightly
    if(variationOneFlies.length > 0){
        variationOneOffsetX = variationOneFlies[0].x - variationOneFrog.body.x;
        variationOneOffsetY = variationOneFlies[0].y - variationOneFrog.body.y;

        ellipse(variationOneFrog.body.x - variationOneEyeOffsetX + variationOneOffsetX * 0.05, variationOneFrog.body.y + variationOneEyeOffsetY + variationOneOffsetY * 0.05, variationOnePupilSize);
        ellipse(variationOneFrog.body.x + variationOneEyeOffsetX + variationOneOffsetX * 0.05, variationOneFrog.body.y + variationOneEyeOffsetY + variationOneOffsetY * 0.05, variationOnePupilSize);
    }

    pop();


}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    for (let variationOneFly of variationOneFlies){
    // Get distance from tongue to fly
    const d = dist(variationOneFrog.tongue.x, variationOneFrog.tongue.y, variationOneFly.x, variationOneFly.y);
    // Check if it's an overlap
    const eaten = (d < variationOneFrog.tongue.size/2 + variationOneFly.size/2);
    if (eaten) {
        // Reset the fly
        variationOneFly.x = 0;
        variationOneFly.y = random(50,300);
        // Bring back the tongue
        variationOneFrog.tongue.state = "inbound";
        variationOneScore++;

        variationOneFrog.body.size -= 10;

        variationOneEatSoundEffect.play();
    }
    }
}

function checkTongueBadFlyOverlap(){
    for (let badFly of variationOneBadFlies){
        const d = dist(variationOneFrog.tongue.x, variationOneFrog.tongue.y, badFly.x, badFly.y);

    // Check if it's an overlap
    const eaten = (d < variationOneFrog.tongue.size/2 + badFly.size/2);
    if(eaten){
        // Reset the bad fly
        badFly.x = 0;
        badFly.y = random(50,300);
        // Bring back the tongue
        variationOneFrog.tongue.state = "inbound";
        variationOneScore--;

        variationOneFrog.body.size += 25;

        variationOneEwSoundEffect.play();
    }
    }
}
/**
 * Launch the tongue on click (if it's not launched yet)
 * You can use mouse press and spacebar to launch tongue
 */
function variationOneMousePressed() {
    if (variationOneFrog.tongue.state === "idle") {
        variationOneFrog.tongue.state = "outbound";
    }
}

function variationOneKeyPressed(){
    if(variationOneGameState === "title" && key === " "){
        variationOneGameState = "game";
        variationOneScore = 0;

        
    if(variationOneArcadeSong && !variationOneArcadeSong.isPlaying()){
        variationOneArcadeSong.loop();
    }
    }

    else if (variationOneGameState === "game" && key === " "){
        if(variationOneFrog.tongue.state === "idle"){
            variationOneFrog.tongue.state = "outbound";
        }
    }
    

    else if((variationOneGameState === "gameover" || variationOneGameState === "win") && key === " "){
        variationOneGameState = "title";
        variationOneScore = 0;
        for(let variationOneFly of variationOneFlies){
            variationOneFly.x = random(width);
            variationOneFly.y = random(50,300);
        }
        for (let badFly of variationOneBadFlies){
            badFly.x = random(width);
            badFly.y = random(50,300);
        }
        variationOneFrog.body.size = 200;
    }
}

