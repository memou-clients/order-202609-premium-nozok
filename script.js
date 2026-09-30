// ============================================================
// MEMOu STUDIO : BIRTHDAY TEMPLATE PAKET PREMIUM 1
// 100% Kompatibel dengan MemoU Controller & Live Preview Bridge
// ============================================================

const PREMIUM_CONFIG = {
  "recipientName": "Ainun",
  "nickname": "Princess of My Heart 👑",
  "eventDate": "14 Februari 2026",
  "senderName": "Rizky Ramadhan",
  "openingLine": "Ada sesuatu kecil yang aku bungkus khusus untuk kamu di hari spesial ini.",
  "heroSubtitle": "Hari ini semesta merayakan kehadiran seseorang yang paling istimewa.",
  "loveLetter": "Selamat ulang tahun untuk orang yang paling berharga di hidupku. Terima kasih sudah selalu hadir dengan senyum hangatmu, tawa bahagiamu, dan ketulusan hatimu. Bersamamu, hari-hari biasa berubah menjadi kenangan yang tak ternilai harganya. Di usiamu yang baru ini, aku berdoa semoga setiap langkahmu selalu dipenuhi keberkahan, impianmu tercapai satu per satu, dan hatimu selalu diliputi kebahagiaan yang tak pernah habis.",
  "music": "https://music.youtube.com/watch?v=dlLdnd3VF-0&si=HF2EKT4sl-Q6xa80",
  "photoCaption1": "Awal dari cerita terbaik dalam hidupku ♡",
  "photoCaption2": "Senyum manismu yang selalu membuat hariku teduh",
  "photoCaption3": "Hari biasa yang jadi luar biasa karena ada kamu",
  "photoCaption4": "Tawa lepas yang paling aku rindukan setiap saat",
  "photoCaption5": "Momen sederhana, tapi rasanya begitu mendalam",
  "photoCaption6": "Kenangan berharga yang akan selalu aku simpan rapi",
  "photoCaption7": "Dan aku akan selalu memilih berjalan bersamamu ✨",
  "wishSuccess": "Doamu telah terkirim ke langit. Semoga semesta mengabulkan setiap harapan terbaik di hatimu dengan penuh kelembutan. Selamat ulang tahun, cintaku! ♡"
};

// Pastikan konfigurasi dapat diakses secara global oleh MemoU Live Bridge
window.PREMIUM_CONFIG = PREMIUM_CONFIG;

(function () {
  'use strict';

  // DOM Elements
  var bgMusic = document.getElementById('bgMusic');
  var musicToggle = document.getElementById('musicToggle');
  var musicState = document.getElementById('musicState');
  var openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
  var envelopeGate = document.getElementById('envelopeGate');
  var blowCandleBtn = document.getElementById('blowCandleBtn');
  var candleFlame = document.getElementById('candleFlame');
  var flameGlow = document.getElementById('flameGlow');
  var candleSmoke = document.getElementById('candleSmoke');
  var wishGrantedCard = document.getElementById('wishGrantedCard');
  var polaroidLightbox = document.getElementById('polaroidLightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxIndex = document.getElementById('lightboxIndex');
  var closeLightboxBtn = document.getElementById('closeLightboxBtn');

  /**
   * Bind Config values to DOM elements (Callable by Live Preview Bridge)
   */
  function bindConfig() {
    var c = window.PREMIUM_CONFIG || PREMIUM_CONFIG;

    // Recipient Name
    var recipientEls = ['recipientName', 'envelopeRecipientName', 'footerRecipient'];
    recipientEls.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && c.recipientName) el.textContent = c.recipientName;
    });

    // Nickname
    var nicknameEl = document.getElementById('nicknameDisplay');
    if (nicknameEl && c.nickname) nicknameEl.textContent = c.nickname;

    // Date
    var dateEls = ['eventDate', 'letterDate'];
    dateEls.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && c.eventDate) el.textContent = c.eventDate;
    });

    // Subtitle & Opening Line
    var subtitleEl = document.getElementById('heroSubtitle');
    if (subtitleEl && c.heroSubtitle) subtitleEl.textContent = c.heroSubtitle;

    var openingLineEl = document.getElementById('openingLine');
    if (openingLineEl && c.openingLine) openingLineEl.textContent = c.openingLine;

    // Love Letter
    var letterEl = document.getElementById('letterText');
    if (letterEl && c.loveLetter) {
      letterEl.textContent = c.loveLetter;
    }

    // Sender Name
    var senderEls = ['senderName', 'footerSender'];
    senderEls.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && c.senderName) el.textContent = c.senderName;
    });

    // Captions 1 to 7
    for (var i = 1; i <= 7; i++) {
      var capEl = document.getElementById('photoCaption' + i);
      var capVal = c['photoCaption' + i];
      if (capEl && capVal) {
        capEl.textContent = capVal;
      }
    }

    // Wish Success Message
    var wishMsgEl = document.getElementById('wishSuccess');
    if (wishMsgEl && c.wishSuccess) {
      wishMsgEl.textContent = c.wishSuccess;
    }

    // Audio source if specified in config
    if (c.music && bgMusic && !bgMusic.getAttribute('src')) {
      bgMusic.src = c.music;
    }
  }

  // Expose bindConfig for MemoU Live Preview Bridge
  window.bindConfig = bindConfig;
  window.initConfig = bindConfig;

  /**
   * Audio Controller
   */
  function updateAudioVisuals(isPlaying) {
    if (!musicToggle) return;
    if (isPlaying) {
      musicToggle.classList.add('active');
      musicToggle.classList.remove('paused');
      if (musicState) musicState.textContent = 'sound on';
    } else {
      musicToggle.classList.remove('active');
      musicToggle.classList.add('paused');
      if (musicState) musicState.textContent = 'sound off';
    }
  }

  function playAudio() {
    if (!bgMusic) return;
    bgMusic.volume = 0.6;
    var promise = bgMusic.play();
    if (promise !== undefined) {
      promise
        .then(function () {
          updateAudioVisuals(true);
        })
        .catch(function (error) {
          console.debug('Autoplay prevented by browser policy:', error);
          updateAudioVisuals(false);
        });
    }
  }

  function toggleAudio() {
    if (!bgMusic) return;
    if (bgMusic.paused) {
      playAudio();
    } else {
      bgMusic.pause();
      updateAudioVisuals(false);
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', toggleAudio);
  }

  /**
   * Entrance Envelope Interaction
   */
  if (openEnvelopeBtn && envelopeGate) {
    openEnvelopeBtn.addEventListener('click', function () {
      var envelopeWrapper = envelopeGate.querySelector('.envelope-wrapper');
      if (envelopeWrapper) {
        envelopeWrapper.classList.add('opening');
      }

      // Play audio on opening envelope
      playAudio();

      setTimeout(function () {
        envelopeGate.classList.add('opened');
        document.body.classList.remove('envelope-locked');

        // Initial burst of confetti on entrance
        fireConfetti(0.5, 0.4);
      }, 700);
    });
  }

  /**
   * Make a Wish & Blow Candle Logic
   */
  var candleBlown = false;

  function handleBlowCandle() {
    if (candleBlown) return;
    candleBlown = true;

    // 1. Extinguish candle flame
    if (candleFlame) candleFlame.classList.add('extinguished');
    if (flameGlow) flameGlow.classList.add('extinguished');

    // 2. Trigger smoke puff
    if (candleSmoke) candleSmoke.classList.add('puff');

    // 3. Update button state
    if (blowCandleBtn) {
      blowCandleBtn.disabled = true;
      blowCandleBtn.innerHTML = '<span class="btn-blow-icon">✨</span><span class="btn-blow-text">Doa Terkabul! ♡</span>';
    }

    // 4. Reveal Wish Granted Card
    if (wishGrantedCard) {
      wishGrantedCard.classList.remove('hidden');
    }

    // 5. Grand Confetti Celebration!
    celebrateGrandConfetti();
  }

  if (blowCandleBtn) {
    blowCandleBtn.addEventListener('click', handleBlowCandle);
  }

  /**
   * Canvas Confetti Celebration
   */
  function fireConfetti(x, y) {
    if (typeof confetti !== 'function') return;
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { x: x || 0.5, y: y || 0.6 },
      colors: ['#bfa06d', '#7a1f33', '#fdebed', '#dfcaa7', '#ff69b4']
    });
  }

  function celebrateGrandConfetti() {
    if (typeof confetti !== 'function') return;

    var duration = 3.5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      
      // Shoot from both left and right edges
      confetti(Object.assign({}, defaults, {
        particleCount: particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#bfa06d', '#7a1f33', '#fdebed', '#dfcaa7', '#e11d48']
      }));
      confetti(Object.assign({}, defaults, {
        particleCount: particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#bfa06d', '#7a1f33', '#fdebed', '#dfcaa7', '#fb7185']
      }));
    }, 250);
  }

  /**
   * Polaroid Lightbox Modal Setup
   */
  function setupPolaroidLightbox() {
    var polaroidCards = document.querySelectorAll('.polaroid-card');
    
    polaroidCards.forEach(function (card) {
      card.addEventListener('click', function (e) {
        var img = card.querySelector('img');
        var caption = card.querySelector('.polaroid-caption');
        var index = card.getAttribute('data-polaroid-index') || '1';

        if (img && polaroidLightbox && lightboxImg) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'Foto Kenangan';
          if (lightboxCaption && caption) lightboxCaption.textContent = caption.textContent;
          if (lightboxIndex) lightboxIndex.textContent = 'FRAME #0' + index;
          
          polaroidLightbox.showModal();
        }
      });
    });

    if (closeLightboxBtn && polaroidLightbox) {
      closeLightboxBtn.addEventListener('click', function () {
        polaroidLightbox.close();
      });
    }

    if (polaroidLightbox) {
      polaroidLightbox.addEventListener('click', function (e) {
        if (e.target === polaroidLightbox) {
          polaroidLightbox.close();
        }
      });
    }
  }

  /**
   * Floating Romantic Sparkles Particles Canvas
   */
  function setupParticlesCanvas() {
    var canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var width = (canvas.width = window.innerWidth);
    var height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', function () {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    var particleCount = Math.min(width < 768 ? 20 : 40, 50);
    var particles = [];

    for (var i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1,
        speedY: -(Math.random() * 0.4 + 0.15),
        speedX: Math.sin(Math.random() * Math.PI) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        hue: Math.random() > 0.5 ? '#bfa06d' : '#e11d48'
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.hue;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.hue;
        ctx.fill();
      }

      requestAnimationFrame(renderParticles);
    }

    renderParticles();
  }

  // Document Ready Initialization
  document.addEventListener('DOMContentLoaded', function () {
    bindConfig();
    setupPolaroidLightbox();
    setupParticlesCanvas();
  });

})();
