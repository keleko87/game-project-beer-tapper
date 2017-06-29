function Board() {

  this.barman = new Barman();
  this.client1 = new Client(0);
  this.client2 = new Client(100);
  this.beers = [];
  this.checkCollision = this._checkCollision(beer, client);

  // CRATE A BEER TO CHECH
  this.createBeer();

}

Board.prototype.createBeer = function() {
  var beer = new Beer(100);
  this.beers.push(beer);
};

Board.prototype.update = function() {
  this.beers.forEach(function(elem) {
    this.checkCollision(elem, this.client1);
    this.checkCollision(elem, this.client2);

    /*
    if(colisiona?){
    mueve cliente
    elimina birra
    resta puntuacion
    }
    */
  });

  this.client1.goRight();
  this.client2.goRight();
  this.beers.forEach(function(e) {
    e.slideLeft();
  });
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

Board.prototype._checkCollision = function (newBeer, client1) {
  //console.log('BEER POS: ', newBeer.beerPosX, 'CLIENT POS: ', client1.clientPosX);
  if (newBeer.beerPosX === client1.clientPosX && newBeer.beerPosY === client1.clientPosY) {
    console.log('collision');
    return true;
  }
  return false;
};
