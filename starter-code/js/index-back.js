var board = new Board();
var barman = new Barman();
var clients = [
  [''],
  [''],
  [''],
  ['']
];

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


function generateClientRow(boardRow) {
  var speeds = [500, 1000, 1500, 2000, 2500];
  var waitBeers = [10000];
  var positionsX = [0, 1, 2, 3, 4, 5];
  var client = {};

  var posX = Math.floor((Math.random() * positionsX.length) + 2); // Position X: from 1 to 7
  var speed = Math.floor((Math.random() * speeds.length));
  var waitBeer = Math.floor((Math.random() * waitBeers.length));
  client = new Client([boardRow, posX], speeds[speed], waitBeers[waitBeer]);

  // add client in array
  clients[boardRow] = client;

  var row = $("div[index='" + boardRow + "']");
  console.log('in');
  var current = $(row).children('div[x="' + client.clientPosition[1] + '"]').addClass('client');

  return client;
}

function paintClient(client) {

  setTimeout(function() {

    // REMOVE CLIENT
    console.log('setTimeout in');

    var rowClient = client.clientPosition[0];
    var row = $("div[index='" + rowClient + "']");
    var current = $(row).children('div[x="' + client.clientPosition[1] + '"]');
    current.removeClass('client');

    clients[rowClient] = '';
    client = undefined;

    // NEW CLIENT
    var client2 = generateClientRow(rowClient);
    console.log('second client tiemout:', client2);
    row = $("div[index='" + client2.clientPosition[0] + "']");
    $(row).children('div[x="' + client2.clientPosition[1] + '"]').addClass('client');

  }, client.waitBeer);
}


function moveClientLeft(client1) {
  // if(client1.clientPosition[1] === 0){
  //   console.log('client delete is in 0,0');
  //   client1 = undefined;
  //   return;
  // }
  client1.goLeft();
  var row = $("div[index='" + client1.clientPosition[0] + "']");
  var prev = client1.clientPosition[1] + 1;
  $(row).children('div[x="' + prev + '"]').removeClass('client');
  var current = $(row).children('div[x="' + client1.clientPosition[1] + '"]').addClass('client');

  return client1.clientPosition;
}


/******************** BARMAN ********************************/

function giveNewBeer(barman, clients) {

  var newBeer = barman.giveNewBeer();
  newBeer.speedSlide = 100;
  var client;
  var clientsHiddenWin = 8;

  console.log('Clients', clients);

  for (var i = 0; i < clients.length; i++) {
    if (newBeer.beerPosition[0] === clients[i].clientPosition[0]) {
      client = clients[i];
      continue;
    }
  }

  switch (newBeer.beerPosition[0]) {
    case 0:
      var intervalRow0 = setInterval(
        function() {
          var updBeer = updateBeerLeft(newBeer);

          // checkCollision(newBeer.beerPosition[0], client, barman, newBeer, updBeer);
          console.log('CASE 0');

          if (client.clientPosition[0] === updBeer[0] && client.clientPosition[1] === updBeer[1]) {
            deleteBeer(newBeer);
            if (client.isHidden()) {
              barman.clientsHidden++;
              if (barman.clientsHidden === clientsHiddenWin) {
                alert('You win!!!');
                location.reload();
              }
              clearInterval(intervalRow0);
            }
            deleteBeer(newBeer);
            client.hasBeer = true;
            // changeImage(upBeer);
            moveClientLeft(clients[0]); // position client row in the array
          }
        },
        newBeer.speedSlide);
      break;
    case 1:
      var intervalRow1 = setInterval(
        function() {
          var updBeer = updateBeerLeft(newBeer);

          // checkCollision(newBeer.beerPosition[0], client, barman, newBeer, updBeer); // if (client.clientPosition[0] === updBeer[0] && client.clientPosition[1] === updBeer[1]) {
          console.log('CASE 1');

          if (client.clientPosition[0] === updBeer[0] && client.clientPosition[1] === updBeer[1]) {
            deleteBeer(newBeer);

            if (client.isHidden()) {
              barman.clientsHidden++;
              if (barman.clientsHidden === clientsHiddenWin) {
                alert('You win!!!');
                location.reload();
              }
              clearInterval(intervalRow1);
            }
            client.hasBeer = true;
            deleteBeer(newBeer);
            // changeImage(upBeer);
            moveClientLeft(clients[1]); // position client row in the array
          }
        },
        newBeer.speedSlide);
      break;
    case 2:
      var intervalRow2 = setInterval(
        function() {
          var updBeer = updateBeerLeft(newBeer);

          // checkCollision(newBeer.beerPosition[0], client, barman, newBeer, updBeer);
          console.log('CASE 2');

          if (client.clientPosition[0] === updBeer[0] && client.clientPosition[1] === updBeer[1]) {
            deleteBeer(newBeer);
            if (client.isHidden()) {
              barman.clientsHidden++;
              if (barman.clientsHidden === clientsHiddenWin) {
                alert('You win!!!');
                location.reload();
              }
              clearInterval(intervalRow2);
            }
            client.hasBeer = true;
            deleteBeer(newBeer);
            // changeImage(upBeer);
            moveClientLeft(clients[2]); // position client row in the array
          }
        },
        newBeer.speedSlide);
      break;

    case 3:
      var intervalRow3 = setInterval(
        function() {
          var updBeer = updateBeerLeft(newBeer);

          // checkCollision(newBeer.beerPosition[0], client, barman, newBeer, updBeer);
          console.log('CASE 3');
          if (client.clientPosition[0] === updBeer[0] && client.clientPosition[1] === updBeer[1]) {
            deleteBeer(newBeer);
            if (client.isHidden()) {
              barman.clientsHidden++;
              if (barman.clientsHidden === clientsHiddenWin) {
                alert('You win!!!');
                location.reload();
              }
              clearInterval(intervalRow3);
            }
            client.hasBeer = true;
            deleteBeer(newBeer);
            // changeImage(upBeer);
            moveClientLeft(clients[3]); // position client row in the array
          }
        },
        newBeer.speedSlide);
      break;
  }
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

function deleteBeer(newBeer) {
  console.log('delete Beer');
  var row = $("div[index='" + newBeer.beerPosition[0] + "']");
  var current = $(row).children('div[x="' + newBeer.beerPosition[1] + '"]');
  current.removeClass('beer');
  newBeer = undefined; // Delete object
}

function updateBeerLeft(newBeer) {
  newBeer.slideLeft();
  var prev = newBeer.beerPosition[1] + 1;
  $('div[x="' + prev + '"]').removeClass('beer');
  var row = $("div[index='" + newBeer.beerPosition[0] + "']");
  var current = $(row).children('div[x="' + newBeer.beerPosition[1] + '"]').addClass('beer');
  return newBeer.beerPosition;
}



// Listener to move Barman
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
    // init
    setTimeout(function() {
      var client1 = generateClientRow(1);
      paintClient(client1);
    }, 1000);
    setTimeout(function() {
      var client2 = generateClientRow(2);
      paintClient(client2);
    }, 1500);
    setTimeout(function() {
      var client = generateClientRow(0);
      paintClient(client);
    }, 2000);
    setTimeout(function() {
      var client3 = generateClientRow(3);
      paintClient(client3);
    }, 1800);
  });
});
