/**
 * This file contains the code to run *only* the green variation part of the program.
 * Note how it has its own draw, greenDraw(), and its own keyPressed, greenKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

"use strict";

let greenGameState = "title";
let greenArcadeSong; // song playing in the background
let greenScore = 0; // start score
let greengreenFlyMovement = 0; // movement of greenFly, sine wave
let greenFrogGreenOffsetX = 0; // allow frog to move with mouse + arrows
let greenFrogGreenOffsetY = 0;
let greenEatSoundEffect; // good sound effect when eats broccoli
let greenEwSoundEffect; // bad sound effect when eat burger
let greenEyeOffsetX; // x eye offset from the frog's body
let greenEyeOffsetY; // y eye offset from the frog's body
let greenEyeSize; // size of frog eyes
let greenFlies = []; // array for good greenFlies aka broccoli
let badGreenFlies = []; // array for bad greenFlies aka burgers
let greenFly = greenFlies[0]; // first greenFly
let greenOffsetX = 0; // x offset for pupil to follow greenFly
let greenOffsetY = 0; // y offset for pupil to follow greenFly
let greenPupilSize; // size of pupils

// Our frog
const greenFrog = {
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


/**
 * This will be called just before the green variation starts
 */
function greenSetup() {
    greenArcadeSong = globalArcadeSong; 
    greenEatSoundEffect = globalEatSoundEffect;
    greenEwSoundEffect = globalEwSoundEffect;
    // Creates good greenFlies aka broccoli
    for (let i = 0; i < 2; i++){
        greenFlies.push({
            x: random(width),
            y: random(50,300),
            size: 10,
            speed: random(2,4)
        })
    }
    // Creates bad greenFlies aka burgers
    for (let i = 0; i < 5; i++){
        badGreenFlies.push({
            x: random(width),
            y: random(50,300),
            size: 40,
            speed: random(3,5)
        })
    }
}

/**
 * This will be called every frame when the green variation is active
 */
function greenDraw() {
    if(greenGameState === "title"){
        greenDrawTitleScreen();
    }

    else if(greenGameState === "game"){
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
    // Move greenFlies aka broccoli
    for (let greenFly of greenFlies){
        greenFly.x += greenFly.speed;
        greenFly.y += sin(greengreenFlyMovement) * 0.5;
        if(greenFly.x > width) greenFly.x = 0;
    }
    // Move bad greenFlies aka burgers
    for (let badGreenFly of badGreenFlies){
        badGreenFly.x += badGreenFly.speed;
        badGreenFly.y += sin(greengreenFlyMovement) * 0.5;
        if(badGreenFly.x > width) badGreenFly.x = 0;
    }
    // Sine-wave movement
    greengreenFlyMovement += 0.1;

    for(let greenFly of greenFlies){
        push();
        noStroke();
    
        // Broccoli body
        fill("green");
        ellipse(greenFly.x, greenFly.y, greenFly.size, greenFly.size);
    
        // Broccoli stalk
        fill("#7CFC00");
        rect(greenFly.x - greenFly.size/6, greenFly.y + greenFly.size/2, greenFly.size/3, greenFly.size/2, 2);
    
        pop();
    }

    for(let badGreenFly of badGreenFlies){
        push();
        noStroke();
    
        // Burger bun top
        fill("#DEB887");
        ellipse(badGreenFly.x, badGreenFly.y - badGreenFly.size/6, badGreenFly.size, badGreenFly.size/4);
    
        // Burger patty
        fill("#8B4513"); 
        rect(badGreenFly.x - badGreenFly.size/2, badGreenFly.y - badGreenFly.size/12, badGreenFly.size, badGreenFly.size/6);
    
        // Burger bun bottom
        fill("#DEB887");
        ellipse(badGreenFly.x, badGreenFly.y + badGreenFly.size/6, badGreenFly.size, badGreenFly.size/4);
    
        pop();
    }

    greenMoveFrog();
    //greenMoveTongue();
    greenDrawFrog();   
    //greenCheckTonguegreenFlyOverlap();
    //greenCheckTonguebadGreenFlyOverlap();
    greenDrawScore();
    greenCheckCollisions();

    // Checks if win or lose depending on score
    if(greenScore <= -20){
        greenGameState = "gameover";
    }

    else if(greenScore >= 20){
        greenGameState = "win";
    }
}  

    else if (greenGameState === "gameover"){
        greenDrawGameOver();
    }
    
    else if (greenGameState === "win"){
        greenDrawWin();
    }
}

function greenDrawScore(){
     //score

    fill("black");
    textSize(30);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text("SCORE: " + greenScore, 10, 10); 
}

function greenDrawTitleScreen(){
    background("lightgreen");
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
function greenDrawGameOver(){
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

function greenDrawWin(){
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

function greenMoveFrog() {
    greenFrog.body.x = mouseX;

    if(keyIsDown(LEFT_ARROW)) greenFrogGreenOffsetX -= 10;
    if(keyIsDown(RIGHT_ARROW)) greenFrogGreenOffsetX += 10;
    if(keyIsDown(UP_ARROW)) greenFrogGreenOffsetY -= 10;
    if(keyIsDown(DOWN_ARROW)) greenFrogGreenOffsetY += 10;

    greenFrog.body.x = mouseX + greenFrogGreenOffsetX;
    greenFrog.body.y = mouseY + greenFrogGreenOffsetY;
}

/*function greenMoveTongue() {
    // Tongue matches the frog's x
    greenFrog.tongue.x = greenFrog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (greenFrog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (greenFrog.tongue.state === "outbound") {
        greenFrog.tongue.y += -greenFrog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (greenFrog.tongue.y <= 0) {
            greenFrog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (greenFrog.tongue.state === "inbound") {
        greenFrog.tongue.y += greenFrog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (greenFrog.tongue.y >= height) {
            greenFrog.tongue.state = "idle";
        }
    }
}
*/

function greenDrawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(greenFrog.tongue.x, greenFrog.tongue.y, greenFrog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(greenFrog.tongue.size);
    line(greenFrog.tongue.x, greenFrog.tongue.y, greenFrog.body.x, greenFrog.body.y);
    pop();

    // Draw the greenFrog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(greenFrog.body.x, greenFrog.body.y, greenFrog.body.size);
    pop();

    // Draws frog eyes
    push();
    fill("white");
    greenEyeOffsetX = greenFrog.body.size * 0.25;
    greenEyeOffsetY = greenFrog.body.size * -0.35;
    greenEyeSize = greenFrog.body.size * 0.2;

    ellipse(greenFrog.body.x - greenEyeOffsetX, greenFrog.body.y + greenEyeOffsetY, greenEyeSize);

    ellipse(greenFrog.body.x + greenEyeOffsetX, greenFrog.body.y + greenEyeOffsetY, greenEyeSize);

    pop();

    // Draws pupils
    push();
    fill("black");
    greenPupilSize = greenEyeSize * 0.5;
    // Makes pupils follow "greenFlies", 0.05 makes it follow it slightly
    if(greenFlies.length > 0){
        greenOffsetX = greenFlies[0].x - greenFrog.body.x;
        greenOffsetY = greenFlies[0].y - greenFrog.body.y;

        ellipse(greenFrog.body.x - greenEyeOffsetX + greenOffsetX * 0.05, greenFrog.body.y + greenEyeOffsetY + greenOffsetY * 0.05, greenPupilSize);
        ellipse(greenFrog.body.x + greenEyeOffsetX + greenOffsetX * 0.05, greenFrog.body.y + greenEyeOffsetY + greenOffsetY * 0.05, greenPupilSize);
    }

    pop();


}

/*function greenCheckTonguegreenFlyOverlap() {
    for (let greenFly of greenFlies){
    // Get distance from tongue to greenFly
    const d = dist(greenFrog.tongue.x, greenFrog.tongue.y, greenFly.x, greenFly.y);
    // Check if it's an overlap
    const eaten = (d < greenFrog.tongue.size/2 + greenFly.size/2);
    if (eaten) {
        // Reset the greenFly
        greenFly.x = 0;
        greenFly.y = random(50,300);
        // Bring back the tongue
        greenFrog.tongue.state = "inbound";
        greenScore++;

        greenFrog.body.size -= 10;

        greenEatSoundEffect.play();
    }
    }
}

function greenCheckTonguebadGreenFlyOverlap(){
    for (let badGreenFly of badGreenFlies){
        const d = dist(greenFrog.tongue.x, greenFrog.tongue.y, badGreenFly.x, badGreenFly.y);

    // Check if it's an overlap
    const eaten = (d < greenFrog.tongue.size/2 + badGreenFly.size/2);
    if(eaten){
        // Reset the bad greenFly
        badGreenFly.x = 0;
        badGreenFly.y = random(50,300);
        // Bring back the tongue
        greenFrog.tongue.state = "inbound";
        greenScore--;

        greenFrog.body.size += 25;

        greenEwSoundEffect.play();
    }
    }
}
*/

function greenCheckCollisions(){
    for(let i = 0; i < greenFlies.length; i++){
        let greenFly = greenFlies[i];
        const d = dist(greenFrog.body.x, greenFrog.body.y, greenFly.x, greenFly.y);
        if(d < greenFrog.body.size/2 + greenFly.size/2){
            greenScore += 2;
            greenFrog.body.size -= 20;
            greenFly.x = random(width);
            greenFly.y = random(50,300);
            greenEatSoundEffect.play();
        }
    }

    for(let i = 0; i < badGreenFlies.length; i++){
        let badGreenFly = badGreenFlies[i];
        const d = dist(greenFrog.body.x, greenFrog.body.y, badGreenFly.x, badGreenFly.y);
        if(d < greenFrog.body.size/2 + badGreenFly.size/2){
            greenScore -= 1;
            greenFrog.body.size += 15;
            badGreenFly.x = random(width);
            badGreenFly.y = random(50,300);
            greenEwSoundEffect.play();
        }
    }
}

/**
 * This will be called whenever a key is pressed while the green variation is active
 */
function greenKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }

    if(greenGameState === "title" && key === " "){
        greenGameState = "game";
        greenScore = 0;

        
    if(greenArcadeSong && !greenArcadeSong.isPlaying()){
        greenArcadeSong.loop();
    }
    }

    else if (greenGameState === "game" && key === " "){
        if(greenFrog.tongue.state === "idle"){
            greenFrog.tongue.state = "outbound";
        }
    }
    

    else if((greenGameState === "gameover" || greenGameState === "win") && key === " "){
        greenGameState = "title";
        greenScore = 0;
        for(let greenFly of greenFlies){
            greenFly.x = random(width);
            greenFly.y = random(50,300);
        }
        for (let badGreenFly of badGreenFlies){
            badGreenFly.x = random(width);
            badGreenFly.y = random(50,300);
        }
        greenFrog.body.size = 200;
    }
}

/**
 * This will be called whenever the mouse is pressed while the green variation is active
 */
function greenMousePressed() {
    if (greenFrog.tongue.state === "idle") {
        greenFrog.tongue.state = "outbound";
    }
}