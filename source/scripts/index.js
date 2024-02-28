/* в этот файл добавляет скрипты*/
import Swiper from 'swiper/bundle';

//import 'swiper/css';

const projectflip = new Swiper('.projectflip',{
  slidesPerView: 4,
  spaceBetween: 1,
  centeredSlides: true,
  // Responsive breakpoints
breakpoints: {
  // when window width is >= 320px
320: {
  slidesPerView: 1,
  spaceBetween: 20
  },
  // when window width is >= 480px
  480: {
    slidesPerView: 4,
    spaceBetween: 20
  },
  // when window width is >= 640px
  640: {
    slidesPerView: 4,
    spaceBetween: 20
  }
},

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const teamswiper = new Swiper('.teamswiper',{
  slidesPerView: 4,
  spaceBetween: 20,
  centeredSlides: true,
  breakpoints: {
    // when window width is >= 320px
  320: {
    slidesPerView: 1,
    spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 4,
      spaceBetween: 20
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  },

  navigation: {
    nextEl: '.second',
    prevEl: '.third',
  },
});

const projectsswiper = new Swiper('.projectsswiper',{
  slidesPerView: 1,
  centeredSlides: true,
 // navigation: {
    //nextEl: '.four',
   // prevEl: '.five',
  //}
});
