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

let variationThreeGameState = "title";
let variationThreeArcadeSong; // song playing in the background
let variationThreeScore = 0; // start score
let variationThreeFlyMovement = 0; // movement of fly, sine wave
let variationThreeFrogOffsetX = 0; // allow frog to move with mouse + arrows
let variationThreeEatSoundEffect; // good sound effect when eats broccoli
let variationThreeEwSoundEffect; // bad sound effect when eat burger
let variationThreeEyeOffsetX; // x eye offset from the frog's body
let variationThreeEyeOffsetY; // y eye offset from the frog's body
let variationThreeEyeSize; // size of frog eyes
let variationThreeFlies = []; // array for good flies aka broccoli
let variationThreeBadFlies = []; // array for bad flies aka burgers
let variationThreeFly = variationThreeFlies[0]; // first fly
let variationThreeOffsetX = 0; // x offset for pupil to follow fly
let variationThreeOffsetY = 0; // y offset for pupil to follow fly
let variationThreePupilSize; // size of pupils

// Our frog
const variationThreeFrog = {
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
function variationThreePreload(){
    variationThreeArcadeSong = loadSound('assets/sounds/arcadeSong.mp3'); 

    variationThreeEatSoundEffect = loadSound('assets/sounds/yumyum.mp3');

    variationThreeEwSoundEffect = loadSound('assets/sounds/eww.mp3');
}

/**
 * Creates the canvas and initializes the fly
 * Replaced setup() with variationThreeSetup() for menu/variation
 */
function variationThreeSetup() {
    // Sound
    variationThreeArcadeSong.setVolume(0.2);
    variationThreeEatSoundEffect.setVolume(1.0);
    variationThreeEwSoundEffect.setVolume(1.0);
    // Creates good flies aka broccoli
    for (let i = 0; i < 2; i++){
        variationThreeFlies.push({
            x: random(width),
            y: random(50,300),
            size: 10,
            speed: random(2,4)
        })
    }
    // Creates bad flies aka burgers
    for (let i = 0; i < 5; i++){
        variationThreeBadFlies.push({
            x: random(width),
            y: random(50,300),
            size: 40,
            speed: random(3,5)
        })
    }
}

// Draw
function variationThreeDraw() {
    if(variationThreeGameState === "title"){
        drawTitleScreen();
    }

    else if(variationThreeGameState === "game"){
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
    for (let variationThreeFly of variationThreeFlies){
        variationThreeFly.x += variationThreeFly.speed;
        variationThreeFly.y += sin(variationThreeFlyMovement) * 0.5;
        if(variationThreeFly.x > width) variationThreeFly.x = 0;
    }
    // Move bad flies aka burgers
    for (let badFly of variationThreeBadFlies){
        badFly.x += badFly.speed;
        badFly.y += sin(variationThreeFlyMovement) * 0.5;
        if(badFly.x > width) badFly.x = 0;
    }
    // Sine-wave movement
    variationThreeFlyMovement += 0.1;

    for(let variationThreeFly of variationThreeFlies){
        push();
        noStroke();
    
        // Broccoli body
        fill("green");
        ellipse(variationThreeFly.x, variationThreeFly.y, variationThreeFly.size, variationThreeFly.size);
    
        // Broccoli stalk
        fill("#7CFC00");
        rect(variationThreeFly.x - variationThreeFly.size/6, variationThreeFly.y + variationThreeFly.size/2, variationThreeFly.size/3, variationThreeFly.size/2, 2);
    
        pop();
    }

    for(let badFly of variationThreeBadFlies){
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
    if(variationThreeScore <= -5){
        variationThreeGameState = "gameover";
    }

    else if(variationThreeScore >= 5){
        variationThreeGameState = "win";
    }
}  

    else if (variationThreeGameState === "gameover"){
        drawGameOver();
    }
    
    else if (variationThreeGameState === "win"){
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
    text("SCORE: " + variationThreeScore, 10, 10); 
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

    fly.y += sin(variationThreeFlyMovement) * 5;
    variationThreeFlyMovement += 0.1;

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
    variationThreeFrog.body.x = mouseX;

    if(keyIsDown(LEFT_ARROW)) variationThreeFrogOffsetX -= 10;
    if(keyIsDown(RIGHT_ARROW)) variationThreeFrogOffsetX += 10;

    variationThreeFrog.body.x = mouseX + variationThreeFrogOffsetX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    variationThreeFrog.tongue.x = variationThreeFrog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (variationThreeFrog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (variationThreeFrog.tongue.state === "outbound") {
        variationThreeFrog.tongue.y += -variationThreeFrog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (variationThreeFrog.tongue.y <= 0) {
            variationThreeFrog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (variationThreeFrog.tongue.state === "inbound") {
        variationThreeFrog.tongue.y += variationThreeFrog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (variationThreeFrog.tongue.y >= height) {
            variationThreeFrog.tongue.state = "idle";
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
    ellipse(variationThreeFrog.tongue.x, variationThreeFrog.tongue.y, variationThreeFrog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(variationThreeFrog.tongue.size);
    line(variationThreeFrog.tongue.x, variationThreeFrog.tongue.y, variationThreeFrog.body.x, variationThreeFrog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(variationThreeFrog.body.x, variationThreeFrog.body.y, variationThreeFrog.body.size);
    pop();

    // Draws frog eyes
    push();
    fill("white");
    variationThreeEyeOffsetX = variationThreeFrog.body.size * 0.25;
    variationThreeEyeOffsetY = variationThreeFrog.body.size * -0.35;
    variationThreeEyeSize = variationThreeFrog.body.size * 0.2;

    ellipse(variationThreeFrog.body.x - variationThreeEyeOffsetX, variationThreeFrog.body.y + variationThreeEyeOffsetY, variationThreeEyeSize);

    ellipse(variationThreeFrog.body.x + variationThreeEyeOffsetX, variationThreeFrog.body.y + variationThreeEyeOffsetY, variationThreeEyeSize);

    pop();

    // Draws pupils
    push();
    fill("black");
    variationThreePupilSize = variationThreeEyeSize * 0.5;
    // Makes pupils follow "flies", 0.05 makes it follow it slightly
    if(variationThreeFlies.length > 0){
        variationThreeOffsetX = variationThreeFlies[0].x - variationThreeFrog.body.x;
        variationThreeOffsetY = variationThreeFlies[0].y - variationThreeFrog.body.y;

        ellipse(variationThreeFrog.body.x - variationThreeEyeOffsetX + variationThreeOffsetX * 0.05, variationThreeFrog.body.y + variationThreeEyeOffsetY + variationThreeOffsetY * 0.05, variationThreePupilSize);
        ellipse(variationThreeFrog.body.x + variationThreeEyeOffsetX + variationThreeOffsetX * 0.05, variationThreeFrog.body.y + variationThreeEyeOffsetY + variationThreeOffsetY * 0.05, variationThreePupilSize);
    }

    pop();


}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    for (let variationThreeFly of variationThreeFlies){
    // Get distance from tongue to fly
    const d = dist(variationThreeFrog.tongue.x, variationThreeFrog.tongue.y, variationThreeFly.x, variationThreeFly.y);
    // Check if it's an overlap
    const eaten = (d < variationThreeFrog.tongue.size/2 + variationThreeFly.size/2);
    if (eaten) {
        // Reset the fly
        variationThreeFly.x = 0;
        variationThreeFly.y = random(50,300);
        // Bring back the tongue
        variationThreeFrog.tongue.state = "inbound";
        variationThreeScore++;

        variationThreeFrog.body.size -= 10;

        variationThreeEatSoundEffect.play();
    }
    }
}

function checkTongueBadFlyOverlap(){
    for (let badFly of variationThreeBadFlies){
        const d = dist(variationThreeFrog.tongue.x, variationThreeFrog.tongue.y, badFly.x, badFly.y);

    // Check if it's an overlap
    const eaten = (d < variationThreeFrog.tongue.size/2 + badFly.size/2);
    if(eaten){
        // Reset the bad fly
        badFly.x = 0;
        badFly.y = random(50,300);
        // Bring back the tongue
        variationThreeFrog.tongue.state = "inbound";
        variationThreeScore--;

        variationThreeFrog.body.size += 25;

        variationThreeEwSoundEffect.play();
    }
    }
}
/**
 * Launch the tongue on click (if it's not launched yet)
 * You can use mouse press and spacebar to launch tongue
 */
function variationThreeMousePressed() {
    if (variationThreeFrog.tongue.state === "idle") {
        variationThreeFrog.tongue.state = "outbound";
    }
}

function variationThreeKeyPressed(){
    if(variationThreeGameState === "title" && key === " "){
        variationThreeGameState = "game";
        variationThreeScore = 0;

        
    if(variationThreeArcadeSong && !variationThreeArcadeSong.isPlaying()){
        variationThreeArcadeSong.loop();
    }
    }

    else if (variationThreeGameState === "game" && key === " "){
        if(variationThreeFrog.tongue.state === "idle"){
            variationThreeFrog.tongue.state = "outbound";
        }
    }
    

    else if((variationThreeGameState === "gameover" || variationThreeGameState === "win") && key === " "){
        variationThreeGameState = "title";
        variationThreeScore = 0;
        for(let variationThreeFly of variationThreeFlies){
            variationThreeFly.x = random(width);
            variationThreeFly.y = random(50,300);
        }
        for (let badFly of variationThreeBadFlies){
            badFly.x = random(width);
            badFly.y = random(50,300);
        }
        variationThreeFrog.body.size = 200;
    }
}

