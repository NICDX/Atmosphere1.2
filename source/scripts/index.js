/* в этот файл добавляет скрипты*/
import Swiper from 'swiper/bundle';

//import 'swiper/css';

const projectflip = new Swiper('.projectflip',{
  slidesPerView: 3,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const teamswiper = new Swiper('.teamswiper',{
  slidesPerView: 3,
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
