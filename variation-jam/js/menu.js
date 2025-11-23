/**
 * This menu file contains the code to run *only* the menu part of the program.
 * Note how it has its own draw, menuDraw(), and its own keyPressed, menuKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

"use strict";

const menuText = `
(R) Variation Jam One
(G) Variation Jam Two
(B) Variation Jam Three`;

function menuDraw() {
    background(0);
    push();
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(menuText, width/2, height/2);
    pop();
}

function menuMousePressed() {
    
}

function menuKeyPressed() {
    switch(key.toLowerCase()) {
        case "r":
            state = "variation-jam-one";
            currentVariation = {
                setup: variationOneSetup,
                draw: variationOneDraw,
                mousePressed: variationOneMousePressed,
                keyPressed: variationOneKeyPressed
            };
            currentVariation.setup();
            break;
        case "g":
            state = "variation-jam-two";
            currentVariation = {
                setup: variationTwoSetup,
                draw: variationTwoDraw,
                mousePressed: variationTwoMousePressed,
                keyPressed: variationTwoKeyPressed
            };
            currentVariation.setup();
            break;
        case "b":
            state = "variation-jam-three";
            currentVariation = {
                setup: variationThreeSetup,
                draw: variationThreeDraw,
                mousePressed: variationThreeMousePressed,
                keyPressed: variationThreeKeyPressed
            };
            currentVariation.setup();
            break;
    }
}
