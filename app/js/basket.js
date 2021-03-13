'use strict';

(function () {
    const storageModule = window.storage.instance;
    const smallBasketModule = window.smallBasket.instance;

    class Basket {
        _basketProductsPrice = 0;
        _basketTotalPrice = 0;
        // Данные по промокоду
        _isPromocode = false;
        _promocodeValue = 0;
        _promocodeName = ``;
        // Данные о доставке
        _basketDeliveryData = {
            id: DELIVERY_ID,
            name: DELIVERY_DATA[DELIVERY_ID].name,
            price: +DELIVERY_DATA[DELIVERY_ID].price
        };
        // Данные об оплате
        _basketPaymentData = {
            id: PAYMENT_ID,
            name: PAYMENT_DATA[PAYMENT_ID].name
        };

        constructor(basketProductsContainer) {
            if (document.querySelector(basketProductsContainer)) {
                this._el = document.querySelector(basketProductsContainer);
                // Рендерим товары на основе данных из хранилища
                this.renderBasketProducts(storageModule.getStorageProducts());
                // Добавляем событие на блок с продуктами
                this._el.addEventListener(`click`, this.onBasketClickHandler.bind(this));
                // Добавляем событие на отправку данных
                this._el.querySelector(`.basket-form`).addEventListener(`submit`, this.onBasketSubmitHandler.bind(this))
            }
        }

        onBasketSubmitHandler(evt) {
            evt.preventDefault();

            const target = evt.target;

            // Заменяем контент кнопки
            const formSubmitButton = target.querySelector(`button[type="submit"]`);
            formSubmitButton.textContent = `Отправляем...`;
            formSubmitButton.classList.add(`button_progress`);

            const formTelRegex = /^\+{1}(375){1}\s{1}\({1}(29|33|25|44){1}\){1}\s{1}\d{3}\-\d{2}\-\d{2}$/g;
            const formData = new FormData(target);

            // Получаем поля для проверки
            const formDeliveryAddressInput = this._el.querySelector(`input[name="delivery-address"]`);
            const formDeliveryMinskAddressInput = this._el.querySelector(`input[name="delivery-minsk-address"]`);
            const formTelInput = this._el.querySelector(`input[name="tel"]`);

            // Получаем значения полей формы
            const formDeliveryAddresses = [
                formData.get(`pick-up-point`),
                formData.get(`delivery-minsk-address`),
                formData.get(`delivery-address`)
            ];
            const formTelValue = formData.get(`tel`);
            const formNameValue = formData.get(`name`);
            const formMessageValue = formData.get(`message`);

            // Итоговый объект данных заказа
            this._basketOrderData = new FormData();

            // Проверяем тип доствки
            switch (this._basketDeliveryData.id) {
                case 0:
                    // Обновляем данные объекта заказа
                    this.updateBasketOrderData(`delivery_address`, formDeliveryAddresses[this._basketDeliveryData.id]);
                    break;
                case 1:
                    if (formDeliveryAddresses[this._basketDeliveryData.id] === ``) {
                        formDeliveryAddressInput.classList.add(`error`);
                        // Возвращаем кнопку отправки данных в исходное состояние
                        setTimeout(function () {
                            formSubmitButton.textContent = `Оформить заказ`;
                            formSubmitButton.classList.remove(`button_progress`);
                            formSubmitButton.classList.add(`error`);
                        }, 300);
                    } else {
                        formDeliveryAddressInput.classList.remove(`error`);
                        // Обновляем данные объекта заказ
                        this.updateBasketOrderData(`delivery_address`, formDeliveryAddresses[this._basketDeliveryData.id]);
                    }
                    break;
                case 2:
                    if (formDeliveryAddresses[this._basketDeliveryData.id] === ``) {
                        formDeliveryMinskAddressInput.classList.add(`error`);
                        // Возвращаем кнопку отправки данных в исходное состояние
                        setTimeout(function () {
                            formSubmitButton.textContent = `Оформить заказ`;
                            formSubmitButton.classList.remove(`button_progress`);
                            formSubmitButton.classList.add(`error`);
                        }, 300);
                    } else {
                        formDeliveryMinskAddressInput.classList.remove(`error`);
                        // Обновляем данные объекта заказ
                        this.updateBasketOrderData(`delivery_address`, formDeliveryAddresses[this._basketDeliveryData.id]);
                    }
                    break;
                case 3:
                    // Обновляем данные объекта заказа
                    this.updateBasketOrderData(`delivery_address`);
                    break;
            }

            // Проверяем номер телефона
            if (!formTelRegex.exec(formTelValue)) {
                formTelInput.classList.add(`error`);
                // Возвращаем кнопку отправки данных в исходное состояние
                setTimeout(function () {
                    formSubmitButton.textContent = `Оформить заказ`;
                    formSubmitButton.classList.remove(`button_progress`);
                    formSubmitButton.classList.add(`error`);
                }, 300);

                return;
            }
            formTelInput.classList.remove(`error`);

            // Наполняем объект корзины данными о клиенте
            this.updateBasketOrderData(`customer_telephone`, formTelValue.replace(/(\(|\)|\-|\s)+/g, ''));
            this.updateBasketOrderData(`customer_name`, formNameValue);
            this.updateBasketOrderData(`customer_message`, formMessageValue);
            // Добавляем данные о доставке
            this.updateBasketOrderData(`delivery_name`, this._basketDeliveryData.name);
            this.updateBasketOrderData(`delivery_price`, this._basketDeliveryData.price);
            // Добавляем данные оплаты
            this.updateBasketOrderData(`payment_name`, this._basketPaymentData.name);
            this.updateBasketOrderData(`products_price`, this._basketProductsPrice);
            this.updateBasketOrderData(`total_price`, this._basketTotalPrice);
            // Добавляем продукты
            this.updateBasketOrderData(`products`, JSON.stringify(storageModule.getStorageProducts()));
            // Добавляем данные по промокоду
            if (this._isPromocode) {
                this.updateBasketOrderData(`promocode_name`, this._promocodeName);
                this.updateBasketOrderData(`promocode_value`, this._promocodeValue);
                this.updateBasketOrderData(`promocode_price`, (this._basketProductsPrice - this._basketProductsPriceWithSale).toFixed(1));
                this.updateBasketOrderData(`products_price_with_sale`, this._basketProductsPriceWithSale);
                this.updateBasketOrderData(`total_price_with_sale`, this._basketTotalPriceWithSale);
            }
            else {
                this._basketOrderData.delete(`promocode_name`);
                this._basketOrderData.delete(`promocode_price`);
                this._basketOrderData.delete(`promocode_value`);
                this._basketOrderData.delete(`products_price_with_sale`);
                this._basketOrderData.delete(`total_price_with_sale`);
            }
            // Добавляем тип запроса
            this.updateBasketOrderData(`action`, `basket`);

            // Отправляем данные заказа на почту
            const basketOrderRequest = this.makeBasketRequest(this._basketOrderData);

            basketOrderRequest
                .then(resp => resp.json())
                .then(data => {
                    if (data.result === `success`) {
                        // Отправляем данные в аналитику Google
                        dataLayer.push({
                            'event': 'order'
                        });
                        // После отправки данных на почту проверяем метод оплаты
                        if (+this._basketPaymentData.id !== 2) {
                            setTimeout(function () {
                                // Обновляем модуль маленькой корзины
                                smallBasketModule.updateSmallBasketQuantity(0);
                                // Удаляем продукт из корзины и обновляем storage
                                this.clearBasket();
                                storageModule.clearStorage();
                                formSubmitButton.classList.remove(`error`);
                                // Закрываем модальное окно корзины
                                jQuery.modal.close();
                                // Показываем модальное окно успешного заказа
                                jQuery(`.success-order`).modal({
                                    fadeDuration: FADE_DURATION,
                                    fadeDelay: FADE_DELAY
                                });
                            }.bind(this), 300);
                        } else {
                            this.updateBasketOrderData(`action`, `online`);

                            const basketPaymentFormRequest = this.makeBasketRequest(this._basketOrderData);
                            basketPaymentFormRequest
                                .then(resp => resp.text())
                                .then(data => {
                                    formSubmitButton.textContent = `Идём на оплату...`;
                                    setTimeout(function () {
                                        // Получаем форму оплаты
                                        const basketPaymentForm = data;
                                        // Инициализируем форму
                                        this._el.insertAdjacentHTML(`beforeend`, basketPaymentForm);
                                        this._el.querySelector(`form[action="https://payment.webpay.by/"]`).submit();
                                    }.bind(this), 300);
                                    // Обновляем модуль маленькой корзины
                                    smallBasketModule.updateSmallBasketQuantity(0);
                                    // Удаляем продукт из корзины и обновляем storage
                                    storageModule.clearStorage();
                                    this.clearBasket();
                                })
                                .catch(() => {
                                    setTimeout(function () {
                                        formSubmitButton.textContent = `Упс. Ошибка...`;
                                    }, 300);
                                });
                        }
                    }
                })
                .catch(() => {
                    setTimeout(function () {
                        formSubmitButton.textContent = `Упс. Ошибка...`;
                    }, 300);
                });
        }

        onBasketClickHandler(evt) {
            const target = evt.target;

            if (target.matches(`.products-list__item-remove-button`)) {
                const productId = +target.closest(`.products-list__item`).dataset.id;

                // Удаляем товар из хранилища
                storageModule.removeStorageProduct(productId);
                // Удаляем товар из разметки
                target.closest(`.products-list__item`).remove();
                // Вычисляем общую цену
                this.calculateBasketProductsPrice(storageModule.getStorageProducts());
                this.calculateBasketTotalPrice();
                // Проверяем количество товара. Если 0, то закрываем модальное окно
                if (!storageModule.getProductQuantity()) {
                    // Обновляем модуль маленькой корзины
                    smallBasketModule.updateSmallBasketQuantity(0);
                    // Закрываем модальное окно корзины
                    jQuery.modal.close();
                }
                else {
                    smallBasketModule.updateSmallBasketQuantity(storageModule.getProductQuantity());
                }
            }
            if (target.matches(`.quantity__btn`)) {
                const productElement = target.closest(`.products-list__item`);
                const productQuantityInputElement = productElement.querySelector(`.quantity__input`);
                const productPriceElement = productElement.querySelector(`.products-list__item-price`);
                const productId = +productElement.dataset.id;
                const productQuantityAction = target.dataset.action;
                let productQuantityValue = +productQuantityInputElement.value;
                let productPriceValue = parseFloat(productPriceElement.textContent);
                const productPriceForOneItem = productPriceValue / productQuantityValue;

                if (productQuantityAction === `add`) {
                    productQuantityValue++;
                }
                if (productQuantityAction === `remove`) {
                    if (productQuantityValue <= 1) {
                        return;
                    }
                    productQuantityValue--;
                }

                productPriceValue = +(productPriceForOneItem * productQuantityValue).toFixed(1);
                // Обновляем данные хранилища
                storageModule.updateStorageProduct(productId, productQuantityValue, productPriceValue);
                // Рендерим товары снова
                this.renderBasketProducts(storageModule.getStorageProducts());
            }
        }

        clearBasket() {
            this._el.querySelector(`.products-list`).innerHTML = ``;
        }

        makeBasketRequest(requestData) {
            return fetch(ajax.url, {
                method: "POST",
                credentials: "same-origin",
                body: requestData
            });
        }

        renderBasketProducts(productsData) {
            if (productsData.length) {
                const basketProducsFragment = document.createDocumentFragment();
                const basketProductsContainer = this._el.querySelector(`.products-list`);

                productsData.forEach(productData => {
                    const basketProduct = this.createBasketProduct(productData);
                    basketProducsFragment.appendChild(basketProduct);
                });

                basketProductsContainer.classList.add(`products-list_in-progress`);
                setTimeout(function () {
                    basketProductsContainer.classList.remove(`products-list_in-progress`);
                }, 600);
                setTimeout(function () {
                    basketProductsContainer.innerHTML = ``;
                    basketProductsContainer.appendChild(basketProducsFragment);
                }, 150);

                // Вычисляем общую цену
                this.calculateBasketProductsPrice(productsData);
                this.calculateBasketTotalPrice();
            }
        }

        createBasketProduct(basketProductData) {
            const basketProductTemplate = document.querySelector(`#basket-product`).content;
            const basketProductClonedTemplateNode = basketProductTemplate.cloneNode(true);
            // Деструктуризация данных
            const {
                id,
                image,
                name,
                cover,
                table,
                quantity,
                price
            } = basketProductData;

            basketProductClonedTemplateNode.querySelector(`.products-list__item`).setAttribute(`data-id`, id);
            basketProductClonedTemplateNode.querySelector(`.products-list__item-img`).setAttribute(`src`, image);
            basketProductClonedTemplateNode.querySelector(`.products-list__item-name`).textContent = name;
            basketProductClonedTemplateNode.querySelector(`.products-list__item-cover`).textContent = `Плёнка: ${cover.toLowerCase()}`;
            // Добавляем размеры в зависимости от типа стола
            if (table.size[1]) {
                basketProductClonedTemplateNode.querySelector(`.products-list__item-size`).textContent = `Размеры: ${table.size[0]} x ${table.size[1]} см`;
                basketProductClonedTemplateNode.querySelector(`.products-list__item-img`).setAttribute(`alt`, `Защитная ${name.toLowerCase()}, ${table.name.toLowerCase()} стол шириной ${table.size[0]} см и длиной ${table.size[1]} см`);
            } else {
                basketProductClonedTemplateNode.querySelector(`.products-list__item-size`).textContent = `Размеры: ${table.size[0]} см`;
                basketProductClonedTemplateNode.querySelector(`.products-list__item-img`).setAttribute(`alt`, `Защитная ${name.toLowerCase()}, ${table.name.toLowerCase()} стол диаметром ${table.size[0]} см`);
            }
            basketProductClonedTemplateNode.querySelector(`.quantity__input`).value = quantity;
            basketProductClonedTemplateNode.querySelector(`.products-list__item-price`).textContent = `${price} BYN`;



            return basketProductClonedTemplateNode;
        }

        calculateBasketProductsPrice(productsData) {
            // Скидываем значение до ноля
            let basketProductsPrice = 0;

            productsData.forEach(productData => {
                basketProductsPrice += +productData.price;
            });
            this.updateBasketProductsPrice(basketProductsPrice);
            this.showBasketProductsPrice();
        }

        calculateBasketTotalPrice(isPromocode = this._isPromocode, promocodeValue = this._promocodeValue) {
            const basketTotalPrice = this._basketProductsPrice + this._basketDeliveryData.price;
            // Обновляем полную стоимость
            this.updateBasketTotalPrice(basketTotalPrice);
            // Проверяем на наличие промокода
            if (isPromocode) {
                const basketProductsPriceWithSale = +(this._basketProductsPrice - (this._basketProductsPrice * (+promocodeValue / 100))).toFixed(1);
                const basketTotalPriceWithSale = basketProductsPriceWithSale + this._basketDeliveryData.price;
                // Обновляем полную стоимость с промокодом
                this.updateBasketProductsPriceWithSale(basketProductsPriceWithSale);
                this.updateBasketTotalPriceWithSale(basketTotalPriceWithSale);
                this.showBasketTotalPrice(true);
                return;
            }
            this.showBasketTotalPrice();
        }

        updateBasketDeliveryData(deliveryId) {
            this._basketDeliveryData = DELIVERY_DATA[deliveryId];

            // Обновляем общую цену
            this.calculateBasketTotalPrice();
        }

        updateBasketPaymentData(paymentId) {
            this._basketPaymentData.id = paymentId;
            this._basketPaymentData.name = PAYMENT_DATA[paymentId].name;
        }

        showBasketTotalPrice(isPromocode = this._isPromocode) {
            if (isPromocode) {
                const basketTotalOldPriceElement = document.createElement(`span`);
                basketTotalOldPriceElement.textContent = `${this._basketTotalPrice} BYN`;
                this._el.querySelector(`.total__item-value[data-price="total"]`).textContent = `${this._basketTotalPriceWithSale} BYN`;
                this._el.querySelector(`.total__item-value[data-price="total"]`).appendChild(basketTotalOldPriceElement);
                return;
            }
            this._el.querySelector(`.total__item-value[data-price="total"]`).textContent = `${this._basketTotalPrice} BYN`;
        }

        showBasketProductsPrice() {
            this._el.querySelector(`.basket__header-total-value`).textContent = `${this._basketProductsPrice} BYN`;
            this._el.querySelector(`.total__item-value[data-price="products"]`).textContent = `${this._basketProductsPrice} BYN`;
        }

        updateBasketOrderData(propName, propValue = ``) {
            this._basketOrderData.set(propName, propValue);
        }

        updateBasketPromocodeData(isPromocode, promocodeValue, promocodeName) {
            this._isPromocode = isPromocode;
            this._promocodeValue = promocodeValue;
            this._promocodeName = promocodeName;

            this.calculateBasketTotalPrice();
        }

        updateBasketTotalPrice(value) {
            this._basketTotalPrice = +value.toFixed(1);
        }

        updateBasketTotalPriceWithSale(value) {
            this._basketTotalPriceWithSale = +value.toFixed(1);
        }

        updateBasketProductsPriceWithSale(value) {
            this._basketProductsPriceWithSale = +value.toFixed(1);
        }

        updateBasketProductsPrice(value) {
            this._basketProductsPrice = +value.toFixed(1);
        }
    }

    const basketInstance = new Basket(`.basket`);
    window.basket = {
        instance: basketInstance
    }
})();