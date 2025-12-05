/**
 * This menu file contains the code to run *only* the menu part of the program.
 * Note how it has its own draw, menuDraw(), and its own keyPressed, menuKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

const menuOptions = [
    {key: 49, text: "Press 1: WAVES"},
    {key: 50, text: "Press 2: ABSORB"},
    {key: 51, text: "Press 3: BOSS"}
];

const menuText = `
Press 1 for Waves
Press 2 for Absorb
Press 3 for Boss`

/**
 * Display the main menu
 */
function menuDraw() {
    background("#008080");

    push();
    textAlign(CENTER, CENTER);
    fill(255, 255, 0);
    stroke(0);
    strokeWeight(6);
    textSize(72);
    textStyle(BOLD);
    text("🐸 FROG ON A DIET 🐸", width / 2, height / 2 - 200);

    noStroke();
    fill(200);
    textSize(36);
    textStyle(NORMAL);
    text("Choose A Game Mode", width / 2, height / 2 - 140);

    pop();

    let startY = height /2 - 40;
    const spacing = 70;
    const boxWidth = 400;
    const boxHeight = 50;

    for (let i = 0; i < menuOptions.length; i++){
    const option = menuOptions[i];
    let currentY = startY + i * spacing;
    
    push();
    noStroke();
    rectMode(CENTER);

    let hovering = (mouseX > width/2 - boxWidth/2 && mouseX < width/2 + boxWidth/2 && mouseY>currentY - boxHeight/2 && mouseY < currentY + boxHeight/2);

    if(hovering){
        fill (255,100);
    }
    else{
        fill(0,150);
    }

    rect(width/2, currentY, boxWidth, boxHeight, 10);

    fill(255);
    textSize(32);
    text(option.text, width / 2, currentY);

    pop();

    }

    push();
    fill(255,200,0);
    textSize(28);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text("USE YOUR MOUSE TO CLICK OR USE KEYS 1-2-3", width / 2, height - 60);
}

/**
 * Listen to the keyboard
 */
function menuKeyPressed(event) {
    switch (event.keyCode) {
        case 49:
            state = "red-variation";
            redSetup();
            break;

        case 50:
            state = "green-variation";
            greenSetup();
            break;

        case 51:
            state = "blue-variation";
            blueSetup();
            break;
    }
}

/**
 * This will be called whenever the mouse is pressed while the menu is active
 */
function menuMousePressed() {
    let startY = height / 2 - 40;
    const spacing = 70;
    const boxWidth = 400;
    const boxHeight = 50;

    for(let i = 0; i < menuOptions.length; i++){
        const option = menuOptions[i];
        let currentY = startY + i * spacing;

        let buttonLeft = width /2 - boxWidth / 2;
        let buttonRight = width /2 + boxWidth / 2;
        let buttonTop = currentY - boxHeight / 2;
        let buttonBottom = currentY + boxHeight /2;

        let clicked = (
            mouseX > buttonLeft &&
            mouseX < buttonRight &&
            mouseY > buttonTop &&
            mouseY < buttonBottom
        )

    if(clicked){
            switch(option.key){
            case 49:
            state = "red-variation";
            redSetup();
            break;

            case 50:
            state = "green-variation";
            greenSetup();
            break;

            case 51:
            state = "blue-variation";
            blueSetup();
            break;
            }
            
            return;
        }
    }
}