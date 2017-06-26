function Client() {
  this.name = 'CL';
  this.direction = 'R';
  this.ClientPosition = [0, 0];
  this.speed = 1;
}

Client.prototype.goRigth = function() {
  this.position[0] += 1;
};

Client.prototype.goLeft = function() {
  this.position[0] -= 1;
};

Client.prototype.isHidden = function() {
  if(this.ClientPosition[1] === 0){
    return true;
  }else{
    return false;
  }
};
Client.prototype.hasBeer = function(beerPosition) {
  if (beerPosition == this.ClientPosition) {
    return true;
  }else{
    return false;
  }
};

Client.prototype.moveToBarman = function() {
  if (!this.hasBeer()) {
    this.goRigth();
  }else{
    this.goLeft();
  }
};
