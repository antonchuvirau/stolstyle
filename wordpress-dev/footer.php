<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package stolstyle
 */

$home_page_id = 2;
$doc_link = 'https://stolstyle.by/wp-content/uploads/2020/10/public_offer.pdf';
?>
<!-- Begin footer -->
<footer class="footer<?php if (!is_page_template('home.php')): ?> footer_style-bg<?php endif; ?><?php if (is_page_template('product.php')): ?> footer_location-page<?php endif; ?>">
	<div class="footer__top">
		<div class="container">
			<div class="row">
				<div class="order-1 col-12 col-xl-2">
					<img class="footer__logo" src="<?php echo get_template_directory_uri(); ?>/img/s-logo.svg" alt="alt">
					<div class="social footer__social">
						<a href="https://www.instagram.com/stolstyle/" target="_blank" rel="noopener noreferrer" class="social__link">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M9.99731 4.86903C7.15795 4.86903 4.86644 7.16058 4.86644 10C4.86644 12.8394 7.15795 15.131 9.99731 15.131C12.8367 15.131 15.1282 12.8394 15.1282 10C15.1282 7.16058 12.8367 4.86903 9.99731 4.86903ZM9.99731 13.3348C8.16111 13.3348 6.66262 11.8362 6.66262 10C6.66262 8.16376 8.16111 6.66525 9.99731 6.66525C11.8335 6.66525 13.332 8.16376 13.332 10C13.332 11.8362 11.8335 13.3348 9.99731 13.3348ZM15.3383 3.46308C14.6754 3.46308 14.14 3.99845 14.14 4.66139C14.14 5.32434 14.6754 5.8597 15.3383 5.8597C16.0013 5.8597 16.5366 5.32684 16.5366 4.66139C16.5368 4.50397 16.5059 4.34806 16.4458 4.20259C16.3856 4.05711 16.2974 3.92493 16.1861 3.81362C16.0748 3.70231 15.9426 3.61405 15.7971 3.5539C15.6516 3.49375 15.4957 3.46289 15.3383 3.46308ZM19.9989 10C19.9989 8.61907 20.0114 7.25064 19.9338 5.87221C19.8563 4.27113 19.4911 2.85017 18.3203 1.67938C17.147 0.506085 15.7286 0.14334 14.1275 0.065788C12.7466 -0.0117644 11.3782 0.000744113 9.99981 0.000744113C8.61891 0.000744113 7.25051 -0.0117644 5.8721 0.065788C4.27105 0.14334 2.85012 0.508587 1.67935 1.67938C0.506076 2.85267 0.143338 4.27113 0.0657868 5.87221C-0.0117642 7.25314 0.000744099 8.62157 0.000744099 10C0.000744099 11.3784 -0.0117642 12.7494 0.0657868 14.1278C0.143338 15.7289 0.508578 17.1498 1.67935 18.3206C2.85262 19.4939 4.27105 19.8567 5.8721 19.9342C7.25301 20.0118 8.62141 19.9993 9.99981 19.9993C11.3807 19.9993 12.7491 20.0118 14.1275 19.9342C15.7286 19.8567 17.1495 19.4914 18.3203 18.3206C19.4936 17.1473 19.8563 15.7289 19.9338 14.1278C20.0139 12.7494 19.9989 11.3809 19.9989 10ZM17.7974 15.899C17.6148 16.3543 17.3947 16.6945 17.0419 17.0448C16.6892 17.3975 16.3515 17.6176 15.8962 17.8003C14.5803 18.3231 11.4558 18.2055 9.99731 18.2055C8.53885 18.2055 5.4118 18.3231 4.09593 17.8028C3.64064 17.6201 3.30041 17.4 2.95018 17.0473C2.59745 16.6945 2.37731 16.3568 2.19469 15.9015C1.67434 14.5831 1.79192 11.4585 1.79192 10C1.79192 8.54151 1.67434 5.4144 2.19469 4.09851C2.37731 3.6432 2.59745 3.30298 2.95018 2.95274C3.30291 2.6025 3.64064 2.37985 4.09593 2.19723C5.4118 1.67688 8.53885 1.79446 9.99731 1.79446C11.4558 1.79446 14.5828 1.67688 15.8987 2.19723C16.354 2.37985 16.6942 2.6 17.0444 2.95274C17.3972 3.30548 17.6173 3.6432 17.7999 4.09851C18.3203 5.4144 18.2027 8.54151 18.2027 10C18.2027 11.4585 18.3203 14.5831 17.7974 15.899Z" fill="#8B71B5" />
							</svg>
						</a>
						<a href="skype:stolstyle?chat" target="_blank" rel="noopener noreferrer" class="social__link">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M19.2921 11.6414C19.2858 11.6766 19.2813 11.7121 19.2747 11.7473L19.2405 11.5458C19.2592 11.5772 19.2747 11.6098 19.2921 11.6415C19.3963 11.0768 19.449 10.5038 19.4495 9.92953C19.4495 8.65469 19.1999 7.41781 18.7068 6.25351C18.231 5.12883 17.5504 4.11875 16.6826 3.25156C15.816 2.38437 14.8052 1.70367 13.6812 1.22797C12.5172 0.735469 11.2804 0.485859 10.0055 0.485859C9.40477 0.485859 8.80289 0.542266 8.21727 0.654687C8.21602 0.655 8.21445 0.655 8.21281 0.655312C8.24578 0.672734 8.27906 0.688281 8.31133 0.706328L8.11273 0.675234C8.14602 0.668984 8.17961 0.661953 8.21281 0.655312C7.40938 0.228125 6.50563 0 5.59094 0C4.09766 0 2.69352 0.581484 1.6375 1.63781C0.581797 2.69383 0 4.09789 0 5.59125C0.00050694 6.53986 0.242594 7.47272 0.703437 8.30187C0.709453 8.26766 0.713594 8.23312 0.720234 8.1989L0.754453 8.39687C0.736719 8.36586 0.721172 8.33352 0.703437 8.30187C0.609443 8.83934 0.561872 9.3839 0.56125 9.92953C0.56125 11.2047 0.810859 12.4412 1.30398 13.6059C1.77906 14.7309 2.46008 15.7402 3.32695 16.6074C4.19477 17.4747 5.20422 18.1563 6.32953 18.6308C7.49359 19.1242 8.7307 19.3741 10.0055 19.3741C10.5605 19.3741 11.1166 19.3234 11.6595 19.2272C11.6278 19.2095 11.5955 19.1933 11.5632 19.1746L11.765 19.2101C11.7302 19.2167 11.695 19.2209 11.6595 19.2272C12.4985 19.702 13.446 19.9517 14.41 19.9519C15.903 19.9519 17.3065 19.3712 18.3625 18.3147C19.4187 17.2593 20 15.8549 20 14.3616C19.9995 13.4094 19.7558 12.4731 19.2921 11.6415V11.6414ZM10.0432 15.7134C6.68812 15.7134 5.18711 14.0638 5.18711 12.8277C5.18711 12.1935 5.65523 11.7491 6.30039 11.7491C7.73617 11.7491 7.3643 13.8108 10.0432 13.8108C11.4147 13.8108 12.172 13.0661 12.172 12.3041C12.172 11.8458 11.9459 11.3377 11.0428 11.115L8.05859 10.3701C5.65523 9.76734 5.21906 8.46812 5.21906 7.2468C5.21906 4.71109 7.60656 3.75898 9.84875 3.75898C11.9141 3.75898 14.3489 4.90047 14.3489 6.42172C14.3489 7.07359 13.7845 7.45266 13.1395 7.45266C11.9141 7.45266 12.1397 5.75656 9.67141 5.75656C8.44656 5.75656 7.76813 6.31125 7.76813 7.10492C7.76813 7.89711 8.73547 8.15016 9.57539 8.3414L11.7843 8.83172C14.2038 9.37078 14.8173 10.7834 14.8173 12.114C14.8173 14.1747 13.2355 15.7134 10.0432 15.7134ZM11.5632 19.1746C11.5955 19.1934 11.6278 19.2095 11.6595 19.2272C11.695 19.2209 11.7302 19.2167 11.765 19.21L11.5632 19.1746ZM19.2747 11.7473C19.2813 11.7121 19.2858 11.6766 19.2921 11.6415C19.2747 11.6098 19.2591 11.5772 19.2405 11.5458L19.2747 11.7473ZM0.720234 8.1989C0.713594 8.23312 0.709453 8.26766 0.703437 8.30187C0.721172 8.33352 0.736719 8.36586 0.754453 8.39687L0.720234 8.1989ZM8.31133 0.706328C8.27906 0.688281 8.24578 0.672734 8.21289 0.655312C8.17961 0.661953 8.14602 0.668906 8.11273 0.675234L8.31133 0.706328Z" fill="#8B71B5" />
							</svg>
						</a>
					</div>
				</div>
				<div class="order-3 order-lg-2 col-12 col-lg-8 col-xl-7">
					<div class="footer__menu">
						<div class="footer__menu-col">
							<a href="<?php echo esc_url(home_url()); ?>/informaciya-o-plenke/" class="footer__menu-link">О плёнке</a>
							<a href="<?php echo esc_url(home_url()); ?>/#about" class="footer__menu-link">Виды плёнок</a>
							<a href="<?php echo esc_url(home_url()); ?>/#calculation" class="footer__menu-link">Калькулятор</a>
							<a href="<?php echo esc_url(home_url()); ?>/#gallery" class="footer__menu-link">Фотогалерея</a>
							<a href="<?php echo esc_url(home_url()); ?>/#advantages" class="footer__menu-link">Преимущества</a>
							<a href="<?php echo esc_url(home_url()); ?>/#testimonials" class="footer__menu-link">Отзывы</a>
							<a href="<?php echo esc_url(home_url()); ?>/novosti-i-akcii/" class="footer__menu-link">Новости и акции</a>
						</div>
						<div class="footer__menu-col">
							<a href="<?php echo esc_url(home_url()); ?>/#order" class="footer__menu-link">Как заказать?</a>
							<a href="<?php echo esc_url( get_page_link( 613 ) ); ?>" class="footer__menu-link">Доставка</a>
							<a href="<?php echo esc_url( get_page_link( 615 ) ); ?>" class="footer__menu-link">Как оплатить?</a>
							<a href="<?php echo esc_url(home_url()); ?>/#contacts" class="footer__menu-link">Контакты</a>
						</div>
						<div class="footer__menu-col">
							<a href="<?php echo esc_url(home_url()); ?>/privacy-policy/" class="footer__menu-link">Политика конфиденциальности</a>
							<a href="<?php echo esc_url(home_url()); ?>/instrukciya/" class="footer__menu-link">Инструкция</a>
							<a class="footer__menu-link" target="_blank" rel="noopener noreferrer" href="<?php echo esc_url($doc_link); ?>">
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 511.626 511.627" style="enable-background:new 0 0 511.626 511.627;" xml:space="preserve">
									<path d="M392.857,292.354h-18.274c-2.669,0-4.859,0.855-6.563,2.573c-1.718,1.708-2.573,3.897-2.573,6.563v91.361 c0,12.563-4.47,23.315-13.415,32.262c-8.945,8.945-19.701,13.414-32.264,13.414H82.224c-12.562,0-23.317-4.469-32.264-13.414 c-8.945-8.946-13.417-19.698-13.417-32.262V155.31c0-12.562,4.471-23.313,13.417-32.259c8.947-8.947,19.702-13.418,32.264-13.418 h200.994c2.669,0,4.859-0.859,6.57-2.57c1.711-1.713,2.566-3.9,2.566-6.567V82.221c0-2.662-0.855-4.853-2.566-6.563 c-1.711-1.713-3.901-2.568-6.57-2.568H82.224c-22.648,0-42.016,8.042-58.102,24.125C8.042,113.297,0,132.665,0,155.313v237.542 c0,22.647,8.042,42.018,24.123,58.095c16.086,16.084,35.454,24.13,58.102,24.13h237.543c22.647,0,42.017-8.046,58.101-24.13 c16.085-16.077,24.127-35.447,24.127-58.095v-91.358c0-2.669-0.856-4.859-2.574-6.57 C397.709,293.209,395.519,292.354,392.857,292.354z"/>
									<path d="M506.199,41.971c-3.617-3.617-7.905-5.424-12.85-5.424H347.171c-4.948,0-9.233,1.807-12.847,5.424 c-3.617,3.615-5.428,7.898-5.428,12.847s1.811,9.233,5.428,12.85l50.247,50.248L198.424,304.067 c-1.906,1.903-2.856,4.093-2.856,6.563c0,2.479,0.953,4.668,2.856,6.571l32.548,32.544c1.903,1.903,4.093,2.852,6.567,2.852 s4.665-0.948,6.567-2.852l186.148-186.148l50.251,50.248c3.614,3.617,7.898,5.426,12.847,5.426s9.233-1.809,12.851-5.426 c3.617-3.616,5.424-7.898,5.424-12.847V54.818C511.626,49.866,509.813,45.586,506.199,41.971z"/>
								</svg>
								Договор оферты
							</a>
						</div>
					</div>
				</div>
				<div class="order-2 order-lg-3 col-12 col-lg-4 col-xl-3">
					<div class="footer__info">
						<a class="footer__info-link" href="tel:+375296334466">+375 (29) 633-44-66</a>
						<a class="footer__info-link" href="tel:+375333434466">+375 (33) 343-44-66</a>
						<a class="footer__info-link footer__info-link_less" href="mailto:info@stolstyle.by">info@stolstyle.by</a>
						<p class="footer__info-text">09:00-21:00 без выходных</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="footer__copyright">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<p class="footer__text">&copy; 2020 <?php echo get_field('copyright', $home_page_id); ?></p>
					<p class="footer__text webpay-info footer__webpay">Предоставляемая Вами персональная информация (например: имя, адрес, телефон, e-mail, номер банковской карты и прочее) является конфиденциальной и не подлежит разглашению.<br>Данные карточки передаются только в зашифрованном виде и не сохраняются на данном интернет-ресурсе.</p>
					<div class="footer__payment-icons">
						<img class="footer__payment-image" src="<?php echo esc_url(get_template_directory_uri()); ?>/img/payment-icons-top@2x.png" alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
						<img class="footer__payment-image" src="<?php echo esc_url(get_template_directory_uri()); ?>/img/payment-icons-bottom@2x.png" alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>
<!-- End footer -->
<!-- Begin templates -->
<template id="calculator-option">
	<label class="calculation-form__radio">
		<div class="calculation-form__radio-icon">
			<img alt="Защитная плёнка на стол">
		</div>
		<input type="radio" class="calculation-form__radio-input">
		<p class="calculation-form__radio-value"></p>
		<a class="d-none calculation-form__radio-link">Подробнее</a>
	</label>
</template>
<template id="calculator-size-input">
	<div class="group__col calculation-form__section-group calculator-form-field">
		<p class="calculation-form__label"></p>
		<div class="calculation-form__container">
			<input type="text" class="calculation-form__input">
			<span class="error-label">Введено неверное значение.</span>
		</div>
	</div>
</template>
<template id="basket-option">
	<label class="radio basket__radio">
		<input type="radio" class="radio__input">
		<p class="radio__value"></p>
	</label>
</template>
<template id="basket-product">
	<div class="products-list__item">
		<div class="products-list__item-media"><img class="products-list__item-img"></div>
		<div class="products-list__item-options">
			<p class="products-list__item-name"></p>
			<p class="products-list__item-cover"></p>
			<p class="products-list__item-size"></p>
			<div class="quantity products-list__item-quantity">
				<button data-action="remove" type="button" class="quantity__btn quantity__btn-minus">
					<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
					 	<path d="M15 1.875C7.75195 1.875 1.875 7.75195 1.875 15C1.875 22.248 7.75195 28.125 15 28.125C22.248 28.125 28.125 22.248 28.125 15C28.125 7.75195 22.248 1.875 15 1.875ZM20.625 15.7031C20.625 15.832 20.5195 15.9375 20.3906 15.9375H9.60938C9.48047 15.9375 9.375 15.832 9.375 15.7031V14.2969C9.375 14.168 9.48047 14.0625 9.60938 14.0625H20.3906C20.5195 14.0625 20.625 14.168 20.625 14.2969V15.7031Z" fill="#C4C4C4" />
					</svg>
				</button>
				<input type="text" value="" name="quantity" class="quantity__input">
				<button data-action="add" type="button" class="quantity__btn quantity__btn-plus">
					<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M15 1.875C7.75195 1.875 1.875 7.75195 1.875 15C1.875 22.248 7.75195 28.125 15 28.125C22.248 28.125 28.125 22.248 28.125 15C28.125 7.75195 22.248 1.875 15 1.875ZM20.625 15.7031C20.625 15.832 20.5195 15.9375 20.3906 15.9375H15.9375V20.3906C15.9375 20.5195 15.832 20.625 15.7031 20.625H14.2969C14.168 20.625 14.0625 20.5195 14.0625 20.3906V15.9375H9.60938C9.48047 15.9375 9.375 15.832 9.375 15.7031V14.2969C9.375 14.168 9.48047 14.0625 9.60938 14.0625H14.0625V9.60938C14.0625 9.48047 14.168 9.375 14.2969 9.375H15.7031C15.832 9.375 15.9375 9.48047 15.9375 9.60938V14.0625H20.3906C20.5195 14.0625 20.625 14.168 20.625 14.2969V15.7031Z" fill="#C4C4C4" />
					</svg>
				</button>
			</div>
		</div>
		<p class="products-list__item-price"></p>
		<button type="button" class="products-list__item-remove-button">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M15.8334 5.34175L14.6584 4.16675L10.0001 8.82508L5.34175 4.16675L4.16675 5.34175L8.82508 10.0001L4.16675 14.6584L5.34175 15.8334L10.0001 11.1751L14.6584 15.8334L15.8334 14.6584L11.1751 10.0001L15.8334 5.34175Z" fill="#C4C4C4" />
			</svg>
		</button>
	</div>
</template>
<template id="modal">
	<div class="modal-content__grid">
		<p class="title title_size-s modal-content__title"></p>
		<div class="modal-content__text"></div>
	</div>
</template>
<!-- End templates -->
<!-- Begin modal -->
<?php
	// Корзина
	get_template_part('template-parts/modal', 'basket');
	// Способы оплаты
	get_template_part('template-parts/modal', 'payment');
	// Адреса доставки
	get_template_part('template-parts/modal', 'evropochta');
	// Обратный звонок
	get_template_part('template-parts/modal', 'callback');
	// Успешная отправка заявки на обратный звонок
	get_template_part('template-parts/modal', 'success-callback');
	// Успешное добавление товара в корзину
	get_template_part('template-parts/modal', 'success-basket');
	// Успешный заказ товвара
	get_template_part('template-parts/modal', 'success-order');
	// Контент
	if (is_page_template('home.php')):
		get_template_part('template-parts/modal', 'content');
		get_template_part('template-parts/modal', 'table-1');
		get_template_part('template-parts/modal', 'table-4');
	endif;
?>
<!-- End modal -->
<?php wp_footer(); ?>
	</body>
</html>