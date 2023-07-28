MyGame.screens['game-page'] = (function(game, systems, input, graphics, renderer) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;
    let myKeyboard = input.Keyboard();
     let CountDownClock = 0;
    let RoundDisplayClock = 0;
    let readyState = true;
    let AttractMode = false;
    let GameOverState = false;
    let EnemyExplosions = [];

    let background = {
        imageSrc: 'images/background3.png',
        center: { x: 0, y: 0 },
        width: 600,
        height: 600,
      };
      
      background.image = new Image();
      background.image.ready = false;
      background.image.onload = function() {
        this.ready = true;
      };
      background.image.src = background.imageSrc;
      

      let playerExplosion = renderer.AnimatedModel({
        spriteSheet: 'images/playerExplosion.png',
        spriteCount: 4,
        spriteTime: [500, 500, 500, 1000],
        repeat: false,
    }, graphics);


    let BeeAnimationRenderer = renderer.AnimatedModel({
        spriteSheet: 'images/bee_sprite_sheet.png',
        spriteCount: 2,
        spriteTime: [250, 250],   // ms per frame
        repeat: true,
    }, graphics);

    let ButterflyAnimationRenderer = renderer.AnimatedModel({
        spriteSheet: 'images/butterfly_sprite_sheet.png',
        spriteCount: 2,
        spriteTime: [250, 250],   // ms per frame
        repeat: true,
    }, graphics);

    let BossAnimationRenderer = renderer.AnimatedModel({
        spriteSheet: 'images/boss_sprite_sheet.png',
        spriteCount: 2,
        spriteTime: [250, 250],   // ms per frame
        repeat: true,
    }, graphics);

    let DamagedBossAnimationRenderer = renderer.AnimatedModel({
        spriteSheet: 'images/damaged_boss_sprite_sheet.png',
        spriteCount: 2,
        spriteTime: [250, 250],   // ms per frame
        repeat: true,
    }, graphics);

    function updateEnemyExplosions(elapsedTime){
        for(let i=0;i<Wave.enemies.length;i++){
            if(!Wave.enemies[i].isAlive){
                EnemyExplosions[i].manager.update(elapsedTime)
            }
        }
    };

    function getEnemyExplosions(){
        EnemyExplosions = [];
        for(let i = 0; i<Wave.enemies.length; i++){
            EnemyExplosions.push({
                manager: renderer.AnimatedModel({
                    spriteSheet: 'images/enemy_explosion_sheet.png',
                    spriteCount: 5,
                    spriteTime: [50, 50, 50, 50,50],
                    repeat: false,
                }, graphics),
                used: false,
            })
        }
    }


    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        if(readyState){
            CountDownClock += elapsedTime;
            if (CountDownClock > 5000){
                CountDownClock -= 5000;
                readyState = false;
                if(!Player.isAlive){
                    Player.isAlive = true;
                }
            }
            if(!Player.isAlive){
                playerExplosion.update(elapsedTime);
            }
        }
        else{
            if(!GameOverState){
            if(AttractMode){
                Player.autoPlay(Wave.enemies);
            }
        if(Player.fireBullet1 || Player.fireBullet2){
           updateBullets(elapsedTime);
        }
        updateEnemyExplosions(elapsedTime);
        if(Player.isAlive){
            updateEnemyBullets();
            Player.updateBullets();
            Player.checkCollision();
            Wave.update(elapsedTime);
            BeeAnimationRenderer.update(elapsedTime); 
            ButterflyAnimationRenderer.update(elapsedTime);
            BossAnimationRenderer.update(elapsedTime);  
            DamagedBossAnimationRenderer.update(elapsedTime);
        }
        else{
            if(Player.lives != 0){
                playerExplosion.update(elapsedTime);
                readyState = true;
                CountDownClock = 0;
            }
            else{
                playerExplosion.update(elapsedTime);
                GameOverState = true;
                if(!AttractMode){
                    setHighScores();
                }
                else{
                    cancelNextRequest = true;
                    game.showScreen('menu-page');
                }
            }
        }
        if(Wave.roundOver && !readyState){
            if(RoundDisplayClock <= 5000){
                RoundDisplayClock += elapsedTime;
            }
            else{
                Wave.roundOver = false;
                RoundDisplayClock = 0;
                getEnemyExplosions();
            }
        }
    }
    }

    }

    function render() {
        graphics.drawBackground(background);
        graphics.drawLives(Player.lives,Player)
        graphics.drawScore(Player.score)
        if(!GameOverState){
            graphics.drawBullets(enemyBullets);
            if(readyState){
                graphics.drawReady();
            }
            if(Player.fireBullet1){
                graphics.drawBullets(bullets);
            }
            if(Player.lives == 0){
                graphics.drawGameOver();
            }
            for(let i = 0; i < Wave.enemies.length; i++){
                let item = Wave.enemies[i];
                if(item.type === 'bee' ){
                    if(item.isAlive){
                        BeeAnimationRenderer.render(item)
                    }
                    else{
                        if(!EnemyExplosions[i].used){
                            EnemyExplosions[i].manager.init();
                            EnemyExplosions[i].used = true;
                        }
                        else{
                            EnemyExplosions[i].manager.render(item);
                        }
                    }
                }
                else if (item.type === 'butterfly'){
                    if(item.isAlive){
                        ButterflyAnimationRenderer.render(item)
                    }
                    else{
                        if(!EnemyExplosions[i].used){
                            EnemyExplosions[i].manager.init();
                            EnemyExplosions[i].used = true;
                        }
                        else{
                            EnemyExplosions[i].manager.render(item);
                        }
                    }
                }
                else if(item.type === 'boss'){
                    if(item.damaged){
                        if(item.isAlive){
                            DamagedBossAnimationRenderer.render(item)
                        }
                        else{
                            if(!EnemyExplosions[i].used){
                                EnemyExplosions[i].manager.init();
                                EnemyExplosions[i].used = true;
                            }
                            else{
                                EnemyExplosions[i].manager.render(item);
                            }
                        }
                    }
                    else if(item.isAlive){
                        BossAnimationRenderer.render(item)
                    }
                }
    
            }
            if(Player.isAlive){
                graphics.drawPlayer(Player);
                playerExplosion.init();
            }
            else{
                playerExplosion.render(Player);
            }
            if(Wave.roundOver && !readyState){
                if(Wave.round % 3 == 0){
                    graphics.drawChallengeRound(Wave.round);
                }
                else{
                    graphics.drawRound(Wave.round);
                }
            }
        }
        else{
            graphics.drawStats(Player.hits, Player.miss);
        }

    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;
        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function initialize() {
        // document.onmousemove = function(){};

        Player.initialize();

        myKeyboard.register('Escape', function() {

            //
            // Stop the game loop by canceling the request for the next animation frame
            cancelNextRequest = true;
            //
            // Then, return to the main menu
            if(!GameOverState){
                game.showScreen('pop-up-page');
            }
            else{
                game.showScreen('menu-page');
            }



        });
        let rightMove = window.localStorage.getItem("right");
        let leftMove = window.localStorage.getItem("left");
        let fire = window.localStorage.getItem("fire");
        myKeyboard.register(leftMove, Player.moveLeft)
        myKeyboard.register(rightMove, Player.moveRight)
        myKeyboard.register(fire, Player.shoot);
        Wave.init();
        getEnemyExplosions();
        readyState = true;
        CountDownClock = 0;
        AttractMode = false;
        GameOverState = false;
        bullets = [];
        enemyBullets = [];
    }

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    function startAttractMode() {
        AttractMode = true;
        document.onmousemove = function(){
            document.onmousemove = null;
            document.onkeydown = null;
            cancelNextRequest = true;
            game.showScreen('menu-page');
        }
        document.onkeydown = function(){
            document.onkeydown = null;
            document.onmousemove = null;
            cancelNextRequest = true;
            game.showScreen('menu-page');
        }

    }

    return {
        initialize : initialize,
        run : run,
        startAttractMode: startAttractMode
    };

}(MyGame.game, MyGame.systems, MyGame.input, MyGame.graphics, MyGame.render));


function setHighScores() {
    let scores = localStorage.getItem('high-scores');
    if(scores === null || scores.length === 0){
        let player = prompt(`New Highscore of ${Player.score}, enter 3 digit name`);
        localStorage.setItem('high-scores', Player.score );
        localStorage.setItem('names',player);
    }
    else{
        let oldNames = localStorage.getItem('names');
        let names = oldNames.split(',');
        let oldScores = scores.split(',');
        let scorestr= ""
        let nameStr= "";
        let scoreEntered = false;
        for(let i = 0; i < oldScores.length; i++){
            if(Player.score > oldScores[i] && !scoreEntered){
                let player = prompt(`New Highscore of ${Player.score}, enter 3 digit name`);
                scoreEntered = true;
                if(player !== null || player == ""){
                    if( i === 0) {
                        scorestr += Player.score + "," + oldScores[i];
                        nameStr += player + "," + names[i];
                    }
                    else{
                        scorestr += "," + Player.score + "," + oldScores[i];
                        nameStr += "," + player + "," + names[i];
                    }
                }
                else{
                    if(i > 0){
                        scorestr += "," + oldScores[i];
                        nameStr += "," + names[i];
                    }
                    else{
                        scorestr += oldScores[i];
                        nameStr += names[i];
                    }
                }
            }
            else {
                if(i > 0){
                    scorestr += "," + oldScores[i];
                    nameStr += "," + names[i];
                }
                else{
                    scorestr += oldScores[i];
                    nameStr += names[i];
                }
            }
        }

        if(scoreEntered === false && oldScores.length < 5){
            let player = prompt(`New Highscore of ${Player.score}, enter 3 digit name`);
            scoreEntered = true;
            scorestr += "," + Player.score
            nameStr += "," + player
        }
        localStorage.setItem('high-scores', scorestr);
        localStorage.setItem('names', nameStr);

    }

    
}
