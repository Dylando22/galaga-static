let Wave = {
    enemies: [],
    groupMove: 0,
    moveX: 0,
    moveY: 0,
    round: 1,
    moveCount: 0,
    diveIdx: 0,
    formation: false,
    hasDiver: false,
    entranceTimer: 0,
    roundOver: false,
    leftEdge: 150,
    rightEdge: 420,
    challengeKills: 0,
    
    
    getWave: function getWave(){
        this.roundOver = true;
        this.formation = false;
        this.hasDiver = false;
        this.entranceTimer = -100;
        this.leftEdge = 150;
        this.rightEdge = 420;
        this.challengeKills = 0;
        this.enemies = []
        if(this.round % 3 != 0){
            for(let i=0;i<20;i++){
                const newBee = Object.assign({}, Bee);
                if(i<10){
                    newBee.returnY = 165;
                }
                else{
                    newBee.returnY = 135;

                }
                newBee.returnX = ((i%10)*30) + 150;
                if(i < 5){
                    let path = newBee.getEntrancePathLeft(300,300);
                    newBee.flightPath = path;
                    newBee.x = path[0].x - 25;
                    newBee.y = path[0].y;
                    newBee.entranceTime = i * 25;
                }
                else if(i>= 5 && i < 10){
                    let path = newBee.getEntrancePathRight(250,500);
                    newBee.flightPath = path;
                    newBee.x = path[0].x + 25;
                    newBee.y = path[0].y;
                    newBee.entranceTime = (i * 25) + 150;
                }
                else if(i >= 10 && i < 15){
                    let path = newBee.getEntrancePathLeft(450,250);
                    newBee.flightPath = path;
                    newBee.x = path[0].x - 25;
                    newBee.y = path[0].y;
                    newBee.entranceTime = (i * 25) + 300;
                }
                else if(i >= 15 && i < 20){
                    let path = newBee.getEntrancePathRight(300,250);
                    newBee.flightPath = path;
                    newBee.x = path[0].x + 25;
                    newBee.y = path[0].y;
                    newBee.entranceTime = (i * 25) + 450;
                }
                newBee.flightIdx = 0;
                this.enemies.push(newBee)
            }
            for(let i=0;i<16;i++){
                const newButterfly = Object.assign({}, Butterfly);
                if(i<8){
                    newButterfly.returnY = 105;
                }
                else{
                    newButterfly.returnY = 80;

                }
                newButterfly.returnX = ((i%8)*30) + 180;
                if(i > 4){
                    let path = newButterfly.getEntrancePathLeft(300,300);
                    newButterfly.flightPath = path;
                    newButterfly.x = path[0].x - 25;
                    newButterfly.y = path[0].y;
                    newButterfly.entranceTime = ((i + 20) * 25) + 550;
                }
                else if(i >= 4 && i < 8){
                    let path = newButterfly.getEntrancePathRight(450,100);
                    newButterfly.flightPath = path;
                    newButterfly.x = path[0].x + 25;
                    newButterfly.y = path[0].y;
                    newButterfly.entranceTime = ((i + 20) * 25) + 700;
                }
                else if(i >= 8 && i < 12){
                    let path = newButterfly.getEntrancePathLeft(450,500);
                    newButterfly.flightPath = path;
                    newButterfly.x = path[0].x - 25;
                    newButterfly.y = path[0].y;
                    newButterfly.entranceTime = ((i + 20) * 25) + 850;
                }
                else{
                    let path = newButterfly.getEntrancePathRight(300,300);
                    newButterfly.flightPath = path;
                    newButterfly.x = path[0].x + 25;
                    newButterfly.y = path[0].y;
                    newButterfly.entranceTime = ((i + 20) * 25) + 1000;
                }
                newButterfly.flightIdx = 0;
                this.enemies.push(newButterfly)
            }
            for(let i=0;i<4;i++){
                const newBoss = Object.assign({}, Boss);
                newBoss.returnX = (i*30) + 240;
                newBoss.returnY = 50;
                if(i%2 == 0){
                    let path = newBoss.getEntrancePathLeft(450,550);
                    newBoss.flightPath = path;
                    newBoss.x = path[0].x - 25;
                    newBoss.y = path[0].y;
                    newBoss.entranceTime = ((i + 36) * 20) + 1050;
                }
                else{
                    let path = newBoss.getEntrancePathRight(350,150);
                    newBoss.flightPath = path;
                    newBoss.x = path[0].x + 25;
                    newBoss.y = path[0].y;
                    newBoss.entranceTime = ((i + 36) * 20) + 1200;
                }
                newBoss.flightIdx = 0;
                this.enemies.push(newBoss)
            }
        }
        else{
            //Challenging Stage
            for(let i=0;i<8;i++){
                const newBee = Object.assign({}, Bee);
                newBee.returnY = -50;
                newBee.returnX = -50;
                if(i < 4){
                    let path = newBee.ChallengePathTopLeft();
                    newBee.flightPath = path;
                    newBee.x = path[0].x;
                    newBee.y = path[0].y - 25;
                }
                else{
                    let path = newBee.ChallengePathTopRight();
                    newBee.flightPath = path;
                    newBee.x = path[0].x;
                    newBee.y = path[0].y - 25;
                }
                newBee.entranceTime = (i % 4) * 6 + 50;
                newBee.flightIdx = 0;
                this.enemies.push(newBee);
            }
            for(let i=0;i<8;i++){
                let newEnemy = null;
                if(i % 2 == 0){
                    newEnemy = Object.assign({}, Bee);
                }
                else{
                    newEnemy = Object.assign({}, Boss);
                }
                newEnemy.returnY = -50;
                newEnemy.returnX = -50;
                let path = newEnemy.ChallengePathLeftLoop();
                newEnemy.flightPath = path;
                newEnemy.x = path[0].x - 50;
                newEnemy.y = path[0].y - 50;
                newEnemy.entranceTime = i * 6 + 400;
                newEnemy.flightIdx = 0;
                this.enemies.push(newEnemy);

            }
            for(let i=0;i<8;i++){
                let newEnemy = Object.assign({}, Bee);
                newEnemy.returnY = -50;
                newEnemy.returnX = -50;
                let path = newEnemy.ChallengePathRightLoop();
                newEnemy.flightPath = path;
                newEnemy.x = path[0].x + 50;
                newEnemy.y = path[0].y + 50;
                newEnemy.entranceTime = i * 6 + 750;
                newEnemy.flightIdx = 0;
                this.enemies.push(newEnemy);

            }
            for(let i=0;i<16;i++){
                let newEnemy = null;
                let path = null;
                let eRand = Math.floor(Math.random() * 3) + 1;
                let pRand = Math.floor(Math.random() * 4) + 1;
                switch(eRand){
                    case 1: newEnemy = Object.assign({}, Bee);
                    break;
                    case 2: newEnemy = Object.assign({}, Butterfly);
                    break;
                    case 3: newEnemy = Object.assign({}, Boss);
                    break;
                    default: newEnemy = Object.assign({}, Bee);
                }
                switch(pRand){
                    case 1: 
                    path = newEnemy.ChallengePathLeftLoop();
                    newEnemy.flightPath = path;
                    newEnemy.x = path[0].x - 50;
                    newEnemy.y = path[0].y - 50;
                    break;
                    case 2: 
                    path = newEnemy.ChallengePathRightLoop();
                    newEnemy.flightPath = path;
                    newEnemy.x = path[0].x + 50;
                    newEnemy.y = path[0].y + 50;
                    break;
                    case 3: 
                    path = newEnemy.ChallengePathTopLeft();
                    newEnemy.flightPath = path;
                    newEnemy.x = path[0].x;
                    newEnemy.y = path[0].y - 50;
                    break;
                    case 4: 
                    path = newEnemy.ChallengePathTopRight();
                    newEnemy.flightPath = path;
                    newEnemy.x = path[0].x;
                    newEnemy.y = path[0].y - 50;
                    break;
                    default: 
                    path = newEnemy.ChallengePathLeftLoop();
                    newEnemy.flightPath = path;
                    newEnemy.x = path[0].x - 50;
                    newEnemy.y = path[0].y - 50;
                } 
                newEnemy.returnY = -50;
                newEnemy.returnX = -50;
                newEnemy.entranceTime = i * 6 + 1200;
                newEnemy.flightIdx = 0;
                this.enemies.push(newEnemy);
            }
        }

    },

    init: function init(){
        this.round = 1;
        this.enemies = [];
        this.groupMove =  .5;
        this.moveY = -.025;
        this.moveX = -.025;
        this.moveCount = 0,
        this.diveIdx = 0,
        this.formation = false,
        this.hasDiver = false,
        this.entranceTimer = 0,
        this.getWave();
    },

    update: function update(elapsedTime){
        if(this.isWaveOver()){
            console.log('running');
            this.round += 1;
            this.getWave();

        }
        else if(!this.roundOver){
            if(this.formation){
            if(this.formation && !this.hasDiver){
                this.diveIdx = Math.floor(Math.random() * this.enemies.length);
                while(!this.enemies[this.diveIdx].isAlive){
                    this.diveIdx = Math.floor(Math.random() * this.enemies.length);
                }
                this.enemies[this.diveIdx].getDivePath();
                playSound('enemyDive');
                this.hasDiver = true;
            }
            if(this.moveCount >= 100){
                this.moveCount = 0;
                this.moveY *= -1;
                this.moveX *= -1;
            }

            if(this.leftEdge  <= 0 || this.rightEdge >= 575){
                this.groupMove *= -1;

            }
            this.leftEdge += this.groupMove;
            this.rightEdge += this.groupMove;
        }
            this.entranceTimer++;;
            this.moveCount++;

            let allInFormation = true;
           for(let i=0; i< this.enemies.length;i++){
                let enemy = this.enemies[i];
                if(!enemy.inFormation && !this.formation ){
                    allInFormation = false;
                    if(this.entranceTimer >= enemy.entranceTime){
                        enemy.x = enemy.flightPath[enemy.flightIdx].x;
                        enemy.y = enemy.flightPath[enemy.flightIdx].y;
                        if(enemy.flightPath.length > 1){
                            // enemy.rotation = enemy.getRotation({x: enemy.x, y: enemy.y}, enemy.flightPath[1]);
                        }
                        enemy.flightIdx++;
                        if(enemy.flightIdx === 75 && this.round > 1 && this.round % 3 != 0 && enemy.isAlive){
                            enemy.shoot();
                        }
                        if(enemy.flightIdx === enemy.flightPath.length){
                            enemy.flightIdx = 0;
                            enemy.inFormation = true;
                        }
                     }
                }
                else if(this.formation){
                    enemy.checkShot(elapsedTime);
                    if(enemy.isDiving && enemy.flightPath.length > 0){
                        enemy.x = enemy.flightPath[0].x;
                        enemy.y = enemy.flightPath[0].y;
                        if(enemy.flightPath.length > 1){
                            // enemy.rotation = enemy.getRotation({x: enemy.x, y: enemy.y}, enemy.flightPath[1]);
                        }
                        enemy.flightPath.splice(0,1);
                    }
                    if(enemy.isDiving && enemy.flightPath.length == 0){
                        let Start = {x: enemy.x, y:enemy.y};
                        let End = {x: enemy.returnX, y: enemy.returnY};
                        enemy.flightPath = enemy.getPath(Start,End,0);
                        enemy.isDiving = false;
                    }
                    if(!enemy.inFormation && !enemy.isDiving && enemy.flightIdx < 100 ){
                        enemy.x = enemy.flightPath[enemy.flightIdx].x;
                        enemy.y = enemy.flightPath[enemy.flightIdx].y;
                        if(enemy.flightIdx < 99){
                            // enemy.rotation = enemy.getRotation({x: enemy.x, y: enemy.y}, enemy.flightPath[1]);
                        }
                        enemy.flightIdx++;
                        enemy.flightPath = enemy.updateReturnPath(enemy.flightPath, {x: enemy.returnX, y: enemy.returnY});
                        if(enemy.flightIdx == 99 ){
                            enemy.inFormation = true;
                            enemy.flightIdx = 0;
                            this.hasDiver = false;
                            enemy.rotation = 0;
                        }
                    }                     
                    enemy.returnX += this.groupMove;
                    enemy.x += this.groupMove;
                    
                    if(i < 20){
                        if(i < 10){
                            enemy.inFormation ? enemy.y -= this.moveY : {};
                            enemy.returnY -= this.moveY;
                        }
                        enemy.y -= this.moveY;
                        enemy.returnY -= this.moveY;
                    }
                    else{
                        if(i > 35){
                           enemy.inFormation ? enemy.y += this.moveY: {};
                           enemy.returnY += this.moveY;
                        }
                        if(i > 27){
                            enemy.inFormation ? enemy.y += this.moveY: {};
                            enemy.returnY += this.moveY;
                        }
                        enemy.inFormation ? enemy.y += this.moveY: {};
                        enemy.returnY += this.moveY;
                    }
                    if(i < 5 || (i > 9 && i < 15) || (i > 19 && i <24) || (i > 27 && i < 32) || (i > 35 && i < 38) ){
                        enemy.inFormation ? enemy.x += this.moveX: {};
                        enemy.returnX += this.moveX;
                    }
                    else{
                        enemy.inFormation ? enemy.x -= this.moveX: {};
                        enemy.returnX -= this.moveX;
                    }
                    
                }
                }
                if(allInFormation){
                    if(this.round % 3 != 0 ){
                        this.formation = true;
                    }
                    else{
                        for(let i =0; i < this.enemies.length; i++){
                            if(!this.enemies[i].isAlive){
                                this.challengeKills++;
                            }
                            else{
                                this.enemies[i].isAlive = false;
                            }
                        }
                        Player.score += (Math.floor(this.challengeKills/5) * 1000)
                        this.roundOver = true;
                    }
                }
        }

    },

    isWaveOver: function isWaveOver(){
        let ans = true;
        for(let i=0; i< this.enemies.length;i++){
            if(this.enemies[i].isAlive){
                ans = false;
            }
        }
        return ans;
    },

    

}   
