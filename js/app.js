/*
_ app.js is responsible for setting the stage.

init // is invoked on the document ready.
:: It binds the events
:: Checks the arrow states
:: Assesses the precense of a hash tag
:: Adds a menu listener to allow dynamic arrow follows when the user hovers on the navigation elements in the side menu
:: Sets the general stage from showing the home page with the spectrum fade ins, otherwise it will hide the arrows to prepare the content page


loadJsDynamically // is invoked when the browser is not IE8 or lower - this loads in the key responsive/zepto js libraries. If present on IE8 or lower cause javascript errors.

getHash // retrieves the current hash
setHash // sets the hash to a desired value

hashtrigger // is invoked if the hash value changes. This could be due to click events, or the user going back/forward - the function determines if it needs to fade into the home page
or if it needs to jump to a particular article


*/
$.App ={
	init: function(){
		var that = this;

		$.App.parallax.init();
		$.App.scrollMenu.init();
		$.App.curtainCarousel.init();
		$.App.swiperHandler.init();

		$.App.accordion.init();
		$.App.soundCloudHandler.init();
		$.App.mobileHandler.init();
		
		this.menuListener();
	},
	loadJsDynamically: function(filename){
		var fileref=document.createElement('script');
		fileref.setAttribute("type","text/javascript");
		fileref.setAttribute("src", filename);

		if (typeof fileref!="undefined"){
			$('.jsholder').append(fileref);
		}
	},
	menuListener: function(){
		var that = this;
		var $navigation = $('#menu li');

		window.setTimeout(function() {
			that.highlightMenuItem($navigation.find('a').first());
		}, 200);

		$navigation.find('a').on('mouseover', function() {
			that.highlightMenuItem($(this));
		});
	},
	highlightMenuItem: function($item){
		var widthOfItem = $item.width();
		$('#nav-pointer').stop().animate({ left: $item.position().left + (widthOfItem/2) - 5 }, 500, 'easeOutBack');
	},
	isResponsiveBrowser: true,
	browserCheck: function(){
		console.log("browserCheck");

		if ($.browser.msie  && parseInt($.browser.version, 10) <= 8) {
			$('html').addClass("ie8orless");
			this.isResponsiveBrowser = false;
		}
		else{
			this.loadJsDynamically("js/libs/zepto.touch.js");//dynamically load and add this .js file
			this.loadJsDynamically("js/responsive.js");//dynamically load and add this .js file
		}
	},/*
	addMenuListener: function(){
		var that = this;
		var $navigation = $('.internal-links li');

		window.setTimeout(function() {
			that.highlightMenuItem($navigation.find('a').first());
		}, 200);

		$navigation.find('a').on('mouseover', function() {
			that.highlightMenuItem($(this));
		});
	},
	highlightMenuItem: function($item) {
		$('#nav-pointer').stop().animate({ top: $item.position().top + 5 }, 500, 'easeOutBack');
		$('#nav-pointer').find('#pointer-left').stop().animate({left: $item.position().left - 15}, 500);
		$('#nav-pointer').find('#pointer-right').stop().animate({left: $item.position().left + $item.width() + 10}, 500);
	},*/
	hashtrigger: function(hash){
		this.setHash(hash);//set the changed hash
	},
	getHash: function(){
		var hash = window.location.hash;
		return hash.substring(1); // remove #
	},
	setHash: function(hashVar){
		window.location.hash = hashVar;
	}
};

	/*on window resize*/
	window.onresize = function(event) {
		if($.App.isResponsiveBrowser){
			$.App.responsive.onResize();
		}
	}

	/*on window scroll*/
	window.onscroll = function (event) {
		//subPageFunctions.bindScrollHandler();

		window.setTimeout(function(){
			//subPageFunctions.bindScrollHandler();
		},1000);
	}

	$(document).ready(function() {
		$.App.browserCheck();
		if($.App.isResponsiveBrowser){
			$.App.responsive.init();
		}
		$.App.init();
	});

	// Bind an event to window.onhashchange that, when the history state changes,
	// gets the url from the hash and displays either our cached content or fetches
	// new content to be displayed.
	$(window).bind('hashchange', function(e) {
		$.App.hashtrigger($.App.getHash());
	})

	// Since the event is only triggered when the hash changes, we need to trigger
	// the event now, to handle the hash the page may have loaded with.
	$(window).trigger('hashchange');