MyGame.screens['pop-up-page'] = (function(game) {
    'use strict';
    
    function initialize() {
        document.getElementById('id-go-home').addEventListener(
            'click',
            function() { 
                game.showScreen('menu-page');
            });

        document.getElementById('id-go-game').addEventListener(
           'click',
            function() { 
                game.showScreen('game-page'); 
            });
    }
    
    function run() {
        //
        // I know this is empty, there isn't anything to do.
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
