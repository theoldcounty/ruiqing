/**
 * scrollMenu
 *
 * @author     Rob Lone <info@fusionrobotdesign.com>
 * @copyright  Copyright (c) 2013 The Old County
 */

var scrollMenu = {

	/**
	* Initialise
	*
	* @return  void
	*/
	init: function(){

		this.eventBinding();

	},


	//Get Sections top position
	getTargetTop: function(elem){

		//gets the id of the section header
		//from the navigation's href e.g. ("#html")
		var id = elem.attr("href");

		//Height of the navigation
		var offset = 0;

		//Gets the distance from the top and
		//subtracts the height of the nav.
		return $(id).offset().top - offset;
	},

	toggleSubMenu: function(el, active){
		if (active){
			$(el).find('.submenu').slideDown();
			$(el).addClass("on");
		}
		else{
			$(el).find('.submenu').slideUp();
			$(el).removeClass("on");
		}
	},

	closeAccordionsInAllSections: function(){
		$('.section').each(function( index ) {
			var sectionAccordion = $(this).find(".accordion");
			$.Forest.accordion.shutParentAccordion(sectionAccordion);
		});
	},

	previousSection: "",

	proximityToNextSection : "",

	nextSection: "",
	// Go through each section to see if it's at the top.
	// if it is add an active class
	checkSectionSelected: function(scrolledTo){
		var _self = this;

		//Pulling sections from main nav.
		var sections = $('ul#menu a');

		//How close the top has to be to the section.
		var threshold = 100;

		var i;

		for (i = 0; i < sections.length; i++) {

			//get next nav item
			var section = $(sections[i]);

			//get the distance from top
			var target = _self.getTargetTop(section);

			//Check if section is at the top of the page.
			if (scrolledTo > target - threshold && scrolledTo < target + threshold) {

				//remove all selected elements
				sections.removeClass("selected");

				//add current selected element.
				section.addClass("selected");

				var id = section.attr("href").substring(1);
				$('section').removeClass("on").addClass("off").removeClass("parallaxOn");
				$('section#'+id).addClass("on").removeClass("off");

				_self.currentSection = section;
			}
		}
	},


	eventBinding: function(){
		var _self = this;

		//Smooth scroll when user click link that starts with #
		$('ul#menu a').click(function(event) {
			event.preventDefault();//prevent the browser from jumping down to section.

			$('ul#menu a').removeClass("selected");
			$(this).addClass("selected");

			console.log("clicked menu");

			//gets the distance from the top of the
			//section refenced in the href.


			var target = _self.getTargetTop($(this));
			console.log("target", target);


			$('html, body').animate({scrollTop:target}, 500);//scrolls to that section.

		});


		//Check if page is already scrolled to a section.
		_self.checkSectionSelected($(window).scrollTop());

		$(window).scroll(function(e){
			_self.checkSectionSelected($(window).scrollTop());
		});

	}
};
