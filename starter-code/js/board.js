var client1 = new Client(0, 1);
var client2 = new Client(100, 3);
var client3 = new Client(200, 2);
var client4 = new Client(300, 1);
var client5 = new Client(400, 2);

function Board() {

  this.barman = new Barman();
  // this.client1 = new Client(0);
  // this.client2 = new Client(100);
  this.beers = [];
  // this.createBeer(0);
  this.moveListener();
}


Board.prototype.update = function() {

  this.barman.beersBar.forEach(function(beer) {
    var collision1 = checkCollision(beer, client1);
    var collision2 = checkCollision(beer, client2);
    var collision3 = checkCollision(beer, client3);
    var collision4 = checkCollision(beer, client4);
    var collision5 = checkCollision(beer, client5);

    // Check if exists collision
    if (collision1) upadeAfterCollision(beer, client1);
    if (collision2) upadeAfterCollision(beer, client2);
    if (collision3) upadeAfterCollision(beer, client3);
    if (collision4) upadeAfterCollision(beer, client4);
    if (collision5) upadeAfterCollision(beer, client5);

    // Move beers
    beer.slideLeft();
  });
  // check if clients are not happy and move
  if (client1.happy() && client2.happy()) endGame();
  if (!client1.happy()) client1.move();
  if (!client2.happy()) client2.move();
  if (!client3.happy()) client3.move();
  if (!client4.happy()) client4.move();
  if (!client5.happy()) client5.move();
};

// Configure key events
Board.prototype.moveListener = function() {
  $('body').on('keydown', function(event) {
    switch (event.keyCode) {
      case 38: // Up
        this.barman.goUp();
        break;
      case 40: // Down
        this.barman.goDown();
        break;
      case 65: // give a new beer
        this.barman.createBeer();
        break;
    }
  }.bind(this));
};

function checkCollision(newBeer, client1) {
  // console.log('BEER POS: ', newBeer.beerPosX, 'CLIENT POS: ', client1.clientPosX, 'client Y: ', client1.clientPosY, '-', 'beer: ', newBeer.beerPosY);
  if ((newBeer.beerPosY === client1.clientPosY) && (newBeer.beerPosX === client1.clientPosX || (newBeer.beerPosX + 1) === client1.clientPosX || (newBeer.beerPosX + 2) === client1.clientPosX || (newBeer.beerPosX + 3) === client1.clientPosX)) {
    console.log('collision');
    return true;
  }
  return false;
}

function upadeAfterCollision(newBeer, client1) {
  client1.addBeer();
  client1.direction = 'L'; // Change direction
  client1.move();
  newBeer.deleteBeer();
}

function endGame() {
  alert('Barman wins !!!');
}
