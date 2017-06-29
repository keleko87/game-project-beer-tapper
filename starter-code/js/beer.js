function Beer(barmanPos) {
  this.beerPosX = 950;
  this.beerPosY = barmanPos;
  this.speedSlide = 500;
  this._renderBeer();
}

Beer.prototype.slideLeft = function() {
  if (this.beerPosX > 0) {
    this.beerPosX -= 1;
    this.beer.css({
      "left": "" + this.beerPosX + "px"
    });
  } else this.beer.addClass('crash');
  return this.beerPosX;
};


Beer.prototype._renderBeer = function() {
  this.beer = $('<div>').addClass('beer').css({
    "top": this.beerPosY,
    "left": this.beerPosX
  });
  $("#container-game").append(this.beer);
};

Beer.prototype.deleteBeer = function() {
  this.beer.remove();
};
