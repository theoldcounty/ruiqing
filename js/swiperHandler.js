/*
_ swiperHandler.js is responsible for appending swipe actions


swiperHandler
*/


$.App.swiperHandler = {
	init: function(){
		this.buildGallerySwiper();
		this.invokeSwipers();
		this.bindEvents();
	},
	bindEvents: function(){
		var that = this;

		$(".pagination .swiper-pagination-switch").click(function(e) {
			var swiperId = $(this).closest('.swiper-container').attr("id");
			that.getSwiper(swiperId).swipeTo($(this).index());
		});
	},
	buildSwiper: function(holder, newId, contentArray){
		$(holder).wrapInner('<div id="'+newId+'" class="swiper-container" data-swiper="true" data-orientation="horizontal" data-loop="true"/>');
		$(holder).find('.swiper-container').wrapInner('<div class="swiper-wrapper" />');

		$(holder).find('.swiper-container').append('<div class="pagination"></div>');

		//loop with contents
		for (var i = 0; i < contentArray.length; i++) {
			$(holder).find('.swiper-wrapper').append('<div class="swiper-slide">'+contentArray[i]+'</div>');
		}
	},
	buildGallerySwiper: function(){
		var that = this;

		var localArray = new Array();
		var count = ($('#cover-flow nav a').length) -1;// do not consider dummy nav a
		$('#cover-flow nav a').each(function(index) {
			var imgUrl = $(this).data("url");

			var html = '<img src="'+imgUrl+'"/>';
			localArray.push(html);

			if(count-1 == index){
				that.buildSwiper(".imgHolder", "fullgallery", localArray);
			}
		});

		$(".arrow.left.marketing").click(function(e) {
			var swiperId = $(this).closest('.swiper-container').attr("id");
			that.getSwiper(swiperId).swipePrev();// run transition to previous slide
		});

		$(".arrow.right.marketing").click(function(e) {
			var swiperId = $(this).closest('.swiper-container').attr("id");
			that.getSwiper(swiperId).swipeNext();//run transition to next slide
		});

	},
	invokeSwipers: function(){
		var that = this;
		var localArray = new Array();

		$('[data-swiper="true"]').each(function() {
			var confiObj = {};
				confiObj.mode = $(this).data("orientation");
				confiObj.pagination = '#'+$(this).attr("id")+' .pagination';
				confiObj.loop = $(this).data("loop");

			var mySwiper = new Swiper(this,confiObj);

			localArray[$(this).attr("id")] = mySwiper;
		});

		that.objSwipers = localArray;

		$.App.responsive.pageRefine(); //ensure pagination looks good initially
	},
	objSwipers: null,
	getSwiper: function(id){
		return this.objSwipers[id];
	},
	setSwiperTo: function(id, index){
		var speed = 900;

		this.getSwiper(id).swipeTo(index, speed, function(msg){
			console.log(msg);
		});
	},
	goPreviousSwipe: function(id){
		this.getSwiper(id).swipePrev();//run transition to previous slide
	},
	goNextSwipe: function(id){
		this.getSwiper(id).swipeNext();//run transition to next slide
	},
	getActiveSwipe: function(id) {
		return this.getSwiper(id).activeIndex;
	},
	setSwiperSize: function(id){
		this.getSwiper(id).resizeFix();
	}
}
