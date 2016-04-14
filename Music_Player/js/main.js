document.addEventListener("DOMContentLoaded", prepareLoader, false);

var MusicPlayer = MusicPlayer || {};

MusicPlayer.Player = function() {
   
    var _this = {};
    var that = this;
    var _playing = false;
    
    var _audio;
    var _id;
    var _duration;
    
    _this.init = function (audioElement) {
        
        _audio = audioElement;
        _id = audioElement.id;
        _duration = audioElement.duration;
      
    };
    
    _this.createPlayer = function() {

        var audiosource = "<audio class='audio' preload='true'><source src='music/01 LOSER.m4a'/></audio>";
        var audioplayer = "<div class='audioplayer'><button id='playbutton' class='playbutton'></button><div class='playtime'><div class='tracker'></div></div></div>";      
        
        DisplayAudioPlayer (audiosource + audioplayer);
        bindAudioElements();

        bindEvents();
    };
        
    _this.Delete = function() {
        
        
        
    };
        
    _this.Play = function() {

        if (!_playing) {

            _playing = true;
            _audio.play();
            that.playBtn.className = "pausebutton";
            
        }
        else {

            _playing = false;
            _audio.pause();
            that.playBtn.className = "playbutton";

        }
        
    };
    
    var bindAudioElements = function () {
        
        that.playBtn = document.getElementById("playbutton");        
        
    }
    
    var bindEvents = function () {

        that.playBtn.addEventListener("click", _this.Play, false);
        
    }
    
    var DisplayAudioPlayer = function (playerElement) {

        document.getElementById("audio-player").innerHTML = playerElement;

    }
    
    return _this;
    
}

function prepareLoader() {

    var AudioPlayer = new MusicPlayer.Player();
    AudioPlayer.createPlayer();
    AudioPlayer.init(document.getElementsByTagName("audio")[0]);

}

