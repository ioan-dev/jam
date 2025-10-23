import '@/styles/main.scss'
import Swiper from 'swiper';
import { EffectCreative, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';

let initProjectSlider = new Swiper('.projects__slider .swiper', {
  direction: 'vertical',
  modules: [Navigation],
  loop: true,
  slidesPerView: 4.5,
  centeredSlides: true,
  navigation: {
    nextEl: ".projects__button-next",
    prevEl: ".projects__button-prev"
  },
})

class Filters {
  constructor(container) {
    this.container = container;
    this.buttons = container.querySelectorAll('.filters__button');

    this.init();
  }

  init() {
    // Делегирование событий на контейнер
    this.container.addEventListener('click', (e) => {
      const button = e.target.closest('.filters__button');
      if (button) {
        this.setActiveButton(button);
      }
    });
  }

  setActiveButton(activeButton) {
    // Убираем активный класс у всех кнопок
    this.buttons.forEach(btn => btn.classList.remove('is-active'));

    // Добавляем активный класс к выбранной кнопке
    activeButton.classList.add('is-active');
  }
}

class Tabs {
  constructor(container) {
    this.container = container;
    this.header = container.querySelector('.tabs-header');
    this.content = container.querySelector('.tabs-content');
    this.currentIndex = 0;

    this.init();
  }

  init() {
    // Назначаем индексы всем существующим элементам
    this.updateIndexes();

    // Активируем первый таб
    this.switchTab(0);

    // Делегирование событий на контейнер кнопок
    this.header.addEventListener('click', (e) => {
      const button = e.target.closest('.tab-button');
      if (button) {
        const buttons = Array.from(this.header.querySelectorAll('.tab-button'));
        const index = buttons.indexOf(button);
        this.switchTab(index);
      }
    });
  }

  updateIndexes() {
    // Назначаем индексы кнопкам
    const buttons = this.header.querySelectorAll('.tab-button');
    buttons.forEach((btn, index) => {
      btn.dataset.index = index;
    });

    // Назначаем индексы панелям
    const panels = this.content.querySelectorAll('.tab-panel');
    panels.forEach((panel, index) => {
      panel.dataset.index = index;
    });
  }

  switchTab(index) {
    const buttons = this.header.querySelectorAll('.tab-button');
    const panels = this.content.querySelectorAll('.tab-panel');

    // Проверяем, что индекс валидный
    if (index < 0 || index >= buttons.length) return;

    // Убираем активные классы
    buttons.forEach(btn => btn.classList.remove('is-active'));
    panels.forEach(panel => panel.classList.remove('is-active'));

    // Активируем нужные элементы по индексу
    buttons[index].classList.add('is-active');
    panels[index].classList.add('is-active');

    this.currentIndex = index;
  }

}

// Инициализация
let tabsInstance;
let filtersInstance;

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация табов
  const tabsContainer = document.querySelector('.tabs-container');
  if (tabsContainer) {
    tabsInstance = new Tabs(tabsContainer);
  }

  // Инициализация фильтров
  const filtersContainer = document.querySelector('.filters');
  if (filtersContainer) {
    filtersInstance = new Filters(filtersContainer);
  }
});