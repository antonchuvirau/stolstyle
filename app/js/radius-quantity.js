'use strict';

(function () {
    // Подгружаем модуль калькулятора
    const calculatorModule = window.calculator.instance;
    
    class RadiusProductQuantity {

        constructor(radiusProductQuantityContainer) {
            this._el = document.querySelector(radiusProductQuantityContainer);

            if (this._el) {
                this._el.addEventListener(`click`, this.onRadiusProductQuantityClickHandler.bind(this));
            }
        }

        onRadiusProductQuantityClickHandler(evt) {
            const target = evt.target;

            if (target.matches(`button`)) {
                const buttonActionValue = target.dataset.action;
                // const calculatorProductPrice = calculatorModule.getCalculatorProductPrice();

                // Получаем текущее значение количества товара
                this._radiusProductQuantity = calculatorModule.getRadiusProductQuantity();
                
                switch (buttonActionValue) {
                    case `add`:
                        this._radiusProductQuantity++;
                        break;
                    case `remove`:
                        if (this._radiusProductQuantity >= 1) {
                            this._radiusProductQuantity--;
                        }
                        break;
                }

                // Обновляем общую цену
                calculatorModule.updateRadiusProductQuantity(this._radiusProductQuantity);
                // calculatorModule.updateRadiusProductPrice(productPriceForOneItem * this._calculatorProductQuantity);
            }
        }
    }

    new RadiusProductQuantity(`.radius-quantity`);
})();