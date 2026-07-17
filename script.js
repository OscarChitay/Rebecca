/* ─── CONFETI FLOTANTE ─── */
function createPetals() {
  var container = document.getElementById('petals-container');
  if (!container) return;
  var colors = ['#c2185b', '#f48fb1', '#ce93d8', '#80deea', '#ffcc80', '#ef9a9a', '#ec407a', '#ff80ab', '#ba68c8', '#4dd0e1'];
  var shapes = ['rect', 'circle', 'strip'];
  for (var i = 0; i < 35; i++) {
    var piece = document.createElement('div');
    piece.className = 'confetti-piece';
    var color = colors[Math.floor(Math.random() * colors.length)];
    var shape = shapes[Math.floor(Math.random() * shapes.length)];
    var w, h, br;
    if (shape === 'rect') {
      w = 8 + Math.random() * 10;
      h = 6 + Math.random() * 8;
      br = '2px';
    } else if (shape === 'circle') {
      w = h = 6 + Math.random() * 8;
      br = '50%';
    } else {
      w = 3 + Math.random() * 4;
      h = 12 + Math.random() * 14;
      br = '2px';
    }
    piece.style.cssText =
      'width:' + w + 'px;' +
      'height:' + h + 'px;' +
      'background:' + color + ';' +
      'left:' + (Math.random() * 100) + '%;' +
      'border-radius:' + br + ';' +
      'animation-duration:' + (10 + Math.random() * 14) + 's;' +
      'animation-delay:' + (Math.random() * 18) + 's;' +
      'opacity:' + (0.5 + Math.random() * 0.4) + ';';
    container.appendChild(piece);
  }
}

/* ─── CONFETTI CUMPLEAÑOS ─── */
function fireConfetti() {
  if (typeof confetti !== 'function') return;
  var defaults = { spread: 360, ticks: 100, gravity: 0.6, decay: 0.94, startVelocity: 30, colors: ['#c2185b', '#f48fb1', '#ec407a', '#ffd1dc', '#ff80ab', '#fce4ec'] };
  confetti({ ...defaults, particleCount: 60, scalar: 1.2, shapes: ['circle'] });
  confetti({ ...defaults, particleCount: 30, scalar: 1.5, shapes: ['circle'], origin: { x: 0.2 } });
  confetti({ ...defaults, particleCount: 30, scalar: 1.5, shapes: ['circle'], origin: { x: 0.8 } });
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

function onYouTubeIframeAPIReady() {
  try {
    player = new YT.Player('youtube-player', {
      videoId: 'sXR93C_bSVk',
      height: 1,
      width: 1,
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: 'sXR93C_bSVk',
        controls: 0,
        disablekb: 1,
        modestbranding: 1,
        rel: 0,
        fs: 0,
        iv_load_policy: 3,
        cc_load_policy: 0
      },
      events: {
        onReady: function (e) {
          e.target.setVolume(50);
          e.target.mute();
          e.target.playVideo();
        },
        onError: function (e) {
          console.log('YouTube error:', e.data);
        }
      }
    });
  } catch (err) {
    console.log('YouTube player error:', err);
  }
}

function startMusic() {
  if (musicStarted) return;
  if (player && typeof player.unMute === 'function') {
    player.unMute();
    musicStarted = true;
  } else {
    var check = setInterval(function () {
      if (player && typeof player.unMute === 'function') {
        player.unMute();
        musicStarted = true;
        clearInterval(check);
      }
    }, 300);
    setTimeout(function () { clearInterval(check); }, 10000);
  }
}

/* ─── INICIO ─── */
document.addEventListener('DOMContentLoaded', function () {
  createPetals();
  initScrollReveal();

  setTimeout(fireConfetti, 800);

  var enterBtn = document.getElementById('enterBtn');
  var mainContent = document.getElementById('mainContent');

  if (enterBtn && mainContent) {
    enterBtn.addEventListener('click', function () {
      fireConfetti();
      startMusic();
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});
