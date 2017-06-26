function Client(clientPosition) {
  this.name = 'CL';
  this.direction = 'R';
  this.clientPosition = clientPosition;
  this.speed = 1000 ;  // Miliseconds
  this.timeDrink = 1000;
  this.hasBeer = false;
}

Client.prototype.goRight = function() {
  if (this.clientPosition[1] < 9) {
    this.clientPosition[1] += 1;
    console.log('Position',this.clientPosition[1]);
  } else {
    console.log('Barman losts!!!! Clients is in the final clientPosition ');
    return false;
  }
  return this.clientPosition;
};

Client.prototype.goLeft = function() {
  if (this.clientPosition[1] > 0) {
    this.clientPosition[1] -= 1;
  } else {
    console.log('Client is hidden');
    return false;
  }
  return this.clientPosition;
};

Client.prototype.isHidden = function() {
  if (this.clientPosition[1] === 0) {
    return true;
  } else {
    return false;
  }
};
// Client.prototype.hasBeer = function() {
//   this.hasBeer = true;
//   return this.hasBeer;
// };

Client.prototype.moveToBarman = function() {
  if (!this.hasBeer()) {
    this.goRigth();
  } else {
    this.goLeft();
  }
};
