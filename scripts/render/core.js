MyGame.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // --------------------------------------------------------------
    //
    // Draws a texture to the canvas with the following specification:
    //    image: Image
    //    center: {x: , y: }
    //    size: { width: , height: }
    //
    // --------------------------------------------------------------
    function drawTexture(image, center, rotation, size) {
        context.save();
        context.translate(center.x, center.y);
        context.rotate(rotation);
        context.translate(-center.x, -center.y);

        context.drawImage(
            image,
            center.x - size.x / 2,
            center.y - size.y / 2,
            size.x, size.y);

        context.restore();
    }

    function drawSubTexture(image, index, subTextureWidth, centerX, centerY, sizeX, sizeY, rotation) {
        context.save();

        context.translate(centerX, centerY);
        context.rotate(rotation);
        context.translate(-centerX, -centerY);
        //
        // Pick the selected sprite from the sprite sheet to render
        context.drawImage(
            image,
            subTextureWidth * index, 0,      // Which sub-texture to pick out
            subTextureWidth, image.height,   // The size of the sub-texture
            centerX,           // Where to draw the sub-texture
            centerY,
            sizeX, sizeY);

        context.restore();
    }

    function drawText(spec) {
        context.save();

        context.font = spec.font;
        context.fillStyle = spec.fillStyle;
        context.strokeStyle = spec.strokeStyle;
        context.textBaseline = 'top';

        context.translate(spec.position.x, spec.position.y);
        context.rotate(spec.rotation);
        context.translate(-spec.position.x, -spec.position.y);


        context.fillText(spec.text, spec.position.x, spec.position.y);
        context.strokeText(spec.text, spec.position.x, spec.position.y);

        context.restore();
    }

    function drawBackground(texture) {
        if (texture.image.ready) {
                    context.save();
                    context.drawImage(
                        texture.image,
                        texture.center.x,
                        texture.center.y,
                        texture.width, texture.height);
                    context.restore();
        }
    };

    function drawGameOver(){
        context.lineWidth = 10;
        context.strokeRect(0,0, canvas.width,canvas.height);
        context.font = '80px Arial';
        context.fillStyle = "black";
        context.fillText('Game Over', 50, canvas.width / 4);
        context.font = '25px Arial';
        context.fillText('Press esc to play again', 75, canvas.width / 3);
    }

    function drawStats(hits, misses){
        let ratio = hits/(hits+misses) * 100;
        context.lineWidth = 10;
        context.fillStyle = "red";
        context.font = '25px ArcadeClassic';
        context.fillText(`Shots Fired         ${hits + misses}`,180,200);
        context.fillStyle = "yellow";
        context.fillText(`Number of Hits      ${hits}`,180,230);
        context.fillText(`Number of Misses      ${misses}`,180,260);
        context.fillText(`Hit-Miss Ratio      ${ratio.toFixed(1)}%`,180,290);
        context.fillStyle = "white";
        context.fillText('Press esc to play again', 180, 150);

    }


    
    function drawPlayer(texture) {
        if (texture.image.ready) {
                    context.save();
                    context.drawImage(
                        texture.image,
                        texture.x ,
                        texture.y ,
                        texture.width, texture.height);
                    context.restore();
        }

    };

    function drawBullets(bullets) {
        for (let i = 0; i < bullets.length; i++) {
          let bullet = bullets[i];
          if (bullet.image.ready) {
            context.save();
            context.drawImage(
                bullet.image,
                bullet.x,
                bullet.y,
                bullet.width, bullet.height);
            context.restore();
}
        }
    };

    function drawLives(count, texture) {
        for(let i=0; i< count; i++){
            if (texture.image.ready) {
                context.save();
                context.drawImage(
                    texture.image,
                    5 + (i*30) ,
                     575,
                    25, 25);
                context.restore();
    }
        }
    }

    function drawScore(number){
        context.lineWidth = 10;
        context.font = '24px ArcadeClassic';
        context.fillStyle = "White";
        context.fillText(`Score ${number}`, 10, 30);
    }

    function drawReady(){
        context.lineWidth = 10;
        context.font = '16px ArcadeClassic';
        context.fillStyle = "red";
        context.fillText("ready", 300,300);

    }

    function drawRound(number){
        context.lineWidth = 10;
        context.font = '24px ArcadeClassic';
        context.fillStyle = "cyan";
        context.fillText(`Stage ${number}`, 250,300);
    }

    function drawChallengeRound(number){
        context.lineWidth = 10;
        context.font = '24px ArcadeClassic';
        context.fillStyle = "cyan";
        context.fillText(`Challenge Round ${number / 3}`, 200,300);

    }

    function drawParticle(particle){
        ctx.beginPath();
        ctx.arc(particle.center.x, particle.center.y, particle.size, 0, 2 * Math.PI);
        ctx.fillStyle = "yellow"
        ctx.fill();
    }

        

    let api = {
        get canvas() { return canvas; },
        clear: clear,
        drawTexture: drawTexture,
        drawText: drawText,
        drawBackground: drawBackground,
        drawGameOver: drawGameOver,
        drawPlayer: drawPlayer,
        drawLives: drawLives,
        drawScore: drawScore,
        drawSubTexture: drawSubTexture,
        drawBullets: drawBullets,
        drawReady: drawReady,
        drawStats: drawStats,
        drawRound: drawRound,
        drawChallengeRound: drawChallengeRound,
        drawParticle: drawParticle
    };

    return api;
}());
