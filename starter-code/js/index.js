$(document).ready(function() {
  $('#start').on('click', function() {
    // Disable start button
    $(this).attr('disabled', 'disabled').addClass('disabled');

    // Start game
    var board = new Board();

    // Start game rendering loop
    var intervalGame = setInterval(function() {
      board.update();
    }, 20);  // 1000 / 30
  });
});
