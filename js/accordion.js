/**
 * Accordion
 *
 * @author     Rob Lone <info@fusionrobotdesign.com>
 * @copyright  Copyright (c) 2013 The Old County
 */

$.App.accordion = {
	init: function(){
		
		//$( "#accordion" ).accordion();

		



		$('[data-accordion="true"]').each(function(index) {
			$(this).accordion();
		});
		
	}
};
