<?php
/**
 * stolstyle functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package stolstyle
 */

define('PHPMAILER', [
	'PHPMailer' => 'phpmailer/PHPMailer.php',
	'SMTP' => 'phpmailer/SMTP.php',
	'Exception' => 'phpmailer/Exception.php'
]);

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

if ( ! function_exists( 'stolstyle_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function stolstyle_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on stolstyle, use a find and replace
		 * to change 'stolstyle' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'stolstyle', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(
			array(
				'Menu' => esc_html__( 'Primary', 'stolstyle' ),
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'stolstyle_setup' );

/**
 * Enqueue scripts and styles.
 */
add_action('wp_enqueue_scripts', 'stolstyle_scripts');

function stolstyle_scripts() {
	//Регистрируем стили
	wp_register_style('application', get_template_directory_uri() . '/css/application.css', false, null, false);
	wp_register_style('custom', get_template_directory_uri() . '/css/custom.css', array('application'), null, false);

	//Подключаем стили
	wp_enqueue_style('application');
	wp_enqueue_style('custom');

	// Отменяем зарегистрированные скрипты
	wp_deregister_script('jquery-core');
	wp_deregister_script('jquery');

	// Регистрируем скрипты
	wp_register_script('jquery-core', 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js', false, null, true);
	wp_register_script('jquery', false, array('jquery-core'), null, true);
	wp_register_script('custom', get_template_directory_uri() . '/js/custom.js', array('jquery'), null, true);
	wp_register_script('application', get_template_directory_uri() . '/js/application.js', array('custom'), null, true);

	// Подключаем скрипты
	wp_enqueue_script('jquery');
	wp_enqueue_script('application');
}

//AJAX
//Подключаем глобальные JS переменные
add_action('wp_enqueue_scripts', 'add_global_data', 20);

function add_global_data() {
	wp_localize_script('jquery', 'ajax', array('url' => admin_url('admin-ajax.php')));
}

add_action('wp_ajax_promocode', 'get_promocode');
add_action('wp_ajax_nopriv_promocode', 'get_promocode');

add_action('wp_ajax_online', 'get_online_payment_form');
add_action('wp_ajax_nopriv_online', 'get_online_payment_form');

add_action('wp_ajax_basket', 'send_order');
add_action('wp_ajax_nopriv_basket', 'send_order');

add_action('wp_ajax_content', 'get_post_content');
add_action('wp_ajax_nopriv_content', 'get_post_content');

add_action('wp_ajax_product', 'get_product_data');
add_action('wp_ajax_nopriv_product', 'get_product_data');

add_action('wp_ajax_evropochta', 'get_evropochta');
add_action('wp_ajax_nopriv_evropochta', 'get_evropochta');

add_action('wp_ajax_evropochta_warehouse', 'get_evropochta_warehouse');
add_action('wp_ajax_nopriv_evropochta_warehouse', 'get_evropochta_warehouse');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

//Contact form 7 filter
add_filter('wpcf7_autop_or_not', '__return_false');

//Breadcrumbs YOAST
add_filter( 'wpseo_breadcrumb_separator', function( $separator ) {
	return '<svg width="10" height="4" viewBox="0 0 10 4" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M7.506 3.85C7.79533 3.25267 8.066 2.80467 8.318 2.506H0.156V1.918H8.318C8.066 1.61933 7.79533 1.17133 7.506 0.574H7.996C8.584 1.25533 9.2 1.75933 9.844 2.086V2.338C9.2 2.65533 8.584 3.15933 7.996 3.85H7.506Z" fill="#787878"/>
	</svg>';
} );

//Promocodes
function get_promocode() {
	$response = array_filter(get_field('promocodes', 2), "check_promocode_date");
	echo json_encode(array_values($response));
	wp_die();
}

function check_promocode_date($array) {
	$now = new DateTime();
	$now_string = $now->getTimestamp();

	//Promocode
	$promocode_date = DateTime::createFromFormat('d/m/Y', $array['date']);
	$promocode_date_string = $promocode_date->getTimestamp();

	return $now_string < $promocode_date_string;
}

//Payment data
function get_online_payment_form() {
	// Получаем параметры заказа
	$wsb_customer_phone = $_POST['customer_telephone'];
	$wsb_delivery_name = $_POST['delivery_name'];
	$wsb_delivery_price = $_POST['delivery_price'];
	$wsb_seed = time();
	$wsb_store_id = 134828665;
	$wsb_order_num = substr(base_convert(sha1(uniqid(mt_rand(), true)), 16, 8), 0, 7);
	$wsb_total = isset($_POST['total_price_with_sale']) ? $_POST['total_price_with_sale'] : $_POST['total_price'];
	$promocode_name = isset($_POST['promocode_name']) ? $_POST['promocode_name'] : "";
	$promocode_value = isset($_POST['promocode_value']) ? $_POST['promocode_value'] : "";
	$promocode_price = isset($_POST['promocode_price']) ? $_POST['promocode_price'] : "";
	$wsb_test = 0;
	$wsb_currency_id = 'BYN';
	$secret_key = '2b-$8=x5FxX734b=';
	$wsb_signature = sha1($wsb_seed.$wsb_store_id.$wsb_order_num.$wsb_test.$wsb_currency_id.$wsb_total.$secret_key);
	$success_url = "https://stolstyle.by/oplata-proshla-uspeshno/";
	$fail_url = "https://stolstyle.by/oshibka-oplaty/";

	// Данные о продукте
	$json = $_POST['products'];
	// Делаем замену символов, которые "убивают" декодирование из JSON
	$json = str_replace('\\', '', $json);
	$products_data = json_decode($json, true);
	$wsb_products = "";

	foreach ($products_data as $key => $product_data) {
		$wsb_product_price = round($product_data['price'] / $product_data['quantity'], 1);

		$wsb_products .= "<input type=\"hidden\" name=\"wsb_invoice_item_name[". $key ."]\" value=\"". $product_data['name'] ."\">";
		$wsb_products .= "<input type=\"hidden\" name=\"wsb_invoice_item_quantity[". $key ."]\" value=\"". $product_data['quantity'] ."\">";
		$wsb_products .= "<input type=\"hidden\" name=\"wsb_invoice_item_price[". $key ."]\" value=\"". $wsb_product_price ."\">";
	}

	$html_form = "
	<form style=\"display: none;\" action=\"https://payment.webpay.by/\" method=\"post\">
		<input type=\"hidden\" name=\"*scart\">
		<input type=\"hidden\" name=\"wsb_version\" value=\"2\">
		<input type=\"hidden\" name=\"wsb_storeid\" value=\"". $wsb_store_id ."\">
		<input type=\"hidden\" name=\"wsb_order_num\" value=\"". $wsb_order_num ."\">
		<input type=\"hidden\" name=\"wsb_test\" value=\"0\">
		<input type=\"hidden\" name=\"wsb_currency_id\" value=\"". $wsb_currency_id ."\">
		<input type=\"hidden\" name=\"wsb_seed\" value=\"". $wsb_seed ."\">
		<input type=\"hidden\" name=\"wsb_return_url\" value=\"". $success_url ."\">
		<input type=\"hidden\" name=\"wsb_notify_url\" value=\"". $success_url ."\">
		<input type=\"hidden\" name=\"wsb_cancel_return_url\" value=\"". $fail_url ."\">
		<input type=\"hidden\" name=\"wsb_shipping_name\" value=\"". $wsb_delivery_name ."\">
		<input type=\"hidden\" name=\"wsb_shipping_price\" value=\"". $wsb_delivery_price ."\">
		<input type=\"hidden\" name=\"wsb_phone\" value=\"". $wsb_customer_phone ."\">".
		$wsb_products
		."<input type=\"hidden\" name=\"wsb_total\" value=\"". $wsb_total ."\">
		<input type=\"hidden\" name=\"wsb_discount_name\" value=\"". $promocode_name . " (" . $promocode_value ."%)\">
  		<input type=\"hidden\" name=\"wsb_discount_price\" value=\"". $promocode_price ."\">
		<input type=\"hidden\" name=\"wsb_signature\" value=\"". $wsb_signature ."\">
		<input type=\"submit\" value=\"Купить\">
	</form>";

	echo $html_form;
	wp_die();
}

/* 
 * Изменение вывода галереи через шоткод 
 * Смотреть функцию gallery_shortcode в http://wp-kama.ru/filecode/wp-includes/media.php
 * $output = apply_filters( 'post_gallery', '', $attr );
 */
add_filter('post_gallery', 'my_gallery_output', 10, 2);

function my_gallery_output( $output, $attr ){
	$ids_arr = explode(',', $attr['ids']);
	$ids_arr = array_map('trim', $ids_arr );

	$pictures = get_posts( array(
		'posts_per_page' => -1,
		'post__in'       => $ids_arr,
		'post_type'      => 'attachment',
		'orderby'        => 'post__in',
	) );

	if(!$pictures) return 'Запрос вернул пустой результат.';

	// Вывод
	$out = '<div class="carousel template__carousel"><div class="swiper-container template__carousel-container"><div class="swiper-wrapper">';

	// Выводим каждую картинку из галереи
	foreach( $pictures as $pic ){
		$src = $pic->guid;
		$t = esc_attr( $pic->post_title );
		$title = ( $t && false === strpos($src, $t)  ) ? $t : '';

		$caption = ( $pic->post_excerpt != '' ? $pic->post_excerpt : $title );

		$out .= '
		<div class="swiper-slide template__carousel-item">
			<figure><img class="template__carousel-item-img" src="'. esc_url($src) .'" alt="'. get_bloginfo("name") .'" /></figure>
		</div>';
	}

	$out .= '</div></div>
	<div class="swiper-pagination template__carousel-pagination"></div>
	<button type="button" class="carousel__btn carousel__btn-prev template__carousel-arrow template__carousel-arrow-prev">
		<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M21.1783 28.8215L14.0233 21.6665H30V18.3332H14.0233L21.1783 11.1782L18.8217 8.82153L7.64333 19.9999L18.8217 31.1782L21.1783 28.8215Z" fill="#787878" />
		</svg>
	</button>
	<button type="button" class="carousel__btn carousel__btn-next template__carousel-arrow template__carousel-arrow-next">
		<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M18.8217 28.8215L25.9767 21.6665H10V18.3332H25.9767L18.8217 11.1782L21.1783 8.82153L32.3567 19.9999L21.1783 31.1782L18.8217 28.8215Z" fill="#787878" />
		</svg>
	</button>
	</div>';

	return $out;
}

//Yandex maps
add_action('wp_footer', 'get_yandex_maps_api', 99);

function get_yandex_maps_api() {
	if (is_page_template( ['home.php', 'custom-page.php']) || is_category(3) ):
	?>
<script src="https://api-maps.yandex.ru/2.1/?apikey=f02d8ec0-5c0d-489d-b94f-73b3c73b8c22&lang=ru_RU"></script>
<script>
ymaps.ready(init);
function init() {
	// Создание карты.
	var myMap = new ymaps.Map("map", {
		center: [53.952783, 27.692716],
		zoom: 14,
		controls: []
	});
	myMap.behaviors.disable(['drag', 'scrollZoom']);
	myMap.controls.add('zoomControl');
	myMap.controls.add('searchControl');
	let myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
		hintContent: 'Адрес офиса',
		balloonContent: 'г. Минск, ул. Уручская 12А, 2 этаж, каб. 4'
	});
	myMap.geoObjects.add(myPlacemark);
}
</script>
<?php endif;
}

//Schema
add_filter('bcn_breadcrumb_title', 'my_breadcrumb_title_swapper', 3, 10);

function my_breadcrumb_title_swapper($title, $type, $id) {
	if (in_array('home', $type)) {
		$title = __('Главная');
	}
    return $title;
}

add_filter('bcn_breadcrumb_url', 'filter_bcn_breadcrumb_url', 10, 3); 

function filter_bcn_breadcrumb_url( $url, $this_type, $this_id ) {
	if ($this_id) {
		return $url . '#content';
	} else {
		return $url;
	}
}

add_action('wp_head', 'add_schema_breadcrumbs', 30);

function add_schema_breadcrumbs(){
	if (is_page()) { ?>
		<script type="application/ld+json"><?php bcn_display_json_ld(); ?></script>
	<?php }
}

add_filter( 'wpseo_json_ld_output', '__return_false' );

add_action('wp_head', 'add_schema_organization', 20);

function add_schema_organization(){
	if (is_page_template('home.php')) { ?>
		<script type="application/ld+json">
		{
			"@context": "http://schema.org",
			"@type": "Organization",
			"name": "Защитная пленка на стол | Силиконовая скатерть | Прозрачная скатерть",
			"description": "Самая нужная и полезная вещь на каждом столе. Мы вырезаем защитную пленку на стол по вашим размерам. Так же можно купить готовые накладки. На сайте есть удобный калькулятор для расчета стоимости. Доставляем по Минску и всей Беларуси. А так же делаем отправки по всему СНГ.",
			"url": "https://stolstyle.by/",
			"logo": "http://stolstyle.by/wp-content/themes/stolstyle/img/s-logo.svg",
			"contactPoint": {
				"@type": "ContactPoint",
				"telephone": "+375 (29) 633-44-66",
				"contactType": "Customer Service",
				"email": "info@stolstyle.by",
				"areaServed": "BY",
				"availableLanguage": "Russian"
			},
			"address": {
				"@type": "PostalAddress",
				"addressCountry": "BY",
				"addressLocality": "Minsk",
				"postalCode": "220125",
				"streetAddress": "ул. Уручская, 23А"
			},
			"sameAs": [
				"https://www.instagram.com/stolstyle/"
			]
		}
		</script>
	<?php }
}

//Yoast seo change position priority
add_filter( 'wpseo_metabox_prio', 'yoasttobottom');

function yoasttobottom() {
  return 'low';
}

function send_order() {
	// Данные о клиенте
	$customer_name = isset($_POST['customer_name']) ? $_POST['customer_name'] : " ";
	$customer_telephone = $_POST['customer_telephone'];
	$customer_message = isset($_POST['customer_message']) ? $_POST['customer_message'] : " ";

	$customer_data_layout = "<h2 style=\"margin: 0; font-size: 18px; margin-bottom: 10px;\">Клиент:</h2>";
	$customer_data_layout .= "<table style=\"border-collapse: collapse;\" width=\"100%\">";
	$customer_data_layout .= "<tr><td style=\"font-size: 14px; padding-top: 5px; padding-bottom: 5px;\">Имя: " . $customer_name . "</td></tr>";
	$customer_data_layout .= "<tr><td style=\"font-size: 14px; padding-top: 5px; padding-bottom: 5px;\">Номер телефона: " . $customer_telephone . "</td></tr>";
	$customer_data_layout .= "<tr><td style=\"font-size: 14px; padding-top: 5px; padding-bottom: 0;\">Сообщение: " . $customer_message . "</td></tr></table>";

	// Данные о доставке
	$delivery_name = $_POST['delivery_name'];
	$delivery_price = $_POST['delivery_price'];
	$delivery_address = isset($_POST['delivery_address']) ? $_POST['delivery_address'] : " ";

	$delivery_data_layout = "<h2 style=\"margin: 0; font-size: 18px; margin-top: 25px; margin-bottom: 10px;\">Доставка:</h2>";
	$delivery_data_layout .= "<table style=\"border-collapse: collapse;\" width=\"100%\">";
	$delivery_data_layout .= "<tr><td style=\"font-size: 14px; padding-top: 5px; padding-bottom: 5px;\">Тип доставки: " . $delivery_name . "</td></tr>";
	$delivery_data_layout .= "<tr><td style=\"font-size: 14px; padding-top: 5px; padding-bottom: 5px;\">Стоимость: " . $delivery_price . " руб.</td></tr>";
	$delivery_data_layout .= "<tr><td style=\"font-size: 14px; padding-top: 5px; padding-bottom: 0;\">Адрес: " . $delivery_address . "</td></tr></table>";

	// Данные об оплате
	$payment_name = $_POST['payment_name'];

	$payment_data_layout = "<h2 style=\"margin: 0; font-size: 18px; margin-top: 25px; margin-bottom: 10px;\">Оплата:</h2>";
	$payment_data_layout .= "<table style=\"border-collapse: collapse;\" width=\"100%\">";
	$payment_data_layout .= "<tr><td style=\"font-size: 14px; padding-top: 5px; padding-bottom: 0;\">Способ оплаты: " . $payment_name . "</td></tr></table>";

	// Данные о продукте
	$json = $_POST['products'];
	// Делаем замену символов, которые "убивают" декодирование из JSON
	$json = str_replace('\\', '', $json);
	$products_data = json_decode($json, true);
	$products_data_template = "";

	foreach ($products_data as $product_data) {
		$products_data_template .= "<tr>";
		$products_data_template .= "<td style=\"border: 1px solid #ddd; font-size: 14px; padding: 10px;\">" . $product_data['name'] . "</td>";
		$products_data_template .= "<td style=\"border: 1px solid #ddd; font-size: 14px; padding: 10px;\">" . $product_data['cover'] . "</td>";
		$products_data_template .= "<td style=\"border: 1px solid #ddd; font-size: 14px; padding: 10px;\">" . $product_data['table']['name'] . "</td>";
		// Проверяем существует ли второй размер
		$product_table_size = ($product_data['table']['size'][1]) ? $product_data['table']['size'][0] ."*". $product_data['table']['size'][1] . " см" : $product_data['table']['size'][0] . " см";
		if (isset($product_data['table']['radius'])) {
			$products_data_template .= "<td style=\"border: 1px solid #ddd; font-size: 14px; padding: 10px;\">" . $product_data['table']['radius'] . "</td>";
		} else {
			$products_data_template .= "<td style=\"border: 1px solid #ddd; font-size: 14px; padding: 10px;\">-</td>";
		}
		$products_data_template .= "<td style=\"border: 1px solid #ddd; font-size: 14px; padding: 10px;\">" . $product_table_size . "</td>";
		$products_data_template .= "<td style=\"border: 1px solid #ddd; font-size: 14px; padding: 10px;\">" . $product_data['quantity'] . "</td>";
		$products_data_template .= "<td style=\"border: 1px solid #ddd; font-size: 14px; padding: 10px;\">" . $product_data['price'] . " руб.</td>";
		$products_data_template .= "</tr>";
	}

	$products_data_layout = "<h2 style=\"margin: 0; font-size: 18px; margin-top: 25px; margin-bottom: 15px;\">Товары:</h2>";
	$products_data_layout .= "<table style=\"border-collapse: collapse;\" width=\"100%\"><tr><th style=\"text-align: left; border: 1px solid #ddd; font-size: 14px; padding: 5px 10px;\">Название товара</th><th style=\"text-align: left; border: 1px solid #ddd; font-size: 14px; padding: 5px 10px;\">Тип пленки</th><th style=\"text-align: left; border: 1px solid #ddd; font-size: 14px; padding: 5px 10px;\">Тип стола</th><th style=\"text-align: left; border: 1px solid #ddd; font-size: 14px; padding: 5px 10px;\">Радиус</th><th style=\"text-align: left; border: 1px solid #ddd; font-size: 14px; padding: 5px 10px;\">Размеры</th><th style=\"text-align: left; border: 1px solid #ddd; font-size: 14px; padding: 5px 10px;\">Количество</th><th style=\"text-align: left; border: 1px solid #ddd; font-size: 14px; padding: 5px 10px;\">Стоимость</th></tr>";
	$products_data_layout .= $products_data_template . "</table>";
	
	// Данные об общей стоимости
	$basket_products_price = $_POST['products_price'];
	$basket_total_price = $_POST['total_price'];
	$basket_total_price_with_sale = isset($_POST['total_price_with_sale']) ? $_POST['total_price_with_sale'] : null;
	$basket_products_price_with_sale = isset($_POST['products_price_with_sale']) ? $_POST['products_price_with_sale'] : null;
	if ($basket_total_price_with_sale):
		$promocode_name = $_POST['promocode_name'];
		$promocode_price = $_POST['promocode_price'];
		$promocode_value = $_POST['promocode_value'];
	endif;

	// Проверяем наличие промокода
	if ($basket_total_price_with_sale):
		$price_data_layout = "<table style=\"border-collapse: collapse; margin-top: 25px;\" width=\"100%\">";
		$price_data_layout .= "<tr><td style=\"font-size: 15px; padding-top: 5px; padding-bottom: 5px;\"><b>Стоимость товара: </b> " . $basket_products_price_with_sale . " <span style=\"text-decoration: line-through\";>" . $basket_products_price . " руб.</td></tr>";
		$price_data_layout .= "<tr><td style=\"font-size: 15px; padding-top: 5px; padding-bottom: 5px;\"><b>Стоимость доставки: </b> " . $delivery_price . " руб.</td></tr>";
		$price_data_layout .= "<tr><td style=\"font-size: 15px; padding-top: 5px; padding-bottom: 5px;\"><b>Общая стоимость: </b> " . $basket_total_price_with_sale . " руб.</td></tr>";
		$price_data_layout .= "<tr><td style=\"font-size: 15px; padding-top: 15px;\"><b>Промокод:</b> " . $promocode_name . " (" . $promocode_price . " руб. = " . $promocode_value . "%).</td></tr>";
	else:
		$price_data_layout = "<table style=\"border-collapse: collapse; margin-top: 25px;\" width=\"100%\">";
		$price_data_layout .= "<tr><td style=\"font-size: 15px; padding-top: 5px; padding-bottom: 5px;\"><b>Стоимость товара: </b> " . $basket_products_price . " руб.</td></tr>";
		$price_data_layout .= "<tr><td style=\"font-size: 15px; padding-top: 5px; padding-bottom: 5px;\"><b>Стоимость доставки: </b> " . $delivery_price . " руб.</td></tr>";
		$price_data_layout .= "<tr><td style=\"font-size: 15px; padding-top: 5px;\"><b>Общая стоимость: </b> " . $basket_total_price . " руб.</td></tr>";
	endif;
	$price_data_layout .= "</table>";

	// Настройки PHPMailer
	require PHPMAILER['PHPMailer'];
	require PHPMAILER['SMTP'];
	require PHPMAILER['Exception'];

	$mail = new PHPMailer\PHPMailer\PHPMailer();

	try {
		$mail->isSMTP();   
		$mail->CharSet = "UTF-8";
		$mail->SMTPAuth   = true;
		// $mail->SMTPDebug = 2;
		$mail->Debugoutput = function($str, $level) {
			$GLOBALS['status'][] = $str;
		};
		
		// Настройки почты
		$mail->Host       = 'smtp.yandex.ru'; // SMTP сервера почты
		$mail->Username   = 'info@stolstyle.by'; // Логин на почте
		$mail->Password   = 'dqsuvutiecmodybu'; // Пароль на почте
		$mail->SMTPSecure = 'ssl';
		$mail->Port       = 465;
		$mail->setFrom('info@stolstyle.by', 'Stolstyle - Защитная пленка ПВХ на стол'); // Адрес самой почты и имя отправителя
		
		// Получатель письма
		$mail->addAddress('stolstyleshop@gmail.com');
		$mail->addAddress('info@stolstyle.by');
		
		// Отправка сообщения
		$mail->Subject = "Новый заказ";
		$mail->isHTML(true);
		$mail->Body = $customer_data_layout . $delivery_data_layout . $payment_data_layout . $products_data_layout . $price_data_layout;
		$mail->AltBody = "Нет поддержки HTML";

		// Проверяем отравленность сообщения
		if ($mail->send()) {
			$result = "success";
		}
		else {
			$result = "error";
		}
	} catch (Exception $e) {
		$result = "error";
		$status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
	}
	
	// Отображение результата
	echo json_encode([
		"result" => $result,
		"status" => $status,
		"mail" => $mail->ErrorInfo
	]);

	wp_die();
}

function get_post_content() {
	$post_id = $_POST['post_id'];
	$post = get_post($post_id, 'ARRAY_A');
	$post_content = apply_filters('the_content', $post['post_content']);

	echo json_encode([
		'title' => $post['post_title'],
		'content' => $post_content
	]);
	wp_die();
}

function get_product_data() {
	$post_id = $_POST['post_id'];
	$post = get_post($post_id, 'ARRAY_A');
	$product_image_data = get_field('image', $post_id);
	$product_size_data = preg_split("/[\,\s]+/", get_field('size', $post_id));
	$product_price = 0;
	$is_sale = get_field( 'is_sale', $post_id );
	if ( $is_sale ) {
		$product_price = get_field( 'price_with_sale', $post_id );
	}
	else {
		$product_price = get_field( 'price', $post_id );
	}

	// Формирует объект продукта
	echo json_encode([
		'productId' => intval($post_id),
		'name' => $post['post_title'],
		'image' => $product_image_data['url'],
		'table' => ['name' => '-', 'size' => $product_size_data],
		'cover' => 'Рифленая 1.8 мм',
		'quantity' => 1,
		'price' => $product_price
	]);
		
	wp_die();
}

// Добавляем размер новый размер картинки для галереи продукта
add_image_size( 'stolstyle-product-size', 500, 380, true );

function get_evropochta() {
	$curl = curl_init();

	$data = array(
		"CRC" => "",
		"Packet" => array(
			"JWT" => "null",
			"MethodName" => "GetJWT",
			"ServiceNumber" => "07BEB740-4CE2-4852-8F0C-CA4E4A5E3434",
			"Data" => array(
				"LoginName" => "191904007_IlukevichS",
				"Password" => "KDHCWSTRVGM0E7D",
				"LoginNameTypeId" => "1"
			),
		),
	);
	
	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://api.eurotorg.by:10352/Json',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_CUSTOMREQUEST => 'POST',
		CURLOPT_POSTFIELDS => json_encode( $data ),
		CURLOPT_HTTPHEADER => array(
		  'Content-Type: application/json'
		),
	));
	
	$response = curl_exec($curl);
	curl_close($curl);

	echo $response;

	wp_die();
}

function get_evropochta_warehouse() {
	$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.eurotorg.by:10352/Json',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
    "CRC":"",
                "Packet":{
                    "JWT":"eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJMb2dpbklkIjoiODU0MyIsIkxvZ2luVHlwZUlkIjoiMSIsImlhdCI6IjE2NTA2NTAzODciLCJqdGkiOiJ7Qzc5OTAzNUEtQzE4RS00NkU4LTk2QUEtREFFN0YwNTIxOTI2fSJ9.ZviMs_Vl1rhzNIJZ-TmUspLph2F0YUlx-X1SaVh0A4ELVa97Y17N4IX1milbu4e3obrk8RrxaidLoPBGrUxWygBA8ylBwM1G9BAOT_2CCC78xu7GAFs4k5WXhS5ukMrvhNFMJoLK41RGGdYnRV3s1ZiSIUMtlYV7bu8ZbUcGwE7FmyuIlveWzWkcVgonRbHdRq4FrDyHqXWUBowtrSCimbTgPh-L_KADOwNMpbFCoa-0lENus9uggAYA3Ltz9NvNBieruApA0J3uIadhlps4UvLOW9joZpgv20uhR6yTV1NZ3YHDgRxWYdaRrPGJtOo4sVoCc-s0O1nVtDzK26v0BQ",
                    "MethodName": "Postal.OfficesOut",
                    "ServiceNumber":"07BEB740-4CE2-4852-8F0C-CA4E4A5E3434",
                    "Data":{}
                }
}',
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
wp_die();
}