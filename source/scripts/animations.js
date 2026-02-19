/**
 * Atmosphere 2026 — Enhanced UX Animations
 * Scroll reveals, progress bar, parallax, counters, back-to-top
 */

document.addEventListener('DOMContentLoaded', function() {

  // === 1. SCROLL PROGRESS BAR ===
  var progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });

  // === 2. SCROLL REVEAL — элементы появляются при скролле ===
  var revealElements = document.querySelectorAll(
    '.intro__item, .intro__description, .buro__item, .flip__item, ' +
    '.team .swiper-slide, .links__item, .video__container, ' +
    '.projectprojectsswiper__content, .projectlipslider__content, ' +
    '.clients__text, .investors__text, .buro__reg'
  );

  // Добавляем начальное состояние
  for (var i = 0; i < revealElements.length; i++) {
    revealElements[i].classList.add('reveal');
  }

  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  for (var j = 0; j < revealElements.length; j++) {
    revealObserver.observe(revealElements[j]);
  }

  // === 3. STAGGER REVEAL — каскадное появление для списков ===
  var staggerGroups = [
    { parent: '.intro__piclist', children: '.intro__item' },
    { parent: '.buro__list', children: '.buro__item' },
    { parent: '.flip__list', children: '.flip__item' },
    { parent: '.links__list', children: '.links__item' },
    { parent: '.footer__information-list', children: '.footer__information-item' }
  ];

  staggerGroups.forEach(function(group) {
    var parent = document.querySelector(group.parent);
    if (!parent) return;
    var children = parent.querySelectorAll(group.children);
    children.forEach(function(child, index) {
      child.style.transitionDelay = (index * 0.1) + 's';
    });
  });

  // === 4. HERO PARALLAX ===
  var hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', function() {
      var scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = (scrolled * 0.3) + 'px';
      }
    });
  }

  // === 5. ANIMATED COUNTERS — для секции "Более 9 лет" ===
  var counterElements = document.querySelectorAll('.buro__title');
  var counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        var text = entry.target.textContent;
        var match = text.match(/(\d+[\.,]?\d*)/);
        if (match) {
          var targetNum = parseFloat(match[1].replace(',', '.'));
          var isFloat = match[1].indexOf('.') !== -1 || match[1].indexOf(',') !== -1;
          var prefix = text.substring(0, text.indexOf(match[1]));
          var suffix = text.substring(text.indexOf(match[1]) + match[1].length);
          var current = 0;
          var duration = 1500;
          var startTime = null;

          function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            var eased = 1 - Math.pow(1 - progress, 3);
            current = eased * targetNum;
            var display = isFloat ? current.toFixed(1).replace('.', ',') : Math.round(current);
            entry.target.textContent = prefix + display + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
        }
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(function(el) {
    counterObserver.observe(el);
  });

  // === 6. BACK TO TOP BUTTON ===
  var backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>';
  backToTop.setAttribute('aria-label', 'Наверх');
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 600) {
      backToTop.classList.add('back-to-top--visible');
    } else {
      backToTop.classList.remove('back-to-top--visible');
    }
  });

  // === 7. IMAGE LAZY LOADING with fade-in ===
  var images = document.querySelectorAll('img');
  images.forEach(function(img) {
    if (img.complete) {
      img.classList.add('img-loaded');
    } else {
      img.addEventListener('load', function() {
        img.classList.add('img-loaded');
      });
    }
  });

  // === 8. SMOOTH LINK TRANSITIONS ===
  var internalLinks = document.querySelectorAll('a[href$=".html"]');
  internalLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        e.preventDefault();
        document.body.classList.add('page-exit');
        setTimeout(function() {
          window.location.href = href;
        }, 400);
      }
    });
  });

  // Fade in on page load
  document.body.classList.add('page-enter');

});
