<?php
define('WP_AUTO_UPDATE_CORE', 'minor');// This setting is required to make sure that WordPress updates can be properly managed in WordPress Toolkit. Remove this line if this WordPress website is not managed by WordPress Toolkit anymore.
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'stolstyleby_wp432' );

/** MySQL database username */
define( 'DB_USER', 'stolstyleby_wp432' );

/** MySQL database password */
define( 'DB_PASSWORD', '!D@14S45Rp' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'rquchwlgldxpitsjf7xkgwxckwpnq7zxiqrmkkk0crliuho01hn4v5o7xydsgslr' );
define( 'SECURE_AUTH_KEY',  'skjytj56qolq64nb6dswr3cp1tnuvwgwvnemnlqytyjkfvmairvdnhay45tbaquk' );
define( 'LOGGED_IN_KEY',    'etdyxiylonmiyhshmll67ac3wxxifwajjr6kctxpbqkulze43trn8hklavnaivux' );
define( 'NONCE_KEY',        'o1xgrxabbpyqkycpe4xoxt7ltsonfmprwmq19efyookggzsodoluvxqllnugitjg' );
define( 'AUTH_SALT',        'avhpgvukr3lfgaabfmvk7pplmfploqjfptinseypyxv2vaa76dhhd4fr90hokbqx' );
define( 'SECURE_AUTH_SALT', 'sayuv7gpvmrpmopeqwlodsmynd8tjkeqcrc8lybisjqbdfhmvt5tbti0do67calq' );
define( 'LOGGED_IN_SALT',   'qkvtfpbpkws17hrl3r707qozbb2ijpidqchpntszsqiifrctx56hfxgnpdtqbkzg' );
define( 'NONCE_SALT',       'aemyjczodyhf0hokwmcw7bkx8ejxki9erqpnqawilgkcwxqm0vz9chgheuqhwoqq' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpo5_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_DISPLAY', true );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
