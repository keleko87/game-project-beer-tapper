$(document).ready(function() {
  $('#start').on('click', function() {
    // Disable start button
    $(this).attr('disabled', 'disabled').addClass('disabled');

    // Start game
    var board  = new Board();
    //configure key events using jquery
    $(document).on('keydown', board.moveListeners);

    // Start game rendering loop
    var intervalGame = setInterval(function() {
      board.update();
    }, 10);  // 1000 / 30
  });
});
