/* в этот файл добавляет скрипты*/
import Swiper from 'swiper/bundle';

//import 'swiper/css';

const projectflip = new Swiper('.projectflip',{
  slidesPerView: 3,
  spaceBetween: 1,
// Responsive breakpoints
breakpoints: {
  // when window width is >= 320px
320: {
  slidesPerView: 1,
  spaceBetween: 20
  },
  // when window width is >= 480px
  480: {
    slidesPerView: 3,
    spaceBetween: 30
  },
  // when window width is >= 640px
  640: {
    slidesPerView: 3,
    spaceBetween: 40
  }
},

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const teamswiper = new Swiper('.teamswiper',{
  slidesPerView: 3,
  spaceBetween: 1,
  breakpoints: {
    // when window width is >= 320px
  320: {
    slidesPerView: 1,
    spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 40
    }
  },

  navigation: {
    nextEl: '.second',
    prevEl: '.third',
  }
});

const projectsswiper = new Swiper('.projectsswiper',{
  slidesPerView: 1,
  navigation: {
    nextEl: '.four',
    prevEl: '.five',
  }
});
