'use strict';

// Модули
const globalUtils = window.globalUtils;

// Глобальные переменные
let isCompleted = false;
let customCarouselCollection = [];
let submitButtonTextContent;
const callButtonElement = document.querySelector(`.call-link__icon`);
const aboutCarouselContainer = document.querySelector(`.about-carousel__grid`);
const testimonialsCarouselContainer = document.querySelector(`.testimonials__carousel`);
const articleCarouselContainer = document.querySelector(`.template__carousel-container`);
const productCarouselContainer = document.querySelector(`.product-carousel__container`);
const successModalOpenLink = document.querySelector(`.success__link`);
const headerElement = document.querySelector(`.header`);
const mobileMenuOpenButton = document.querySelector(`.menu-btn`);
const customCarouselElementsCollection = document.querySelectorAll(`.custom-carousel`);
const basketForm = document.querySelector(`.basket-form`);
const mobileMenuElement = document.querySelector(`.mobile-menu`);
const calculatorContainer = document.querySelector(`.calculation`);
const callBackModalButton = document.querySelector(`.modal__form-button`);
const telInputElements = document.querySelectorAll(`input[type="tel"]`);


// Константы
const DELIVERY_ID = 0;
const PAYMENT_ID = 0;
const PRODUCTS = [
    {
        name: `Накладка`,
        image: `/wp-content/themes/stolstyle/img/s-basket-img.jpg`,
        covers: [
            {
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
        tables: [
            {
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
        covers: [
            {
                name: `Глянцевая 0.6 мм`,
                price: 20
            }
        ],
        tables: [
            {
                name: `Прямоугольный`
            }
        ]
    }
];
const MIN_PRICE = 10;
const DELIVERY_DATA = [
    {
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
const PAYMENT_DATA = [
    {
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
}
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
}

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
}
function onMobileMenuOpenButtonClickHandler(evt) {
    const target = evt.target;

    setTimeout(function(){
        target.classList.toggle('menu-btn_state-active');
        document.querySelector('.mobile-menu').classList.toggle('mobile-menu_state-open');
    }, 0);
    document.querySelector('body').classList.toggle('is-locked');
}
function changeLayout() {
    if (window.innerWidth < 992 && !isCompleted) {
        if (document.querySelector('.hero__desc')) {
            document.querySelector('.hero__desc').after(document.querySelector('.hero__benefits'));
        }
        if (document.querySelector('.product-template__img')) {
            document.querySelector('.product-template__img').before(document.querySelector('.product-template__grid').querySelector('.template__title'));
        }
        createCustomCarousel();
        isCompleted = !isCompleted;
    }
    if (window.innerWidth > 991 && isCompleted) {
        if (document.querySelector('.hero__button')) {
            document.querySelector('.hero__button').after(document.querySelector('.hero__benefits'));
        }
        if (document.querySelector('.product-template__img')) {
            document.querySelector('.product-template__grid').querySelector('.product-template__info').prepend(document.querySelector('.template__title'));
        }
        destroyCustomCarousel();
        isCompleted = !isCompleted;
    }
}
function createCustomCarousel() {

    if (customCarouselElementsCollection.length) {
        customCarouselElementsCollection.forEach((item, index) => {
            item.classList.add('swiper-container');
            item.classList.add('instance-' + index);
            //Add class to children
            for (const childInstance of item.children) {
                childInstance.classList.add('swiper-slide');
            }
            //Get children collection
            let itemChildrenHTML = item.innerHTML;
            item.innerHTML = '';
            //Add slider wrapper
            item.innerHTML = `<div class="swiper-wrapper"></div>`;
            item.querySelector('.swiper-wrapper').innerHTML = itemChildrenHTML;
            //Init carousel
            let instance = new Swiper(item, {
                slidesPerView: 1,
                loop: true,
                pagination: {
                    el: item.closest('.carousel').querySelector('.swiper-pagination')
                },
                navigation: {
                    prevEl: item.closest('.carousel').querySelector('.carousel__btn-prev'),
                    nextEl: item.closest('.carousel').querySelector('.carousel__btn-next')
                }
            });
            instance.update();
            customCarouselCollection.push(instance);
        });
    }
}
function destroyCustomCarousel() {
    let customCarouselElementsCollection = document.querySelectorAll('.custom-carousel');
    if (customCarouselElementsCollection.length) {
        customCarouselElementsCollection.forEach((item, index) => {
            item.classList.remove('swiper-container');
            item.classList.remove('instance-' + index);
            //Remove slider class
            for (const childInstance of item.querySelector('.swiper-wrapper').children) {
                childInstance.classList.remove('swiper-slide');
            }
            //Get children collection
            let itemChildrenHTML = item.querySelector('.swiper-wrapper').innerHTML;
            item.querySelector('.swiper-wrapper').innerHTML = '';
            //Remove slider wrapper
            item.querySelector('.swiper-wrapper').remove();
            item.innerHTML = itemChildrenHTML;
            //Destroy carousel
            customCarouselCollection.forEach(item => {
                item.destroy();
            });
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
        }
        else {
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
        const request = globalUtils.makeAjaxRequest(formData);

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

// Ивенты
document.addEventListener(`DOMContentLoaded`, () => {
    addInputMask();
    changeLayout();
    // Карусель о продукте
    new Swiper(aboutCarouselContainer, aboutCarouselSwiperOptions);
    // Карусель отзывов
    new Swiper(testimonialsCarouselContainer, testimonialsCarouselSwiperOptions);
    // Карусель в статье
    new Swiper(articleCarouselContainer, articleCarouselSwiperOptions);
    // Карусель на продуктовой странице
    new Swiper(productCarouselContainer, productCarouselSwiperOptions);

    jQuery('[data-modal]').on(`click`, function () {
        jQuery(jQuery(this).data(`modal`)).modal({
            fadeDuration: FADE_DURATION,
            fadeDelay: FADE_DELAY
        });
        return false;
    });

    if (jQuery('.timer').data('.timer')) {
        jQuery('.timer').countdown({
            date: jQuery('.timer').data('date') + ' 00:00:00',
            offset: +3,
            hideOnComplete: false
        });
    }

    if (callButtonElement) {
        callButtonElement.addEventListener(`click`, onCallButtonElementClickHandler);
    }
    if (successModalOpenLink) {
        successModalOpenLink.addEventListener(`click`, () => {
            jQuery.modal.close();
            jQuery(`.basket`).modal({
                fadeDuration: FADE_DURATION,
                fadeDelay: FADE_DELAY
            });
        });
    }
    if (mobileMenuOpenButton) {
        mobileMenuOpenButton.addEventListener(`click`, onMobileMenuOpenButtonClickHandler);
    }
    if (calculatorContainer) {
        calculatorContainer.addEventListener(`click`, onCalculatorContainerClickHandler);
    }
    if (callBackModalButton) {
        callBackModalButton.addEventListener(`click`, onCallBackModalButtonClickHandler);
    }
    mobileMenuElement.addEventListener(`click`, onMobileMenuElementClickHandler);
    basketForm.addEventListener(`click`, onBasketFormClickHandler);
});
document.addEventListener(`click`, onDocumentClickHandler);
window.addEventListener(`scroll`, onWindowScrollHandler);
document.addEventListener('wpcf7mailsent', function (evt) {
    // Get contact form ID
    if (evt.detail.contactFormId === '17') {
        jQuery.modal.close();
        // Google conversion
        dataLayer.push({'event': 'callback'});
        setTimeout(function() {
            jQuery('.success-callback').modal({
                fadeDuration: FADE_DURATION,
                fadeDelay: FADE_DELAY
            });
        }, TIMEOUT);
    }
}, false);
document.addEventListener('wpcf7invalid', function () {
    setTimeout(function () {
        jQuery('.current button[type="submit"]').text(`Заказать звонок`);
        jQuery('.current button[type="submit"]').removeClass('form__button_state-in-progress');
    }, 300);
}, false);
window.addEventListener(`resize`, () => {
    changeLayout();
});