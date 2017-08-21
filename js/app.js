"use strict";

// Enemy constructor
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 450 + 1);
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.s
        this.x += this.speed * dt;

    // Updates the enemies position when the end of the canvas is reached.
    if(this.x > 505) {
        this.x = Math.random() * -850;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player Section

var Player = function() {
    this.x = 202;
    this.y = 405;
    this.score = 0;
    this.sprite = 'images/char-princess-girl.png';
};

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;

    // Calls the collisionCheck() function to see if player made contact with enemy.
    this.collisionCheck();

    // Checks to see if player reaches the water to restart position and add points.
    if (this.y < 10) {
        this.positionReset();
        this.score += 10;
    }
};

// Function to check to see if player makes contact with the enemies
Player.prototype.collisionCheck = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if(Math.abs(this.x - allEnemies[i].x) < 30 && Math.abs(this.y - allEnemies[i].y) < 30) {
            this.positionReset();
        }
    }
};

// Draw the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "black";
    ctx.font = '33px Arial';
    ctx.fillText("Score: " + this.score, 5, 570);
};

// Sends player back to starting position.
Player.prototype.positionReset = function() {
    this.x = 202;
    this.y = 405;
};

//Setting width and height for the gameboard tiles
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;

//For each keystroke, the player shall move along the x and y axis
//Set variable to less than 100 for up and down to keep player inside game tile
Player.prototype.handleInput = function (keyInput) {
    switch (keyInput) {
        case "up":
            if (this.y > 0) {
                this.y -= TILE_HEIGHT;
            }
            break;

        case "down":
            if (this.y < 400) {
                this.y = this.y + TILE_HEIGHT;
            }
            break;

        case "left":
            if (this.x > 0) {
                this.x = this.x - TILE_WIDTH;
            }
            break;

        case "right":
            if (this.x < 400) {
                this.x += TILE_WIDTH;
            }
            break;
    }
};

// Now instantiate your objects.
// Place the player object in a variable called player
var player = new Player();

// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(-200, 63);
var enemy2 = new Enemy(-350, 145);
var enemy3 = new Enemy(-96, 228);
var enemy4 = new Enemy(-96, 63);
var enemy5 = new Enemy(-150, 145);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
