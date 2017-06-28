function Barman() {
  this.score = 0;
  this.posY = 0;
}

Barman.prototype.goUp = function() {
  console.log('go up');
  if (this.posY > 0) {
    this.posY -= 100;
    var barman = $('#barman').css({
      "top": ""+this.posY+"px"
    });
  }
  return this.posY;
};

Barman.prototype.goDown = function() {
  if (this.posY < 400) {
    this.posY += 100;
    var barman = $('#barman').css({
      "top": ""+this.posY+"px"
    });
  }
  return this.posY;
};

Barman.prototype.giveBeer = function() {  // setInterval();
  var newBeer = new Beer(this.posY);
  return newBeer;  // From right to left
};
