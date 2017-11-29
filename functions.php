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
 * Table of Contents
 *
 * 1.0 - Register Styles
 * 2.0 - Register Scripts
 * 3.0 - Register Features
 * 4.0 - Prepare Loading Animations
 */

/**
 * 1.0 - Register Styles
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
 * 2.0 - Register Scripts
 *
 * The code below registers custom WordPress scripts using wp_register_script()
 * function.
 *
 * @since Mutiny 0.0.3
 */

function mutiny_scripts() {

	// Load TweenMax
	wp_enqueue_script( 'tweenmax', get_template_directory_uri() . '/js/tweenmax.js', array(), '1.20.3', true );

	// Load Main Script
	wp_enqueue_script( 'mutiny-script', get_template_directory_uri() . '/js/mutiny.js', array( 'jquery', 'tweenmax' ), '0.0.1', true );

}
add_action( 'wp_enqueue_scripts', 'mutiny_scripts' );

/**
 * 3.0 - Register Features
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

/**
 * 4.0 - Prepare For Loading Animations
 *
 * The code below hides the main content area by default for users that have
 * JavaScript so the loading animation can be displayed.
 *
 * @since Mutiny 0.0.3
 */

function mutiny_loading_animation_prep() {
	
	$styles = '
	    <style>
		    html.js .page-wrapper { display: none; }
	    </style>
	';	
	
    $scripts = '
    	<script>
	    	document.documentElement.className += " js";
	    </script>
    ';

	echo $styles . $scripts;

}
add_action( 'wp_enqueue_scripts', 'mutiny_loading_animation_prep', 1, 1 );
