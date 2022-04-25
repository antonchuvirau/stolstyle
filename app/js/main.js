'use strict';

// Модули
const utilsModule = window.globalUtils;
const storageModule = window.storage.instance;
const basketModule = window.basket.instance;
const smallBasketModule = window.smallBasket.instance;

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
    if (productGalleryContainer) {
        new Swiper(productGalleryContainer, productGalleryOptions);
    }
    mobileMenuElement.addEventListener(`click`, onMobileMenuElementClickHandler);
    basketForm.addEventListener(`click`, onBasketFormClickHandler);
});
document.addEventListener(`click`, onDocumentClickHandler);
window.addEventListener(`scroll`, onWindowScrollHandler);
document.addEventListener('wpcf7mailsent', function (evt) {
    // Get contact form ID
    if (evt.detail.contactFormId === 17) {
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
jQuery(document).ready(function() {
    // jQuery.ajax({
    //     url: ajax.url,
    //     type: "POST",
    //     data: {
    //         action: `evropochta_warehouse`
    //     },
    //     success: function(response) {
    //         $responseInstance = JSON.parse(response);
    //         console.log($responseInstance);
    //     }
    // });
    jQuery('[data-modal]').on(`click`, function () {
        jQuery(jQuery(this).data(`modal`)).modal({
            fadeDuration: FADE_DURATION,
            fadeDelay: FADE_DELAY
        });
        return false;
    });

    if (jQuery('.timer').length) {
        jQuery('.timer').countdown({
            date: jQuery('.timer').data('date') + ' 00:00:00',
            offset: +3,
            hideOnComplete: false
        });
    }
});