function Barman() {
  this.score = 0;
  this.posY = 0;
  this.posX = 0;
  this.beersBar = [];
  this._renderBarman();
}

Barman.prototype.goUp = function() {
  if (this.posY > 0) {
    this.posY -= 100;
    this.barman.css({
      "top": "" + this.posY + "px"
    });
  }
  return this.posY;
};

Barman.prototype.goDown = function() {
  if (this.posY < 400) {
    this.posY += 100;
    this.barman.css({
      "top": "" + this.posY + "px"
    });
  }
  return this.posY;
};

Barman.prototype._renderBarman = function() {
  this.barman = $("<div>").addClass('barman').css({
    "top": "" + this.posY + "px",
    "right": "" + this.posX + "px"
  });
  $("#container-game").append(this.barman);
};

Barman.prototype.createBeer = function() {
  var beer = new Beer(this.posY);
  this.beersBar.push(beer);
};
