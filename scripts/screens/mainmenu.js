MyGame.screens['menu-page'] = (function(game) {
    'use strict';
    let timeout = null;
    function initialize() {
        //
        // Setup each of menu events for the screens
        document.getElementById('id-new-game').addEventListener(
            'click',
            function() {
                game.showScreen('game-page');
                MyGame.screens['game-page'].initialize();
                document.onmousemove = null;
                clearTimeout(timeout);
                playSound('intro');


        });
        
        document.getElementById('id-high-scores').addEventListener(
            'click',
            function() { game.showScreen('high-scores'); });
        
        document.getElementById('id-credits').addEventListener(
            'click',
            function() { game.showScreen('credit-page'); });

        document.getElementById('id-controls').addEventListener(
            'click',
            function() { game.showScreen('controls-page'); }); 
            
        //set up the controls
        let rightMove = window.localStorage.getItem("right");
        let leftMove = window.localStorage.getItem("left");
        let fire = window.localStorage.getItem("fire");
        if( rightMove == null){
            window.localStorage.setItem("right", "ArrowRight");
            document.getElementById("current-right-control").innerHTML = "ArrowRight";
        }
        else{
            document.getElementById("current-right-control").innerHTML = rightMove;
        }
        if( leftMove == null){
            window.localStorage.setItem("left", "ArrowLeft");
            document.getElementById("current-left-control").innerHTML = "ArrowLeft";
        }
        else{
            document.getElementById("current-left-control").innerHTML = leftMove;
        }
        if( fire == null){
            window.localStorage.setItem("fire", " ");
            document.getElementById("current-fire-control").innerHTML = "Space";
        }
        else{
            if(fire === " "){fire = "Space"}
            document.getElementById("current-fire-control").innerHTML = fire;
        }


    }
    
    function run() {
        document.onmousemove = function(){
            clearTimeout(timeout);
            timeout = setTimeout(function(){
                game.showScreen('game-page');
                MyGame.screens['game-page'].initialize();      
                MyGame.screens['game-page'].startAttractMode();
                }, 10000);
        }
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
