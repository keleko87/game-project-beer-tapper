function Beer(barmanPos) {
  this.beerPosX = 0;
  this.beerPosY = barmanPos;
  this.id = 'beer-'+barmanPos;
  this.speedSlide = 500;
}

// Beer.prototype.slideRight = function() {
//   console.log('go rig');
//   if (this.beerPosX < 950) {
//     this.beerPosX += 1;
//     var Beer = $('#' + this.id).css({
//       "left": ""+this.beerPosX+"px"
//     });
//   }
//   return this.beerPosX;
// };

Beer.prototype.slideLeft = function() {
  if (this.beerPosX < 950) {
    this.beerPosX += 1;
    var Beer = $('#beer-' + this.beerPosY).css({
      "right": ""+this.beerPosX+"px"
    });
  }
  return this.beerPosX;
};

Beer.prototype.renderBeer = function() {
  $("#container-game").append("<div id='" + this.id + "' class='beer'></div>");
  $('#beer-' + this.beerPosY).css({
    "top": this.beerPosY,
    "right": this.beerPosX
  });

};


Beer.prototype.deleteBeer = function() {
};
