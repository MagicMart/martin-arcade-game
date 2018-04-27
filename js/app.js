// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) { this.x = -100 };

    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y, lives, score, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.lives = lives;
    this.score = score;
    this.sprite = 'images/char-boy.png';
    this.speedX = speedX;
    this.speedY = speedY;

}

Player.prototype.increaseScore = function() {

    this.score += 1;
    this.y = 390;



}

Player.prototype.update = function() {
    const score = document.querySelector('#score');
    const lives = document.querySelector('#lives');

    score.textContent = this.score;
    lives.textContent = this.lives;

    if (this.y === -10) { this.increaseScore(); }
    this.x += this.speedX;
    this.y += this.speedY;

    this.speedY = 0;
    this.speedX = 0;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {

    switch (direction) {

        case "up":
            if (this.y < 0) { break };
            this.speedY = -80;
            break;
        case "down":
            if (this.y > 350) { break };
            this.speedY = 80;
            break;
        case "left":
            if (this.x < 100) { break };
            this.speedX = -101;
            break;
        case "right":
            if (this.x > 350) { break };
            this.speedX = 101;
            break;
    }
};


// Now instantiate your objects.
const enemy1 = new Enemy(0, 70, 450); //x, y and speed

const enemy2 = new Enemy(0, 150, 150);

const enemy3 = new Enemy(0, 230, 300);
// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player
const player = new Player(202, 390, 3, 0, 0, 0); // x , y, lives score speedX, speedY

const Heart = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
}

const heart1 = new Heart(0, 470);
const heart2 = new Heart(40, 470);
const heart3 = new Heart(80, 470);

let allHearts = [heart3, heart2, heart1];

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const RandomGem = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;

};

RandomGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function randomX() {
    const places = [0, 101, 202, 303, 404];
    const place = Math.floor(Math.random() * 5)
    return places[place];
}


const gem = new RandomGem(randomX(), 50, 'images/Gem Orange.png');

RandomGem.prototype.update = function() {
    if (player.y === 70 && this.x === player.x) {
        player.score += 5;
        this.x = randomX();
    }
}

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