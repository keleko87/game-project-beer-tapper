var board = new Board();
var barman = new Barman();

// Print board
function printBoard(board) {
  var container = $('#container-game');

  board.grid.forEach(function(arrRow, y) {
    var row = $('<div>').addClass('row').attr('index', y);

    for (var x = 0; x < arrRow.length; x++) {
      var column = $('<div>').attr('y', y).attr('x', x);
      if (x === 0) column.addClass('hidden');
      if (y === 0 && x === 9) {
        column.addClass('barman');
        row.append(column);
      } else {
        row.append(column);
      }
    }
    container.append(row);
  });
}


/******************* CLIENT ********************************************************/

var clients = [];

function generateClients(board) {
  var speeds = [500, 1000, 1500, 2000, 2500];
  var waitBeers = [10000, 15000, 25000, 30000];
  var positionsY = [0, 1, 2, 3];
  var positionsX = [0, 1, 2, 3, 4, 5, 6];
  var newClient = {};

  var posY = Math.floor(Math.random() * positionsY.length);
  var posX = Math.floor((Math.random() * positionsX.length) + 1); // Position X: from 1 to 7
  var speed = Math.floor((Math.random() * speeds.length));
  var waitBeer = Math.floor((Math.random() * waitBeers.length));
  newClient = new Client([posY, posX], speeds[speed], waitBeers[waitBeer]);
  clients.push(newClient);
  return newClient;
}

function paintClient(board) {
  var numClients = 0;
  var intervalId = setInterval(function() {
    if (numClients >= 4) {
      clearInterval(intervalId);
    }
    var client = generateClients(board);
    client.clientPosition[0] = numClients++;
    console.log(client.clientPosition[0], 'sssssss', client.clientPosition[1]);
    var row = $("div[index='" + client.clientPosition[0] + "']");
    var current = $(row).children('div[x="' + client.clientPosition[1] + '"]').addClass('client');

    setTimeout(function() {
      current.removeClass('client');
    }, client.waitBeer);

  }, 1000);

}

function moveClientLeft(client1) {
  client1.goLeft();
  var prev = client1.clientPosition[1] + 1;
  $('div[x="' + prev + '"]').removeClass('client');
  var row = $("div[index='" + client1.clientPosition[0] + "']");
  var current = $(row).children('div[x="' + client1.clientPosition[1] + '"]').addClass('client');

  return client1.clientPosition;
}


function changeImage(beerCollision){

}


/******************** BARMAN ********************************/
function wins(clients){

}

function giveNewBeer(barman, clients) {

  var newBeer = barman.giveNewBeer();
  var client;
  for (var i = 0; i < clients.length; i++) {
    if (newBeer.beerPosition[0] === clients[i].clientPosition[0])
      client = clients[i];
    console.log(client);
  }

  // TO DO  CHECK IF HAS BEER IN A row

  var intervalIdNewBeer = setInterval(
    function() {
      var updBeer = updateBeerLeft(newBeer);
      // var clientRow = client.position;

      console.log(client.clientPosition, 'pos: ', updBeer);

      if (client.clientPosition[0] === updBeer[0] && client.clientPosition[1] === updBeer[1]) {
        // clearInterval(intervalIdNewBeer);
        client.hasBeer = true;
        // changeImage(upBeer);
        moveClientLeft(client);
        console.log(updBeer[0], updBeer[1], '===========', client.clientPosition[0], client.clientPosition[1]);
      }
    },
    1000);
}



function barmanGoUp() {
  barman.goUp();
  var prev = barman.position[0] - 1;
  $('.row').each(function(index, elem) {
    $('div[index="' + index + '"]').children().removeClass('barman');
  });
  var current = $('div[index="' + barman.position[0] + '"]').children().last().addClass('barman');
}

function barmanGoDown() {
  barman.goDown();
  var prev = barman.position[0] + 1;
  $('.row').each(function(index, elem) {
    $('div[index="' + index + '"]').children().removeClass('barman');
  });
  var current = $('div[index="' + barman.position[0] + '"]').children().last().addClass('barman');
}


/**********************   BEER **************************************************/

function updateBeerLeft(newBeer) {
  newBeer.slideLeft();
  var prev = newBeer.beerPosition[1] + 1;
  $('div[x="' + prev + '"]').removeClass('beer');
  var row = $("div[index='" + newBeer.beerPosition[0] + "']");
  var current = $(row).children('div[x="' + newBeer.beerPosition[1] + '"]').addClass('beer');
  return newBeer.beerPosition;
}

function deleteBeer(newBeer) {
  console.log(' BEER POSITION', newBeer.beerPosition[1]);
  var row = $("div[index='" + newBeer.beerPosition[0] + "']");
  var current = $(row).children('div[x="' + newBeer.beerPosition[1] + '"]');
  current.removeClass('beer');
}


// Listener to move paddle
function moveListeners(event) {
  var keys = [38, 40, 65];

  if (keys.indexOf(event.keyCode) < 0)
    return;

  switch (event.keyCode) {
    case 38: // Up
      barmanGoUp();
      break;
    case 40: // Down
      barmanGoDown();
      break;
    case 65: // give a new beer
      giveNewBeer(barman, clients);
      break;
  }
}


/*********************** HTML DOM interaction ****************************************************************/
$(document).ready(function() {

  printBoard(board);

  $('#start').on('click', function() {
    $(this).attr('disabled', 'disabled').addClass('disabled');
    $(document).on('keydown', moveListeners);
    paintClient(board);

  });

});
