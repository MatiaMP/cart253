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

let gameState = "title";
let arcadeSong; // song playing in the background
let score = 0; // start score
let flyMovmement = 0; // movement of fly, sine wave
let frogOffsetX = 0; // allow frog to move with mouse + arrows
let eatSoundEffect; // good sound effect when eats broccoli
let ewSoundEffect; // bad sound effect when eat burger
let eyeOffsetX; // x eye offset from the frog's body
let eyeOffsetY; // y eye offset from the frog's body
let eyeSize; // size of frog eyes
let flies = []; // array for good flies aka broccoli
let badFlies = []; // array for bad flies aka burgers
let fly = flies[0]; // first fly
let offsetX = 0; // x offset for pupil to follow fly
let offsetY = 0; // y offset for pupil to follow fly
let pupilSize; // size of pupils

// Our frog
const frog = {
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
function preload(){
    arcadeSong = loadSound('assets/sounds/arcadeSong.mp3'); 

    eatSoundEffect = loadSound('assets/sounds/yumyum.mp3');

    ewSoundEffect = loadSound('assets/sounds/eww.mp3');
}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    // Sound
    arcadeSong.setVolume(0.2);
    eatSoundEffect.setVolume(1.0);
    ewSoundEffect.setVolume(1.0);
    // Creates good flies aka broccoli
    for (let i = 0; i < 2; i++){
        flies.push({
            x: random(width),
            y: random(50,300),
            size: 10,
            speed: random(2,4)
        })
    }
    // Creates bad flies aka burgers
    for (let i = 0; i < 5; i++){
        badFlies.push({
            x: random(width),
            y: random(50,300),
            size: 40,
            speed: random(3,5)
        })
    }
}
// Draw
function draw() {
    if(gameState === "title"){
        drawTitleScreen();
    }

    else if(gameState === "game"){
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
    for (let fly of flies){
        fly.x += fly.speed;
        fly.y += sin(flyMovmement) * 0.5;
        if(fly.x > width) fly.x = 0;
    }
    // Move bad flies aka burgers
    for (let badFly of badFlies){
        badFly.x += badFly.speed;
        badFly.y += sin(flyMovmement) * 0.5;
        if(badFly.x > width) badFly.x = 0;
    }
    // Sine-wave movement
    flyMovmement += 0.1;

    for(let fly of flies){
        push();
        noStroke();
    
        // Broccoli body
        fill("green");
        ellipse(fly.x, fly.y, fly.size, fly.size);
    
        // Broccoli stalk
        fill("#7CFC00");
        rect(fly.x - fly.size/6, fly.y + fly.size/2, fly.size/3, fly.size/2, 2);
    
        pop();
    }

    for(let badFly of badFlies){
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
    if(score <= -5){
        gameState = "gameover";
    }

    else if(score >= 5){
        gameState = "win";
    }
}  

    else if (gameState === "gameover"){
        drawGameOver();
    }
    
    else if (gameState === "win"){
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
    text("SCORE: " + score, 10, 10); 
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

    fly.y += sin(flyMovmement) * 5;
    flyMovmement += 0.1;

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
    frog.body.x = mouseX;

    if(keyIsDown(LEFT_ARROW)) frogOffsetX -= 10;
    if(keyIsDown(RIGHT_ARROW)) frogOffsetX += 10;

    frog.body.x = mouseX + frogOffsetX;
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

    // Draws frog eyes
    push();
    fill("white");
    eyeOffsetX = frog.body.size * 0.25;
    eyeOffsetY = frog.body.size * -0.35;
    eyeSize = frog.body.size * 0.2;

    ellipse(frog.body.x - eyeOffsetX, frog.body.y + eyeOffsetY, eyeSize);

    ellipse(frog.body.x + eyeOffsetX, frog.body.y + eyeOffsetY, eyeSize);

    pop();

    // Draws pupils
    push();
    fill("black");
    pupilSize = eyeSize * 0.5;
    // Makes pupils follow "flies", 0.05 makes it follow it slightly
    if(flies.length > 0){
        offsetX = flies[0].x - frog.body.x;
        offsetY = flies[0].y - frog.body.y;

        ellipse(frog.body.x - eyeOffsetX + offsetX * 0.05, frog.body.y + eyeOffsetY + offsetY * 0.05, pupilSize);
        ellipse(frog.body.x + eyeOffsetX + offsetX * 0.05, frog.body.y + eyeOffsetY + offsetY * 0.05, pupilSize);
    }

    pop();


}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    for (let fly of flies){
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + fly.size/2);
    if (eaten) {
        // Reset the fly
        fly.x = 0;
        fly.y = random(50,300);
        // Bring back the tongue
        frog.tongue.state = "inbound";
        score++;

        frog.body.size -= 10;

        eatSoundEffect.play();
    }
    }
}

function checkTongueBadFlyOverlap(){
    for (let badFly of badFlies){
        const d = dist(frog.tongue.x, frog.tongue.y, badFly.x, badFly.y);

    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + badFly.size/2);
    if(eaten){
        // Reset the bad fly
        badFly.x = 0;
        badFly.y = random(50,300);
        // Bring back the tongue
        frog.tongue.state = "inbound";
        score--;

        frog.body.size += 25;

        ewSoundEffect.play();
    }
    }
}
/**
 * Launch the tongue on click (if it's not launched yet)
 * You can use mouse press and spacebar to launch tongue
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
        resetBadFly();
        
    if(!arcadeSong.isPlaying()){
        arcadeSong.loop();
    }
    }

    else if (gameState === "game" && key === " "){
        if(frog.tongue.state === "idle"){
            frog.tongue.state = "outbound";
        }
    }
    

    else if((gameState === "gameover" || gameState === "win") && key === " "){
        gameState = "title";
        score = 0;
        for(let fly of flies){
            fly.x = random(width);
            fly.y = random(50,300);
        }
        for (let badFly of badFlies){
            badFly.x = random(width);
            badFly.y = random(50,300);
        }
        frog.body.size = 200;
    }
}