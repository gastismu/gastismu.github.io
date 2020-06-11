/*
	Arcana by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
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
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			offsetY: -15,
			hoverDelay: 0,
			alignment: 'center'
		});

	// Nav.

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

		// link scroll
		$('a[href*="#"]').on('click', function(e) {
		  e.preventDefault()
			if ($($(this).attr('href'))[0].id !== 'navPanel') {
			  $('html, body').animate(
			    {
			      scrollTop: $($(this).attr('href')).offset().top  - ($("#titleBar").height() + parseInt($("#page-wrapper").css('padding-top').replace(/([a-zA-Z ])/g,''))),
			    },
			    500,
			    'linear'
			  )
			}

		})

		// var collExp = document.getElementsByClassName("collapsible-expand")[0];
		var i;
		var collExp = document.getElementsByClassName("collapsible-expand");
		var collComp = document.getElementsByClassName("collapsible-compress");

		for(i=0; i < collExp.length; i++) {
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