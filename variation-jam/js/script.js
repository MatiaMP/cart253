"use strict";

// current state: "menu", "variation-jam-one", "variation-jam-two", "variation-jam-three"
let state = "menu";

// current variation object, holds its setup/draw/mouse/key functions
let currentVariation = null;

function setup() {
    createCanvas(640, 480);
}

function draw() {
    switch(state) {
        case "menu":
            menuDraw();
            break;
        case "variation-jam-one":
        case "variation-jam-two":
        case "variation-jam-three":
            if (currentVariation && currentVariation.draw) {
                currentVariation.draw();
            }
            break;
    }
}

function mousePressed() {
    if (state === "menu") menuMousePressed();
    else if (currentVariation && currentVariation.mousePressed) currentVariation.mousePressed();
}

function keyPressed() {
    if (state === "menu") menuKeyPressed();
    else if (currentVariation && currentVariation.keyPressed) currentVariation.keyPressed();
}
