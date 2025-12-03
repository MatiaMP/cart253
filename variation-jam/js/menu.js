/**
 * This menu file contains the code to run *only* the menu part of the program.
 * Note how it has its own draw, menuDraw(), and its own keyPressed, menuKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

const menuText = `
Press 1 for Waves
Press 2 for Mitosis
Press 3 for Boss Mode`

/**
 * Display the main menu
 */
function menuDraw() {
    background("grey");

    push();
    textAlign(CENTER, CENTER);

    fill(255);
    textSize(60);
    text("🐸 FROG ON A DIET 🐸", width / 2, height / 2 - 200);

    fill(200);
    textSize(26);
    text("Choose A Game Mode", width / 2, height / 2 - 140);

    fill(255);
    textSize(32);
    text(menuText, width / 2, height / 2);

    fill(180);
    textSize(20);
    text("Press 1, 2, or 3 to begin", width / 2, height - 60);

    pop();
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

}