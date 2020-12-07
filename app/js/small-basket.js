'use strict';

(function() {
    const storageModule = window.storage.instance;

    class SmallBasket {

        constructor(smallBasketElement) {
            this._el = document.querySelector(smallBasketElement);
            // Обновляем количество товара на основе данных из хранилища
            this.updateSmallBasketQuantity(storageModule.getProductQuantity());
        }

        updateSmallBasketQuantity(value) {
            this._el.querySelector(`.basket-button__counter`).textContent = value;
            this.updateSmallBasketState(value);
        }

        updateSmallBasketState(value) {
            if (!+value) {
                this._el.setAttribute(`disabled`, true);
                return;
            }
            this._el.removeAttribute(`disabled`);
        }
    }

    const smallBasketInstance = new SmallBasket(`.basket-button`);
    window.smallBasket = {
        instance: smallBasketInstance
    };
})();