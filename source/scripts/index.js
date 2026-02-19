/* в этот файл добавляет скрипты*/
import Swiper from 'swiper/bundle';

const projectflip = new Swiper('.projectflip',{
  slidesPerView: 1,
  breakpoints: {
    320: { slidesPerView: 1, centeredSlides: true },
    768: { slidesPerView: 4, spaceBetween: 7 },
    1920: { slidesPerView: 4, centeredSlides: false, spaceBetween: 7 }
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const teamswiper = new Swiper('.teamswiper',{
  slidesPerView: 4,
  spaceBetween: 2,
  centeredSlides: true,
  breakpoints: {
    320: { slidesPerView: 1, centeredSlides: true },
    480: { slidesPerView: 4, spaceBetween: 7 },
    1920: { slidesPerView: 4, spaceBetween: 7, centeredSlides: false }
  },
  navigation: {
    nextEl: '.second',
    prevEl: '.third',
  },
});

// ОБНОВЛЕНО: стрелки + пагинация точками
const projectsswiper = new Swiper('.projectsswiper',{
  slidesPerView: 1,
  centeredSlides: false,
  spaceBetween: 40,

  navigation: {
    nextEl: '.projectsswiper-button-next',
    prevEl: '.projectsswiper-button-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
