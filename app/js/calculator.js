'use strict';

(function() {
    // Подгружаем необходимые модули
    const utilsModule = window.globalUtils;
    const storageModule = window.storage.instance;
    const smallBasketModule = window.smallBasket.instance;
    const basketModule = window.basket.instance;

    class Calculator {
        _calculatorData = `/wp-content/themes/stolstyle/data/calculator.json`;
        _calculatorTableSize = [0,0];
        _calculatorProductQuanity = 1;
        _calculatorProductPrice = 0;
        _calculatorProductIndex = 0;
        _calculatorTableTypeIndex = 0;
        _calculatorCoverTypeIndex = 0;
        _calculatorSizePattern = /^(\d|(\,|\.)(?=\d{1,})){1,}$/;
    
        constructor(calculatorContainer) {
            this._el = document.querySelector(calculatorContainer);
    
            if (this._el) {
                // Инициализируем калькулятор
                this.initCalculator();
            }
        }
    
        onCalculatorContainerClickHandler(evt) {
            const target = evt.target;
            
            if (target.matches(`input[type="radio"][name="product"]`)) {
                const productIndex = +target.dataset.productIndex;
                const calculatorOptionFields = this._el.querySelectorAll(`.calculator-form-field`);
                // Обновляем индекс продукта
                this._calculatorProductIndex = productIndex;
                // Сбрасываем опции калькулятора
                this.resetCalculator(this._calculatorProductIndex);
                // Обновляем данные выбранного продукта
                this.setCalculatorProductData();
    
                // Показываем поля калькулятора относящиеся к выбранному продукту
                for (const calculatorOptionField of calculatorOptionFields) {
                    const calculatorOptionFieldProductIndex = +calculatorOptionField.dataset.productIndex;
                    const calculatorOptionFieldTableTypeIndexes = calculatorOptionField.dataset.tableTypeIndex ? calculatorOptionField.dataset.tableTypeIndex.split(`,`) : null;
                    // Проверяем принадлежит ли поле к выбранному продукту (через data аттрибут)
                    if (calculatorOptionFieldProductIndex !== productIndex) {
                        calculatorOptionField.classList.add(`calculator-form-field_hidden`);
                    }
                    else {
                        // Показываем input для указания размеров только для выбранного типа стола
                        if (calculatorOptionFieldTableTypeIndexes) {
                            if (calculatorOptionFieldTableTypeIndexes.find(calculatorOptionFieldTableTypeIndex => +calculatorOptionFieldTableTypeIndex === this._calculatorTableTypeIndex)) {
                                calculatorOptionField.classList.remove(`calculator-form-field_hidden`);
                            }
                        }
                        else {
                            calculatorOptionField.classList.remove(`calculator-form-field_hidden`);
                        }
                    }
                }

                // Отключаем отображение типа стола для скатерти
                if (this._calculatorProductIndex === 1) {
                    this._el.querySelector(`.calculation-form__section:nth-child(2)`).classList.add(`calculation-form__section_hidden`);
                    this._el.querySelector(`.calculation-form__section:nth-child(3)`).classList.add(`calculation-form__section_hidden`);
                    this._el.querySelector(`.calculation-form__section-note`).classList.remove(`calculation-form__section-note_hidden`);
                }
                else {
                    this._el.querySelector(`.calculation-form__section:nth-child(2)`).classList.remove(`calculation-form__section_hidden`);
                    this._el.querySelector(`.calculation-form__section:nth-child(3)`).classList.remove(`calculation-form__section_hidden`);
                    this._el.querySelector(`.calculation-form__section-note`).classList.add(`calculation-form__section-note_hidden`);
                }
            }
            if (target.matches(`input[type="radio"][name*="cover-"]`)) {
                const targetAttrName = target.getAttribute(`name`);
                const coverTypeInputs = this._el.querySelectorAll(`input[name=${targetAttrName}]`);
                const targetCoverTypeIndex = utilsModule.getCollectionItemIndex(coverTypeInputs, target);
                this._calculatorCoverTypeIndex = targetCoverTypeIndex;
                // Обновляем цену
                this.calculateProductPrice();
                this.showCalculatorProductPrice();
            }
            if (target.matches(`input[type="radio"][name*="table-"]`)) {
                const targetAttrName = target.getAttribute(`name`);
                const tableTypeInputs = this._el.querySelectorAll(`input[name=${targetAttrName}]`);
                const targetTableTypeIndex = utilsModule.getCollectionItemIndex(tableTypeInputs, target);
                this._calculatorTableTypeIndex = targetTableTypeIndex;
                // Показываем поля для ввода размеров в зависимости от типа стола
                this.showNecessarySizeInputs(this._calculatorProductIndex, this._calculatorTableTypeIndex);
            }
            if (target.matches('.calculation-form__button')) {
                evt.preventDefault();
    
                // Добавляем товару id на основе timestamp
                this.addCalculatorProductId();
                // Добавляем товар в хранилище
                storageModule.addProductToStorage(this.getCalculatorProductData());
                // Сбрасываем значения калькулятора после добавления товара в корзину
                this.resetCalculator(this._calculatorProductIndex);
                // Обновляем корзину
                smallBasketModule.updateSmallBasketQuantity(storageModule.getProductQuantity());
                basketModule.renderBasketProducts(storageModule.getStorageProducts());
                // Показываем модальное окно
                jQuery(`.success-basket`).modal({
                    fadeDuration: FADE_DURATION,
                    fadeDelay: FADE_DELAY
                });
            }
        }
    
        onCalculatorContainerInputHandler(evt) {
            const target = evt.target;
    
            if (target.matches(`.calculation-form__input`)) {
                // Проверяем введенные данные через шаблон регулярного выражения
                this.checkSizeInputValue(target, target.value)
                this.calculateProductPrice();
                this.showCalculatorProductPrice();
            }
        }
    
        initCalculator() {
            fetch(this._calculatorData)
                .then((resp) => resp.json())
                .then((optionsData) => {
                    const {products, tables, covers, inputs} = optionsData;
                    this.renderCalculatorOptions(products, `.calculator-products`);
                    this.renderCalculatorOptions(tables, `.calculator-tables`);
                    this.renderCalculatorOptions(covers, `.calculator-covers`);
                    this.renderCalculatorSizeInputs(inputs, `.calculator-inputs`);
                    // Обновляем данные выбранного продукта
                    this.setCalculatorProductData();
                    // Добавляем события к калькулятору через делегирование
                    this._el.addEventListener(`click`, this.onCalculatorContainerClickHandler.bind(this));
                    this._el.addEventListener(`input`, this.onCalculatorContainerInputHandler.bind(this));
                });
        }
    
        renderCalculatorOptions(calculatorOptionsData, optionsContainer) {
            const calculatorOptionTemplate = document.querySelector(`#calculator-option`).content;
            const calculatorOptionsFragment = document.createDocumentFragment();
    
            calculatorOptionsData.forEach((calculatorOptionData) => {
                const calculatorOptionClonedTemplateNode = calculatorOptionTemplate.cloneNode(true);
    
                if (calculatorOptionData.type !== `product`) {
                    calculatorOptionClonedTemplateNode.querySelector(`.calculation-form__radio`).classList.add(`calculator-form-field`);
                    calculatorOptionClonedTemplateNode.querySelector(`.calculation-form__radio-input`).setAttribute(`name`, `${calculatorOptionData.type + '-' + calculatorOptionData.productIndex}`);
                    calculatorOptionClonedTemplateNode.querySelector(`.calculation-form__radio`).setAttribute(`data-product-index`, calculatorOptionData.productIndex);
                }
                else {
                    calculatorOptionClonedTemplateNode.querySelector(`.calculation-form__radio-input`).setAttribute(`name`, `${calculatorOptionData.type}`);
                    calculatorOptionClonedTemplateNode.querySelector(`.calculation-form__radio-input`).setAttribute(`data-product-index`, calculatorOptionData.id);
                }
                if (calculatorOptionData.checked) {
                    calculatorOptionClonedTemplateNode.querySelector(`.calculation-form__radio-input`).checked = true;
                }
                if (calculatorOptionData.hidden) {
                    calculatorOptionClonedTemplateNode.querySelector(`.calculation-form__radio`).classList.add(`calculator-form-field_hidden`);
                }
                calculatorOptionClonedTemplateNode.querySelector(`.calculation-form__radio-value`).textContent = calculatorOptionData.name;
                calculatorOptionsFragment.appendChild(calculatorOptionClonedTemplateNode);
            });
            this._el.querySelector(optionsContainer).appendChild(calculatorOptionsFragment);
        }
    
        renderCalculatorSizeInputs(calculatorSizeInputsData, sizeInputsContainer) {
            const calculatorSizeInputTemplate = document.querySelector(`#calculator-size-input`).content;
            const calculatorSizeInputsFragment = document.createDocumentFragment();
    
            calculatorSizeInputsData.forEach((calculatorSizeInputData) => {
                const calculatorSizeInputClonedTemplateNode = calculatorSizeInputTemplate.cloneNode(true);
    
                if (calculatorSizeInputData.hidden) {
                    calculatorSizeInputClonedTemplateNode.querySelector(`.calculator-form-field`).classList.add(`calculator-form-field_hidden`);
                }
                if (calculatorSizeInputData.disabled) {
                    calculatorSizeInputClonedTemplateNode.querySelector(`.calculation-form__input`).classList.add(`calculation-form__input_disabled`);
                }
                if (calculatorSizeInputData.defaultValue) {
                    calculatorSizeInputClonedTemplateNode.querySelector(`.calculation-form__input`).value = calculatorSizeInputData.defaultValue;
                }
                calculatorSizeInputClonedTemplateNode.querySelector(`.calculation-form__input`).setAttribute(`name`, `${calculatorSizeInputData.type + '-' + calculatorSizeInputData.productIndex}`);
                calculatorSizeInputClonedTemplateNode.querySelector(`.calculator-form-field`).setAttribute(`data-product-index`, calculatorSizeInputData.productIndex);
                calculatorSizeInputClonedTemplateNode.querySelector(`.calculator-form-field`).setAttribute(`data-table-type-index`, calculatorSizeInputData.tableTypeIndex);
                calculatorSizeInputClonedTemplateNode.querySelector(`.calculation-form__label`).textContent = calculatorSizeInputData.name;
                calculatorSizeInputsFragment.appendChild(calculatorSizeInputClonedTemplateNode);
            });
            this._el.querySelector(sizeInputsContainer).appendChild(calculatorSizeInputsFragment);
        }
    
        setCalculatorProductData(productIndex = this._calculatorProductIndex, tableTypeIndex = this._calculatorTableTypeIndex, coverTypeIndex = this._calculatorCoverTypeIndex, productPrice = this._calculatorProductPrice, productQuantity = this._calculatorProductQuanity, tableSize = this._calculatorTableSize) {
            this._calculatorProductData = {
                name: `${PRODUCTS[productIndex].name}`,
                image: `${PRODUCTS[productIndex].image}`,
                table: {
                    name: `${PRODUCTS[productIndex].tables[tableTypeIndex].name}`,
                    size: tableSize
                },
                cover: `${PRODUCTS[productIndex].covers[coverTypeIndex].name}`,
                quantity: +productQuantity,
                price: +productPrice.toFixed(1)
            }
        }
    
        showNecessarySizeInputs(productIndex, tableTypeIndex) {
            const calculatorSizeElements = this._el.querySelectorAll(`.calculator-form-field[data-table-type-index]`);
    
            for (const calculatorSizeInputContainer of calculatorSizeElements) {
                const calculatorSizeInputProductIndex = +calculatorSizeInputContainer.dataset.productIndex;
                const calculatorSizeInputTableTypeIndexes = calculatorSizeInputContainer.dataset.tableTypeIndex.split(`,`);
                const isInArray = utilsModule.findArrayItem(calculatorSizeInputTableTypeIndexes, tableTypeIndex);
    
                // Сбрасываем значения
                if (!calculatorSizeInputContainer.querySelector(`input`).classList.contains(`calculation-form__input_disabled`)) {
                    calculatorSizeInputContainer.querySelector(`input`).value = ``;
                }
    
                if (calculatorSizeInputProductIndex === productIndex && isInArray) {
                    calculatorSizeInputContainer.classList.remove(`calculator-form-field_hidden`);
                }
                else {
                    calculatorSizeInputContainer.classList.add(`calculator-form-field_hidden`);
                }
    
                // Делаем пересчет общей стоимости
                this.calculateProductPrice();
                this.showCalculatorProductPrice();
            }
        }
    
        showCalculatorProductPrice() {
            this._el.querySelector(`.calculation-form__total-value`).textContent = this._calculatorProductPrice;
            this.changeSubmitButtonState();
        }
    
        calculateProductPrice(productIndex = this._calculatorProductIndex, tableTypeIndex = this._calculatorTableTypeIndex, coverTypeIndex = this._calculatorCoverTypeIndex, productQuantity = this._calculatorProductQuanity) {
            const coverPrice = this.getCoverTypePrice(productIndex, coverTypeIndex);
            const tableSizes = this.getTableTypeSizeValues(productIndex, tableTypeIndex);
            const tableSquarePrice = this.calculateTableSquarePrice(productIndex, tableTypeIndex, tableSizes);
            const productPrice = (tableSquarePrice * coverPrice) * productQuantity;
            this.updateCalculatorProductPrice(productPrice);
        }
    
        updateCalculatorProductQuantity(value) {
            this._calculatorProductQuanity = +value;
            this._el.querySelector(`.quantity__input`).value = this._calculatorProductQuanity;
        }
    
        updateCalculatorProductPrice(value) {
            this._calculatorProductPrice = +value.toFixed(1);
            this.showCalculatorProductPrice();
            this.setCalculatorProductData();
        }
    
        resetCalculator(productIndex) {
            const calculcatorSizeInputs = this._el.querySelectorAll(`.calculator-form-field[data-product-index="${productIndex}"][data-table-type-index] input`);
    
            // Устанавливаем опции в базовое положение в зависимости от выбранного продукта
            this._el.querySelectorAll(`input[name*="table-${productIndex}"]`)[0].checked = true;
            this._el.querySelectorAll(`input[name*="cover-${productIndex}"]`)[0].checked = true;
            // Устанавливаем тип стола и тип пленки в базовое положение
            this._calculatorTableTypeIndex = 0;
            this._calculatorCoverTypeIndex = 0;
            // Сбрасываем значения размеров стола
            for (const calculatorSizeInput of calculcatorSizeInputs) {
                if (!calculatorSizeInput.classList.contains(`calculation-form__input_disabled`)) {
                    calculatorSizeInput.value = ``;
                }
            }
            // Утсанавливаем количество товара в начальное положение
            this.updateCalculatorProductQuantity(1);
            // Делаем пересчет общей стоимости
            this.calculateProductPrice();
            this.showCalculatorProductPrice();
        }
    
        getCoverTypePrice(productIndex, coverTypeIndex) {
            return PRODUCTS[productIndex].covers[coverTypeIndex].price;
        }
    
        getTableTypeSizeValues(productIndex, tableTypeIndex) {
            let tableTypeSizes;
            
            switch(tableTypeIndex) {
                case 0:
                case 2:
                    const tableTypeWidthInputElement = this._el.querySelector(`.calculator-form-field[data-product-index="${productIndex}"] input[name="width-${productIndex}"]`);
                    const tableTypeLengthInputElement = this._el.querySelector(`.calculator-form-field[data-product-index="${productIndex}"] input[name="length-${productIndex}"]`);
                    // Получаем значения
                    const calculatorTableWidthValue = tableTypeWidthInputElement.value.replace(`,`, `.`);
                    const calculatorTableLengthValue = tableTypeLengthInputElement.value.replace(`,`, `.`);
    
                    // Проверяем значения на корректность
                    if (!this.checkSizeInputValue(tableTypeWidthInputElement, calculatorTableWidthValue) || !this.checkSizeInputValue(tableTypeLengthInputElement, calculatorTableLengthValue)) {
                        tableTypeSizes = [0,0];
                    }
                    else {
                        // Записываем значения в массив, преобразуя их к числу (т.к. '' => 0)
                        tableTypeSizes = [+calculatorTableWidthValue, +calculatorTableLengthValue];
                    }
                    break;
                case 1:
                    const tableTypeDiameterInputElement = this._el.querySelector(`.calculator-form-field[data-product-index="${productIndex}"] input[name="diameter-${productIndex}"]`);
                    // Получаем значения
                    const calculatorTableDiameterValue = tableTypeDiameterInputElement.value.replace(`,`, `.`);
    
                    // Проверяем значения на корректность
                    if (!this.checkSizeInputValue(tableTypeDiameterInputElement, calculatorTableDiameterValue)) {
                        tableTypeSizes = [0];
                    }
                    else {
                        // Записываем значения в массив, преобразуя их к числу (т.к. '' => 0)
                        tableTypeSizes = [+calculatorTableDiameterValue];
                    }
                    break;
            }
    
            this._calculatorTableSize = tableTypeSizes;
            return tableTypeSizes;
        }
    
        calculateTableSquarePrice(productIndex, tableTypeIndex, tableSizes) {
            let tableSquare;
    
            switch(tableTypeIndex) {
                // Получаем площадь прямоугольного и фигурного стола
                case 0:
                case 2:
                    if (productIndex === 1) {
                        tableSquare = +tableSizes[1] / 100;
                    }
                    else {
                        tableSquare = ((+tableSizes[0] / 100) * (+tableSizes[1] / 100));
                    }
                    break;
                // Получаем площадь круглого стола (вырезается квадрат)
                case 1:
                    tableSquare = Math.pow((+tableSizes[0] / 100), 2);
                    break;
            }
    
            return tableSquare;
        }
    
        getCalculatorProductPrice() {
            // Обновим общую цену для корректности данных
            this.calculateProductPrice();
            return this._calculatorProductPrice;
        }
    
        changeSubmitButtonState() {
            if (this._calculatorProductPrice > MIN_PRICE) {
                this._el.querySelector(`.calculation-form__button`).removeAttribute(`disabled`);
                return;
            }
            this._el.querySelector(`.calculation-form__button`).setAttribute(`disabled`, true);
        }
    
        checkSizeInputValue(sizeInputElement, sizeInputElementValue) {
            if (!sizeInputElementValue || this._calculatorSizePattern.test(sizeInputElementValue)) {
                this.removeSizeInputErrorMessage(sizeInputElement);
                return true;
            }
            this.showSizeInputErrorMessage(sizeInputElement);
            return false;
        }
    
        showSizeInputErrorMessage(sizeInputElement) {
            sizeInputElement.classList.add(`calculation-form__input_error`);
            sizeInputElement.nextElementSibling.classList.add(`error-label_active`);
        }
    
        removeSizeInputErrorMessage(sizeInputElement) {
            sizeInputElement.classList.remove(`calculation-form__input_error`);
            sizeInputElement.nextElementSibling.classList.remove(`error-label_active`);
        }
    
        getCalculatorProductQuantity() {
            return this._calculatorProductQuanity;
        }
    
        getCalculatorProductData() {
            return this._calculatorProductData;
        }

        addCalculatorProductId() {
            const now = new Date();
            this._calculatorProductData.id = +now.getTime();
        }
    }

    const calculatorInstance = new Calculator(`.calculation-form`);
    window.calculator = {
        instance: calculatorInstance
    };
})();