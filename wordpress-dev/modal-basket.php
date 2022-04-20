<?php
/**
 * Template part for displaying basket modal
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package stolstyle
 */

?>

<div id="basket" class="modal basket">
    <form action="multipart/form-data" method="post" class="form basket-form">
        <div class="basket__header">
            <p class="title title_size-s modal__title">Корзина</p>
            <div class="basket__products products-list"></div>
            <p class="basket__header-total">Стоимость товара:<span class="basket__header-total-value"></span></p>
        </div>
        <div class="basket-delivery basket__section basket__delivery">
            <p class="basket__section-title">Доставка<span class="basket__section-title-note">Доставка осуществляется почтовой службой «Европочта»</span></p>
            <div class="basket__section-grid">
                <div class="group group_direction-v delivery-options"></div>
            </div>
            <div class="basket__section-grid">
                <div class="api-delivery">
                    <p class="api-delivery__title">Тип доставки:</p>
                    <div class="group group_direction-v api-delivery__grid">
                        <label class="radio basket__radio api-delivery__radio-item">
                            <input type="radio" checked name="api" class="radio__input">
                            <p class="radio__value">Отделение почтовой связи</p>
                        </label>
                        <label class="radio basket__radio api-delivery__radio-item">
                            <input type="radio" name="api" class="radio__input">
                            <p class="radio__value">Курьерская доставка</p>
                        </label>
                    </div>
                </div>
            </div>
            <div class="basket__section-grid basket-delivery__content delivery-options-content">
                <div data-delivery-id="0" class="form__row basket__section-grid-row delivery-options-content__item delivery-options-content__item_active">
                    <label class="form__label" for="pick-up-point">Выберите отделение:</label>
                    <div class="form__select">
                        <select name="pick-up-point" id="pick-up-point"></select>
                    </div>
                </div>
                <div data-delivery-id="1" class="form__row basket__section-grid-row delivery-options-content__item">
                    <label class="form__label" for="delivery-minsk-address">Укажите <b>адрес</b> доставки:</label>
                    <input class="form__input" inputmode="text" type="text" name="delivery-minsk-address" id="delivery-minsk-address">
                    <span class="wpcf7-not-valid-tip" role="alert" aria-hidden="true">Не введен адрес доставки.</span>
                </div>
                <div data-delivery-id="2" class="form__row basket__section-grid-row delivery-options-content__item">
                    <label class="form__label" for="customer-address">Укажите <b>город</b> и <b>адрес</b> доставки:</label>
                    <input class="form__input" inputmode="text" type="text" name="delivery-address" id="customer-address">
                    <span class="wpcf7-not-valid-tip" role="alert" aria-hidden="true">Не введен город и адрес доставки.</span>
                </div>
                <div data-delivery-id="3" class="form__row basket__section-grid-row delivery-options-content__item">
                    <label class="form__label" for="default-address">Адрес для самовывоза:</label>
                    <input class="form__input" name="default-address" disabled value="у. Минск, ул. Уручская 12А  выходной 30,31 Декабря, 1,2,3 Января" type="text" id="default-address">
                    <a class="form__row-link" href="tel:+375296334466">Уточнить адрес самовывоза</a>
                </div>
            </div>
        </div>
        <div class="basket-payment basket__section basket__payment">
            <p class="basket__section-title">Оплата<span class="basket__section-title-note">Принимаем к оплате карты: "Халва MAX, MIX", "FUN", "Карта покупок"</span></p>
            <div class="basket__section-grid">
                <div class="group payment-options"></div>
            </div>
        </div>
        <div class="basket__section">
            <div class="customer-info form basket__customer-info">
                <div class="form__row">
                    <label class="form__label" for="name">ФИО (для оформления доствки):</label>
                    <input type="text" class="form__input" inputmode="text" name="name">
                </div>
                <div class="form__row">
                    <label class="form__label" for="tel">Ваш номер телефона:</label>
                    <input type="tel" class="form__input" inputmode="tel" name="tel">
                    <span class="wpcf7-not-valid-tip" role="alert" aria-hidden="true">Введен неверный номер телефона.</span>
                </div>
            </div>
            <div class="basket__section-grid">
                <button type="button" class="basket__section-button">Добавить комментарий</button>
                <div class="form__row form__row_state-disabled">
                    <input type="text" inputmode="text" name="message" class="form__input">
                </div>
                <button type="button" class="basket__section-button">Добавить промокод</button>
                <div class="form__row form__row_state-disabled promocode">
                    <input class="form__input promocode__input" type="text" name="promocode" id="promocode">
                    <span class="wpcf7-not-valid-tip" role="alert" aria-hidden="true">Введено неверное значение.</span>
                    <span class="promocode__success-text" role="alert" aria-hidden="true">Промокод успешно применен.</span>
                    <button type="button" class="promocode__btn">Применить</button>
                </div>
            </div>
            <div class="total basket__total">
                <p class="total__item">
                    <span class="total__item-name">Стоимость товара:</span>
                    <span data-price="products" class="total__item-value"></span>
                </p>
                <p class="total__item">
                    <span data-name="delivery" class="total__item-name">Курьером по Беларуси:</span>
                    <span data-price="delivery" class="total__item-value"></span>
                </p>
                <p class="total__item total__item_with-margin">
                    <span class="total__item-name total__item-name_bigger">Итого:</span>
                    <span data-price="total" class="total__item-value total__item-value_bigger"></span>
                </p>
                <footer class="basket__footer">
                    <button type="submit" class="button button_size-l basket__button">Оформить заказ</button>
                    <span class="wpcf7-not-valid-tip" role="alert" aria-hidden="true">Что-то не так :( Проверьте введенные данные.</span>
                    <label class="checkbox privacy-checkbox basket__privacy-checkbox">
                        <input type="checkbox" checked name="privacy" class="checkbox__input privacy-checkbox__input">
                        <p class="checkbox__text">Согласен на обработку <a href="<?php echo esc_url( get_page_link(3) ); ?>" target="_blank" rel="nofollow noopener noreferrer">персональных данных</a></p>
                    </label>
                </footer>
            </div>
        </div>
    </form>
</div>