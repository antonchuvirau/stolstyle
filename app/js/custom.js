'use strict';

// CountDown Clock
// Version   : 1.0.2
// Developer : Ekrem KAYA
// Website   : https://e-piksel.com
// GitHub    : https://github.com/epiksel/countdown

!function(e){e.fn.countdown=function(t,n){var o=e.extend({date:null,offset:null,day:"Day",days:"Days",hour:"Hour",hours:"Hours",minute:"Minute",minutes:"Minutes",second:"Second",seconds:"Seconds",hideOnComplete:!1},t);o.date||e.error("Date is not defined."),Date.parse(o.date)||e.error("Incorrect date format, it should look like this, 12/24/2012 12:00:00.");var r=this,i=function(){var e=new Date,t=e.getTime()+6e4*e.getTimezoneOffset();return new Date(t+36e5*o.offset)};var d=setInterval(function(){var t=new Date(o.date)-i();if(t<0)return clearInterval(d),o.hideOnComplete&&e(r).hide(),void(n&&"function"==typeof n&&n(r));var s=Math.floor(t/864e5),a=Math.floor(t%864e5/36e5),f=Math.floor(t%36e5/6e4),u=Math.floor(t%6e4/1e3),h=1===s?o.day:o.days,l=1===a?o.hour:o.hours,c=1===f?o.minute:o.minutes,x=1===u?o.second:o.seconds;s=String(s).length>=2?s:"0"+s,a=String(a).length>=2?a:"0"+a,f=String(f).length>=2?f:"0"+f,u=String(u).length>=2?u:"0"+u,r.find(".days").text(s),r.find(".hours").text(a),r.find(".minutes").text(f),r.find(".seconds").text(u),r.find(".days_text").text(h),r.find(".hours_text").text(l),r.find(".minutes_text").text(c),r.find(".seconds_text").text(x)},1e3)}}(jQuery);

//Variables
let buttonTextContent;
let mobileMenuLinksCollection = document.querySelectorAll('.mobile-menu__link');

//Events
if (mobileMenuLinksCollection) {
    for (let link of mobileMenuLinksCollection) {
        link.addEventListener('click', () => {
            link.closest('.mobile-menu').classList.remove('mobile-menu_state-open');
            document.querySelector('.menu-btn').classList.remove('menu-btn_state-active');
        });
    }
}

//Contact form 7 events
function getPaymentFormData(value) {
    return jQuery.ajax({
        url: ajax.url,
        method: 'POST',
        data: {
            action: 'payment_form_data',
            formData: value
        }
    });
}

document.addEventListener('wpcf7mailsent', function (event) {
    const inputs = event.detail.inputs;
    //Get contact form ID
    if (event.detail.contactFormId === '17') {
        jQuery.modal.close();
        //Google conversion
        dataLayer.push({'event': 'callback'});
        jQuery('.success-callback').modal();
    }
    if (event.detail.contactFormId === '48') {
        const paymentData = {
            customer: {
                name: inputs[8].value,
                phone: inputs[9].value
            },
            product: {
                name: `${inputs[0].value} - ${inputs[1].value} - ${inputs[2].value} - ${inputs[3].value}`
            },
            delivery: inputs[5].value,
            price: inputs[7].value
        }
        console.log(paymentData);
        //Get payment method
        let paymentMethod = event.detail.inputs[6].value;
        basket.clearBasket();
        //Google conversion
        dataLayer.push({'event': 'order'});
        if (paymentMethod === 'Картой онлайн') {
            jQuery('.basket button[type="submit"]').text('Перенаправлем на оплату...');
            //Get payment form object
            jQuery.when(getPaymentFormData(paymentData)).then(response => {
                jQuery('.current .basket').append(response);
                jQuery('.current .basket').find('.webpay-form').submit();
            });
        }
        else {
            jQuery('.current button[type="submit"]').text(buttonTextContent);
            jQuery('.current button[type="submit"]').removeClass('form__button_state-in-progress');
            jQuery.modal.close();
            jQuery('.success-order').modal();
        }
    }
}, false);

document.addEventListener('wpcf7invalid', function (event) {
    setTimeout(function () {
        jQuery('.current button[type="submit"]').text(buttonTextContent);
        jQuery('.current button[type="submit"]').removeClass('form__button_state-in-progress');
    }, 300);
}, false);

jQuery(document).ready(function () {
    //Customizing submit button text
    jQuery('button[type="submit"]').on('click', function (e) {
        e.preventDefault();
        let button = jQuery(this);
        buttonTextContent = button.text();
        button.text('Отправляем...');
        button.addClass('form__button_state-in-progress');
        if (e.target.matches('.basket__button')) {
            let customDeliveryInputElement = document.querySelector('input[name="customer-address"]');
            if (customDeliveryInputElement && basket.checkDelivery()) {
                customDeliveryInputElement.classList.remove('wpcf7-not-valid');
                //Collect basket data
                let data = basket.collectBasketData();
                if (data) {
                    document.querySelector('input[name="f-delivery"]').value = data.info[0].delivery.name + '(' + data.info[0].delivery.price + ' руб.)' + ', ' + data.info[0].delivery.address;
                    document.querySelector('input[name="f-payment"]').value = data.info[1].payment.name;
                    //Collect all params
                    let sizes = data.products.map(item => `${item.size}`).join(' / ');
                    let covers = data.products.map(item => `${item.cover}`).join(' / ');
                    let quantity = data.products.map(item => `${item.quantity}`).join(' / ');
                    let table = data.products.map(item => `${item.table}`).join(' / ');
                    let price = data.products.map(item => `${item.price}`).join(' / ');
                    //Insert data
                    document.querySelector('input[name="f-cover"]').value = covers;
                    document.querySelector('input[name="f-quantity"]').value = quantity;
                    document.querySelector('input[name="f-size"]').value = sizes;
                    document.querySelector('input[name="f-table"]').value = table;
                    document.querySelector('input[name="f-price"]').value = price;
                    document.querySelector('input[name="f-total-price"]').value = data.price;
                    //Submit form
                    jQuery(e.target).closest('form').trigger('submit');
                }
            } else if (customDeliveryInputElement && !basket.checkDelivery()) {
                customDeliveryInputElement.classList.add('wpcf7-not-valid');
                setTimeout(function () {
                    button.removeClass('form__button_state-in-progress');
                    button.text(buttonTextContent);
                }, 300);
            }
        }
        else {
            //Submit form
            jQuery(e.target).closest('form').trigger('submit');
        }
    });
    //Input mask
    let telInputsCollection = document.querySelectorAll('input[type="tel"]');
    telInputsCollection.forEach((item) => {
        let inputMaskObject = new Inputmask("375 (99) 999-99-99", {
            showMaskOnFocus: false,
            showMaskOnHover: false,
            clearMaskOnLostFocus: false
        });
        inputMaskObject.mask(item);
    });
    // Select all links with hashes
    jQuery('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = jQuery(this.hash);
                target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    jQuery('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        // var jQuerytarget = jQuery(target);
                        // jQuerytarget.focus();
                        // if (jQuerytarget.is(":focus")) { // Checking if the target was focused
                        //     return false;
                        // } else {
                        //     jQuerytarget.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        //     jQuerytarget.focus(); // Set focus again
                        // };
                    });
                }
            }
        });
    //Promocode
    jQuery('.promocode__btn').on('click', function() {
        let buttonTextContent = jQuery(this).text();
        let promocode = jQuery(this).parent().find('input').val();
        jQuery.ajax({
            url: 'https://stolstyle.by/wp-admin/wp-ajax.php',
            method: 'POST',
            dataType: 'json',
            data: {
                action: 'promocode'
            },
            beforeSend: function() {
                jQuery(this).text('Проверяем...');
                jQuery(this).parent().addClass('promocode-input_state-progress');
            },
            success: function(data) {
                jQuery(this).text(buttonTextContent);
                jQuery(this).parent().removeClass('promocode-input_state-progress');
                console.log(data);
            }
        });
    });
    //Timer
    let countdownDate = jQuery('.timer').data('date') + ' 00:00:00';
    jQuery('.timer').countdown({
        date: countdownDate,
        offset: +3,
        hideOnComplete: false
    });
});

jQuery(document).ready(function() {
    jQuery('.test-button').on('click', () => {
        jQuery.ajax({
            url: ajax.url,
            method: 'POST',
            data: {
                action: 'promocode',
                name: 'BCA'
            },
            success: (data) => {
                console.log(JSON.parse(data));
                // console.log(data);
            }
        });
    });
});

//Promocode
// let promocodeButtonElement = document.querySelector('.promocode__btn');
// if (promocodeButtonElement) {
//     promocodeButtonElement.addEventListener('click', (event) => {
//         let buttonTextContent = promocodeButtonElement.textContent;
//         promocodeButtonElement.textContent = 'Проверяем...';
//         promocodeButtonElement.parentElement.classList.add('promocode-input_state-progress');
//         let promocode = promocodeButtonElement.parentElement.querySelector('input').value;
//         let data = {
//             action: 'promocode'
//         };
//         fetch(ajax.url, {
//                 method: 'POST',
//                 credentials: 'same-origin',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                     'Accept': 'application/json'
//                 },
//                 body: new URLSearchParams(data)
//             })
//             .then((resp) => resp.json())
//             .then((data) => {
//                 console.log(data);
//                 promocodeButtonElement.textContent = buttonTextContent;
//                 promocodeButtonElement.parentElement.classList.remove('promocode-input_state-progress');
//                 // if (data.length) {
//                 //     let promocodeObject = data.find((item) => item.name.toUpperCase() === promocode.toUpperCase());
//                 //     if (promocodeObject !== undefined) {
//                 //         changeInputPrice(paymentMethodIndex, false, promocodeObject);
//                 //         //Show message
//                 //         showPromocodeMessage('success');
//                 //     } else {
//                 //         showPromocodeMessage('error');
//                 //         changeInputPrice(paymentMethodIndex, false, false);
//                 //     }
//                 // } else {
//                 //     showPromocodeMessage('error');
//                 //     changeInputPrice(paymentMethodIndex, false, false);
//                 // }
//             });
//     });
// }