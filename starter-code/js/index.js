var board = new Board();
var barman = new Barman();
var client1 = new Client([0, 4], 500);
var client2 = new Client([1, 1], 1200);
// var client3 = new Client([2, 3], 800);
// var client2 = new Client([1, 0], 1000);
// var client3 = new Client([2, 0], 800);
// var client4 = new Client([3, 0], 1600);

// Print board
function printBoard(board, p) {
  var container = $('#container-game');

  board.grid.forEach(function(arrRow, y) {
    var row = $('<div>').addClass('row').attr('index', y);

    for (var x = 0; x < arrRow.length; x++) {
      var column = $('<div>').attr('y', y).attr('x', x);
      if (x === 0) {
        column.addClass('hidden');
      }
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

function paintClient(client1) {
  var row = $("div[index='" + client1.clientPosition[0] + "']");
  var current = $(row).children('div[x="' + client1.clientPosition[1] + '"]').addClass('client');
}

function moveClientLeft(client1) {

  client1.goLeft();
  var prev = client1.clientPosition[1] + 1;
  $('div[x="' + prev + '"]').removeClass('client');
  var row = $("div[index='" + client1.clientPosition[0] + "']");
  var current = $(row).children('div[x="' + client1.clientPosition[1] + '"]').addClass('client');

  return client1.clientPosition;
}

/******************** BARMAN ********************************/


// var intervalIdNewBeer;
function giveNewBeer(barmanRow) {

  for (var i = 0; i < board.length; i++) {
    if(i === barmanRow){
      for (var j = 0; j < board[i].length; j++) {

      }
    }
  }
  var newBeer = barman.giveNewBeer();

  var intervalIdNewBeer = setInterval(function() {

    var updBeer = updateBeerLeft(newBeer);
    var clientPos = client1.clientPosition;

    console.log(clientPos, 'pos: ', updBeer);

    if (updBeer[0] === client1.clientPosition[0] && updBeer[1] === client1.clientPosition[1]) {
      console.log(updBeer[0], updBeer[1], '===========', client1.clientPosition[0], client1.clientPosition[1]);
      moveClientLeft(client1);
    }
  }, 1000);
}
//
// function addCollisionBeer(client1, beer) {
//
//   var nextPosBeer = updBeer - 1;
//   console.log(nextPosCli, 'posNext: ', nextPosBeer);
//   if (nextPosBeer === nextPosCli) {
//     console.log(nextPosCli, '===========', nextPosBeer);
//
//     updateClient(client1, 'L');
//   }
// }


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

// function addCollision(client1, newBeer) {
//   // var interAddColision = setInterval(funnewBeerction() {
//   if (newBeer && client1) {
//     if ((newBeer.beerPosition[0] === client1.clientPosition[0]) && (newBeer.beerPosition[1] === client1.clientPosition[1])) {
//       client1.hasBeer = true;
//       return client1.hasBeer;
//     } else {
//       return false;
//     }
//   }
//   // }, 10);
//
// }


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
      giveNewBeer(barman.position[0]);
      break;
  }
}

function initClient(client) {
  setTimeout(function() {
    paintClient(client);
  }, client.speed);
}

/*********************** HTML DOM interaction ****************************************************************/
$(document).ready(function() {

  printBoard(board);

  $('#start').on('click', function() {
    $(this).attr('disabled', 'disabled').addClass('disabled');
    $(document).on('keydown', moveListeners);

    //
    var initGame = setInterval(function() {
      initClient(client2);
      initClient(client1);

    }, 1000);


  });

});
