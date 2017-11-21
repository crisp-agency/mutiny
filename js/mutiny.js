/**
 * Custom JavaScript Functionality
 *
 * This document contains the custom JavaScript functionality for Mutiny
 * WordPress theme. This is written using jQuery to simplify code complexity.
 *
 * @package WordPress
 * @subpackage Mutiny
 * @since Mutiny 0.0.3
 * @version 0.0.1
 */
  
// Encapsulate Code
( function( $ ) {

	// After Document is Ready
	$(document).ready( function() {

		/**
		 * Loading Animations
		 *
		 * The code below handles the animations that happen when a page is first 
		 * loaded. This includes fading and animating the pencils.
		 */

		// Store Needed Variables
		var pageHasLoaded = false,
		    pencilRotations = 0,
		    pencilEasing = Elastic.easeOut.config(1, 0.9),
		    $contentContainer = $('.mutiny'),
		    $loadingContainer = $('.pencils'),
		    $pencilLeft = $('.pencil.left'),
		    $pencilRight = $('.pencil.right');

		// Show Pencils
		var loadingIntro = new TimelineMax( { onComplete: spinPencils } );
		loadingIntro.to( $loadingContainer, 0.5, { display: 'block' } );
		loadingIntro.add('pencilsComeIn');
		loadingIntro.fromTo( $pencilLeft, 1, { opacity: 0, rotation: 0, x: -100 }, { ease: pencilEasing, opacity: 1, rotation: 45, x: 0 }, 'pencilsComeIn');
		loadingIntro.fromTo( $pencilRight, 1, { opacity: 0, rotation: 0, x: 100 }, { ease: pencilEasing, opacity: 1, rotation: -45, x: 0 }, 'pencilsComeIn');

		// Flag When Page is Loaded
		$(window).load( function() {
			pageHasLoaded = true;
		} );
		
		// Rotate Pencils
		function spinPencils() {
			
			// Hide Loader After Page is Loaded
			if ( pageHasLoaded && pencilRotations >= 1 ) {
				TweenMax.to( $loadingContainer, .5, { display: 'none', opacity: 0 } );
				TweenMax.to( $pencilLeft, 2, { ease: pencilEasing, rotation: '+=2' } );
				TweenMax.to( $pencilRight, 2, { ease: pencilEasing, rotation: '-=2' } );
				TweenMax.fromTo( $contentContainer, .5, { display: 'block', opacity: 0 }, { opacity: 1, delay: .5 } );
				setTimeout( function() {
					$loadingContainer.remove();
				}, 1000)
			}
			
			// Spin Pencils if Page is Loading
			else {
				pencilRotations++;
				if ( pencilRotations % 2 ) {
					TweenMax.fromTo( $pencilLeft, 1, { rotation: 45 }, { ease: pencilEasing, rotation: 225 } );
					TweenMax.fromTo( $pencilRight, 1, { rotation: -45 }, { ease: pencilEasing, rotation: -225, onComplete: spinPencils } );					
				}
				else {
					TweenMax.fromTo( $pencilLeft, 1, { rotation: 225 }, { ease: pencilEasing, rotation: 405 } );
					TweenMax.fromTo( $pencilRight, 1, { rotation: -225 }, { ease: pencilEasing, rotation: -405, onComplete: spinPencils } );
				}
			}
		}
		
		// Fade Out Page For Internal Page Link Clicks
		$('a[href^="' + window.location.origin + '"]').click( function(event) {
			event.preventDefault();
			var linkDestination = $(this).attr('href');
			TweenMax.to( $('.mutiny'), .25, { opacity: 0, display: 'none', onComplete: function() {
				window.location = linkDestination;
			} } );
		} );

		// Link Hover Effect
		$('.main a').hover( function() {
			TweenMax.to( $(this), .4, { color: '#525252' } );
		}, function() {
			TweenMax.to( $(this), .4, { color: '#bea67c' } );
		} );
	
	} );

} )( jQuery );
