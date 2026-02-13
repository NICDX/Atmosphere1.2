var burger = document.querySelector('.menu__link-span');
var cross = document.querySelector('.menu__cross');
var menuMobile = document.querySelector('.menu-mobile');

if (burger && cross && menuMobile) {
  burger.addEventListener('click', function() {
    burger.style.display = 'none';
    cross.style.display = 'block';
    menuMobile.style.display = 'block';
  });

  cross.addEventListener('click', function() {
    cross.style.display = 'none';
    burger.style.display = 'flex';
    menuMobile.style.display = 'none';
  });

  // Close menu on outside click
  document.addEventListener('click', function(e) {
    if (!menuMobile.contains(e.target) && !burger.contains(e.target) && !cross.contains(e.target)) {
      if (menuMobile.style.display === 'block') {
        cross.style.display = 'none';
        burger.style.display = 'flex';
        menuMobile.style.display = 'none';
      }
    }
  });
}
