var client1 = new Client(0);
var client2 = new Client(100);

function Board() {

  this.barman = new Barman();
  // this.client1 = new Client(0);
  // this.client2 = new Client(100);
  this.beers = [];
  // this.checkCollision = this._checkCollision;

  // CRATE A BEER TO CHECH
  this.createBeer(0);
  // this.createBeer(100);
}

Board.prototype.createBeer = function(pos) {
  var beer = new Beer(pos);
  this.beers.push(beer);
};

Board.prototype.update = function() {

  this.beers.forEach(function(beer) {
    var collision1 = checkCollision(beer, client1);
    var collision2 = checkCollision(beer, client2);

    // Check if exists collision
    if (collision1) {
      client1.hasbeer();
      // Change direction
      client1.direction = 'L';
      client1.move();
      beer.deleteBeer();
    }
    // Move beers
    beer.slideLeft();

  });

  // Move clients
  client1.move();

};

// Listener to move Barman
Board.prototype.moveListeners = function(event) {
  var keys = [38, 40, 65];

  if (keys.indexOf(event.keyCode) < 0)
    return;

  switch (event.keyCode) {
    case 38: // Up
      barman.goUp();
      break;
    case 40: // Down
      barman.goDown();
      break;
    case 65: // give a new beer
      this.createBeer();
      break;
  }
};

function checkCollision(newBeer, client1) {
  console.log('BEER POS: ', newBeer.beerPosX, 'CLIENT POS: ', client1.clientPosX);
  if (newBeer.beerPosX === client1.clientPosX && newBeer.beerPosY === client1.clientPosY) {
    console.log('collision');
    return true;
  }
  return false;
}

function win() {

}

function lost() {

}
