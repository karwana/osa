/*jshint node:true*/

'use strict';

var skrollr = require('skrollr');
var delegate = require('dom-delegate');

skrollr.init({
	easing: 'cubic',
    keyframe: function(element, name, direction) {
		var video;

		if (element.classList.contains('video-autoplay')) {

			// Don't play automatically on iPhones, as the video goes to fullscreen.
			if (navigator.platform.indexOf('iPhone') === 0) {
				return;
			}

			video = element.querySelector('video');

			if (video.getAttribute('data-autoplay') === name) {
				if (!video.hasAttribute('data-force-stop')) {
					video.volume = 0.3;
					video.play();
				}
			} else {
				video.pause();
			}
		}
	}
});

delegate(document.body)

// Allow scrolling on inner layer.
// https://github.com/Prinzhorn/skrollr/issues/226
.on('touchstart', '.js-body-part-scroller', function(event) {
	event.stopPropagation();
})

.on('touchmove', '.js-body-part-scroller', function(event) {
	event.stopPropagation();
})

.on('touchend', '.js-body-part-scroller', function(event) {
	event.stopPropagation();
})

// Scroll to top.
.on('click', '.js-scroll2top', function(event) {
	window.scrollTo(0, 0);
})

// Play or pause video on click.
.on('click', '.js-video-click2play', function(event, video) {

	// If the currentTime is greater than zero and paused and ended are false, the element is currently playing.
	// http://stackoverflow.com/questions/6877403/how-to-tell-if-a-video-element-is-currently-playing
	if (video.currentTime > 0 && !video.paused && !video.ended) {
		video.pause();
		video.setAttribute('data-force-stop', '');
	} else {
		video.play();
	}
});
