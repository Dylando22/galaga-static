let enemyBullet = {
    imageSrc: 'images/bullet2.png',
    x: 0, // horizontal position
    y: 0, // vertical position
    speed:6, // pixels per frame
    damage: 5, // amount of damage it deals
    width: 9, // width of bullet
    height: 24, // height of bullet
    // Add any other properties you need
  };

let enemyBullets = []

function updateEnemyBullets() {
      for (let i = 0; i < enemyBullets.length; i++) {
        let bullet = enemyBullets[i];
        bullet.y +=  bullet.speed;
      }
      checkPlayerCollision();
  }
  
  function checkPlayerCollision() {
      for (let i = 0; i < enemyBullets.length; i++) {
        let bullet = enemyBullets[i];
        if(bullet.y >= 600){
            enemyBullets.splice(i, 1);
        }
        if(Player.isAlive 
            && bullet.x >= Player.x 
            && bullet.x < Player.x + Player.width
            && bullet.y <= Player.y
            && bullet.y > Player.y - Player.height){
                if(Player.lives > 0){
                    Player.lives -= 1;
                    enemyBullets = [];
                    Player.isAlive = false;
                }
                playSound('playerDeath');
        }
      }      
  }
  
  enemyBullet.image = new Image();
  enemyBullet.image.ready = false;
  enemyBullet.image.onload = function() {
    this.ready = true;
  };
  enemyBullet.image.src = enemyBullet.imageSrc;