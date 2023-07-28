// --------------------------------------------------------------
//
// Renders an animated model based on a spritesheet.
//
// --------------------------------------------------------------
MyGame.render.AnimatedModel = function(spec, graphics) {
    'use strict';

    let animationTime = 0;
    let subImageIndex = 0;
    let subTextureWidth = 0;
    let image = new Image();
    let isReady = false;  // Can't render until the texture is loaded
    let Start = false;

    //
    // Load he texture to use for the particle system loading and ready for rendering
    image.onload = function() {
        isReady = true;
        subTextureWidth = image.width / spec.spriteCount;
    }
    image.src = spec.spriteSheet;

    //------------------------------------------------------------------
    //
    // Update the state of the animation
    //
    //------------------------------------------------------------------
    function update(elapsedTime) {
        if(spec.repeat || Start){
            animationTime += elapsedTime;
        }
        //
        // Check to see if we should update the animation frame
        if (animationTime >= spec.spriteTime[subImageIndex]) {
            //
            // When switching sprites, keep the leftover time because
            // it needs to be accounted for the next sprite animation frame.
            animationTime -= spec.spriteTime[subImageIndex];
            subImageIndex += 1;
            //
            // Wrap around from the last back to the first sprite as needed
            if(spec.repeat){
                subImageIndex = subImageIndex % spec.spriteCount;
            }
            else{
                if(subImageIndex > 5){
                    Start = false;
                    subImageIndex = 0;
                }
            }

        }
    }

    //------------------------------------------------------------------
    //
    // Render the specific sub-texture animation frame
    //
    //------------------------------------------------------------------
    function render(model) {
        if (isReady) {
            graphics.drawSubTexture(image, subImageIndex, subTextureWidth, model.x, model.y, model.width, model.height, model.rotation);
        }
    }

    function init(){
        Start = true;
        subImageIndex = 0;
        animationTime = 0;
    }

    let api = {
        update: update,
        render: render,
        init: init
    };

    return api;
};
