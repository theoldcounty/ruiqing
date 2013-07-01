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
		var screenwidth = this.getScreenWidth();
		this.loopSwipersInit();
	},
	adaptSectionHeights: function(){
		$('section').each(function(index){
			var wrapperHeight = $(this).find('.wrappers').outerHeight(true);
			
			//console.log($(this).attr("id"));

			//console.log("wrapperHeight", wrapperHeight);
			$(this).css("height", wrapperHeight);
		});
	},
	adaptSwipers: function(){
		$('[data-swiper="true"]').each(function(index){
			var imgHeight = $(this).find('.swiper-slide img').outerHeight(true);

			//section parent
			$(this).closest("section").css("height", imgHeight);

			//swiper-container
			$(this).css("height", imgHeight);

			//swiper-wrapper
			$(this).find(".swiper-wrapper").css("height", imgHeight);

			//swiper-slide
			$(this).find(".swiper-slide").css("height", imgHeight);
		});
	},
	checkloadImg: function($img , pageReady){
		var img_index = 0;
		var img_length = $img.length;
		$img.each(function() {
			//Hidden images will not trigger the load event, duplicate images will not trigger either
			if(window.getComputedStyle(this).display == 'none' || this.complete) {
				img_length--;
			}
			else {
				$(this).on('load error abort', function() {
					img_index++;
					if(img_index == img_length) {
						pageReady("contents fully loaded in");
					}
				});
			}
		});

		if(!img_length) {
			pageReady("contents fully loaded in");
		}
	},
	loopSwipersInit: function(){
		var that = this;

		$(window).load(function() {
			// executes when complete page is fully loaded, including all frames, objects and images
			$('[data-swiper="true"]').each(function(index){
				var img = $(this).find('.swiper-slide').eq(0).find('img');
				that.checkloadImg(img, function(msg){
					that.adaptSwipers();
				});
			});			
		});

	},
	fsFix: function(){
		$('.fs-img').show();
		$('.fs-img').each(function(index){
			$(this).attr("src", $(this).data("large"));
		});
	},
	oldBrowserFix: function () {
		this.fsFix();
		this.adaptSectionHeights();
	},
	init: function(){
		var that = this;
		this.checkMode();
		this.adaptSectionHeights();
	},
	onResize: function(){
		this.checkMode();
		this.adaptSwipers();
		this.adaptSectionHeights();
	}
};
