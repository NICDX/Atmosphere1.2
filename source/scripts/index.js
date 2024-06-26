/* в этот файл добавляет скрипты*/
import Swiper from 'swiper/bundle';

//import 'swiper/css';

const projectflip = new Swiper('.projectflip',{
  slidesPerView: 1,

  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
  320: {
    slidesPerView: 1,
    centeredSlides: true
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 4,
      spaceBetween: 7
    },
    // when window width is >= 640px
    1920: {
      slidesPerView: 4,
      centeredSlides: false,
      spaceBetween: 7

    }
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
    // when window width is >= 320px
  320: {
    slidesPerView: 1,
    centeredSlides: true,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 4,
      spaceBetween: 7
    },
    // when window width is >= 640px
    1920: {
      slidesPerView: 4,
      spaceBetween: 7,
      centeredSlides: false
    }
  },

  navigation: {
    nextEl: '.second',
    prevEl: '.third',
  },
});

const projectsswiper = new Swiper('.projectsswiper',{
  slidesPerView: 1,
  centeredSlides: false

});

