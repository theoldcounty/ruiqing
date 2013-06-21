/**
 * Accordion
 *
 * @author     Rob Lone <info@fusionrobotdesign.com>
 * @copyright  Copyright (c) 2013 The Old County
 */

$.App.accordion = {
	init: function(){

		$('[data-accordion="true"]').each(function(index) {
			var configuration = {
				heightStyle: "content" 
			};

			$(this).accordion(configuration);
		});
	}
};
