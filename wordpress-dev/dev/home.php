<?php
/**
 * Template Name: Главная
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package stolstyle
 */

get_header();
$page_id = 2;
?>

<!-- Begin main -->
<main class="main">
	<?php $banner_image = get_field('banner_image', 2); ?>
	<section id="covers" class="section hero">
		<div class="container hero__container">
			<div class="row">
				<div class="col-12">
					<div class="hero__img" style="background-image: url('<?php echo $banner_image; ?>');"></div>
					<div class="hero__layer"></div>
					<div class="hero__wrapper">
						<h1 class="title title_size-l hero__title"><?php the_field('home_hero_title', $page_id); ?></h1>
						<div class="hero__desc"><?php echo get_field('home_hero_desc', $page_id); ?></div>
						<a href="/#calculation" class="button button_size-l hero__button">Рассчитать стоимость</a>
					</div>
				</div>
			</div>
		</div>
	</section>
	<?php $categories = get_field('categories', 2); if ($categories): ?>
	<section class="b-categories">
		<div class="container b-categories__container">
			<div class="row">
				<div class="col-12">
					<div class="b-categories__swiper swiper-container">
						<div class="swiper-wrapper">
							<?php foreach ($categories as $category): ?>
							<div class="swiper-slide b-categories__item">
								<a href="<?php echo $category['link']; ?>"
									class="b-categories-item b-categories__item-box">
									<div class="b-categories-item__img"
										style="background-image: url('<?php echo $category['image']; ?>')"></div>
									<div class="b-categories-item__box">
										<p class="b-categories-item__title"><?php echo $category['name']; ?></p>
										<p class="b-categories-item__price"><?php echo $category['price']; ?></p>
									</div>
								</a>
							</div>
							<?php endforeach; ?>
						</div>
					</div>
					<div class="swiper-pagination b-categories__pagination"></div>
				</div>
			</div>
		</div>
	</section>
	<?php endif; ?>
	<section id="about" class="section about">
		<div class="container">
			<div class="row">
				<div class="order-2 order-lg-1 col-12 col-lg-7 col-xl-6 offset-xl-1">
					<div class="carousel about-carousel">
						<div class="layer about-carousel__layer"></div>
						<?php
						$cover_pages_settings = array(array('id' => 38), array('id' => 40));
						if ($cover_pages_settings):
						?>
						<div class="swiper-container about-carousel__grid">
							<div class="swiper-wrapper">
								<?php foreach ($cover_pages_settings as $page): $page_object = get_post($page['id']); ?>
								<div class="swiper-slide about-carousel__item">
									<a href="<?php echo esc_url(get_page_link($page_object->ID)); ?>"
										class="about-carousel__item-img"><img
											src="<?php echo get_field('product_img', $page_object->ID); ?>"
											alt="<?php echo esc_attr(get_bloginfo('name')); ?>"></a>
									<a href="<?php echo esc_url(get_page_link($page_object->ID)); ?>"
										class="about-carousel__item-name"><?php echo get_field('product_title', $page_object->ID); ?></a>
									<p class="about-carousel__item-desc">
										<?php echo get_field('product_note', $page_object->ID); ?></p>
								</div>
								<?php endforeach; ?>
							</div>
						</div>
						<div class="swiper-pagination about-carousel__pagination"></div>
						<button
							class="carousel__btn carousel__btn-prev about-carousel__arrow about-carousel__arrow-prev">
							<svg width="40" height="40" viewBox="0 0 40 40" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M21.1783 28.8215L14.0233 21.6665H30V18.3332H14.0233L21.1783 11.1782L18.8217 8.82153L7.64333 19.9999L18.8217 31.1782L21.1783 28.8215Z"
									fill="#787878" />
							</svg>
						</button>
						<button
							class="carousel__btn carousel__btn-next about-carousel__arrow about-carousel__arrow-next">
							<svg width="40" height="40" viewBox="0 0 40 40" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M18.8217 28.8215L25.9767 21.6665H10V18.3332H25.9767L18.8217 11.1782L21.1783 8.82153L32.3567 19.9999L21.1783 31.1782L18.8217 28.8215Z"
									fill="#787878" />
							</svg>
						</button>
						<?php endif; ?>
					</div>
				</div>
				<div class="order-1 order-lg-2 col-12 col-lg-5 col-xl-5">
					<h2 class="title about__title"><?php the_field('home_products_title', $page_id); ?></h2>
					<div class="about__list">
						<?php the_field('home_products_desc', $page_id); ?>
					</div>
				</div>
			</div>
		</div>
	</section>
	<?php if ( get_field('sale', 2) ): ?>
	<section class="section sale">
		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-6">
					<h3 class="title title_size-s sale__title"><?php echo get_field( 'sale_title', 2 ); ?></h3>
					<p class="sale__text"><?php echo get_field( 'sale_desc', 2 ); ?></p>
					<div data-date="<?php get_field('sale_date', 2) ? the_field('sale_date', 2) : '12/04/2020'; ?>"
						class="sale__timer timer">
						<p class="timer__item">
							<span class="days timer__item-value"></span>
							<span class="timer__item-name">Дни</span>
						</p>:
						<p class="timer__item">
							<span class="hours timer__item-value"></span>
							<span class="timer__item-name">Часы</span>
						</p>:
						<p class="timer__item">
							<span class="minutes timer__item-value"></span>
							<span class="timer__item-name">Минуты</span>
						</p>:
						<p class="timer__item">
							<span class="seconds timer__item-value"></span>
							<span class="timer__item-name">Секунды</span>
						</p>
					</div>
					<?php
					$sale_button_link_id = get_field( 'sale_link', 2 );
					?>
					<a href="<?php if ( $sale_button_link_id ): echo esc_url( get_permalink( $sale_button_link_id ) ); ?><?php else: ?>#calculation<?php endif; ?>"
						class="button button_size-l sale__button">Купить</a>
				</div>
				<div class="d-none d-lg-block col-12 col-lg-5 offset-lg-1">
					<img class="sale__img" src="<?php echo get_field('sale_image', 2); ?>"
						alt="Скидка на пленку только сегодня">
				</div>
			</div>
		</div>
	</section>
	<?php endif; ?>
	<section id="calculation" class="section calculation">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<h3 class="title calculation__title">Калькулятор стоимости</h3>
					<div class="calculation__grid">
						<form class="calculation-form">
							<!-- <div class="calculation-form__section">
								<p class="calculation-form__section-name">Выберите товар</p>
								<div class="calculation-form__section-container calculation-form__group calculator-products"></div>
								<div class="calculation-form__section-note calculation-form__section-note_hidden"><?php echo get_field('tablecloth', 2); ?></div>
							</div> -->
							<div class="calculation-form__wrapper calculation-form__wrapper_style-flex">
								<div class="calculation-form__col">
									<div class="calculation-form__section">
										<p class="calculation-form__section-name">1. Выберите форму вашего стола</p>
										<div class="calculation-form__section-container calculation-form__group calculator-tables"></div>
									</div>
									<div class="b-radius calculation-form__section-radius">
										<label class="checkbox b-radius__checkbox">
											<input type="checkbox" name="radius" class="checkbox__input b-radius__checkbox-input">
											<p class="checkbox__text">Вырезать пленку с закругленными углами</p>
										</label>
										<div class="d-none b-radius__grid">
											<div class="b-radius__container">
												<p class="b-radius__title">Выберите радиус закругления углов (см.)</p>
												<p class="b-radius__label">Радиус, см:</p>
												<div class="quantity radius-quantity b-radius__handler">
													<button type="button" data-action="remove"
														class="quantity__btn quantity__btn-minus">
														<svg width="30" height="30" viewBox="0 0 30 30" fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M15 1.875C7.75195 1.875 1.875 7.75195 1.875 15C1.875 22.248 7.75195 28.125 15 28.125C22.248 28.125 28.125 22.248 28.125 15C28.125 7.75195 22.248 1.875 15 1.875ZM20.625 15.7031C20.625 15.832 20.5195 15.9375 20.3906 15.9375H9.60938C9.48047 15.9375 9.375 15.832 9.375 15.7031V14.2969C9.375 14.168 9.48047 14.0625 9.60938 14.0625H20.3906C20.5195 14.0625 20.625 14.168 20.625 14.2969V15.7031Z"
																fill="#C4C4C4" />
														</svg>
													</button>
													<input type="text" value="0" name="quantity"
														class="quantity__input">
													<button type="button" data-action="add"
														class="quantity__btn quantity__btn-plus">
														<svg width="30" height="30" viewBox="0 0 30 30" fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M15 1.875C7.75195 1.875 1.875 7.75195 1.875 15C1.875 22.248 7.75195 28.125 15 28.125C22.248 28.125 28.125 22.248 28.125 15C28.125 7.75195 22.248 1.875 15 1.875ZM20.625 15.7031C20.625 15.832 20.5195 15.9375 20.3906 15.9375H15.9375V20.3906C15.9375 20.5195 15.832 20.625 15.7031 20.625H14.2969C14.168 20.625 14.0625 20.5195 14.0625 20.3906V15.9375H9.60938C9.48047 15.9375 9.375 15.832 9.375 15.7031V14.2969C9.375 14.168 9.48047 14.0625 9.60938 14.0625H14.0625V9.60938C14.0625 9.48047 14.168 9.375 14.2969 9.375H15.7031C15.832 9.375 15.9375 9.48047 15.9375 9.60938V14.0625H20.3906C20.5195 14.0625 20.625 14.168 20.625 14.2969V15.7031Z"
																fill="#C4C4C4" />
														</svg>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="b-alerts calculation-form__alerts calculation-form__alerts_style-margin-top">
										<div class="b-alerts__item">
											<div class="b-alerts__container">
												<span class="calculation-form__section-alert">Вырезаем точно в размер. Усадка пройдена <a target="_blank" rel="noopener noreferrer" class="link" href="/process-usadki-zashitnoj-plenki/">Подробнее</a></span>
											</div>
										</div>
										<div class="b-alerts__item"></div>
										<div class="d-none b-alerts__item">
											<div class="b-alerts__container">
												<span class="calculation-form__section-alert">Для данных столов мы вырезаем прямоугольную форму. Подрезать можно по нашей <a href="<?php echo esc_url( get_page_link(197) ); ?>">инструкции</a></span>
											</div>
										</div>
										<div class="d-none b-alerts__item">
											<div class="b-alerts__container">
												<span class="calculation-form__section-alert">Внимание! Заказ на овальные столы оформляется через нашего менеджера. Для этого пришлите фото вашего стола в <a href="https://msng.link/o/?375296334466=vi">Viber</a>.</span>
											</div>
										</div>
										<div class="d-none b-alerts__item">
											<div class="b-alerts__container">
												<span class="calculation-form__section-alert">Для фигурных столов мы вырезаем прямоугольную форму. Подрезать можно по нашей <a href="<?php echo esc_url( get_page_link(197) ); ?>">инструкции</a></span>
											</div>
										</div>
										<div class="b-alerts__container b-alerts__item">
											<span class="calculation-form__section-alert">Подробнее о том как измерить радиус угла <button class="link" type="button" data-modal="#modal-table-1">по ссылке</button></span>
										</div>
									</div>
							</div>
							<div class="calculation-form__wrapper calculation-form__wrapper_style-flex">
								<div class="calculation-form__col">
									<div class="calculation-form__section">
										<p class="calculation-form__section-name">2. Выберите тип желаемой пленки</p>
										<div class="calculation-form__section-container calculation-form__group calculator-covers"></div>
									</div>
								</div>
								<div class="b-alerts calculation-form__alerts">
									<div class="b-alerts__item">
										<div class="b-alerts__container">
											<span class="calculation-form__section-alert">
												<a target="_blank" rel="noopener noreferrer" class="link" href="/glyancevaya-plenka/">О глянцевой пленке</a>
												<br>
												<a target="_blank" rel="noopener noreferrer" class="link" href="/riflenaya-plenka/">О рифленой пленке</a>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class="calculation-form__wrapper">
								<div class="calculation-form__section">
									<p class="calculation-form__section-name">3. Укажите размеры и количество</p>
									<div class="calculation-form__section-container group calculator-inputs">
										<div class="calculation-form__section-container calculation-form__quantity">
											<p class="calculation-form__label">Количество, штук</p>
											<div class="calculation-form__container quantity calculator-quantity">
												<button type="button" data-action="remove"
													class="quantity__btn quantity__btn-minus">
													<svg width="30" height="30" viewBox="0 0 30 30" fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<path
															d="M15 1.875C7.75195 1.875 1.875 7.75195 1.875 15C1.875 22.248 7.75195 28.125 15 28.125C22.248 28.125 28.125 22.248 28.125 15C28.125 7.75195 22.248 1.875 15 1.875ZM20.625 15.7031C20.625 15.832 20.5195 15.9375 20.3906 15.9375H9.60938C9.48047 15.9375 9.375 15.832 9.375 15.7031V14.2969C9.375 14.168 9.48047 14.0625 9.60938 14.0625H20.3906C20.5195 14.0625 20.625 14.168 20.625 14.2969V15.7031Z"
															fill="#C4C4C4" />
													</svg>
												</button>
												<input type="text" value="1" name="quantity" class="quantity__input">
												<button type="button" data-action="add"
													class="quantity__btn quantity__btn-plus">
													<svg width="30" height="30" viewBox="0 0 30 30" fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<path
															d="M15 1.875C7.75195 1.875 1.875 7.75195 1.875 15C1.875 22.248 7.75195 28.125 15 28.125C22.248 28.125 28.125 22.248 28.125 15C28.125 7.75195 22.248 1.875 15 1.875ZM20.625 15.7031C20.625 15.832 20.5195 15.9375 20.3906 15.9375H15.9375V20.3906C15.9375 20.5195 15.832 20.625 15.7031 20.625H14.2969C14.168 20.625 14.0625 20.5195 14.0625 20.3906V15.9375H9.60938C9.48047 15.9375 9.375 15.832 9.375 15.7031V14.2969C9.375 14.168 9.48047 14.0625 9.60938 14.0625H14.0625V9.60938C14.0625 9.48047 14.168 9.375 14.2969 9.375H15.7031C15.832 9.375 15.9375 9.48047 15.9375 9.60938V14.0625H20.3906C20.5195 14.0625 20.625 14.168 20.625 14.2969V15.7031Z"
															fill="#C4C4C4" />
													</svg>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="calculation-form__section">
								<!-- <div class="calculation-form__section-container calculation-form__quantity">
									<p class="calculation-form__label">Количество, штук</p>
									<div class="calculation-form__container quantity calculator-quantity">
										<button type="button" data-action="remove" class="quantity__btn quantity__btn-minus">
											<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M15 1.875C7.75195 1.875 1.875 7.75195 1.875 15C1.875 22.248 7.75195 28.125 15 28.125C22.248 28.125 28.125 22.248 28.125 15C28.125 7.75195 22.248 1.875 15 1.875ZM20.625 15.7031C20.625 15.832 20.5195 15.9375 20.3906 15.9375H9.60938C9.48047 15.9375 9.375 15.832 9.375 15.7031V14.2969C9.375 14.168 9.48047 14.0625 9.60938 14.0625H20.3906C20.5195 14.0625 20.625 14.168 20.625 14.2969V15.7031Z" fill="#C4C4C4" />
											</svg>
										</button>
										<input type="text" value="1" name="quantity" class="quantity__input">
										<button type="button" data-action="add" class="quantity__btn quantity__btn-plus">
											<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M15 1.875C7.75195 1.875 1.875 7.75195 1.875 15C1.875 22.248 7.75195 28.125 15 28.125C22.248 28.125 28.125 22.248 28.125 15C28.125 7.75195 22.248 1.875 15 1.875ZM20.625 15.7031C20.625 15.832 20.5195 15.9375 20.3906 15.9375H15.9375V20.3906C15.9375 20.5195 15.832 20.625 15.7031 20.625H14.2969C14.168 20.625 14.0625 20.5195 14.0625 20.3906V15.9375H9.60938C9.48047 15.9375 9.375 15.832 9.375 15.7031V14.2969C9.375 14.168 9.48047 14.0625 9.60938 14.0625H14.0625V9.60938C14.0625 9.48047 14.168 9.375 14.2969 9.375H15.7031C15.832 9.375 15.9375 9.48047 15.9375 9.60938V14.0625H20.3906C20.5195 14.0625 20.625 14.168 20.625 14.2969V15.7031Z" fill="#C4C4C4" />
											</svg>
										</button>
									</div>
								</div> -->
							</div>
							<p class="calculation-form__total">Итого: <span
									class="calculation-form__total-value">0.0</span> руб.</p>
							<button disabled type="button"
								class="button button_size-l calculation-form__button">Добавить в корзину</button>
						</form>
					</div>
				</div>
			</div>
		</div>
		<div class="d-none calculation__img">
			<img class="calculation__img-item calculation__img-item_active"
				src="<?php echo get_template_directory_uri(); ?>/img/s-calculation-img.jpg"
				alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
			<img class="calculation__img-item" src="<?php echo get_template_directory_uri(); ?>/img/tablecloth.jpg"
				alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
		</div>
	</section>
	<?php echo get_template_part( 'template-parts/help' ); ?>
	<?php echo get_template_part( 'template-parts/advantages' ); ?>
	<?php echo get_template_part( 'template-parts/testimonials' ); ?>
	<?php echo get_template_part( 'template-parts/gallery' ); ?>
	<section id="order" class="section how carousel">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<h4 class="title title_size-s how__title">Как сделать заказ</h4>
					<div class="how__grid carousel__grid">
						<div class="custom-carousel">
							<div class="row">
								<div class="col-3 how__col">
									<div class="how__item">
										<img class="how__item-icon"
											src="<?php echo get_template_directory_uri(); ?>/img/s-how-icon-1.svg"
											alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
										<p class="how__item-name">Замер стола</p>
										<div class="how__item-text">
											<p>Сделайте замер вашего стола по ширине, длине или диаметру. Для этого
												используйте только рулетку.</p>
										</div>
									</div>
								</div>
								<div class="col-3 how__col">
									<div class="how__item">
										<img class="how__item-icon"
											src="<?php echo get_template_directory_uri(); ?>/img/s-how-icon-2.svg"
											alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
										<p class="how__item-name">Узнайте стоимость</p>
										<div class="how__item-text">
											<p>Введите размеры стола в <a href="/#calculation">калькулятор</a> или
												позвоните нам по телефону.</p>
										</div>
									</div>
								</div>
								<div class="col-3 how__col">
									<div class="how__item">
										<img class="how__item-icon"
											src="<?php echo get_template_directory_uri(); ?>/img/s-how-icon-3.svg"
											alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
										<p class="how__item-name">Оформите заказ</p>
										<div class="how__item-text">
											<p>Оформите заказ через корзину, указав способ доставки и удобное для вас
												время, или <a href="tel:+375296334466">позвоните</a> нам.</p>
										</div>
									</div>
								</div>
								<div class="col-3 how__col">
									<div class="how__item">
										<img class="how__item-icon"
											src="<?php echo get_template_directory_uri(); ?>/img/s-how-icon-4.svg"
											alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
										<p class="how__item-name">Ваш заказ готов</p>
										<div class="how__item-text">
											<p>Мы изготовим ваш заказ в течении<br>1-2 дней.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Begin carousel options -->
					<div class="swiper-pagination how__pagination"></div>
					<button class="carousel__btn carousel__btn-prev how__arrow how__arrow-prev">
						<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M21.1783 28.8215L14.0233 21.6665H30V18.3332H14.0233L21.1783 11.1782L18.8217 8.82153L7.64333 19.9999L18.8217 31.1782L21.1783 28.8215Z"
								fill="#787878" />
						</svg>
					</button>
					<button class="carousel__btn carousel__btn-next how__arrow how__arrow-next">
						<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M18.8217 28.8215L25.9767 21.6665H10V18.3332H25.9767L18.8217 11.1782L21.1783 8.82153L32.3567 19.9999L21.1783 31.1782L18.8217 28.8215Z"
								fill="#787878" />
						</svg>
					</button>
					<!-- End carousel options -->
				</div>
			</div>
		</div>
	</section>
	<?php echo get_template_part( 'template-parts/news-section' ); ?>
	<?php echo get_template_part( 'template-parts/delivery' ); ?>
	<?php echo get_template_part( 'template-parts/contacts' ); ?>
</main>
<!-- End main -->

<?php get_footer();