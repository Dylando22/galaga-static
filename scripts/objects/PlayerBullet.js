let bullet = {
    imageSrc: 'images/bullet.png',
    x: 0, // horizontal position
    y: 0, // vertical position
    speed: 6, // pixels per frame
    damage: 5, // amount of damage it deals
    width: 9, // width of bullet
    height: 24, // height of bullet
    // Add any other properties you need
  };

let bullets = [];
  
function updateBullets(timeElapsed) {
  if(Player.bulletWait <= 300 && Player.fireBullet1){
    Player.bulletWait += timeElapsed
  }
    for (let i = 0; i < bullets.length; i++) {
      let bullet = bullets[i];
      bullet.y -=  bullet.speed;
    }
    checkCollisions();
}

function checkCollisions() {
    for (let i = 0; i < bullets.length; i++) {
      let bullet = bullets[i];
      // check if the bullet has back wall
      if (bullet.y <= 0) {
        // apply damage to the target
        // remove the bullet from the array of active bullets
        bullets.splice(i, 1);
        Player.miss += 1;
      }
      else{
        for(let j = 0; j< Wave.enemies.length; j++){
          let enemy = Wave.enemies[j];
          if( enemy.isAlive
            && bullet.x >= enemy.x 
            && bullet.x < enemy.x + enemy.width
            && bullet.y <= enemy.y
            && bullet.y + bullet.height > enemy.y - enemy.height
            ){
              // enemy.type === 'boss' && 
            if(enemy.type === 'boss' && !enemy.damaged){
              enemy.damaged = true;
              Player.hits += 1;
              bullets.splice(i, 1);
            }
            else{
              switch(enemy.type){
                case "boss":
                if(enemy.isDiving){
                  Player.score += 400;
                }
                else{
                  Player.score += 150;
                }
                break;
                case "butterfly":
                if(enemy.isDiving){
                  Player.score += 160;
                }
                else{
                  Player.score += 80;
                }
                break;
                case "bee":
                  if(enemy.isDiving){
                    Player.score += 100;
                  }
                  else{
                    Player.score += 50;
                  }
                break;
              }
              Player.hits += 1;
              enemy.isAlive = false;
              playSound('enemyDeath');
              bullets.splice(i, 1);
            }
          }
      }

      }
    }
    
}

bullet.image = new Image();
bullet.image.ready = false;
bullet.image.onload = function() {
  this.ready = true;
};
bullet.image.src = bullet.imageSrc;