let Player = {
    imageSrc: 'images/player.png',
    x: 300,
    y: 550,
    width: 50,
    height: 50,
    lives: 3,
    score: 0,
    hits: 0,
    miss: 0,
    fireBullet1: false,
    fireBullet2: false,
    bulletWait: 0,
    isAlive: true,
    autoMoveCount: 0,
    autoMoveDirection: 0,

    moveLeft:
    function moveLeft() {
        if(Player.x > 0 && Player.isAlive){
            Player.x -= 5;
        }
  },
    moveRight: function moveRight() {
        if(Player.x < (600 - Player.width) && Player.isAlive){
            Player.x += 5;
        }
  },
    shoot: function shoot() {
      if(!Player.fireBullet1){
        Player.fireBullet1 = true;
        Player.bulletWait = 0;
        let newBullet = Object.assign({}, bullet); // create a new bullet object
        newBullet.x = Player.x + 8 ; // set the starting position
        newBullet.y = Player.y - 10;
        bullets.push(newBullet); // add the bullet to the array of active bullets
        playSound('shoot');
      }
      if(!Player.fireBullet2 && Player.bulletWait > 300){
        Player.fireBullet2 = true;
        let newBullet = Object.assign({}, bullet); // create a new bullet object
        newBullet.x = Player.x + 8; // set the starting position
        newBullet.y = Player.y - 10;
        bullets.push(newBullet); // add the bullet to the array of active bullets
        playSound('shoot');
      }

    },

    checkCollision: function checkCollision(){
      for(let i = 0; i < Wave.enemies.length; i++){
        let enemy = Wave.enemies[i];
        if(enemy.isAlive
           && enemy.x + enemy.width >= this.x
           && enemy.x < this.x + this.width
           && enemy.y + enemy.height >= this.y
            ){
              enemy.isAlive = false;
              enemyBullets = [];
              this.onDeath();
        }
      }
    },

    onDeath: function onDeath(){
      this.lives -= 1;
      this.x = 300,
      this.isAlive = false;
      this.y = 550,
      playSound('playerDeath');
    },

    updateBullets: function updateBullets(){
      if(bullets.length === 0){
        Player.fireBullet1 = false;
        Player.bulletWait = 0;
      }
      if(bullets.length <= 1){
          Player.fireBullet2 = false;
      }

    },

    autoPlay: function autoPlay(enemies){
      if(this.autoMoveCount === 10){
        this.autoMoveCount = 0;
        let direction = Math.random()
        if(direction > .5){
          this.autoMoveDirection = 1;
        }
        else{
          this.autoMoveDirection = 0;
        }
      }
      if(this.autoMoveDirection == 1 && this.x > 100){
        this.moveLeft();
      }
      else if (this.autoMoveDirection == 0 && this.x < 500){
        this.moveRight();
      }
      this.autoMoveCount++;
      for(let i=0;i<enemies.length;i++){
        if(enemies[i].x -5 < Player.x && enemies[i].x + 5 > Player.x && enemies[i].isAlive){
          this.shoot();
        }
      }
    },

  initialize: function initialize() {
    Player.x = 300;
    Player.y = 500;
    Player.width = 25;
    Player.height = 25;
    Player.lives = 3;
    Player.score = 0;
    Player.hits = 0;
    Player.miss = 0;
  }
    
  }
  
  
  Player.image = new Image();
  Player.image.ready = false;
  Player.image.onload = function() {
    this.ready = true;
  };
  Player.image.src = Player.imageSrc;
