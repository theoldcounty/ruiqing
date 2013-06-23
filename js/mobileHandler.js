/**
 * Mobile Handler
 *
 * @author     Rob Lone <info@fusionrobotdesign.com>
 * @copyright  Copyright (c) 2013 The Old County
 */

$.App.mobileHandler = {
	init: function(){
		this.bindMobileEvents();
	},
	bindMobileEvents:function(){
		var that = this;
		$('.mobilemenu a').click(function(e) {
			e.preventDefault();-
			that.openMobileMenu();
		});

		$('.mobileclose a').click(function(e) {
			e.preventDefault();-
			that.closeMobileMenu();
		});						
	},
	openMobileMenu: function(){
		$('#header .wrapperelements').show();
	},
	closeMobileMenu: function(){
		$('#header .wrapperelements').hide();
	}
};
