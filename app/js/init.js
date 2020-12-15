'use strict'

// Глобальные переменные
let isCompleted = false;
let submitButtonTextContent;
const callButtonElement = document.querySelector(`.call-link__icon`);
const aboutCarouselContainer = document.querySelector(`.about-carousel__grid`);
const testimonialsCarouselContainer = document.querySelector(`.testimonials__carousel`);
const articleCarouselContainer = document.querySelector(`.template__carousel-container`);
const productCarouselContainer = document.querySelector(`.product-carousel__container`);
const successModalOpenLink = document.querySelector(`.success__link`);
const headerElement = document.querySelector(`.header`);
const mobileMenuOpenButton = document.querySelector(`.menu-btn`);
const basketForm = document.querySelector(`.basket-form`);
const mobileMenuElement = document.querySelector(`.mobile-menu`);
const calculatorContainer = document.querySelector(`.calculation`);
const callBackModalButton = document.querySelector(`.modal__form-button`);
const telInputElements = document.querySelectorAll(`input[type="tel"]`);
const productGalleryContainer = document.querySelector(`.product-gallery__container`);


// Константы
const DELIVERY_ID = 0;
const PAYMENT_ID = 0;
const PRODUCTS = [{
        name: `Накладка`,
        image: `/wp-content/themes/stolstyle/img/s-basket-img.jpg`,
        covers: [{
                name: `Глянцевая 1.8 мм`,
                price: 59
            },
            {
                name: `Глянцевая 2.5 мм`,
                price: 75
            },
            {
                name: `Рифлёная 1.8 мм`,
                price: 65
            }
        ],
        tables: [{
                name: `Прямоугольный`
            },
            {
                name: `Круглый`
            },
            {
                name: `Фигурный`
            }
        ]
    },
    {
        name: `Скатерть`,
        image: `/wp-content/themes/stolstyle/img/s-basket-img.jpg`,
        covers: [{
            name: `Глянцевая 0.6 мм`,
            price: 20
        }],
        tables: [{
            name: `Прямоугольный`
        }]
    }
];
const MIN_PRICE = 10;
const DELIVERY_DATA = [{
        id: 0,
        name: `Курьером по Беларуси`,
        price: 6,
        checked: true
    },
    {
        id: 1,
        name: `До пункта выдачи`,
        price: 2
    },
    {
        id: 2,
        name: `Самовывоз`,
        price: 0
    }
];
const PAYMENT_DATA = [{
        id: 0,
        name: `Наличными`,
        checked: true
    },
    {
        id: 1,
        name: `Картой при получении`
    },
    {
        id: 2,
        name: `Картой онлайн`
    }
];
const OFFSET_Y_STEP = 5;
const TIMEOUT = 300;
const FADE_DURATION = 250;
const FADE_DELAY = .5;

// Опции слайдеров
const aboutCarouselSwiperOptions = {
    effect: 'fade',
    loop: true,
    fadeEffect: {
        crossFade: true
    },
    autoplay: {
        delay: 5000
    },
    pagination: {
        el: '.about-carousel__pagination',
        type: 'bullets'
    },
    navigation: {
        prevEl: '.about-carousel__arrow-prev',
        nextEl: '.about-carousel__arrow-next'
    }
};
const testimonialsCarouselSwiperOptions = {
    effect: 'fade',
    loop: true,
    fadeEffect: {
        crossFade: true
    },
    autoplay: {
        delay: 5000
    },
    pagination: {
        el: '.testimonials__pagination',
        type: 'bullets'
    },
    navigation: {
        prevEl: '.testimonials__arrow-prev',
        nextEl: '.testimonials__arrow-next'
    }
};
const articleCarouselSwiperOptions = {
    effect: 'fade',
    loop: true,
    fadeEffect: {
        crossFade: true
    },
    autoplay: {
        delay: 5000
    },
    pagination: {
        el: '.template__carousel-pagination',
        type: 'bullets'
    },
    navigation: {
        prevEl: '.template__carousel-arrow-prev',
        nextEl: '.template__carousel-arrow-next'
    }
};
const productCarouselSwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 5000
    },
    pagination: {
        el: '.product-carousel__pagination',
        type: 'bullets'
    },
    navigation: {
        prevEl: '.product-carousel__arrow-prev',
        nextEl: '.product-carousel__arrow-next'
    }
};
const productGalleryOptions = {
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    }
};

// Функции
function onCallButtonElementClickHandler() {
    callButtonElement.closest('.call-link').classList.toggle('call-link_state-actived');
    callButtonElement.closest('.call-link').querySelector('.call-link__dropdown').classList.toggle('call-link__dropdown_state-opened');
}

function onWindowScrollHandler() {
    const targetOffsetY = window.pageYOffset;

    if (targetOffsetY > OFFSET_Y_STEP) {
        headerElement.classList.add('header_position-sticky');
        return;
    }
    headerElement.classList.remove('header_position-sticky');
}

function onDocumentClickHandler(evt) {
    const target = evt.target;

    if (target.matches(`.privacy-checkbox__input`)) {
        if (target.checked) {
            target.closest('.form').querySelector('button[type="submit"]').removeAttribute('disabled');
            return;
        }
        target.closest('.form').querySelector('button[type="submit"]').setAttribute('disabled', true);
    }
    if (target.matches(`.add-to-basket`)) {
        onAddToBasketClickHandler(target);
    }
}

function onMobileMenuOpenButtonClickHandler(evt) {
    const target = evt.target;

    setTimeout(function () {
        target.classList.toggle('menu-btn_state-active');
        document.querySelector('.mobile-menu').classList.toggle('mobile-menu_state-open');
    }, 0);
    document.querySelector('body').classList.toggle('is-locked');
}

function changeLayout() {
    if (window.innerWidth < 992 && !isCompleted) {
        if (document.querySelector('.product-template__img')) {
            document.querySelector('.product-template__img').before(document.querySelector('.product-template__grid').querySelector('.template__title'));
        }
        createCustomCarousel();
        isCompleted = !isCompleted;
    }
    if (window.innerWidth > 991 && isCompleted) {
        if (document.querySelector('.product-template__img')) {
            document.querySelector('.product-template__grid').querySelector('.product-template__info').prepend(document.querySelector('.template__title'));
        }
        destroyCustomCarousel();
        isCompleted = !isCompleted;
    }
}

function createCustomCarousel() {
    const carouselElements = Array.from(document.querySelectorAll('.custom-carousel'));

    if (carouselElements.length) {
        carouselElements.forEach((carouselElement, index) => {
            const parentContainer = carouselElement.closest(`.carousel__grid`);
            const customCarouselWrapper = carouselElement.closest(`.carousel`);
            const carouselDataFragment = document.createDocumentFragment();
            const carouselClonedNode = carouselElement.cloneNode(true);
            const childrenData = carouselClonedNode.querySelectorAll(`div[class*=col]`);
            carouselClonedNode.classList.add(`swiper-container`, `swiper-instance-${index}`);
            carouselClonedNode.querySelector(`.row`).classList = `swiper-wrapper`;
            // Добавляем класс для дочерних элементов
            for (const childElement of childrenData) {
                childElement.classList.add(`swiper-slide`);
            }
            carouselDataFragment.appendChild(carouselClonedNode);
            // Очищаем родительский блок
            parentContainer.innerHTML = ``;
            // Вставляем новые данные
            parentContainer.appendChild(carouselDataFragment);
            // Инициализируем карусель
            const swiperInstance = new Swiper(`.swiper-instance-${index}`, {
                slidesPerView: 1,
                loop: false,
                pagination: {
                    el: customCarouselWrapper.querySelector('.swiper-pagination')
                },
                navigation: {
                    prevEl: customCarouselWrapper.querySelector('.carousel__btn-prev'),
                    nextEl: customCarouselWrapper.querySelector('.carousel__btn-next')
                }
            });
            swiperInstance.update();
        });
    }
}

function destroyCustomCarousel() {
    const customSwiperElements = Array.from(document.querySelectorAll('div[class*="swiper-instance"]'));

    if (customSwiperElements.length) {
        customSwiperElements.forEach((customSwiperElement, index) => {
            for (const customSwiperChildElement of customSwiperElement.querySelectorAll(`div[class*="col"]`)) {
                customSwiperChildElement.classList.remove(`swiper-slide`);
            }
            customSwiperElement.classList.remove(`swiper-container`, `swiper-instance-${index}`);
            customSwiperElement.querySelector(`.swiper-wrapper`).classList = `row`;
            // "Убиваем" карусель
            const customSwiperInstance = customSwiperElement.swiper;
            customSwiperInstance.destroy();
        });
    }
}

function onMobileMenuElementClickHandler(evt) {
    const target = evt.target;

    if (target.matches(`.mobile-menu__link`)) {
        target.closest('.mobile-menu').classList.remove('mobile-menu_state-open');
        document.querySelector('.menu-btn').classList.remove('menu-btn_state-active');
    }
}

function onBasketFormClickHandler(evt) {
    const target = evt.target;

    if (target.matches(`.basket__section-button`)) {
        const targetContent = target.textContent;
        const regexp = /добавить/gi;

        if (regexp.test(targetContent)) {
            target.textContent = target.textContent.replace(`Добавить`, `Скрыть`);
        } else {
            target.textContent = target.textContent.replace(`Скрыть`, `Добавить`);
        }
        target.nextElementSibling.classList.toggle(`form__row_state-disabled`);
    }
}

function onCalculatorContainerClickHandler(evt) {
    const target = evt.target;

    if (target.matches(`.calculation-form__section-note`)) {
        const postId = target.dataset.postId;
        const formData = new FormData();
        formData.set(`action`, `content`);
        formData.set(`post_id`, postId);
        const request = utilsModule.makeAjaxRequest(formData);

        request
            .then(resp => resp.json())
            .then(data => {
                if (data) {
                    const contentModalContainer = document.querySelector(`.modal-content`);
                    const contentModalFragment = document.createDocumentFragment();
                    const contentModalTemplate = document.querySelector(`#modal`).content;
                    // Клонируем контент шаблона
                    const clonedContentModalTemplate = contentModalTemplate.cloneNode(true);

                    clonedContentModalTemplate.querySelector(`.modal-content__title`).textContent = data.title;
                    clonedContentModalTemplate.querySelector(`.modal-content__text`).insertAdjacentHTML(`afterbegin`, data.content);
                    contentModalFragment.appendChild(clonedContentModalTemplate);
                    // Очищаем модальное окно
                    contentModalContainer.innerHTML = ``;
                    // Добавляем контент
                    contentModalContainer.appendChild(contentModalFragment);
                    // Показываем модальное окно
                    jQuery(`#modal-content`).modal();
                }
            })
            .catch(error => console.log(new Error(error)));
    }
}

function onCallBackModalButtonClickHandler() {
    callBackModalButton.textContent = `Отправляем...`;
    callBackModalButton.classList.add(`form__button_state-in-progress`);
}

function addInputMask() {
    for (const telInputElement of telInputElements) {
        if (telInputElement) {
            const telInputMaskInstance = new Inputmask("+375 (99) 999-99-99", {
                showMaskOnFocus: false,
                showMaskOnHover: false,
                clearMaskOnLostFocus: false
            });

            telInputMaskInstance.mask(telInputElement);
        }
    }
}

function onAddToBasketClickHandler(target) {
    const postId = target.dataset.postId;
    const formData = new FormData();
    formData.set(`action`, `product`);
    formData.set(`post_id`, postId);
    const request = utilsModule.makeAjaxRequest(formData);

    request
        .then(resp => resp.json())
        .then(data => {
            // Формируем id продукта
            const now = new Date();
            data.id = +now.getTime();
            // Добавляем продукт в хранилище
            storageModule.addProductToStorage(data);
            // Обновляем корзину
            smallBasketModule.updateSmallBasketQuantity(storageModule.getProductQuantity());
            basketModule.renderBasketProducts(storageModule.getStorageProducts());
            // Показываем модальное окно
            jQuery(`.success-basket`).modal({
                fadeDuration: FADE_DURATION,
                fadeDelay: FADE_DELAY
            });
        })
        .catch(error => console.log(new Error(error)));
}