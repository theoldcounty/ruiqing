/*
_ responsive.js is responsible for tweaking the site on various browser sizes


responsive
:: checkMode // Applying classes if mobile, ipad or desktop -- if its tall or short - if any different graphics need to be used (eg. the leather strip on the left, big or small variants of it)
:: init // is triggered initially on document ready to acquire the first initial mode
:: onResize // if a resize is detected - will check and adapt the modes again.
*/

$.App.responsive = {
	mobilethreshold: 480,
	ipadthreshold: 767,
	isIpad: false,
	isMobile: false,
	getScreenWidth: function(){
		return $(document).width();
	},
	getScreenHeight: function(){
		return  $(document).height();
	},
	checkMode: function(){
		var screenwidth = this.getScreenWidth();
		var screenheight = this.getScreenHeight();

		if(screenheight < 500){
			$('html').addClass('short').removeClass('medium').removeClass('tall');
		}
		else if(screenheight <= 768 && screenheight >500){
			$('html').addClass('medium').removeClass('short').removeClass('tall');
		}
		else{
			$('html').addClass('tall').removeClass('medium').removeClass('short');
		}

		if(screenwidth <= this.mobilethreshold ){
			this.isMobile = true;
			this.isIpad = false;
			$('html').addClass('mobile').removeClass('desktop').removeClass('ipad');
			//console.log("is mobile");
		}
		else if(screenwidth > this.mobilethreshold && screenwidth <= this.ipadthreshold){
			this.isMobile = false;
			this.isIpad = true;
			$('html').removeClass('mobile').removeClass('desktop').addClass('ipad');
			//console.log("is ipad");
		}
		else{
			this.isMobile = false;
			this.isIpad = false;
			$('html').removeClass('mobile').removeClass('ipad').addClass('desktop');
			//console.log("is desktop");
		}

		//_bind swipe operations if not already bound
		if(!$.App.swipeOperations.bound){
			$.App.swipeOperations.bindEvents();
		}
		//console.log("screenwidth", screenwidth);
		//alert(screenwidth);

		this.pageRefine();
	},
	pageRefine: function(){
		console.log("pageRefine");

		var screenwidth = this.getScreenWidth();
		console.log("screenwidth", screenwidth);

		//$('#cover-flow').css("width", screenwidth);
		//$('.pagination').css("width", screenwidth);

		//$('.swiper-container').css("width", screenwidth);
		//$('.swiper-slide').css("width", screenwidth);

	},
	init: function(){
		var that = this;
		this.checkMode();
	},
	onResize: function(){
		this.checkMode();
	}
};
