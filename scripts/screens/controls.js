MyGame.screens['controls-page'] = (function(game) {
    
    function initialize() {
        document.getElementById('id-controls-back').addEventListener(
            'click',
            function() { game.showScreen('menu-page'); });

        document.getElementById('id-controls-fire').addEventListener(
            'click',
            function() { 
                document.getElementById("control-menu").style.display = "none"
                document.getElementById("control-change").style.display = "block"
                document.getElementById("current-control").innerHTML = "Fire"
                window.addEventListener('keydown', function (e) {
                    console.log(`you chose ${e.key}`);
                    document.getElementById("control-menu").style.display = "block"
                    document.getElementById("control-change").style.display = "none"
                    document.getElementById("current-fire-control").innerHTML = e.key;
                    window.localStorage.setItem("fire", e.key);
                    window.removeEventListener('keydown', arguments.callee);
                  }, false);
             });

        document.getElementById('id-controls-left').addEventListener(
            'click',
            function() { 
                document.getElementById("control-menu").style.display = "none"
                document.getElementById("control-change").style.display = "block"
                document.getElementById("current-control").innerHTML = "Move Left"
                window.addEventListener('keydown', function (e) {
                    console.log(`you chose ${e.key}`);
                    document.getElementById("control-menu").style.display = "block"
                    document.getElementById("control-change").style.display = "none"
                    document.getElementById("current-left-control").innerHTML = e.key;
                    window.localStorage.setItem("left", e.key);
                    window.removeEventListener('keydown', arguments.callee);
                  }, false);
             });
        document.getElementById('id-controls-right').addEventListener(
            'click',
            function() { 
                document.getElementById("control-menu").style.display = "none"
                document.getElementById("control-change").style.display = "block"
                document.getElementById("current-control").innerHTML = "Move Right"
                window.addEventListener('keydown', function (e) {
                    console.log(`you chose ${e.key}`);
                    document.getElementById("control-menu").style.display = "block"
                    document.getElementById("control-change").style.display = "none"
                    document.getElementById("current-right-control").innerHTML = e.key;
                    window.localStorage.setItem("right", e.key);
                    window.removeEventListener('keydown', arguments.callee);
                  }, false);
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

console.log(MyGame);