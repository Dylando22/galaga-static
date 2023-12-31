// --------------------------------------------------------------
//
// Renders the particles in a particle system
//
// --------------------------------------------------------------
MyGame.render.ParticleSystem = function(system, graphics) {
    'use strict';

    //------------------------------------------------------------------
    //
    // Render all particles
    //
    //------------------------------------------------------------------
    function render() {
        Object.getOwnPropertyNames(system.particles).forEach( function(value) {
            let particle = system.particles[value];
            graphics.drawParticle(particle.x, particle.y);
        });
    }

    let api = {
        render: render
    };

    return api;
};
