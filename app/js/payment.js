'use strict';

(function() {
    const basketModule = window.basket.instance;

    class Payment {

        constructor(paymentOptionsContainer) {
            this._el = document.querySelector(paymentOptionsContainer);

            if (this._el) {
                this.renderPaymentOptions(PAYMENT_DATA);
                this._el.addEventListener(`click`, this.onPaymentOptionsClickHandler.bind(this));
            }
        }

        onPaymentOptionsClickHandler(evt) {
            const target = evt.target;

            if (target.matches(`.radio__input`)) {
                const paymentId = +target.value;

                // Обновляем id доставки
                basketModule.updateBasketPaymentData(paymentId);
            }
        }

        renderPaymentOptions(paymentOptionsData) {
            const paymentOptionsFragment = document.createDocumentFragment();

            for (const paymentOptionData of paymentOptionsData) {
                const paymentOptionElement = this.createPaymentOptionElement(paymentOptionData);
                paymentOptionsFragment.appendChild(paymentOptionElement);
            }

            this._el.appendChild(paymentOptionsFragment);
        }

        createPaymentOptionElement(paymentOptionData) {
            const paymentOptionTemplate = document.querySelector(`#basket-option`).content;
            const paymentOptionClonedTemplateNode = paymentOptionTemplate.cloneNode(true);

            // Заполняем шаблон данными
            paymentOptionClonedTemplateNode.querySelector(`.radio__input`).value = paymentOptionData.id;
            paymentOptionClonedTemplateNode.querySelector(`.radio__input`).setAttribute(`name`, `payment`);
            if (paymentOptionData.checked) {
                paymentOptionClonedTemplateNode.querySelector(`.radio__input`).checked = true;
            }
            paymentOptionClonedTemplateNode.querySelector(`.radio__value`).textContent = paymentOptionData.name;

            return paymentOptionClonedTemplateNode;
        }
    }

    const paymentInstance = new Payment(`.payment-options`);
    window.payment = {
        instance: paymentInstance
    };
})();