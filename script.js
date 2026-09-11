/* ─── HOJAS CAYENDO ─── */
function createFallingLeaves() {
  var container = document.getElementById('fallingLeaves');
  if (!container) return;
  var leafClasses = ['leaf-green', 'leaf-sage', 'leaf-gold', 'leaf-rose'];
  for (var i = 0; i < 25; i++) {
    var leaf = document.createElement('div');
    var leafClass = leafClasses[Math.floor(Math.random() * leafClasses.length)];
    leaf.className = 'leaf ' + leafClass;
    var size = 14 + Math.random() * 16;
    var duration = 12 + Math.random() * 18;
    var delay = Math.random() * 20;
    leaf.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + (Math.random() * 100) + '%;animation-duration:' + duration + 's;animation-delay:' + delay + 's;';
    container.appendChild(leaf);
  }
}

/* ─── BOKEH LIGHTS ─── */
function createBokehLights() {
  var container = document.getElementById('bokehContainer');
  if (!container) return;
  var colors = ['#8FA888', '#F2C4CE', '#C9A96E', '#C9B1D9', '#D4A0A4'];
  for (var i = 0; i < 15; i++) {
    var bokeh = document.createElement('div');
    bokeh.className = 'bokeh-light';
    var color = colors[Math.floor(Math.random() * colors.length)];
    var size = 40 + Math.random() * 100;
    var duration = 4 + Math.random() * 6;
    var delay = Math.random() * 8;
    bokeh.style.cssText = 'width:' + size + 'px;height:' + size + 'px;background:radial-gradient(circle,' + color + ' 0%,transparent 70%);left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;animation-duration:' + duration + 's;animation-delay:' + delay + 's;';
    container.appendChild(bokeh);
  }
}

/* ─── PÉTALOS FLOTANTES ─── */
function createFloatingPetals() {
  var container = document.getElementById('invitationPetals');
  if (!container) return;
  for (var i = 0; i < 18; i++) {
    var petal = document.createElement('div');
    petal.className = 'floating-petal';
    var size = 8 + Math.random() * 10;
    var duration = 15 + Math.random() * 20;
    var delay = Math.random() * 15;
    petal.style.cssText = 'width:' + size + 'px;height:' + (size * 1.3) + 'px;left:' + (Math.random() * 100) + '%;animation-duration:' + duration + 's;animation-delay:' + delay + 's;';
    container.appendChild(petal);
  }
}

/* ─── SONIDOS NATURALES (YouTube Player) ─── */
var naturePlayer = null;
var natureStarted = false;

function startNatureSounds() {
  if (natureStarted) return;
  if (naturePlayer && typeof naturePlayer.unMute === 'function') {
    naturePlayer.unMute();
    natureStarted = true;
  } else {
    var check = setInterval(function () {
      if (naturePlayer && typeof naturePlayer.unMute === 'function') {
        naturePlayer.unMute();
        natureStarted = true;
        clearInterval(check);
      }
    }, 300);
    setTimeout(function () { clearInterval(check); }, 10000);
  }
}

/* ─── PRIMERA INTERACCIÓN (unmute audio) ─── */
function initFirstInteraction() {
  function onFirstInteraction() {
    startNatureSounds();
    startMusic();
    document.removeEventListener('click', onFirstInteraction);
    document.removeEventListener('touchstart', onFirstInteraction);
  }
  document.addEventListener('click', onFirstInteraction);
  document.addEventListener('touchstart', onFirstInteraction);
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
    // Player de música: "Contigo" - Los Panchos
    player = new YT.Player('youtube-player', {
      videoId: 'F1COh7t3el4', height: 1, width: 1,
      playerVars: { autoplay: 0, loop: 1, playlist: 'F1COh7t3el4', controls: 0, disablekb: 1, modestbranding: 1, rel: 0, fs: 0, iv_load_policy: 3, cc_load_policy: 0 },
      events: {
        onReady: function (e) { e.target.setVolume(50); e.target.mute(); e.target.playVideo(); },
        onError: function (e) { console.log('YouTube music error:', e.data); }
      }
    });

    // Player de naturaleza: Río + pájaros
    naturePlayer = new YT.Player('youtube-player-nature', {
      videoId: 'PwSHOI7DwWM', height: 1, width: 1,
      playerVars: { autoplay: 0, loop: 1, playlist: 'PwSHOI7DwWM', controls: 0, disablekb: 1, modestbranding: 1, rel: 0, fs: 0, iv_load_policy: 3, cc_load_policy: 0 },
      events: {
        onReady: function (e) { e.target.setVolume(30); e.target.mute(); e.target.playVideo(); },
        onError: function (e) { console.log('YouTube nature error:', e.data); }
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

/* ═══════════════════════════════════════════════
   INVITACIÓN — PÉTALOS Y NATURA
   ═══════════════════════════════════════════════ */

function createInvitationEffects() {
  createFallingLeaves();
  createBokehLights();
  createFloatingPetals();
}

/* ─── GOLDEN BURST (reemplaza confeti final) ─── */
function createGoldenBurst() {
  if (typeof gsap === 'undefined') return;
  var container = document.getElementById('slidesContainer');
  if (!container) return;
  for (var i = 0; i < 12; i++) {
    var petal = document.createElement('div');
    petal.className = 'floating-petal';
    petal.style.cssText = 'position:fixed;width:14px;height:18px;left:' + (30 + Math.random() * 40) + '%;bottom:-20px;z-index:50;';
    container.appendChild(petal);
    gsap.to(petal, {
      y: -(400 + Math.random() * 300),
      x: (Math.random() - 0.5) * 150,
      rotation: (Math.random() - 0.5) * 180,
      duration: 2.5 + Math.random() * 1.5,
      delay: i * 0.15,
      ease: 'power1.out',
      opacity: 0.9,
      onComplete: function () {
        gsap.to(this.targets()[0], {
          opacity: 0,
          duration: 0.8,
          onComplete: function () { if (this.targets()[0]) this.targets()[0].remove(); }
        });
      }
    });
  }
}

/* ═══════════════════════════════════════════════
   INVITACIÓN — SLIDES SYSTEM
   ═══════════════════════════════════════════════ */

var slideSystem = {
  currentSlide: 0,
  totalSlides: 7,
  isAnimating: false,
  container: null,
  slides: [],
  dots: [],
  progressFill: null,
  arrow: null,

  init: function () {
    this.container = document.getElementById('slidesContainer');
    this.slides = document.querySelectorAll('.slide');
    this.dots = document.querySelectorAll('.dot');
    this.progressFill = document.getElementById('progressFill');
    this.arrow = document.getElementById('slideArrow');
    this.totalSlides = this.slides.length;

    if (!this.container || !this.totalSlides) return;

    // Activar primer slide
    this.slides[0].classList.add('active');
    this.slides[0].style.visibility = 'visible';
    this.slides[0].style.opacity = '1';
    this.slides[0].style.transform = 'translateX(0)';

    this.bindEvents();
    this.updateUI();
  },

  bindEvents: function () {
    var self = this;

    // Tap to advance
    this.container.addEventListener('click', function (e) {
      if (self.isAnimating) return;
      // Don't advance if clicking on interactive elements
      if (e.target.closest('.nav-dots')) return;
      self.nextSlide();
    });

    // Swipe support
    var touchStartX = 0;
    var touchStartY = 0;

    this.container.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    this.container.addEventListener('touchend', function (e) {
      if (self.isAnimating) return;
      var touchEndX = e.changedTouches[0].clientX;
      var touchEndY = e.changedTouches[0].clientY;
      var diffX = touchStartX - touchEndX;
      var diffY = touchStartY - touchEndY;

      // Only handle horizontal swipes
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          self.nextSlide(); // Swipe left = next
        } else {
          self.prevSlide(); // Swipe right = prev
        }
      }
    }, { passive: true });

    // Keyboard support
    document.addEventListener('keydown', function (e) {
      if (self.isAnimating) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        self.nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        self.prevSlide();
      }
    });
  },

  nextSlide: function () {
    if (this.currentSlide >= this.totalSlides - 1) return;
    this.goToSlide(this.currentSlide + 1);
  },

  prevSlide: function () {
    if (this.currentSlide <= 0) return;
    this.goToSlide(this.currentSlide - 1);
  },

  goToSlide: function (index) {
    if (index === this.currentSlide || this.isAnimating) return;
    if (index < 0 || index >= this.totalSlides) return;

    this.isAnimating = true;
    var self = this;
    var oldIndex = this.currentSlide;
    var direction = index > oldIndex ? 1 : -1;

    var oldSlide = this.slides[oldIndex];
    var newSlide = this.slides[index];

    // Exit old slide with ripple effect
    oldSlide.classList.remove('active');
    oldSlide.classList.add('ripple-exit');
    oldSlide.style.transform = direction > 0 ? 'translateX(-100%)' : 'translateX(100%)';
    oldSlide.style.opacity = '0';

    // Prepare new slide entry
    newSlide.style.transform = direction > 0 ? 'translateX(100%)' : 'translateX(-100%)';
    newSlide.style.opacity = '0';
    newSlide.style.visibility = 'visible';

    // Force reflow
    void newSlide.offsetWidth;

    // Animate new slide in
    newSlide.classList.add('active');
    newSlide.style.transform = 'translateX(0)';
    newSlide.style.opacity = '1';

    this.currentSlide = index;
    this.updateUI();

    // Animate slide content
    setTimeout(function () {
      self.animateSlideContent(index);
    }, 300);

    // Clean up old slide
    setTimeout(function () {
      oldSlide.classList.remove('exit-left');
      oldSlide.classList.remove('ripple-exit');
      oldSlide.style.visibility = 'hidden';
      oldSlide.style.transform = '';
      oldSlide.style.opacity = '';
      oldSlide.style.filter = '';
      self.isAnimating = false;
    }, 650);
  },

  updateUI: function () {
    // Update progress bar
    var progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
    if (this.progressFill) {
      this.progressFill.style.width = progress + '%';
    }

    // Update dots
    this.dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === this.currentSlide);
    }.bind(this));

    // Update arrow visibility
    if (this.arrow) {
      if (this.currentSlide >= this.totalSlides - 1) {
        this.arrow.classList.remove('visible');
      } else {
        this.arrow.classList.add('visible');
      }
    }
  },

  animateSlideContent: function (index) {
    if (typeof gsap === 'undefined') return;

    var slide = this.slides[index];
    if (!slide) return;

    // Kill any existing animations on this slide (excluir decoraciones de fondo)
    var animatedElements = slide.querySelectorAll('.slide-content *, .slide-icon-big, .slide-day, .slide-month, .slide-time, .slide-time-divider, .slide-text-greeting, .slide-text-body, .slide-title, .checklist-item, .slide-italic, .slide-text-closing, .slide-name, .slide-final-heart');
    gsap.killTweensOf(animatedElements);

    switch (index) {
      case 0: this.animateGreeting(slide); break;
      case 1: this.animateOpening(slide); break;
      case 2: this.animateDate(slide); break;
      case 3: this.animateList(slide); break;
      case 4: this.animateSecret(slide); break;
      case 5: this.animateLast(slide); break;
      case 6: this.animateSignature(slide); break;
    }
  },

  // Slide 0: "Hola, mi amor."
  animateGreeting: function (slide) {
    var text = slide.querySelector('.slide-text-greeting');
    var heart = slide.querySelector('.slide-heart');

    gsap.fromTo(text,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' }
    );
    gsap.fromTo(heart,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.6, delay: 0.4, ease: 'back.out(2)' }
    );
    // Heartbeat after appear
    gsap.to(heart, {
      scale: 1.15, duration: 0.3, delay: 1.2, yoyo: true, repeat: -1, ease: 'sine.inOut'
    });
  },

  // Slide 1: Typewriter
  animateOpening: function (slide) {
    var text = slide.querySelector('.slide-text-body');
    if (!text) return;

    // Guardar texto original solo la primera vez
    if (!text.dataset.original) {
      text.dataset.original = text.textContent;
    }
    var fullText = text.dataset.original;
    text.textContent = '';
    text.style.opacity = '1';

    var chars = fullText.split('');
    var i = 0;
    var self = this;

    function typeChar() {
      if (i < chars.length) {
        text.textContent += chars[i];
        i++;
        setTimeout(typeChar, 25 + Math.random() * 15);
      } else {
        self.isAnimating = false;
      }
    }

    // Small delay before starting
    setTimeout(typeChar, 400);
  },

  // Slide 2: Date
  animateDate: function (slide) {
    var icon = slide.querySelector('.slide-icon-big');
    var day = slide.querySelector('.slide-day');
    var month = slide.querySelector('.slide-month');
    var divider = slide.querySelector('.slide-time-divider');
    var time = slide.querySelector('.slide-time');

    var tl = gsap.timeline();

    tl.fromTo(icon,
      { opacity: 0, rotation: -180, scale: 0 },
      { opacity: 1, rotation: 0, scale: 1, duration: 0.6, ease: 'back.out(2)' }
    )
    .fromTo(day,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo(month,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo(divider,
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 0.3, ease: 'power2.out' },
      '-=0.1'
    )
    .fromTo(time,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
      '-=0.1'
    );
  },

  // Slide 3: List
  animateList: function (slide) {
    var title = slide.querySelector('.slide-title');
    var items = slide.querySelectorAll('.checklist-item');

    var tl = gsap.timeline();

    tl.fromTo(title,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );

    items.forEach(function (item, i) {
      tl.fromTo(item,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' },
        '-=0.1'
      );
    });
  },

  // Slide 4: Secret
  animateSecret: function (slide) {
    var icon = slide.querySelector('.slide-icon-big');
    var title = slide.querySelector('.slide-title');
    var body = slide.querySelector('.slide-text-body');
    var italic = slide.querySelector('.slide-italic');

    var tl = gsap.timeline();

    tl.fromTo(icon,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'bounce.out' }
    )
    .fromTo(title,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.1'
    )
    .fromTo(body,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.1'
    )
    .fromTo(italic,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
      '-=0.1'
    );
  },

  // Slide 5: Last thing
  animateLast: function (slide) {
    var icon = slide.querySelector('.slide-icon-big');
    var title = slide.querySelector('.slide-title');
    var bodies = slide.querySelectorAll('.slide-text-body');

    var tl = gsap.timeline();

    // Shake animation for lock
    tl.fromTo(icon,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }
    )
    .to(icon, {
      x: -5, duration: 0.05, yoyo: true, repeat: 5, ease: 'power1.inOut'
    })
    .fromTo(title,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.2'
    );

    bodies.forEach(function (body) {
      tl.fromTo(body,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.1'
      );
    });
  },

  // Slide 6: Signature
  animateSignature: function (slide) {
    var closing = slide.querySelector('.slide-text-closing');
    var name = slide.querySelector('.slide-name');
    var heart = slide.querySelector('.slide-final-heart');

    var tl = gsap.timeline();

    tl.fromTo(closing,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo(name,
      { opacity: 0, scale: 0.5, letterSpacing: '20px' },
      { opacity: 1, scale: 1, letterSpacing: '6px', duration: 0.8, ease: 'back.out(1.5)' },
      '-=0.2'
    )
    .fromTo(heart,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' },
      '-=0.3'
    );

    // Heartbeat
    gsap.to(heart, {
      scale: 1.2, duration: 0.3, delay: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut'
    });

    // Golden burst on last slide (reemplaza confeti)
    var self = this;
    setTimeout(function () {
      createGoldenBurst();
      self.createFloatingHeartsSlide();
    }, 800);
  },

  createFloatingHeartsSlide: function () {
    if (typeof gsap === 'undefined') return;
    var container = this.container;
    if (!container) return;

    for (var i = 0; i < 10; i++) {
      var petal = document.createElement('div');
      petal.className = 'floating-petal';
      var size = 10 + Math.random() * 12;
      petal.style.cssText = 'position:fixed;width:' + size + 'px;height:' + (size * 1.3) + 'px;left:' + (20 + Math.random() * 60) + '%;bottom:-20px;z-index:50;';
      container.appendChild(petal);

      gsap.to(petal, {
        y: -(400 + Math.random() * 300),
        x: (Math.random() - 0.5) * 120,
        rotation: (Math.random() - 0.5) * 180,
        duration: 2.5 + Math.random() * 1.5,
        delay: i * 0.15,
        ease: 'power1.out',
        opacity: 0.9,
        onComplete: function () {
          gsap.to(this.targets()[0], {
            opacity: 0,
            duration: 0.8,
            onComplete: function () { if (this.targets()[0]) this.targets()[0].remove(); }
          });
        }
      });
    }
  }
};

/* ═══════════════════════════════════════════════
   INVITACIÓN: FLOR → SLIDES TRANSITION
   ═══════════════════════════════════════════════ */

function initInvitation() {
  var flowerWrapper = document.getElementById('flowerWrapper');
  var slidesContainer = document.getElementById('slidesContainer');
  if (!flowerWrapper || !slidesContainer || typeof gsap === 'undefined') return;

  var hint = flowerWrapper.querySelector('.flower-hint');
  var petalGroups = flowerWrapper.querySelectorAll('.petal-group-outer, .petal-group-mid, .petal-group-inner');
  var center = flowerWrapper.querySelector('.flower-center');
  var halo = flowerWrapper.querySelector('.flower-halo');

  // Register plugins
  if (typeof SplitText !== 'undefined') gsap.registerPlugin(SplitText);
  if (typeof MotionPath !== 'undefined') gsap.registerPlugin(MotionPath);

  // Initial state
  gsap.set(flowerWrapper, { opacity: 0, scale: 0.5 });
  gsap.set(hint, { opacity: 0 });
  gsap.set(petalGroups, { scale: 0, transformOrigin: '50% 50%' });
  gsap.set(center, { scale: 0 });

  // Phase 1-3: Flor appears with bloom animation
  var tlIntro = gsap.timeline();
  tlIntro
    .to(flowerWrapper, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' })
    .to(halo, { opacity: 0.6, duration: 0.8, ease: 'power2.out' }, '-=0.3')
    .to(center, { scale: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.4')
    .to(petalGroups[2], { scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.2')
    .to(petalGroups[1], { scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.3')
    .to(petalGroups[0], { scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.3')
    .to(hint, { opacity: 1, duration: 0.3 }, '-=0.1');

  // Gentle petal breathing animation
  gsap.to(petalGroups[0], {
    scale: 1.03, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut'
  });
  gsap.to(petalGroups[1], {
    scale: 1.02, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.3
  });
  gsap.to(petalGroups[2], {
    scale: 1.04, duration: 1.8, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.6
  });

  // Phase 4-6: Tap to open flower
  flowerWrapper.addEventListener('click', function openFlower() {
    flowerWrapper.removeEventListener('click', openFlower);

    var tlOpen = gsap.timeline();
    tlOpen
      // Hide hint
      .to(hint, { opacity: 0, duration: 0.2 })
      // Petals expand outward (bloom burst)
      .to(petalGroups[0], {
        scale: 2.5, opacity: 0, rotation: 15, duration: 0.8, ease: 'power2.out'
      })
      .to(petalGroups[1], {
        scale: 2.2, opacity: 0, rotation: -10, duration: 0.7, ease: 'power2.out'
      }, '-=0.6')
      .to(petalGroups[2], {
        scale: 2, opacity: 0, rotation: 8, duration: 0.6, ease: 'power2.out'
      }, '-=0.5')
      // Center grows and glows
      .to(center, {
        scale: 3, opacity: 0, duration: 0.5, ease: 'power2.in'
      }, '-=0.4')
      // Halo expands
      .to(halo, {
        scale: 3, opacity: 0, duration: 0.6, ease: 'power2.in'
      }, '-=0.3')
      // Flower fades out
      .to(flowerWrapper, {
        opacity: 0, scale: 1.2, duration: 0.4, ease: 'power2.in'
      }, '-=0.2')
      // Show slides container
      .add(function () {
        slidesContainer.classList.add('active');
        slideSystem.init();
        startMusic();
        // Animate first slide
        setTimeout(function () {
          slideSystem.animateSlideContent(0);
        }, 300);
      });
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
    createInvitationEffects();
    initInvitation();
    initFirstInteraction();
  } else {
    createFallingLeaves();
    initScrollReveal();
    initLightbox();
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  var enterBtn = document.getElementById('enterBtn');
  var mainContent = document.getElementById('mainContent');
  if (enterBtn && mainContent) {
    enterBtn.addEventListener('click', function () {
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});
