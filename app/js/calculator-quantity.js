'use strict';

(function () {
    // Подгружаем модуль калькулятора
    const calculatorModule = window.calculator.instance;
    
    class CalculatorProductQuantity {

        constructor(calculatorProductQuantityContainer) {
            this._el = document.querySelector(calculatorProductQuantityContainer);

            if (this._el) {
                this._el.addEventListener(`click`, this.onCalculatorProductQuantityClickHandler.bind(this));
            }
        }

        onCalculatorProductQuantityClickHandler(evt) {
            const target = evt.target;

            if (target.matches(`button`)) {
                const buttonActionValue = target.dataset.action;
                const calculatorProductPrice = +calculatorModule.getCalculatorProductPrice();

                // Получаем текущее значение количества товара
                this._calculatorProductQuantity = +calculatorModule.getCalculatorProductQuantity();
                // Вычисляем цену за один товар
                const productPriceForOneItem = (calculatorProductPrice / this._calculatorProductQuantity).toFixed(1);
                
                switch (buttonActionValue) {
                    case `add`:
                        this._calculatorProductQuantity++;
                        break;
                    case `remove`:
                        if (this._calculatorProductQuantity > 1) {
                            this._calculatorProductQuantity--;
                        }
                        break;
                }

                // Обновляем общую цену
                calculatorModule.updateCalculatorProductQuantity(this._calculatorProductQuantity);
                calculatorModule.updateCalculatorProductPrice(productPriceForOneItem * this._calculatorProductQuantity);
            }
        }
    }

    new CalculatorProductQuantity(`.calculator-quantity`);
})();