//------------------------------------------------------------------
//
// This function performs the one-time game initialization.
//
//------------------------------------------------------------------
function initializeAudio() {
    'use strict';

    function loadSound(source) {
        let sound = new Audio();
        sound.addEventListener('canplay', function() {
            // console.log(`${source} is ready to play`);
        });
        sound.addEventListener('play', function() {
            // console.log(`${source} started playing`);
        });
        sound.addEventListener('pause', function() {
            // console.log(`${source} paused`);
        });
        sound.addEventListener('canplaythrough', function() {
            // console.log(`${source} can play through`);
        });
        sound.addEventListener('progress', function() {
            // console.log(`${source} progress in loading`);
        });
        sound.addEventListener('timeupdate', function() {
            // console.log(`${source} time update: ${this.currentTime}`);
        });
        if(source === 'audio/shot.wav'){
            sound.playbackRate = 2.0;
        }
        sound.src = source;
        return sound;
    }

    function loadAudio() {
        MyGame.sounds = {}
        MyGame.sounds['shoot'] = loadSound('audio/shot.wav');
        MyGame.sounds['intro'] = loadSound('audio/game_load.wav');
        MyGame.sounds['playerDeath'] = loadSound('audio/fighter_explosion.wav');
        MyGame.sounds['enemyDeath'] = loadSound('audio/enemy_explosion.wav');
        MyGame.sounds['enemyDive'] = loadSound('audio/enemy_dive.wav');

    }


    loadAudio();
}

//------------------------------------------------------------------
//
// Pauses the specified audio
//
//------------------------------------------------------------------
function pauseSound(whichSound) {
    MyGame.sounds[whichSound].pause();

}

//------------------------------------------------------------------
//
// Plays the specified audio
//
//------------------------------------------------------------------
function playSound(whichSound) {
    MyGame.sounds[whichSound].play();
}

