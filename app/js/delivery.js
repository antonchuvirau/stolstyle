'use strict';

(function() {
    const basketModule = window.basket.instance;
    const utilsModule = window.globalUtils;

    class Delivery {

        constructor(deliveryOptionsContainer) {
            this._el = document.querySelector(deliveryOptionsContainer);

            if (this._el) {
                this.renderDeliveryOptions(DELIVERY_DATA);
                this.showDeliveryData(DELIVERY_DATA, DELIVERY_ID);
                this._el.addEventListener(`click`, this.onDeliveryOptionsClickHandler.bind(this));
            }
        }

        onDeliveryOptionsClickHandler(evt) {
            const target = evt.target;
            const deliveryOptionsContent = document.querySelectorAll(`.delivery-options-content__item`);

            if (target.matches(`.radio__input`)) {
                const deliveryId = +target.value;
                const basketNameLabel = document.querySelector(`label[for="name"]`);

                // Check delivery option and change input label name
                if (deliveryId !== 2) {
                    basketNameLabel.textContent = `ФИО (для оформления доставки):`;
                }
                else {
                    basketNameLabel.textContent = `Ваше имя:`;
                }

                utilsModule.removeActiveClass(deliveryOptionsContent, `delivery-options-content__item_active`);
                deliveryOptionsContent[deliveryId].classList.add(`delivery-options-content__item_active`);
                // Обновляем данные доставки
                basketModule.updateBasketDeliveryData(deliveryId);
                this.showDeliveryData(DELIVERY_DATA, deliveryId);
            }
        }

        renderDeliveryOptions(deliveryOptionsData) {
            const deliveryOptionsFragment = document.createDocumentFragment();

            for (const deliveryOptionData of deliveryOptionsData) {
                const deliveryOptionElement = this.createDeliveryOptionElement(deliveryOptionData);
                deliveryOptionsFragment.appendChild(deliveryOptionElement);
            }

            this._el.appendChild(deliveryOptionsFragment);
        }

        createDeliveryOptionElement(deliveryOptionData) {
            const deliveryOptionTemplate = document.querySelector(`#basket-option`).content;
            const deliveryOptionClonedTemplateNode = deliveryOptionTemplate.cloneNode(true);

            // Заполняем шаблон данными
            deliveryOptionClonedTemplateNode.querySelector(`.radio__input`).value = deliveryOptionData.id;
            deliveryOptionClonedTemplateNode.querySelector(`.radio__input`).setAttribute(`name`, `delivery`);
            if (deliveryOptionData.checked) {
                deliveryOptionClonedTemplateNode.querySelector(`.radio__input`).checked = true;
            }
            deliveryOptionClonedTemplateNode.querySelector(`.radio__value`).textContent = `${deliveryOptionData.name} ${deliveryOptionData.price ? ` (${deliveryOptionData.price} BYN)`: ``}`;

            return deliveryOptionClonedTemplateNode;
        }

        showDeliveryData(deliveryData, deliveryId) {
            document.querySelector(`.total__item-name[data-name="delivery"]`).textContent = `${deliveryData[deliveryId].name}:`;
            document.querySelector(`.total__item-value[data-price="delivery"]`).textContent = `${deliveryData[deliveryId].price} BYN`;
        }
    }

    const deliveryInstance = new Delivery(`.delivery-options`);
    window.delivery = {
        instance: deliveryInstance
    };
})();