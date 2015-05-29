// Class representing a default platform
Platform = function (game, x, y, imageName, direction) {
    Phaser.Sprite.call(this, game, x, y, imageName, direction);
    this.anchor.setTo(0.5);
    this.xSpeed = 0;
    this.updateBehavior = new DefaultUpdateBehavior(this);
};

Platform.prototype = Object.create(Phaser.Sprite.prototype);
Platform.prototype.constructor = Platform;

Platform.prototype.update = function() {
    this.updateBehavior.update();
};

Platform.prototype.init = function(x, y){
    this.reset(x, y);
    this.updateVelocity();
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.outOfBoundsKill = true;
    this.checkWorldBounds = true;
};


Platform.prototype.updateVelocity = function(){
    this.body.velocity.y = PLATFORM_INITIAL_SPEED * speedCoefficient;
};


// class representating a DefaultUpdateBehavior which do nothing
DefaultUpdateBehavior = function (platform){
    this.platform = platform;
};

DefaultUpdateBehavior.prototype.update = function(){
    
};

// class representating a behavior which the platform is moving
MovingUpdateBehavior = function(platform, xMinRange, xMaxRange, xSpeed){
    this.platform = platform;
    this.xMinRange = xMinRange;
    this.xMaxRange = xMaxRange;
    this.xSpeed = xSpeed;
};

MovingUpdateBehavior.prototype.update = function(){
    
    // we invert the sense of the speed if we reach the min or the max range
    if(this.platform.body.x <= this.xMinRange
      || this.platform.body.x >= this.xMaxRange){
        this.xSpeed = -this.xSpeed;
    }
    
    this.platform.body.x += this.xSpeed;
    
};

