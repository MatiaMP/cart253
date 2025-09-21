/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/**
 * creates a canvas
*/
function setup() {
    createCanvas(1200, 800);
}


/**
 * sets the bqckground 
*/
function draw() {
    background("lightblue");


     drawHills();
     drawSun();
     drawClouds();
     drawTrees();
     drawHouse();
     drawSheep();
    
}

/** draws hills
*/
function drawHills() {
    push();
    noStroke();
    fill("darkgreen");
    ellipse(300, 900, 800, 600);
    ellipse(900, 900, 800, 600);
    fill("green");
    ellipse(300, 900, 800, 450);
    ellipse(900, 900, 800, 450);
    pop();

}

/** draws sun
*/
function drawSun() {
    push();
    noStroke();
    fill("yellow");
    ellipse(1000, 100, 150, 150);
    pop();
}


/** draws cloud
*/
function drawClouds() {
    push();
    noStroke();
// cloud to the far left
    fill("white");
    ellipse(200, 100, 200, 200);
    ellipse(250, 100, 200, 200);
    ellipse(225, 75, 200, 200);
// cloud to the far right
    ellipse(500, 130, 230, 230);
    ellipse(550, 130, 230, 230);
    ellipse(525, 105, 230, 230);
// cloud in the middle
    ellipse(300, 250, 180, 180);
    ellipse(350, 250, 180, 180);
    ellipse(325, 235, 180, 180);
    pop();
}

/** draws tree
*/
function drawTrees() {
// tree to the far right
    push();                 
    fill("saddlebrown");
    rect(1000, 500, 50, 300);
    fill("green");
    ellipse(1025, 400, 200, 200);
    ellipse(975, 450, 200, 200);
    ellipse(1075, 450, 200, 200);
// tree in the middle

    fill("#402400");
    rect(200, 600, 50, 280);
    fill("darkgreen");
    ellipse(225, 500, 200, 190);
    ellipse(190, 550, 200, 190);

// tree to the far left
    fill("#402400");
    rect(30, 530, 50, 350);
    fill("darkgreen");
    ellipse(70, 400, 200, 190);
    ellipse(45, 450, 200, 190);


    pop();
}


function drawHouse() {
    // draw main building
    push();
    noStroke();
    fill("#D4C4C1");
    rect(400, 550, 400, 400);

    // draw roof
    fill("#8B0000");
    triangle(350, 550, 570, 300, 850, 550);
   
    // draw windows
    fill("lightblue");
    rect(450, 650, 75, 75);
    rect(675, 650, 75, 75);

    // draw door
    fill("grey");
    rect(575, 640, 75, 200);
    
    // draw doorknob
    fill("gold");
    ellipse(635, 850, 15, 15);
    
    pop();
}

function drawSheep() {
    push();
    // draw body
    fill("white");
    ellipse(800, 750, 120, 80);
    // draw head
    ellipse(750, 730, 50, 50);
    // draw ears
    ellipse(740, 700, 15, 25);
    // draw eyes
    fill("black");
    ellipse(740, 725, 5, 5);
    // draw legs
    ellipse(770, 790, 10, 40); 
    ellipse(830, 790, 10, 40);
    pop();
}
