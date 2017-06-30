var client1 = new Client(0, 2);
var client2 = new Client(100, 4);
var client3 = new Client(200, 2);
// var client4 = new Client(300, 3);
var client5 = new Client(400, 3);
var clientsHasBeer = 0;

function Board() {

  this.barman = new Barman();
  // this.client1 = new Client(0);
  // this.client2 = new Client(100);
  this.beers = [];
  // this.createBeer(0);
  this.moveListener();
}


Board.prototype.update = function() {

  // check if a client collision to border right although NO beers in board
  clientCrash(client1);
  clientCrash(client2);
  clientCrash(client3);
  // clientCrash(client4);
  clientCrash(client5);

  this.barman.beersBar.forEach(function(beer) {

    // check if beer is crashed
    // beerCrash(beer);

    //check if all clients have a beer - Barman wins
    if (clientsHasBeer === 4) {
      alert('CONGRATULATIONS!!! BARMAN WINS!!!');
      location.reload();
    }else{
      barmanWin(client1);
      barmanWin(client2);
      barmanWin(client3);
      barmanWin(client5);
    }



    // Check if exists collision
    var collision1 = checkCollision(beer, client1);
    var collision2 = checkCollision(beer, client2);
    var collision3 = checkCollision(beer, client3);
    // var collision4 = checkCollision(beer, client4);
    var collision5 = checkCollision(beer, client5);

    // Update if collision true
    if (collision1) upadeAfterCollision(beer, client1);
    if (collision2) upadeAfterCollision(beer, client2);
    if (collision3) upadeAfterCollision(beer, client3);
    // if (collision4) upadeAfterCollision(beer, client4);
    if (collision5) upadeAfterCollision(beer, client5);

    // Move beers
    beer.slideLeft();
  });
  // check if clients are not happy and move
  if (client1.happy() && client2.happy()) endGame();
  if (!client1.happy()) client1.move();
  if (!client2.happy()) client2.move();
  if (!client3.happy()) client3.move();
  // if (!client4.happy()) client4.move();
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
  if ((newBeer.beerPosY === client1.clientPosY) && (newBeer.beerPosX === client1.clientPosX || (newBeer.beerPosX + 1) === client1.clientPosX || (newBeer.beerPosX + 2) === client1.clientPosX || (newBeer.beerPosX + 3) === client1.clientPosX || (newBeer.beerPosX + 4) === client1.clientPosX)) {
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

function clientCrash(client) {
  if (client.client.hasClass('client-crash')) {
    console.log(client, ' is the end');
    alert('Barman losts !!!');
    location.reload();
  }
}

function beerCrash(beer) {
  if (beer.beer.hasClass('crash')) {
    console.log(beer, ' is crashed');
    alert('Beer crashed!! Barman losts !!!');
    location.reload();
  }
}

function barmanWin(client) {
  if (client.clientPosX === 0 && client.client.hasClass('hasbeer')) {
    console.log(clientsHasBeer, 'client has beer wins');
    clientsHasBeer += 1;
  }
  return clientsHasBeer;

}
