/*
	Estudio Jurídico Smulevici - Modernized design
	Based on Arcana by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$nav = $('#nav');

	// Breakpoints - DISABLED to maintain desktop layout at all screen sizes
	// Instead, we'll use CSS to override responsive behavior
		breakpoints({
		wide:      [ '1281px',  '9999px' ],
			normal:    [ '981px',   '1280px' ],
			narrow:    [ '841px',   '980px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ '481px',   '736px'  ],
			mobilep:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
			
			// Animate elements on scroll into view
			animateOnScroll();
			
			// Update active navigation state
			updateActiveNav();
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			offsetY: -15,
			hoverDelay: 0,
			alignment: 'center'
		});

	// Nav.
	// Disable mobile-specific navigation for desktop-only view
	if (window.innerWidth > 9999) { // Always use desktop navigation
		// Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">Estudio Jurídico Smulevici</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});
	}

		// Smooth scroll for in-page links
		$('a[href*="#"]').on('click', function(e) {
			var target = $(this).attr('href');
			var $targetElem = $(target);
			
			// Check if the target exists on the page and isn't the navPanel
			if (target !== '#navPanel' && $targetElem.length > 0) {
				e.preventDefault();
				
				// Calculate offset with fixed header
				var navHeight = $header.outerHeight();
				
				// Smooth scroll to target
				$('html, body').animate({
					scrollTop: $targetElem.offset().top - navHeight + 10
				}, 800);
				
				// Close mobile menu if open
				if ($body.hasClass('navPanel-visible')) {
					$body.removeClass('navPanel-visible');
				}
				
				// Update active state in navigation
				$('#nav > ul > li').removeClass('current');
				$('#nav > ul > li > a[href="' + target + '"]').parent().addClass('current');
			}
		});
		
		// Handle active navigation links
		function updateActiveNav() {
			// Update active nav link based on scroll position
			var scrollPosition = $window.scrollTop() + $header.outerHeight() + 50;
			var footerOffset = $('#footer').offset().top;
			var documentHeight = $(document).height();
			var viewportHeight = $(window).height();
			
			// Check if we've scrolled to the footer section
			if (scrollPosition >= footerOffset - viewportHeight/2 || $window.scrollTop() + viewportHeight >= documentHeight - 100) {
				// We're at the footer - highlight the "Contacto" link
				$('#nav > ul > li').removeClass('current');
				$('#nav > ul > li > a[href="#footer"]').parent().addClass('current');
				return;
			}
			
			// Otherwise, find which content section is currently visible
			var currentFound = false;
			$('section[id]').each(function() {
				if (currentFound) return;
				
				var currentSection = $(this);
				var sectionTop = currentSection.offset().top - $header.outerHeight();
				var sectionBottom = sectionTop + currentSection.outerHeight();
				
				if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
					var sectionId = '#' + currentSection.attr('id');
					$('#nav > ul > li').removeClass('current');
					$('#nav > ul > li > a[href="' + sectionId + '"]').parent().addClass('current');
					currentFound = true;
				}
			});
		}
		
		// Update active navigation on scroll
		$window.on('scroll', function() {
			updateActiveNav();
			animateOnScroll();
		});
		
		// Animation on scroll
		function animateOnScroll() {
			$('.box').each(function() {
				var boxElement = $(this);
				if (isElementInViewport(boxElement) && !boxElement.hasClass('animated')) {
					boxElement.addClass('animated');
				}
			});
		}
		
		// Check if element is in viewport
		function isElementInViewport(el) {
			if (typeof jQuery === "function" && el instanceof jQuery) {
				el = el[0];
			}
			var rect = el.getBoundingClientRect();
			return (
				rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
				rect.bottom >= 0
			);
		}

		// Collapsible content handlers
		var collExp = document.getElementsByClassName("collapsible-expand");
		var collComp = document.getElementsByClassName("collapsible-compress");

		for(var i=0; i < collExp.length; i++) {
			collExp[i].addEventListener("click", function() {
				$('.expanded')[parseInt(this.dataset.collIndex)].style.display = "block";
				$('.compressed')[parseInt(this.dataset.collIndex)].style.display = "none";
			});

			collComp[i].addEventListener("click", function() {
				$('.expanded')[parseInt(this.dataset.collIndex)].style.display = "none";
				$('.compressed')[parseInt(this.dataset.collIndex)].style.display = "block";
			});
		}
})(jQuery);