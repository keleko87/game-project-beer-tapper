function Beer(barmanPos) {
  this.beerPosX = 950;
  this.beerPosY = barmanPos;
  this.id = 'beer-'+barmanPos;
  this.speedSlide = 500;
}

Beer.prototype.slideLeft = function() {
  if (this.beerPosX > 0) {
    this.beerPosX -= 1;
    var Beer = $('#beer-' + this.beerPosY).css({
      "left": ""+this.beerPosX+"px"
    });
  }
  return this.beerPosX;
};

Beer.prototype.renderBeer = function() {
  $("#container-game").append("<div id='" + this.id + "' class='beer'></div>");
  $('#beer-' + this.beerPosY).css({
    "top": this.beerPosY,
    "left": this.beerPosX
  });

};

Beer.prototype.deleteBeer = function(newBeer) {
  $("#"+newBeer.id).removeClass('beer');
  newBeer = undefined; // Delete object
};
