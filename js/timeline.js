var sounds = [
    ["images/clap.png", "sound/clap.mp3", "Clap"],
    ["images/clave.png", "sound/clave.mp3", "Clave"],
    ["images/cowbell.png", "sound/cowbell.mp3", "Cowbell"],
    ["images/crahs.png", "sound/crash.mp3", "Crash"],
    ["images/hihat.png", "sound/hihat.mp3", "Hihat"],
    ["images/snare.png", "sound/snaredrum.mp3", "Snare"],
    ["images/snare2.png", "sound/snaredrum2.mp3", "Snare (2)"],
    ["images/snare3.png", "sound/snaredrum3.mp3", "Snare (3)"]
];

var oldNum = 0;

var soundsArray;
var indexesArray;

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['wavesurfer'], factory);
    } else {
        root.WaveSurfer.Timeline = factory(root.WaveSurfer);
    }
}(this, function (WaveSurfer) {
    'use strict';

    WaveSurfer.Timeline = {
        init: function (params) {
            this.params = params;
            var wavesurfer = this.wavesurfer = params.wavesurfer;

            if (!this.wavesurfer) {
                throw Error('No WaveSurfer intance provided');
            }

            var drawer = this.drawer = this.wavesurfer.drawer;

            this.container = 'string' == typeof params.container ?
                document.querySelector(params.container) : params.container;

            if (!this.container) {
                throw Error('No container for WaveSurfer timeline');
            }

            

            //alert(params.beatsarray);
            console.log(params.beatsarray);

            soundsArray = [];
            indexesArray = [];

            for(var i = 0; i < params.beatsarray[0].length; i++){
                 console.log(params.beatsarray);
                soundsArray.push(params.beatsarray[0][i][0]);
                indexesArray.push(params.beatsarray[0][i][1]);
            }

            console.log(indexesArray);
            console.log(soundsArray);
            //alert(soundsArray);
            //alert(indexesArray);



            this.width = drawer.width;
            this.height = this.params.height || 20;
            this.notchPercentHeight = this.params.notchPercentHeight || 90;
            this.primaryColor = this.params.primaryColor || '#000';
            this.secondaryColor = this.params.secondaryColor || '#c0c0c0';
            this.primaryFontColor = this.params.primaryFontColor || '#000';
            this.secondaryFontColor = this.params.secondaryFontColor || '#000';
            this.thirdColor = this.params.thirdColor || '#ABAB54';
            this.fontFamily = this.params.fontFamily || 'Arial';
            this.fontSize = this.params.fontSize || 10;

            this.createWrapper();
            this.createCanvas();
            this.render();

            wavesurfer.drawer.wrapper.onscroll = this.updateScroll.bind(this);
            wavesurfer.on('redraw', this.render.bind(this));
            wavesurfer.on('destroy', this.destroy.bind(this));
        },

        destroy: function () {
            this.unAll();
            if (this.wrapper) {
                this.wrapper.parentNode.removeChild(this.wrapper);
                this.wrapper = null;
            }
        },

        createWrapper: function () {
            var prevTimeline = this.container.querySelector('timeline');
            if (prevTimeline) {
                this.container.removeChild(prevTimeline);
            }

            var wsParams = this.wavesurfer.params;
            this.wrapper = this.container.appendChild(
                document.createElement('timeline')
            );
            this.drawer.style(this.wrapper, {
                display: 'block',
                position: 'relative',
                userSelect: 'none',
                webkitUserSelect: 'none',
                height: this.height + 'px'
            });

            if (wsParams.fillParent || wsParams.scrollParent) {
                this.drawer.style(this.wrapper, {
                    width: '100%',
                    overflowX: 'hidden',
                    overflowY: 'hidden'
                });
            }

            var my = this;
            this.wrapper.addEventListener('click', function (e) {
                e.preventDefault();
                var relX = 'offsetX' in e ? e.offsetX : e.layerX;
                my.fireEvent('click', (relX / my.wrapper.scrollWidth) || 0);
            });
        },

        createCanvas: function () {
            var canvas = this.canvas = this.wrapper.appendChild(
                document.createElement('canvas')
            );

            this.timeCc = canvas.getContext('2d');

            this.wavesurfer.drawer.style(canvas, {
                position: 'absolute',
                zIndex: 4
            });
        },

        render: function () {
            this.updateCanvasStyle();
            this.drawTimeCanvas();
        },

        updateCanvasStyle: function () {
            var width = this.drawer.wrapper.scrollWidth;
            this.canvas.width = width * this.wavesurfer.params.pixelRatio;
            this.canvas.height = this.height * this.wavesurfer.params.pixelRatio;
            this.canvas.style.width = width + 'px';
            this.canvas.style.height = this.height + 'px';
        },

        drawTimeCanvas: function() {
            var backend = this.wavesurfer.backend,
                wsParams = this.wavesurfer.params,
                duration = backend.getDuration();

            if (wsParams.fillParent && !wsParams.scrollParent) {
                var width = this.drawer.getWidth();
            } else {
                width = this.drawer.wrapper.scrollWidth * wsParams.pixelRatio;
            }
            var pixelsPerSecond = width/duration;



            if (duration > 0) {
                var curPixel = 0,
                    curSeconds = 0,
                    totalSeconds = parseInt(duration, 10) + 1,
                    formatTime = function(seconds) {
                        if (seconds/60 > 1) {
                            var minutes = parseInt(seconds / 60),
                                seconds = parseInt(seconds % 60);
                            seconds = (seconds < 10) ? '0' + seconds : seconds;
                            return '' + minutes + ':' + seconds;
                        } else {
                            return seconds;
                        }
                    };

                if (pixelsPerSecond * 1 >= 25) {
                    var timeInterval = 1;
                    var primaryLabelInterval = 10;
                    var secondaryLabelInterval = 5;
                } else if (pixelsPerSecond * 5 >= 25) {
                    var timeInterval = 5;
                    var primaryLabelInterval = 6;
                    var secondaryLabelInterval = 2;
                } else if (pixelsPerSecond * 15 >= 25) {
                    var timeInterval = 15;
                    var primaryLabelInterval = 4;
                    var secondaryLabelInterval = 2;
                } else {
                    var timeInterval = 60;
                    var primaryLabelInterval = 4;
                    var secondaryLabelInterval = 2;
                }

                var height1 = this.height - 4,
                    height2 = (this.height * (this.notchPercentHeight / 100.0)) - 4,
                    fontSize = this.fontSize * wsParams.pixelRatio;



                for (var i = 0; i < totalSeconds/timeInterval; i++) {
                    
                    if (i % primaryLabelInterval == 0) {
                        this.timeCc.fillStyle = this.primaryColor;
                        this.timeCc.fillRect(curPixel, 0, 1, height1);
                        this.timeCc.font = fontSize + 'px ' + this.fontFamily;
                        this.timeCc.fillStyle = this.primaryFontColor;
                        this.timeCc.fillText(formatTime(curSeconds), curPixel + 5, height1);
                    } else if (i % secondaryLabelInterval == 0) {
                        this.timeCc.fillStyle = this.secondaryColor;
                        this.timeCc.fillRect(curPixel, 0, 1, height1);
                        this.timeCc.font = fontSize + 'px ' + this.fontFamily;
                        this.timeCc.fillStyle = this.secondaryFontColor;
                        this.timeCc.fillText(formatTime(curSeconds), curPixel + 5, height1);
                    } else {
                        this.timeCc.fillStyle = this.secondaryColor;
                        this.timeCc.fillRect(curPixel, 0, 1, height2);
                    }

                    for(var z = 0; z < indexesArray.length; z++){
                        if(indexesArray[z] == i){
                            this.timeCc.fillStyle = this.secondaryColor;
                            this.timeCc.fillRect(curPixel, 5, 5, height1 + 10);
                            this.timeCc.fillStyle = this.thirdColor;
                            this.timeCc.fillText(formatTime(curSeconds), curPixel, height1);
                        }
                    }

                    curSeconds += timeInterval;
                    curPixel += pixelsPerSecond * timeInterval;
                }
            }
        },
        updateScroll: function () {

            for(var i = 0; i < indexesArray.length; i++){
                if(oldNum != Math.round(wavesurfer.getCurrentTime()) && indexesArray[i] == Math.round(wavesurfer.getCurrentTime())){
                    console.log(sounds[soundsArray[i]][1]);
                    var audio = new Audio(sounds[soundsArray[i]][1]);
                     audio.play();
                    oldNum = Math.round(wavesurfer.getCurrentTime());
                }
            }
            this.wrapper.scrollLeft = this.drawer.wrapper.scrollLeft;
        }
    };

    WaveSurfer.util.extend(WaveSurfer.Timeline, WaveSurfer.Observer);

    return WaveSurfer.Timeline;
}));