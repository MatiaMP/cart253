/**
 * This file contains the code to run *only* the red variation part of the program.
 * Note how it has its own draw, redDraw(), and its own keyPressed, redKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

"use strict";

let redGameState = "title";
let redArcadeSong; // song playing in the background
//let redScore = 0; // start score
let redFlyMovement = 0; // movement of redFly, sine wave
let redFrogRedOffsetX = 0; // allow frog to move with mouse + arrows
let redEatSoundEffect; // good sound effect when eats broccoli
let redEwSoundEffect; // bad sound effect when eat burger
let redEyeOffsetX; // x eye offset from the frog's body
let redEyeOffsetY; // y eye offset from the frog's body
let redEyeSize; // size of frog eyes
let redFlies = []; // array for good redFlies aka broccoli
let badRedFlies = []; // array for bad redFlies aka burgers
let redFly = redFlies[0]; // first redFly
let redOffsetX = 0; // x offset for pupil to follow redFly
let redOffsetY = 0; // y offset for pupil to follow redFly
let redPupilSize; // size of pupils
let redHealth = 50; // health bar
let redWave = 1;
let redWaveTimer = 30;
let redLastWaveUpdate = 0;
let waveData;
let waveDataLoaded;
let redWaveAnnouncement = "";
let redAnnouncementTimer = 0;

// Our frog
const redFrog = {
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
 * This will be called just before the red variation starts
 */
function redSetup() {
    redArcadeSong = globalArcadeSong; 
    redEatSoundEffect = globalEatSoundEffect;
    redEwSoundEffect = globalEwSoundEffect;

    loadJSON("assets/data/waves.json", function(data){
        waveData = data;
        waveDataLoaded = true;
        console.log(waveData);
    });

    // Creates good redFlies aka broccoli
    for (let i = 0; i < 3; i++){
        redFlies.push({
            x: random(width),
            y: random(50,300),
            size: 10,
            speed: random(2,4)
        })
    }
    // Creates bad redFlies aka burgers
    for (let i = 0; i < 10; i++){
        badRedFlies.push({
            x: random(width),
            y: random(50,300),
            size: 50,
            speed: random(3,5)
        })
    }
}

/**
 * This will be called every frame when the red variation is active
 */
function redDraw() {
    if(!waveDataLoaded){
        background(100);
        fill(255);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Loading data...", width/2, height/2);
        return;
    }


    if(redGameState === "title"){
        redDrawTitleScreen();
    }

    else if(redGameState === "game"){
    
    if(millis() - redLastWaveUpdate >= 200){
        redWaveTimer--;
        redLastWaveUpdate = millis();
    }

    if(redWaveTimer <= 0){
        redWave++;
        redWaveTimer = 30;

        let currentWave = waveData[redWave - 1];

        if(!currentWave){
            redWave = waveData.length;
        }

        else{
            redUpdateFlySpeed();

            redWaveAnnouncement = currentWave.announcement;
            redAnnouncementTimer = 100;
        }
    }
    background("#87ceeb");
    // Ground
    push();
    fill("darkred");
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

    if (redAnnouncementTimer > 0) {
    fill("red");
    textAlign(CENTER, CENTER);
    textSize(30);
    text(redWaveAnnouncement, width / 2, 50);
    redAnnouncementTimer--;
    }

    // Move redFlies aka broccoli
    for (let redFly of redFlies){
        redFly.x += redFly.speed;
        redFly.y += sin(redFlyMovement) * 0.5;
        if(redFly.x > width) redFly.x = 0;
    }
    // Move bad redFlies aka burgers
    for (let badRedFly of badRedFlies){
        badRedFly.x += badRedFly.speed;
        badRedFly.y += sin(redFlyMovement) * 0.5;
        if(badRedFly.x > width) badRedFly.x = 0;
    }
    // Sine-wave movement
    redFlyMovement += 0.1;

    for(let redFly of redFlies){
        push();
        noStroke();
    
        // Broccoli body
        fill("red");
        ellipse(redFly.x, redFly.y, redFly.size, redFly.size);
    
        // Broccoli stalk
        fill("#7CFC00");
        rect(redFly.x - redFly.size/6, redFly.y + redFly.size/2, redFly.size/3, redFly.size/2, 2);
    
        pop();
    }

    for(let badRedFly of badRedFlies){
        push();
        noStroke();
    
        // Burger bun top
        fill("#DEB887");
        ellipse(badRedFly.x, badRedFly.y - badRedFly.size/6, badRedFly.size, badRedFly.size/4);
    
        // Burger patty
        fill("#8B4513"); 
        rect(badRedFly.x - badRedFly.size/2, badRedFly.y - badRedFly.size/12, badRedFly.size, badRedFly.size/6);
    
        // Burger bun bottom
        fill("#DEB887");
        ellipse(badRedFly.x, badRedFly.y + badRedFly.size/6, badRedFly.size, badRedFly.size/4);
    
        pop();
    }

    redMoveFrog();
    redMoveTongue();
    redDrawFrog();   
    redCheckTongueredFlyOverlap();
    redCheckTonguebadRedFlyOverlap();
    //redDrawScore();
    redDrawHealthBar();
    redUpdateFlySpeed();

    if(redHealth <= 0){
        redGameState = "gameover";
    }

    else if(redHealth >= 100){
        redGameState = "win";
    }
    // Checks if win or lose depending on score
    /*if(redScore <= -5){
        redGameState = "gameover";
    }

    else if(redScore >= 5){
        redGameState = "win";
    }*/
}  

    else if (redGameState === "gameover"){
        redDrawGameOver();
    }
    
    else if (redGameState === "win"){
        redDrawWin();
    }

}

/*function redDrawScore(){
     //score

    fill("black");
    textSize(30);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text("SCORE: " + redScore, 10, 10); 
}
*/

function redDrawTitleScreen(){
    background("lightred");
    push();
    fill("darkred");
    noStroke();
    rect(0, height - 80, width, 80);
    pop();
    push();
    fill("white");
    ellipse(100, 80, 80, 50);
    ellipse(150, 70, 60, 40);
    ellipse(500, 50, 100, 60);
    pop();
    fill("red"); 
    textAlign(CENTER, CENTER);
    textFont('Lucida Console');
    textSize(60);
    text("FROG ON A DIET", width / 2, height / 2 - 60);
    textSize(15);
    fill("darkred");
    text("MOVE THE FROG WITH MOUSE OR ARROW KEYS", width / 2, height / 2);
    text("USE LMB (LEFT MOUSE BUTTON) OR SPACEBAR TO USE TONGUE TO EAT", width / 2, height / 1.8);
    text("FIX THE FROG'S DIET BY EATING THE BROCCOLI", width / 2, height / 1.6);
    text("THERE ARE 3 WAVES, EACH WAVE INCREASES THE DIFFICULTY", width / 2, height / 1.5);
    textSize(25);
    text("CLICK SPACEBAR TO START", width / 2, height / 2 + 130);
}

// Draws the game over screen
function redDrawGameOver(){
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

function redDrawWin(){
    background("lightred");
    fill("red");
    textAlign(CENTER, CENTER);
    textSize(40);
    text("YOU FIXED THE FROG'S DIET", width / 2, height / 2);
    textSize(20);
    fill("white");
    text("SUCCESS", width / 2, height / 2 + 60);
    text("PRESS THE SPACEBAR TO GO BACK TO THE START SCREEN", width / 2, height /  2 + 90);
}

function redMoveFrog() {
    redFrog.body.x = mouseX;

    if(keyIsDown(LEFT_ARROW)) redFrogRedOffsetX -= 10;
    if(keyIsDown(RIGHT_ARROW)) redFrogRedOffsetX += 10;

    redFrog.body.x = mouseX + redFrogRedOffsetX;
}

function redMoveTongue() {
    // Tongue matches the frog's x
    redFrog.tongue.x = redFrog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (redFrog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (redFrog.tongue.state === "outbound") {
        redFrog.tongue.y += -redFrog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (redFrog.tongue.y <= 0) {
            redFrog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (redFrog.tongue.state === "inbound") {
        redFrog.tongue.y += redFrog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (redFrog.tongue.y >= height) {
            redFrog.tongue.state = "idle";
        }
    }
}

function redDrawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(redFrog.tongue.x, redFrog.tongue.y, redFrog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(redFrog.tongue.size);
    line(redFrog.tongue.x, redFrog.tongue.y, redFrog.body.x, redFrog.body.y);
    pop();

    // Draw the redFrog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(redFrog.body.x, redFrog.body.y, redFrog.body.size);
    pop();

    // Draws frog eyes
    push();
    fill("white");
    redEyeOffsetX = redFrog.body.size * 0.25;
    redEyeOffsetY = redFrog.body.size * -0.35;
    redEyeSize = redFrog.body.size * 0.2;

    ellipse(redFrog.body.x - redEyeOffsetX, redFrog.body.y + redEyeOffsetY, redEyeSize);

    ellipse(redFrog.body.x + redEyeOffsetX, redFrog.body.y + redEyeOffsetY, redEyeSize);

    pop();

    // Draws pupils
    push();
    fill("black");
    redPupilSize = redEyeSize * 0.5;
    // Makes pupils follow "redFlies", 0.05 makes it follow it slightly
    if(redFlies.length > 0){
        redOffsetX = redFlies[0].x - redFrog.body.x;
        redOffsetY = redFlies[0].y - redFrog.body.y;

        ellipse(redFrog.body.x - redEyeOffsetX + redOffsetX * 0.05, redFrog.body.y + redEyeOffsetY + redOffsetY * 0.05, redPupilSize);
        ellipse(redFrog.body.x + redEyeOffsetX + redOffsetX * 0.05, redFrog.body.y + redEyeOffsetY + redOffsetY * 0.05, redPupilSize);
    }

    pop();


}

function redCheckTongueredFlyOverlap() {
    for (let redFly of redFlies){
    // Get distance from tongue to redFly
    const d = dist(redFrog.tongue.x, redFrog.tongue.y, redFly.x, redFly.y);
    // Check if it's an overlap
    const eaten = (d < redFrog.tongue.size/2 + redFly.size/2);
    if (eaten) {
        // Reset the redFly
        redFly.x = 0;
        redFly.y = random(50,300);
        // Bring back the tongue
        redFrog.tongue.state = "inbound";
        redHealth += 10;
        if(redHealth > 100) redHealth = 100;

        redFrog.body.size -= 10;

        redEatSoundEffect.play();
    }
    }
}

function redCheckTonguebadRedFlyOverlap(){
    for (let badRedFly of badRedFlies){
        const d = dist(redFrog.tongue.x, redFrog.tongue.y, badRedFly.x, badRedFly.y);

    // Check if it's an overlap
    const eaten = (d < redFrog.tongue.size/2 + badRedFly.size/2);
    if(eaten){
        // Reset the bad redFly
        badRedFly.x = 0;
        badRedFly.y = random(50,300);
        // Bring back the tongue
        redFrog.tongue.state = "inbound";
        redHealth -= 20;
        if(redHealth < 0) redHealth = 0;

        redFrog.body.size += 25;

        redEwSoundEffect.play();
    }
    }
}

function redDrawHealthBar(){
    push();
    fill("gray");
    rect(10,10,200,20,5);
    fill("red");
    let barWidth = map(redHealth, 0, 100, 0, 200);
    rect(10,10,barWidth,20,5);
    noFill();
    stroke(0);
    strokeWeight(2);
    rect(10,10,200,20,5);
    pop();
}

function redUpdateFlySpeed(){
    if (!waveData || redWave > waveData.length) return;

    let currentWave = waveData[redWave - 1];

    for (let redFly of redFlies){
        redFly.speed = 2 + redWave * 0.5;
    }
    
    if (badRedFlies.length < currentWave.badFlyCount){
        for(let i = badRedFlies.length; i < currentWave.badFlyCount; i++){
            badRedFlies.push({
                x: random(width),
                y: random(50,300),
                size: 40,
                speed: currentWave.badFlySpeed
            });
        }
    }

    else if (badRedFlies.length > currentWave.badFlyCount){
        badRedFlies.splice(currentWave.badFlyCount);
    }

    for (let badRedFly of badRedFlies){
        badRedFly.speed = currentWave.badFlySpeed;
    }
}
/**
 * This will be called whenever a key is pressed while the red variation is active
 */
function redKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }

    if(redGameState === "title" && key === " " && waveDataLoaded){
        redGameState = "game";
        //redScore = 0;

        
    if(redArcadeSong && !redArcadeSong.isPlaying()){
        redArcadeSong.loop();
    }
    }

    else if (redGameState === "game" && key === " "){
        if(redFrog.tongue.state === "idle"){
            redFrog.tongue.state = "outbound";
        }
    }
    

    else if((redGameState === "gameover" || redGameState === "win") && key === " "){
        redGameState = "title";
        //redScore = 0;

        redHealth = 50;

        redWave = 1;
        redWaveTimer = 30;
        redLastWaveUpdate = millis(); 
        redWaveAnnouncement = waveData[0].announcement;
        redAnnouncementTimer = 100;

        badRedFlies = [];
        redUpdateFlySpeed();

        for(let redFly of redFlies){
            redFly.x = random(width);
            redFly.y = random(50,300);
        }
        for (let badRedFly of badRedFlies){
            badRedFly.x = random(width);
            badRedFly.y = random(50,300);
        }
        redFrog.body.size = 200;
    }
}

/**
 * This will be called whenever the mouse is pressed while the red variation is active
 */
function redMousePressed() {
    if (redFrog.tongue.state === "idle") {
        redFrog.tongue.state = "outbound";
    }
}