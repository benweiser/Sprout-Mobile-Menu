<?php
/*
Plugin Name: Sprout Mobile Menu
Plugin URI: http://www.benweiser.com/
Description: The Sprout Mobile Sliding Panel Menu
Version: 0.0.1
Author: Ben Weiser
Author URI: http://www.benweiser.com/
License: GPL v2 or higher
License URI: License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

defined( 'WPINC' ) or die;

register_activation_hook( __FILE__, 'sprout_activation_check' );
/**
 * This function runs on plugin activation. It checks to make sure the required
 * minimum Genesis version is installed. If not, it deactivates itself.
 *
 * 	Author: Nathan Rice
 *	Author URI: http://www.nathanrice.net/
 */
function sprout_activation_check() {
	$latest = '2.0';
	$theme_info = wp_get_theme( 'genesis' );

	if ( 'genesis' != basename( TEMPLATEPATH ) ) {
		deactivate_plugins( plugin_basename( __FILE__ ) ); // Deactivate plugin
		wp_die( sprintf( __( 'Sorry, you can\'t activate %1$sGenesis - Featured Post Image%2$s unless you have installed the %3$sGenesis Framework%4$s. Go back to the %5$sPlugins Page%4$s.', 'genesis-featured-page-advanced' ), '<em>', '</em>', '<a href="http://www.studiopress.com/themes/genesis" target="_blank">', '</a>', '<a href="javascript:history.back()">' ) );
	}

	if ( version_compare( $theme_info['Version'], $latest, '<' ) ) {
		deactivate_plugins( plugin_basename( __FILE__ ) ); // Deactivate plugin
		wp_die( sprintf( __( 'Sorry, you can\'t activate %1$sGenesis - Featured Post Image%2$s unless you have installed the %3$sGenesis %4$s%5$s. Go back to the %6$sPlugins Page%5$s.', 'genesis-featured-page-advanced' ), '<em>', '</em>', '<a href="http://www.studiopress.com/themes/genesis" target="_blank">', $latest, '</a>', '<a href="javascript:history.back()">' ) );
	}
}


add_action('admin_init', 'sprout_deactivate_check');
/**
 * This function runs on admin_init and checks to make sure Genesis is active, if not, it 
 * deactivates the plugin. This is useful for when users switch to a non-Genesis themes.
 */
function sprout_deactivate_check() {
    if ( ! function_exists('genesis_pre') ) {
		deactivate_plugins( plugin_basename( __FILE__ ) ); // Deactivate plugin
    }
}

function sprout_load_assets() {
    wp_register_style( 'sprout-menu-css', plugins_url( '/dist/css/sprout-mobile-menu.css', __FILE__ ) );
    wp_register_script( 'sprout-menu-js', plugins_url( '/dist/js/sprout-mobile-menu.min.js', __FILE__ ), array('jquery'), '', true );

    wp_enqueue_style('sprout-menu-css');
    wp_enqueue_script('sprout-menu-js');

    $menuOptions = array(
	    "hideOnScroll" => "false",
        "showMenuText" => "true",
        "isFixed" 	   => "true",
        "showSubMenuText" => "true"
	  );

   	wp_localize_script('sprout-menu-js', 'sprout_menu_options', $menuOptions);
}

add_action('wp_enqueue_scripts', 'sprout_load_assets');
