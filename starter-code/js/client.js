function Client(clientPosY, speed) {
  this.clientPosX = 0;
  this.clientPosY = clientPosY;
  this.direction = 'R';
  this._renderClient();
  this.speed = speed; // pixels
  this.hasBeer = false;
}

Client.prototype.addBeer = function() {
  this.client.addClass('hasbeer');
  this.hasBeer = true;
  console.log('addbeer',this.hasBeer);
};

Client.prototype.happy = function() {
  if (this.hasBeer === true && this.ClientPosX === 0) {
    console.log('happy');
    return true;
  }
};

Client.prototype.move = function() {
  if (this.direction === 'R') this.goRight();
  if (this.direction === 'L') this.goLeft();
};

Client.prototype.goRight = function() {
  if (this.clientPosX < 950) {
    this.clientPosX += this.speed;
    this.client.css({
      "left": "" + this.clientPosX + "px"
    });
  } else {
    this.client.addClass('client-crash');
    console.log('addClass client crash');
  }
  return this.clientPosX;
};

Client.prototype.goLeft = function() {
  if (this.clientPosX > 0) {
    this.clientPosX -= this.speed;
    this.client.css({
      "left": "" + this.clientPosX + "px"
    });
  } else {
    this.client.addClass('hasbeer');
  }
  return this.clientPosX;
};

Client.prototype._renderClient = function() {
  this.client = $("<div>").addClass('client').css({
    "top": this.clientPosY,
    "left": this.clientPosX
  });
  $("#container-game").append(this.client);
};

Client.prototype.deleteClient = function() {
  this.client.remove();
};
