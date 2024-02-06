const burger = document.querySelector('.menu__link-span');
const cross = document.querySelector('.menu__cross');
const menuMobile = document.querySelector('.menu-mobile');

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
