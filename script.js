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
    if (shape === 'rect') { w = 8 + Math.random() * 10; h = 6 + Math.random() * 8; br = '2px'; }
    else if (shape === 'circle') { w = h = 6 + Math.random() * 8; br = '50%'; }
    else { w = 3 + Math.random() * 4; h = 12 + Math.random() * 14; br = '2px'; }
    piece.style.cssText = 'width:' + w + 'px;height:' + h + 'px;background:' + color + ';left:' + (Math.random() * 100) + '%;border-radius:' + br + ';animation-duration:' + (10 + Math.random() * 14) + 's;animation-delay:' + (Math.random() * 18) + 's;opacity:' + (0.5 + Math.random() * 0.4) + ';';
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
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(function (el) { observer.observe(el); });
}

/* ─── MÚSICA ─── */
var player = null;
var musicStarted = false;

function onYouTubeIframeAPIReady() {
  try {
    player = new YT.Player('youtube-player', {
      videoId: 'F1COh7t3el4', height: 1, width: 1,
      playerVars: { autoplay: 0, loop: 1, playlist: 'F1COh7t3el4', controls: 0, disablekb: 1, modestbranding: 1, rel: 0, fs: 0, iv_load_policy: 3, cc_load_policy: 0 },
      events: {
        onReady: function (e) { e.target.setVolume(50); e.target.mute(); e.target.playVideo(); },
        onError: function (e) { console.log('YouTube error:', e.data); }
      }
    });
  } catch (err) { console.log('YouTube player error:', err); }
}

function startMusic() {
  if (musicStarted) return;
  if (player && typeof player.unMute === 'function') {
    player.unMute(); musicStarted = true;
  } else {
    var check = setInterval(function () {
      if (player && typeof player.unMute === 'function') { player.unMute(); musicStarted = true; clearInterval(check); }
    }, 300);
    setTimeout(function () { clearInterval(check); }, 10000);
  }
}

/* ─── LIGHTBOX ─── */
function openLightbox(src) {
  var lb = document.getElementById('lightbox');
  var img = document.getElementById('lightbox-img');
  if (!lb || !img) return;
  img.src = src; lb.classList.add('active'); document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  var lb = document.getElementById('lightbox');
  if (!lb) return; lb.classList.remove('active'); document.body.style.overflow = '';
}
function initLightbox() {
  document.addEventListener('click', function (e) {
    var img = e.target.closest('.polaroid-frame img');
    if (img) { e.stopPropagation(); openLightbox(img.src); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
}

/* ─── VIDEOS MEMORIA ─── */
function toggleVideo(frame) {
  var video = frame.querySelector('.memory-video');
  if (!video) return;
  video.muted = !video.muted;
  var hint = frame.querySelector('.video-play-hint');
  if (hint) hint.textContent = video.muted ? 'Toca para escuchar 🔈' : 'Toca para silenciar 🔇';
}

/* ═══════════════════════════════════════════════
   INVITACIÓN
   ═══════════════════════════════════════════════ */

/* ─── INVITACIÓN: PÉTALOS FLOTANTES ─── */
function createInvitationPetals() {
  var container = document.getElementById('invitationPetals');
  if (!container) return;
  var colors = ['#c2185b', '#f48fb1', '#ce93d8', '#80deea', '#ffcc80', '#ef9a9a', '#ec407a', '#ff80ab', '#ba68c8', '#4dd0e1'];
  for (var i = 0; i < 20; i++) {
    var piece = document.createElement('div');
    piece.className = 'confetti-piece';
    var color = colors[Math.floor(Math.random() * colors.length)];
    var w = 6 + Math.random() * 8;
    piece.style.cssText = 'width:' + w + 'px;height:' + w + 'px;background:' + color + ';left:' + (Math.random() * 100) + '%;border-radius:50%;animation-duration:' + (12 + Math.random() * 16) + 's;animation-delay:' + (Math.random() * 10) + 's;opacity:' + (0.4 + Math.random() * 0.3) + ';';
    container.appendChild(piece);
  }
}

/* ─── INVITACIÓN: CONFETI CORAZONES ─── */
function fireHeartsConfetti() {
  if (typeof confetti !== 'function') return;
  var defaults = { spread: 360, ticks: 80, gravity: 0.5, decay: 0.92, startVelocity: 25, colors: ['#c2185b', '#f48fb1', '#ec407a', '#ffd1dc', '#ff80ab', '#fce4ec'] };
  confetti({ ...defaults, particleCount: 40, scalar: 1.2, shapes: ['circle'], origin: { x: 0.5, y: 0.6 } });
  confetti({ ...defaults, particleCount: 25, scalar: 1.4, shapes: ['circle'], origin: { x: 0.3, y: 0.5 } });
  confetti({ ...defaults, particleCount: 25, scalar: 1.4, shapes: ['circle'], origin: { x: 0.7, y: 0.5 } });
}

/* ─── INVITACIÓN: CORAZONES FLOTANTES (MotionPath) ─── */
function createFloatingHearts() {
  if (typeof gsap === 'undefined') return;
  var container = document.getElementById('invitation');
  if (!container) return;
  var heartPaths = document.querySelectorAll('[id^="heartCurve"]');
  if (!heartPaths.length) return;

  heartPaths.forEach(function (path, i) {
    var heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '💗';
    heart.style.cssText = 'position:absolute;font-size:' + (12 + Math.random() * 8) + 'px;pointer-events:none;z-index:5;opacity:0;';
    container.appendChild(heart);

    var cfg = { motionPath: { path: path, align: path, alignOrigin: [0.5, 0.5] } };
    if (typeof MotionPath === 'undefined') {
      cfg = { x: 'random(-100, 100)', y: -300 - Math.random() * 200 };
    }
    gsap.to(heart, {
      ...cfg,
      duration: 2.5 + Math.random() * 1.5,
      delay: i * 0.4,
      ease: 'power1.out',
      opacity: 0.8,
      scale: 0.6,
      onComplete: function () {
        gsap.to(heart, { opacity: 0, duration: 0.3, onComplete: function () { heart.remove(); } });
      }
    });
  });
}

/* ─── INVITACIÓN: TEXTO ANIMADO (SplitText) ─── */
function animateLetterText() {
  var letterContent = document.getElementById('letterContent');
  if (!letterContent) return;

  if (typeof SplitText !== 'undefined' && typeof gsap !== 'undefined') {
    var split = SplitText.create(letterContent, { type: 'lines', linesClass: 'split-line' });
    gsap.from(split.lines, {
      y: 20, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out'
    });
  } else if (typeof gsap !== 'undefined') {
    gsap.from(letterContent.children, {
      y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out'
    });
  }
}

/* ─── INVITACIÓN: GSAP ANIMATION (6 fases) ─── */
function initInvitation() {
  var envelope = document.getElementById('envelope');
  var letter = document.getElementById('letterWrapper');
  if (!envelope || !letter || typeof gsap === 'undefined') return;

  var flap = envelope.querySelector('.env-flap');
  var seal = envelope.querySelector('.env-seal');
  var hint = envelope.querySelector('.envelope-hint');

  // Registrar plugins
  if (typeof SplitText !== 'undefined') gsap.registerPlugin(SplitText);
  if (typeof MorphSVG !== 'undefined') gsap.registerPlugin(MorphSVG);
  if (typeof MotionPath !== 'undefined') gsap.registerPlugin(MotionPath);

  // Estado inicial
  gsap.set(envelope, { opacity: 0, scale: 0.8 });
  gsap.set(seal, { opacity: 0, scale: 0 });
  gsap.set(hint, { opacity: 0 });
  gsap.set(letter, { y: '100%', opacity: 0 });

  // ── FASE 1-3: El sobre aparece ──
  var tlIntro = gsap.timeline();
  tlIntro
    .to(envelope, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' })
    .to(seal, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, '-=0.3')
    .to(hint, { opacity: 1, duration: 0.3 }, '-=0.1');

  // ── FASE 4-6: Toca para abrir ──
  envelope.addEventListener('click', function openEnvelope() {
    envelope.removeEventListener('click', openEnvelope);

    var tlOpen = gsap.timeline();
    tlOpen
      // Ocultar hint
      .to(hint, { opacity: 0, duration: 0.2 })
      // Sello explota
      .to(seal, { scale: 1.5, opacity: 0, duration: 0.3, ease: 'back.in(2)' })
      // Solapa se morpha (MorphSVG)
      .to(flap, {
        morphSVG: { d: 'M0,60 L150,140 L300,60 Z' },
        duration: 0.6,
        ease: 'power2.inOut'
      }, '-=0.1')
      // La carta emerge
      .to(letter, { y: '0%', opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      // El sobre se va
      .to(envelope, { opacity: 0, scale: 0.85, y: 30, duration: 0.5, ease: 'power2.in' }, '-=0.5')
      // Disparar efectos
      .add(function () {
        animateLetterText();
        createFloatingHearts();
        fireHeartsConfetti();
        startMusic();
      }, '-=0.2');
  });
}

/* ═══════════════════════════════════════════════
   INICIO
   ═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  var hiddenContent = document.getElementById('hidden-content');
  var invitation = document.getElementById('invitation');

  if (invitation && hiddenContent) {
    hiddenContent.style.display = 'none';
    invitation.style.display = 'flex';
    createInvitationPetals();
    initInvitation();
  } else {
    createPetals();
    initScrollReveal();
    initLightbox();
    setTimeout(fireConfetti, 800);
  }

  var enterBtn = document.getElementById('enterBtn');
  var mainContent = document.getElementById('mainContent');
  if (enterBtn && mainContent) {
    enterBtn.addEventListener('click', function () {
      fireConfetti(); startMusic();
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});
