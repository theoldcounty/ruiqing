/**
 * Mobile Handler
 *
 * @author     Rob Lone <info@fusionrobotdesign.com>
 * @copyright  Copyright (c) 2013 The Old County
 */

$.App.mobileHandler = {
	init: function(){
		$('#menu-link').addClass("close");

		if($.App.isResponsiveBrowser){
			this.bindMobileEvents();
		}
	},
	bindMobileEvents:function(){
		var that = this;
		$('#menu-link').click(function(e) {
			e.preventDefault();
			
			if($(this).hasClass("close")){
				$(this).removeClass("close").addClass("open");
				that.openMobileMenu();
			}else{
				$(this).addClass("close").removeClass("open");
				that.closeMobileMenu();
			}
		});

		$('#menu li a').click(function(e) {
			e.preventDefault();
			//console.log("clicked link detected now close menu");

			$('#menu-link').addClass("close").removeClass("open");
			that.closeMobileMenu();
		});
	},
	animateElement: function(el, posRight){
		$(el).animate({
			right: posRight,
		}, 400, "swing", function() {
			// Animation complete.
		});
	},
	openMobileMenu: function(){
		this.animateElement('#menu-link', 240);
		this.animateElement('#container', 240);
		this.animateElement('#menu', 0);
	},
	closeMobileMenu: function(){
		this.animateElement('#menu-link', 0);
		this.animateElement('#container', 0);
		this.animateElement('#menu', -240);
	}
};
