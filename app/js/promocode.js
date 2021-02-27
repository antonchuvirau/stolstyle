(function () {
    const basketModule = window.basket.instance;

    class Promocode {
        constructor(promocodeContainer) {
            this._el = document.querySelector(promocodeContainer);

            if (this._el) {
                // Создаем объект с данными
                this._promocodeData = new FormData();
                this._promocodeData.set(`action`, `promocode`);
                // Добавляем событие
                this._el.addEventListener(`click`, this.onPromocodeContainerClickHandler.bind(this));
            }
        }

        onPromocodeContainerClickHandler(evt) {
            const target = evt.target;

            if (target.matches(`.promocode__btn`)) {
                const targetAction = target.dataset.action;
                const promocodeInput = this._el.querySelector(`input`);

                if (targetAction !== `remove`) {
                    const promocodeInputValue = promocodeInput.value;
                    target.textContent = `Проверяем...`;
                    target.classList.add(`promocode__btn_progress`);

                    if (promocodeInputValue) {
                        this._promocodeData.set(`value`, promocodeInputValue);
                        const promocodeRequest = this.makePromocodeRequest(this._promocodeData);

                        promocodeRequest
                            .then(resp => resp.json())
                            .then(data => {
                                console.log(data);
                                const result = data.find(dataItem => dataItem[`name`].toLowerCase() === promocodeInputValue.toLowerCase());

                                if (result) {
                                    setTimeout(function () {
                                        promocodeInput.classList.remove(`error`);
                                        promocodeInput.classList.add(`promocode__input_disabled`);
                                        this._el.classList.add(`promocode_success`);
                                        target.classList.remove(`promocode__btn_progress`);
                                        target.textContent = `Удалить промокод`;
                                        target.dataset.action = `remove`;
                                        // Обновляем итоговую стоимость в корзине
                                        basketModule.updateBasketPromocodeData(true, result.value, promocodeInputValue.toUpperCase());
                                    }.bind(this), TIMEOUT);
                                } else {
                                    setTimeout(function () {
                                        promocodeInput.classList.add(`error`);
                                        this._el.classList.remove(`promocode_success`);
                                        target.classList.remove(`promocode__btn_progress`);
                                        target.textContent = `Применить`;
                                    }.bind(this), TIMEOUT);
                                }
                            });
                    } else {
                        setTimeout(function () {
                            promocodeInput.classList.add(`error`);
                            target.classList.remove(`promocode__btn_progress`);
                            target.textContent = `Применить`;
                        }, TIMEOUT);
                    }
                }
                else {
                    target.textContent = `Удаляем...`;
                    target.classList.add(`promocode__btn_progress`);
                    this.deletePromocode();
                }
            }
        }

        makePromocodeRequest(requestData) {
            return fetch(ajax.url, {
                method: "POST",
                credentials: "same-origin",
                body: requestData
            });
        }

        deletePromocode() {
            setTimeout(function() {
                // Сбрасываем все значения
                this._el.classList.remove(`promocode_success`);
                this._el.querySelector(`.promocode__input`).value = ``;
                this._el.querySelector(`.promocode__input`).classList.remove(`promocode__input_disabled`, `error`);
                this._el.querySelector(`.promocode__btn`).classList.remove(`promocode__btn_progress`);
                this._el.querySelector(`.promocode__btn`).removeAttribute(`data-action`);
                this._el.querySelector(`.promocode__btn`).textContent = `Применить`
                // Обновляем общею цену, удаляя данные по промокоду
                basketModule.updateBasketPromocodeData(false, 0, ``);
            }.bind(this), TIMEOUT);
        }
    }

    const promocodeInstance = new Promocode(`.promocode`);
    window.promocode = {
        instance: promocodeInstance
    }
})();