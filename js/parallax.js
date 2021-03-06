/**
 * Parallax Time
 *
 * @author     Rob Lone <info@fusionrobotdesign.com>
 * @copyright  Copyright (c) 2013 Forest
 */

$.App.parallax = {
	init: function(){
		$('#parallaxOne .obj1, #parallaxOne .obj2, #parallaxOne .obj3, #parallaxOne .obj4, #parallaxOne .obj5').scrolly({bgParallax: true});
		$('#parallaxTwo .obj1, #parallaxTwo .obj2, #parallaxTwo .obj3').scrolly({bgParallax: true});
		$('#parallaxThree .obj1, #parallaxThree .obj2, #parallaxThree .obj3, #parallaxThree .obj4, #parallaxThree .obj5').scrolly({bgParallax: true});
	
		this.doMobile();
	},
	doMobile:function(){

		$('#parallaxOne .obj6').scrolly({bgParallax: true});
		$('#parallaxTwo .obj4').scrolly({bgParallax: true});
		$('#parallaxThree .obj6').scrolly({bgParallax: true});
	}
};
