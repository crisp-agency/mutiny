<?php
/**
 * Functions and Definitions
 *
 * This document contains the custom functions and definitions for various WordPress 
 * theme functionality.
 *
 * @package WordPress
 * @subpackage Mutiny
 * @since Mutiny 0.0.2
 */

/**
 * Register Styles
 *
 * The code below registers custom WordPress styles using wp_register_style()
 * function.
 *
 * @since Mutiny 0.0.2
 */
function mutiny_styles() {
	
	// Load Main Stylesheet
	wp_enqueue_style( 'mutiny-style', get_stylesheet_uri() );

}
add_action( 'wp_enqueue_scripts', 'mutiny_styles' );

/**
 * Register Features
 *
 * The code below registers custom WordPress theme features using 
 * add_theme_support() function.
 *
 * @since Mutiny 0.0.2
 */
function mutiny_features()  {

	// Support HTML5 Semantic Markup
	add_theme_support( 'html5', array(
		'gallery',
		'caption'
	) );

}
add_action( 'after_setup_theme', 'mutiny_features' );
