(function () {
  'use strict';

  /* ─── PÉTALOS FLOTANTES ─── */
  function createPetals() {
    var container = document.getElementById('petals-container');
    if (!container) return;
    var colors = ['#f48fb1', '#f06292', '#f8bbd0', '#ec407a', '#ffd1dc'];
    for (var i = 0; i < 25; i++) {
      var petal = document.createElement('div');
      petal.className = 'petal';
      var size = 10 + Math.random() * 22;
      var isRound = Math.random() > 0.5;
      petal.style.cssText =
        'width:' + size + 'px;' +
        'height:' + (size * (0.7 + Math.random() * 0.5)) + 'px;' +
        'background:' + colors[Math.floor(Math.random() * colors.length)] + ';' +
        'left:' + (Math.random() * 100) + '%;' +
        'animation-duration:' + (12 + Math.random() * 18) + 's;' +
        'animation-delay:' + (Math.random() * 20) + 's;' +
        'border-radius:' + (isRound ? '50%' : '50% 0 50% 0') + ';' +
        'opacity:' + (0.3 + Math.random() * 0.4) + ';';
      container.appendChild(petal);
    }
  }

  /* ─── SCROLL REVEAL ─── */
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.18,
      rootMargin: '0px 0px -40px 0px'
    });
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─── MÚSICA ─── */
  var player = null;
  var musicStarted = false;
  var musicCheckInterval = null;

  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('youtube-player', {
      height: '0',
      width: '0',
      videoId: 'NdYWuo9OFAw',
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: 'NdYWuo9OFAw',
        controls: 0,
        disablekb: 1,
        modestbranding: 1,
        rel: 0
      }
    });
  };

  function startMusic() {
    if (musicStarted) return;
    if (player && typeof player.playVideo === 'function') {
      player.playVideo();
      musicStarted = true;
      if (musicCheckInterval) {
        clearInterval(musicCheckInterval);
        musicCheckInterval = null;
      }
    } else {
      if (!musicCheckInterval) {
        musicCheckInterval = setInterval(function () {
          if (player && typeof player.playVideo === 'function') {
            player.playVideo();
            musicStarted = true;
            clearInterval(musicCheckInterval);
            musicCheckInterval = null;
          }
        }, 400);
      }
    }
  }

  /* ─── BOTÓN ─── */
  document.addEventListener('DOMContentLoaded', function () {
    createPetals();
    initScrollReveal();

    var enterBtn = document.getElementById('enterBtn');
    var mainContent = document.getElementById('mainContent');

    if (enterBtn && mainContent) {
      enterBtn.addEventListener('click', function () {
        startMusic();
        mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });

})();
