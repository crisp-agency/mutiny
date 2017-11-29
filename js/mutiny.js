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
  
/**
 * Table of Contents
 *
 * 1.0 - Loading Animation
 * 2.0 - Hover Effects
 */

// Encapsulate Code
( function($) {

	// After Document is Ready
	$(document).ready( function() {

		/**
		 * 1.0 - Loading Animation
		 *
		 * The code below controls the loading animation that is displayed during
		 * every page load.
		 *
		 * @since Mutiny 0.0.3
		 */

		// Store Needed Elements
		var pageHasLoaded = false,
		    pencilRotations = 0,
		    pencilEasing = Elastic.easeOut.config(1, 1),
		    pencilSpinDuration = 1,
		    $pageWrapper = $('.page-wrapper'),
		    $loadingGraphic = $('.loading-graphic'),
		    $pencilLeft = $('.pencil.left'),
		    $pencilRight = $('.pencil.right');

		// Flag When Page is Loaded
		$(window).load( function() {
			pageHasLoaded = true;
		} );

		// Show Loading Graphic
		var showLoadingGraphic = new TimelineMax( { onComplete: animateLoadingGraphic } );
		showLoadingGraphic.set( $pencilLeft, { opacity: 0, rotation: 0, x: -100 } )
		  .set( $pencilRight, { opacity: 0, rotation: 0, x: 100 } )
		  .add( 'pencilsComeIn' )
		  .to( $pencilLeft, pencilSpinDuration, { ease: pencilEasing, opacity: 1, rotation: 45, x: 0 }, 'pencilsComeIn' )
		  .to( $pencilRight, pencilSpinDuration, { ease: pencilEasing, opacity: 1, rotation: -45, x: 0 }, 'pencilsComeIn' )
		  .to( $loadingGraphic, 0.5, { display: 'block' }, 'pencilsComeIn+=.5' );
		
		// Animate Loading Graphic
		function animateLoadingGraphic() {

			// Hide Loader
			if ( pageHasLoaded && pencilRotations >= 1 ) {
				var hideLoadingGraphic = new TimelineMax( { onComplete: function() {
					$loadingGraphic.remove();
					TweenMax.fromTo( $pageWrapper, .5,
						{ display: 'none', opacity: 0 },
						{ display: 'block', opacity: 1 }
					);
				} } );
				hideLoadingGraphic.add( 'hideLoadingGraphic' )
				  .to( $loadingGraphic, 1, { opacity: 0 }, 'hideLoadingGraphic' )
				  .to( $pencilLeft, pencilSpinDuration, { ease: pencilEasing, rotation: '+=90' }, 'hideLoadingGraphic' )
				  .to( $pencilRight, pencilSpinDuration, { ease: pencilEasing, rotation: '-=90' }, 'hideLoadingGraphic' );
			}
			
			// Spin Pencils
			else {
				pencilRotations++;
				if ( pencilRotations % 2 ) {
					var oddRotation = new TimelineMax( { onComplete: animateLoadingGraphic } );
					oddRotation.set( $pencilLeft, { rotation: 45 } )
					  .set( $pencilRight, { rotation: -45 } )
					  .add( 'spinPencils' )
					  .to( $pencilLeft, pencilSpinDuration, { ease: pencilEasing, rotation: 225 }, 'spinPencils' )
					  .to( $pencilRight, pencilSpinDuration, { ease: pencilEasing, rotation: -225, }, 'spinPencils' );
				}
				else {
					var evenRotation = new TimelineMax( { onComplete: animateLoadingGraphic } );
					evenRotation.set( $pencilLeft, { rotation: 225 } )
					  .set( $pencilRight, { rotation: -225 } )
					  .add( 'spinPencils' )
					  .to( $pencilLeft, pencilSpinDuration, { ease: pencilEasing, rotation: 405 }, 'spinPencils' )
					  .to( $pencilRight, pencilSpinDuration, { ease: pencilEasing, rotation: -405 }, 'spinPencils' );
				}
			}

		}
				
		/**
		 * 2.0 - Hover Effects
		 *
		 * The code below controls the various hover animation effects that are
		 * displayed throughout the website.
		 *
		 * @since Mutiny 0.0.3
		 */

		// Links
		$('.page-wrapper a').hover( function() {
			TweenMax.to( $(this), .5, { ease: Power4.easeOut, color: '#bcbcbc' } );
		}, function() {
			TweenMax.to( $(this), .5, { ease: Power4.easeOut, color: '#bea67c' } );
		} );		

	} );

} )( jQuery );
