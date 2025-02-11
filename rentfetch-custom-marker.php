<?php
/*
	Plugin Name: Rent Fetch Four Star Custom Marker
	Plugin URI: https://elod.in
	Description: Just another plugin
	Version: 0.1.1
	Author: Jon Schroeder
	Author URI: https://elod.in

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 2 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU General Public License for more details.
*/

/* Prevent direct access to the plugin */
if ( !defined( 'ABSPATH' ) ) {
	die( "Sorry, you are not allowed to access this page directly." );
}

// Plugin directory
define( 'RFCM', dirname( __FILE__ ) );

// Define the version of the plugin
define ( 'RFCM_VERSION', '0.1.1' );

/**
 * Enqueue the main script.
 *
 * @return  [type]  [return description]
 */
function rfcustommarker_enqueue_script() {
	wp_register_script( 
		'rfcustommarker', 
		plugins_url( 'custom-marker.js', __FILE__ ), 
		array( 'jquery', 'rentfetch-property-map' ), // Keep this dependency
		RFCM_VERSION, 
		true 
	);
}
add_action( 'wp_enqueue_scripts', 'rfcustommarker_enqueue_script', 999 );

/**
 * Let's only enqueue the script in the right place on the site.
 */
function rfcustommarker_conditional_enqueue() {
	
	// bail if this isn't the DU landing page, located here:
	// https://fourstarrealty.com/du-apartments/?search-propertycategories%5B%5D=491
	// https://four-star.local/du-apartments/?search-propertycategories%5B%5D=491
	if ( is_page( 3910974 ) ) {
		// this is the DU page
		wp_enqueue_script( 'rfcustommarker' );
	}
}
add_action( 'wp_footer', 'rfcustommarker_conditional_enqueue' );