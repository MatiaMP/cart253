/**
 * Art Jam - Self-Portrait
 * Matia Paki
 * 
 * This is a project using js and p5 to make a self-portrait
 * 
 */

"use strict";

const rate = 60;

let backgroundColor = {
    fill: {
        r: 100,
        g: 200,
        b: 250
    }
}

/**
 * create the canvas
*/
function setup() {
    createCanvas(800, 1200);

    frameRate(rate);
}


/**
 * sets the background & other elements of the drawing
*/
function draw() {
background(backgroundColor.fill.r, backgroundColor.fill.g, backgroundColor.fill.b);

backgroundColor.fill.r += -0.1;
backgroundColor.fill.g += -0.1;
backgroundColor.fill.b += -0.1;

drawbody();
drawFace();
drawEyes();
drawEyebrows();
drawNose();
drawMouth();
drawMoustache();
drawGoatee();
drawHair();
drawEars();

}


function drawbody(){
    push();
    fill("black");
    ellipse(400,1050,400,500);
}
// draw Face

function drawFace(){
    push();
    fill("#FFDDD4");
    ellipse(400, 600, 400, 550);
    pop();

}

// draw Eyes

function drawEyes(){
    push();
    fill("white");
    ellipse(315,550,60,40);
    ellipse(485,550,60,40);

    let leftEyeOffsetX = map(mouseX, 0, width, -10, 10);
    let leftEyeOffsetY = map(mouseY, 0, height, -5, 5);

    let rightEyeOffsetX = map(mouseX, 0, width, -10, 10);
    let rightEyeOffsetY = map(mouseY, 0, height, -5, 5);

    fill("#7B3F00");
    ellipse(315 + leftEyeOffsetX, 550 + leftEyeOffsetY, 35,35);
    ellipse(485 + rightEyeOffsetX, 550 + rightEyeOffsetY, 35,35);

    fill("black");
    ellipse(315 + leftEyeOffsetX, 550 + leftEyeOffsetY, 20,20);
    ellipse(485 + rightEyeOffsetX, 550 + rightEyeOffsetY,20,20);
    pop();
}

// draw Eyebrows

function drawEyebrows(){
    push();
    fill("#5C4033");
    ellipse(315,500,80,15);
    ellipse(485,500,80,15);
    pop();    
}

function drawNose(){
    push();
    fill("#FFDDD4");
    ellipse(400,650,60,85);
    pop();
}

function drawMouth(){
    push();
    fill("#C98276");
    ellipse(400,775,80,20);
    pop();
}

function drawMoustache(){
    push();
    noStroke();
    fill("#5C4033");
    ellipse(400,750,100,25);
    ellipse(355,755,50,25);
    ellipse(445,755,50,25);
    ellipse(335,765,40,25);
    ellipse(465,765,40,25);
    pop();
}

function drawGoatee(){
    push();
    fill("#5C4033");
    ellipse(400,865,100,25);
    pop();
}

function drawHair() {
    push();
    translate(340, 365);       
    rotate(radians(-25)); 
    noStroke();      
    fill("#5C4033");
    ellipse(0, 0, 210, 50);    
    pop();

    push();
    translate(330, 380);       
    rotate(radians(-30));   
    noStroke();              
    fill("#5C4033");
    ellipse(0, 0, 220, 50); 
    pop();

    push();
    translate(310, 410);       
    rotate(radians(-30));     
    fill("#5C4033");
    ellipse(0, 0, 250, 50);  
    pop();

    push();
    translate(520, 390);       
    rotate(radians(35));
    noStroke();       
    fill("#5C4033");
    ellipse(0, 0, 200, 50);    
    pop();

    push();
    translate(510, 400);       
    rotate(radians(40));
    noStroke();       
    fill("#5C4033");
    ellipse(0, 0, 220, 50);    
    pop();
    
    push();
    translate(510, 420);      
    rotate(radians(40));      
    fill("#5C4033");
    ellipse(0, 0, 250, 50);    
    
    push();
    translate(85, 475);       
    rotate(radians(-330));       
    fill("#5C4033");
    ellipse(0, 0, 70, 30);  
    pop();

    push();
    translate(50, 471);       
    rotate(radians(-320));       
    fill("#5C4033");
    ellipse(0, 0, 80, 30);  
    pop();

    push();
    translate(20, 471);       
    rotate(radians(-310));       
    fill("#5C4033");
    ellipse(0, 0, 100, 40);  
    pop();

    push();
    translate(5, 471);       
    rotate(radians(-300));       
    fill("#5C4033");
    ellipse(0, 0, 110, 30);  
    pop();

    push();
    translate(-5, 471);       
    rotate(radians(-300));       
    fill("#5C4033");
    ellipse(0, 0, 130, 30);  
    pop();
    
    push();
    translate(-20, 461);       
    rotate(radians(-295));       
    fill("#5C4033");
    ellipse(0, 0, 110, 30);  
    pop();

    push();
    translate(292, 200);       
    rotate(radians(-330));       
    fill("#5C4033");
    ellipse(0, 0, 110, 30);  
    pop();

    push();
    fill("#5C4033");
    ellipse(295,280,60,20);
    pop();

    push();
    fill("#5C4033");
    ellipse(295,290,60,20);
    pop();

    push();
    fill("#5C4033");
    ellipse(295,300,60,20);
    pop();

    push();
    fill("#5C4033");
    ellipse(295,305,60,20);
    pop();

    push();
    fill("#5C4033");
    ellipse(300,305,70,20);
    pop();

    push();
    fill("#5C4033");
    ellipse(295,315,60,20);
    pop();

    push();
    fill("#5C4033");
    ellipse(294,240,60,20);
    pop();

    push();
    fill("#5C4033");
    ellipse(294,250,60,20);
    pop();
    
    push();
    fill("#5C4033");
    ellipse(295,231,70,20);
    pop();

    push();
    fill("#5C4033");
    ellipse(294,220,70,20);
    pop();

    push();
    fill("#5C4033");
    ellipse(290,211,70,20);
    pop();

    push();
    fill("#5C4033");
    ellipse(290,205,70,20);
    pop();

    push();
    fill("#5C4033");
    ellipse(290,195,80,30);
    pop();

    push();
    fill("#5C4033");
    ellipse(300,270,70,20);
    pop();
    
    push();
    fill("#5C4033");
    ellipse(300,260,70,20);
    pop();
}

function drawEars(){
    push();
    noStroke();
    translate(95, 220);       
    rotate(radians(140));
    fill("#FFDDD4");
    ellipse(250,70,50,105);
    pop();

    push();
    noStroke();
    translate(480, 0);       
    rotate(radians(140));
    fill("#FFDDD4");
    ellipse(265,150,50,105);
    pop();
}