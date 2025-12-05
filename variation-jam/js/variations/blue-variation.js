/**
 * This file contains the code to run *only* the blue variation part of the program.
 * Note how it has its own draw, blueDraw(), and its own keyPressed, blueKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * This game is a version of the frog game I made. But in this variation, there is a timer that was added of 30 seconds as well as a boss that spawns, it takes 3 tongue hits to eat the boss which will give the user 5 points. If the boss hits the frog, it will deduct 5 points. The user wins at 15 points and loses at -15 points.
 */
"use strict";

let blueGameState = "title";
let blueArcadeSong; // song playing in the background
let blueScore = 0; // start score
let blueblueFlyMovement = 0; // movement of blueFly, sine wave
let blueFrogBlueOffsetX = 0; // allow frog to move with mouse + arrows
let blueEatSoundEffect; // good sound effect when eats broccoli
let blueEwSoundEffect; // bad sound effect when eat burger
let blueEyeOffsetX; // x eye offset from the frog's body
let blueEyeOffsetY; // y eye offset from the frog's body
let blueEyeSize; // size of frog eyes
let blueFlies = []; // array for good blueFlies aka broccoli
let badBlueFlies = []; // array for bad blueFlies aka burgers
let blueFly = blueFlies[0]; // first blueFly
let blueOffsetX = 0; // x offset for pupil to follow blueFly
let blueOffsetY = 0; // y offset for pupil to follow blueFly
let bluePupilSize; // size of pupils
let blueTimer = 30; // how long the game lasts
let lastTimerUpdate = 0; // stores time
let blueBossFly = null; // boss attributes null when isnt spawned
let blueBossFlySpawned = false; //boss appears once
let blueBossMaxHealth = 3; // max boss health, 3 hits
let blueBossCurrentHealth = blueBossMaxHealth; // boss health

// Our frog
const blueFrog = {
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
 * This will be called just before the blue variation starts
 */
function blueSetup() {
    blueArcadeSong = globalArcadeSong; 
    blueEatSoundEffect = globalEatSoundEffect;
    blueEwSoundEffect = globalEwSoundEffect;
    // Creates good blueFlies aka broccoli
    for (let i = 0; i < 2; i++){
        blueFlies.push({
            x: random(width),
            y: random(50,300),
            size: 10,
            speed: random(2,4)
        })
    }
    // Creates bad blueFlies aka burgers
    for (let i = 0; i < 5; i++){
        badBlueFlies.push({
            x: random(width),
            y: random(50,300),
            size: 40,
            speed: random(3,5)
        })
    }
}

/**
 * This will be called every frame when the blue variation is active
 */
function blueDraw() {
    if(blueGameState === "title"){
        blueDrawTitleScreen();
    }

    else if(blueGameState === "game"){
    background("#87ceeb");
    // Ground
    push();
    fill("darkblue");
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
    // Move blueFlies aka broccoli
    for (let blueFly of blueFlies){
        blueFly.x += blueFly.speed;
        blueFly.y += sin(blueblueFlyMovement) * 0.5;
        if(blueFly.x > width) blueFly.x = 0;
    }
    // Move bad blueFlies aka burgers
    for (let badblueFly of badBlueFlies){
        badblueFly.x += badblueFly.speed;
        badblueFly.y += sin(blueblueFlyMovement) * 0.5;
        if(badblueFly.x > width) badblueFly.x = 0;
    }
    // Sine-wave movement
    blueblueFlyMovement += 0.1;

    for(let blueFly of blueFlies){
        push();
        noStroke();
    
        // Broccoli body
        fill("blue");
        ellipse(blueFly.x, blueFly.y, blueFly.size, blueFly.size);
    
        // Broccoli stalk
        fill("#7CFC00");
        rect(blueFly.x - blueFly.size/6, blueFly.y + blueFly.size/2, blueFly.size/3, blueFly.size/2, 2);
    
        pop();
    }

    for(let badblueFly of badBlueFlies){
        push();
        noStroke();
    
        // Burger bun top
        fill("#DEB887");
        ellipse(badblueFly.x, badblueFly.y - badblueFly.size/6, badblueFly.size, badblueFly.size/4);
    
        // Burger patty
        fill("#8B4513"); 
        rect(badblueFly.x - badblueFly.size/2, badblueFly.y - badblueFly.size/12, badblueFly.size, badblueFly.size/6);
    
        // Burger bun bottom
        fill("#DEB887");
        ellipse(badblueFly.x, badblueFly.y + badblueFly.size/6, badblueFly.size, badblueFly.size/4);
    
        pop();
    }

    blueMoveFrog();
    blueMoveTongue();
    blueDrawFrog();   
    blueCheckTongueblueFlyOverlap();
    blueCheckTongueBadblueFlyOverlap();
    blueCheckTongueBossOverlap();
    blueDrawScore();
    blueBossDraw();
    blueCheckBossFrogOverlap();
    blueDrawTimer();

    // Checks if win or lose depending on score
    if(blueScore <= -15){
        blueGameState = "gameover";
    }

    else if(blueScore >= 15){
        blueGameState = "win";
    }
}  

    else if (blueGameState === "gameover"){
        blueDrawGameOver();
    }
    
    else if (blueGameState === "win"){
        blueDrawWin();
    }
    
    if(!blueBossFly && !blueBossFlySpawned && frameCount > 600){
        blueBossFly = {
            x: random(width),
            y: random(50,200),
            size: 75,
            speedX: random(6,10),
            speedY: random(5,8),
    };

    blueBossCurrentHealth = blueBossMaxHealth;
    blueBossFlySpawned = true;
}
}

function blueDrawTimer(){
    if (millis() - lastTimerUpdate >= 1000){
        blueTimer--;
        lastTimerUpdate = millis();
    }
    if(blueTimer <= 0){
         blueGameState = "gameover";
    }
    push();
    fill(255);
    stroke(0);
    strokeWeight(4);
    textSize(32);
    fill(255, 0, 0);
    textAlign(RIGHT, TOP);
    text("Time: " + blueTimer, width - 20, 60);
    pop();
}

function blueBossDraw(){
    if(!blueBossFly) return;

    // moves the boss
    blueBossFly.x += blueBossFly.speedX;
    blueBossFly.y += blueBossFly.speedY;

    // bounces it off the edges
    if(blueBossFly.x < 0 || blueBossFly.x > width) blueBossFly.speedX *= -1;
    if(blueBossFly.y <0 || blueBossFly.y > height - 80) blueBossFly.speedY *= -1;

    // draws boss aura (little yellow pulse)
    push();
    translate(blueBossFly.x, blueBossFly.y);
    let bossAura = blueBossFly.size + 20 * sin(frameCount * 0.2);

    fill(255,215,0,150);
    noStroke();
    ellipse(0,0, bossAura, bossAura);
    pop();

    // draw boss
    push();
    translate(blueBossFly.x, blueBossFly.y);
    fill("red");
    ellipse(0, 0, blueBossFly.size, blueBossFly.size);

    fill("#32CD32");
    ellipse(0, -blueBossFly.size * 0.5, blueBossFly.size * 0.7, blueBossFly.size * 0.2);
    ellipse(-blueBossFly.size * 0.35, -blueBossFly.size * 0.35, blueBossFly.size * 0.5, blueBossFly.size * 0.15);
    ellipse(blueBossFly.size * 0.35, -blueBossFly.size * 0.35, blueBossFly.size * 0.5, blueBossFly.size * 0.15);
    ellipse(-blueBossFly.size * 0.25, -blueBossFly.size * 0.55, blueBossFly.size * 0.4, blueBossFly.size * 0.12);
    ellipse(blueBossFly.size * 0.25, -blueBossFly.size * 0.55, blueBossFly.size * 0.4, blueBossFly.size * 0.12);
    pop();

    if(blueBossFly){
        push();
        fill("red");
        rectMode(CENTER);
        let healthBarWidth = blueBossFly.size;
        let HealthBarHeight = 5;
        let healthRatio = blueBossCurrentHealth / blueBossMaxHealth;
        rect(blueBossFly.x, blueBossFly.y - blueBossFly.size, healthBarWidth * healthRatio, HealthBarHeight);
        pop();
    }
}

// draws score
function blueDrawScore(){
     //score

    push();
    fill("black");
    stroke(0);
    strokeWeight(4);
    textSize(30);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text("SCORE: " + blueScore, 10, 10);
    pop();
}

// draws title screen
function blueDrawTitleScreen(){
    background("lightblue");
    push();
    fill("darkblue");
    noStroke();
    rect(0, height - 80, width, 80);
    pop();
    push();
    fill("white");
    ellipse(100, 80, 80, 50);
    ellipse(150, 70, 60, 40);
    ellipse(500, 50, 100, 60);
    pop();
    fill("blue"); 
    noStroke();
    textAlign(CENTER, CENTER);
    textFont('Lucida Console');
    textSize(60);
    text("FROG ON A DIET", width / 2, height / 2 - 60);
    textSize(10);
    fill("darkblue");
    text("MOVE THE FROG WITH MOUSE OR ARROW KEYS", width / 2, height / 2);
    text("USE LMB (LEFT MOUSE BUTTON) OR SPACEBAR TO USE TONGUE TO EAT", width / 2, height / 1.8);
    text("FIX THE FROG'S DIET BY EATING THE BROCCOLI BUT WATCHOUT FOR THE BOSS, EAT THE BOSS TO GAIN 5 POINTS, AVOID GETTING HIT BY IT OR LOSE 5 POINTS", width / 2, height / 1.6);
    fill("red");
    textSize(15);
    text("30 SECOND TIMER", width /2, height / 1.45);
    fill("black");
    textSize(25);
    text("CLICK SPACEBAR TO START", width / 2, height / 2 + 130);
}

// Draws the game over screen
function blueDrawGameOver(){
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

// draws win screen
function blueDrawWin(){
    background("lightblue");
    fill("blue");
    textAlign(CENTER, CENTER);
    textSize(40);
    text("YOU FIXED THE FROG'S DIET", width / 2, height / 2);
    textSize(20);
    fill("white");
    text("SUCCESS", width / 2, height / 2 + 60);
    text("PRESS THE SPACEBAR TO GO BACK TO THE START SCREEN", width / 2, height /  2 + 90);
}

// frog movement
function blueMoveFrog() {
    blueFrog.body.x = mouseX;

    if(keyIsDown(LEFT_ARROW)) blueFrogBlueOffsetX -= 10;
    if(keyIsDown(RIGHT_ARROW)) blueFrogBlueOffsetX += 10;

    blueFrog.body.x = mouseX + blueFrogBlueOffsetX;
}

// tongue movement
function blueMoveTongue() {
    // Tongue matches the frog's x
    blueFrog.tongue.x = blueFrog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (blueFrog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (blueFrog.tongue.state === "outbound") {
        blueFrog.tongue.y += -blueFrog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (blueFrog.tongue.y <= 0) {
            blueFrog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (blueFrog.tongue.state === "inbound") {
        blueFrog.tongue.y += blueFrog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (blueFrog.tongue.y >= height) {
            blueFrog.tongue.state = "idle";
        }
    }
}

// draws drog
function blueDrawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(blueFrog.tongue.x, blueFrog.tongue.y, blueFrog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(blueFrog.tongue.size);
    line(blueFrog.tongue.x, blueFrog.tongue.y, blueFrog.body.x, blueFrog.body.y);
    pop();

    // Draw the blueFrog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(blueFrog.body.x, blueFrog.body.y, blueFrog.body.size);
    pop();

    // Draws frog eyes
    push();
    fill("white");
    blueEyeOffsetX = blueFrog.body.size * 0.25;
    blueEyeOffsetY = blueFrog.body.size * -0.35;
    blueEyeSize = blueFrog.body.size * 0.2;

    ellipse(blueFrog.body.x - blueEyeOffsetX, blueFrog.body.y + blueEyeOffsetY, blueEyeSize);

    ellipse(blueFrog.body.x + blueEyeOffsetX, blueFrog.body.y + blueEyeOffsetY, blueEyeSize);

    pop();

    // Draws pupils
    push();
    fill("black");
    bluePupilSize = blueEyeSize * 0.5;
    // Makes pupils follow "blueFlies", 0.05 makes it follow it slightly
    if(blueFlies.length > 0){
        blueOffsetX = blueFlies[0].x - blueFrog.body.x;
        blueOffsetY = blueFlies[0].y - blueFrog.body.y;

        ellipse(blueFrog.body.x - blueEyeOffsetX + blueOffsetX * 0.05, blueFrog.body.y + blueEyeOffsetY + blueOffsetY * 0.05, bluePupilSize);
        ellipse(blueFrog.body.x + blueEyeOffsetX + blueOffsetX * 0.05, blueFrog.body.y + blueEyeOffsetY + blueOffsetY * 0.05, bluePupilSize);
    }

    pop();


}

// checks if tongue overlaps fly, if it does it will eat
function blueCheckTongueblueFlyOverlap() {
    for (let blueFly of blueFlies){
    // Get distance from tongue to blueFly
    const d = dist(blueFrog.tongue.x, blueFrog.tongue.y, blueFly.x, blueFly.y);
    // Check if it's an overlap
    const eaten = (d < blueFrog.tongue.size/2 + blueFly.size/2);
    if (eaten) {
        // Reset the blueFly
        blueFly.x = 0;
        blueFly.y = random(50,300);
        // Bring back the tongue
        blueFrog.tongue.state = "inbound";
        blueScore++;

        blueFrog.body.size -= 10;

        blueEatSoundEffect.play();
    }
    }
}

// checks if tongue overlaps bad fly, if so it will eat it
function blueCheckTongueBadblueFlyOverlap(){
    for (let badblueFly of badBlueFlies){
        const d = dist(blueFrog.tongue.x, blueFrog.tongue.y, badblueFly.x, badblueFly.y);

    // Check if it's an overlap
    const eaten = (d < blueFrog.tongue.size/2 + badblueFly.size/2);
    if(eaten){
        // Reset the bad blueFly
        badblueFly.x = 0;
        badblueFly.y = random(50,300);
        // Bring back the tongue
        blueFrog.tongue.state = "inbound";
        blueScore--;

        blueFrog.body.size += 25;

        blueEwSoundEffect.play();
    }
    }
}

// checks if tongue will overlap the boss, if so it will either damage or eat it
function blueCheckTongueBossOverlap(){
    if(!blueBossFly) return;

    const d = dist(blueFrog.tongue.x, blueFrog.tongue.y, blueBossFly.x, blueBossFly.y);
    const hit = (d < blueFrog.tongue.size/2 + blueBossFly.size/2);

    if(hit){
        blueBossCurrentHealth--;
        blueFrog.tongue.state = "inbound";
    }

    if(blueBossCurrentHealth <= 0){
        blueScore += 5;
        blueBossFly = null;

        blueEatSoundEffect.play();
    }
}

// checks if boss overlaps frog, if so it will hurt the score
function blueCheckBossFrogOverlap(){
    if(!blueBossFly) return;

    const collisionHitbox = 50;

    const d = dist(blueBossFly.x, blueBossFly.y, blueFrog.body.x, blueFrog.body.y);
    const hit = (d<blueBossFly.size/2 + blueFrog.body.size/2 + collisionHitbox);

    if(hit && frameCount % 30 === 0){
        blueScore -=5;
        blueFrog.body.size += 50;
        blueEwSoundEffect.play();
    }
}
/**
 * This will be called whenever a key is pressed while the blue variation is active
 */
function blueKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }

    if(blueGameState === "title" && key === " "){
        blueGameState = "game";
        blueScore = 0;
        blueTimer = 30;
        lastTimerUpdate = millis();

        
    if(blueArcadeSong && !blueArcadeSong.isPlaying()){
        blueArcadeSong.loop();
    }
    }

    else if (blueGameState === "game" && key === " "){
        if(blueFrog.tongue.state === "idle"){
            blueFrog.tongue.state = "outbound";
        }
    }
    

    else if((blueGameState === "gameover" || blueGameState === "win") && key === " "){
        blueGameState = "title";
        blueScore = 0;
        blueTimer = 30;
        lastTimerUpdate = millis();
        for(let blueFly of blueFlies){
            blueFly.x = random(width);
            blueFly.y = random(50,300);
        }
        for (let badblueFly of badBlueFlies){
            badblueFly.x = random(width);
            badblueFly.y = random(50,300);
        }
        blueFrog.body.size = 200;

        blueBossFlySpawned = false;
        blueBossFly = null;
    }
}

/**
 * This will be called whenever the mouse is pressed while the blue variation is active
 */
function blueMousePressed() {
    if (blueFrog.tongue.state === "idle") {
        blueFrog.tongue.state = "outbound";
    }
}