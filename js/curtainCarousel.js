/*
_ curtainCarousel.js is responsible for curtainCarousel.

spectrumFadeIn and honeyCombFadeIn // are responsible for animating the strips on load, fading them in one by one from left to right


coverScrollAnimate // animates the cover nav - left/right
getHoneycombLength // retrieves the exact width of a cover nav strip
getMaxBatchCount // the strips are batched togeter by the honeycombsPerBatch. So this will review the total number of strips and return the number of possible maximum batches
getHoneycombCount // returns the number of strips
getBatchLength // returns the pixel length of a batch of strips, in this instances it is 5 strips to a batch - so about 700 pixels. This is used for the system to acknowlodge the displacement needed.
honeycombsPerBatch // currently set to 5 - adjusting this value will cause the carousel to cover more or less strips in a swipe

moveBars // this effect takes the index of the stripe that was clicked, wraps the left side elements into wrap 1 and the right side elements into wrap 2. It then animates the two halves in the opposite direction to create a curtain effect
wrapTheBars // this function performs the grouping and wrapping of the elements
reWrapNav // this corrects the elements so they are back in their initial position and markup.
unwrapTheBars //this unwraps the elements - when the user returns to the home page - it resets the stage - ready to be split again etc..
animateGroupedBars //this performs the global animation for the two wrapped bar objects

*/

$.App.curtainCarousel = {
		init: function(){
			console.log("start curtain carousel");

			var that = this;
			this.bindEvents();
			this.checkArrowStates();

			this.preStage(function(){
				that.spectrumFadeIn();
			});
		},
		goToSpecificArticle: function(index){
			$('#cover-flow nav a').eq(index).click();
		},
		paneInControl: "homepage",
		triggerCoverClick: function(hashFind){
			var that = this;
			$("#cover-flow nav a").each(function(index) {
				var title = $(this).data("url");
				if(hashFind == title){
					window.setTimeout(function(){
						that.goToSpecificArticle(index);
					},500);

					return false;
				}
			});
		},
		isCoverClicked: false,
		preStage: function(callback){
			$("html").addClass("js"); //append js to html class

			//hide loader
			$('#cover-flow nav a').hide(); //set starting point

			callback(true);
		},
		honeyCombFadeIn: function(el, duration, timeout, callback){
			$(el).delay(timeout).fadeIn(duration, function(){
				callback(true);
			});
		},
		spectrumFadeIn: function(){
			var that = this;
			var timeout = 1150;
			$('#cover-flow nav a').each(function( index ) {
				that.honeyCombFadeIn(this, 300, timeout, function(){
					//complete animation
				});
				timeout+=100;
			});
		},
		disableArrow: function(arrow){
			$(arrow).addClass("disable").removeClass("enable");
		},
		enableArrow: function(arrow){
			$(arrow).removeClass("disable").addClass("enable");
		},
		currentBatch: 1,
		honeycombsPerBatch: 5,
		getBatchLength: function(){
			return (this.getHoneycombLength() * this.honeycombsPerBatch);
		},
		getHoneycombCount: function(){
			return $("#cover-flow nav a").size();
		},
		getMaxBatchCount: function(){
			return Math.ceil(this.getHoneycombCount()/this.honeycombsPerBatch);
		},
		getHoneycombLength: function(){
			var theDiv = $("#cover-flow nav a");
			var totalWidth = theDiv.outerWidth(true);
			return totalWidth;
		},
		checkArrowStates: function(){
			if(this.currentBatch == 1){
				this.disableArrow("#left");
			}
			else{
				this.enableArrow("#left");
			}

			if(this.currentBatch == this.getMaxBatchCount()){
				this.disableArrow("#right");
			}
			else{
				this.enableArrow("#right");
			}
		},

		getSelectedImage : function(callback){

			for (var i = 0; i < $("#cover-flow nav a").length; i++) {
				if($("#cover-flow nav a").eq(i).hasClass("selected")){
					callback(i);
					break;
				}
			}

		},

		flowScrollAnimate: function(direction){
			var that = this;

			this.getSelectedImage(function(currentIndex){


				if(direction == "left"){
					var nextIndex = currentIndex-1;
				}else{
					var nextIndex = currentIndex+1;
				}

				console.log("nextIndex", nextIndex);
				var nextSelectedElement = $("#cover-flow nav a").eq(nextIndex);

				var isExist = nextSelectedElement.length;

				console.log("test is exit"+isExist);

				if(isExist > 0 && nextIndex > 0){
					$("#cover-flow nav a").removeClass();
					nextSelectedElement.addClass("selected");

					var newImg = $("#cover-flow nav a").eq(nextIndex).data("url");
					console.log("animate the flow time mode"+ direction);

					console.log("newImg"+newImg);

					that.loadContent(newImg, function(){
						console.log("new image in place via new method");
					});
				}
				else{

				}
			});


		},
		coverScrollAnimate: function(direction){
			var that = this;
			var displacement = this.getBatchLength();
			var duration = 700;

			var symbol;
			if(direction == "left"){
				symbol = "+";
				this.currentBatch--;
			}
			else{
				symbol = "-";
				this.currentBatch++;
			}

			this.disableArrow("#left");
			this.disableArrow("#right");

			$('#cover-flow nav').stop().animate({
				left: symbol+"="+displacement,
				easing: 'easeOutQuad'
			}, duration, function() {
				// Animation complete.
				that.checkArrowStates();
			});
		},
		hideCoverPage: function(callback){
			$("#cover-flow").hide();

			callback("done");
			this.paneInControl = "subpage";
		},
		showCoverPage: function(){
			var that = this;

			//
			$("#cover-flow").show();
			this.sidebarAnimation("open", function(){
				//animation done
			});
			this.paneInControl = "homepage";

			window.setTimeout(function() {
				that.unwrapTheBars(1);
				that.unwrapTheBars(2);
				that.reWrapNav();
				//$('nav').unwrap();
			}, 400);
		},
		goToHome: function(){
			var that = this;

			//hide content page
			$('#adventure-wrapper').fadeOut(650, function(){
				//show cover page
				that.showCoverPage();

				that.sidebarAnimation("open", function(){
					that.spectrumFadeIn();
				});
			});
		},
		onArrowClick: function(el){
			var side = $(el).attr("id");
			////console.log("clicked "+side);


			var isDisabled = $(el).hasClass("disable");
			var isCarousel = $(el).hasClass("carousel");
			var isFlowtime = $(el).hasClass("flowtime");

			if(!isDisabled){
				if(isFlowtime){
					//is flowtime
					this.flowScrollAnimate(side);

				}else{
					//iscarouseltime
					this.coverScrollAnimate(side);
				}
			}
		},
		animateGroupedBars: function(group, duration, direction, displacement){
			var symbol = "+";
			if(direction == "left"){
				symbol = "-";
			}

			$(group).stop().animate({
				left: symbol+"="+displacement,
				easing: 'easeOutQuad'
			}, duration, function() {
				// Animation complete.
			});
		},
		unwrapTheBars: function(groupNumber){
			$('#cover-flow nav a.group'+groupNumber).unwrap();
		},
		hasReWrapped: false,
		reWrapNav: function(){
			var that = this;
			if(!this.hasReWrapped){
				this.hasReWrapped = true;

				$('#cover-flow a.child').wrapAll('<div class="new" />');
				$('#cover-flow nav a').removeClass('group1').removeClass('group2');

				var navContents = $('.new').html();
				$('.new').remove();
				$('#cover-flow nav').html(navContents);

				window.setTimeout(function(){
					that.hasReWrapped = false;//reset
				},300);
				that.bindEvents();
			}
		},
		wrapTheBars: function(groupNumber){
			$('#cover-flow nav a.group'+groupNumber)
			.filter(function() {
				return !$(this).prev().is('.group'+groupNumber);
			})
			.map(function() {
				return $(this).nextUntil(':not(.group'+groupNumber+')').andSelf();
			})
			.wrap('<div class="wrap'+groupNumber+'" />');
		},
		moveBars: function(index, callback){
			var that = this;

			var barsBefore = index;
			var barsAfter = index+1;

			var displacement = $(window).width();
			var duration = 1900;

			for(i=0;i<=barsBefore; i++){
				$('#cover-flow nav a').eq(i).addClass("group1");
			}

			for(i=barsAfter;i<=this.getHoneycombCount(); i++){
				$('#cover-flow nav a').eq(i).addClass("group2");
			}

			this.wrapTheBars(1);
			this.wrapTheBars(2);

			that.animateWraps("open", displacement, duration, function(){
				callback(true);
			});

		},
		revertBars: function(){
			var that = this;

			var displacement = $(window).width();
			var duration = 1900;

			$('.arrow').removeClass("flowtime").addClass("carousel").removeClass("disable").addClass("enable");

			$('.arrow.carousel').show();

			$('#cover-flow nav').show();
			that.animateWraps("close", displacement, duration, function(){
				that.unwrapTheBars(1);
				that.unwrapTheBars(2);
				that.reWrapNav();

				$('.arrow.carousel').show();
			});
		},
		animateWraps: function(mode, displacement, duration, callback){

			var that = this;

			if(mode == "open"){
				that.animateGroupedBars('.wrap1', duration, "left", displacement);
				that.animateGroupedBars('.wrap2', duration, "right", displacement);
			}
			else{
				that.animateGroupedBars('.wrap1', duration, "right", displacement);
				that.animateGroupedBars('.wrap2', duration, "left", displacement);
			}

			window.setTimeout(function(){
				callback(true);
			},duration);


		},

		loadContent: function(url, callback){

			$('#fullspread .imgHolder').fadeOut(500, function(){
				$('#fullspread .imgHolder').empty().append('<img src="'+url+'"/>');
			});


			var $img = $('#fullspread .imgHolder').find('img');
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
							$('#fullspread .imgHolder').fadeIn(500);
							callback("contents fully loaded in");
						}
					});
				}
			});

			if(!img_length) {
				$('#fullspread .imgHolder').fadeIn(500);
				callback("contents fully loaded in");
			}

		},
		onCoverClick: function(el){
			var that = this;
			this.isCoverClicked = true;

			$("#cover-flow nav a").removeClass("selected");
			$(el).addClass("selected");

			//load in content
			var link = $(el).attr("href");
			var url = $(el).data("url");
			var title = $(el).attr("title");
			var index = $(el).index();

			console.log("index", index);

			$('.arrow.carousel').fadeOut(300);

			//this.loadContent(url, function(){
				//load complete

					$.App.swiperHandler.setSwiperTo("fullgallery", index);
					that.moveBars(index, function(){
						console.log("finsihed moving the bars");
						$('#cover-flow nav').hide();
					});

					window.setTimeout(function(){
						that.isCoverClicked = false;//reset
					},300);

			//});

		},
		switchToColor: function(el){
			var coverImg = $(el).find('.coverImg');
			var colorUrl = coverImg.data('img-color');
			coverImg.attr("src", colorUrl);
		},
		switchToBlack: function(el){
			var coverImg = $(el).find('.coverImg');
			var colorUrl = coverImg.data('img-color');
			var blackUrl = colorUrl.replace("_","_blk");
			coverImg.attr("src", blackUrl);
		},
		bindEvents: function(){
			var that = this;

			$(".arrow").click(function(e) {
				that.onArrowClick(this);
			});


			$(".back a").click(function(e) {
				e.preventDefault();
				that.revertBars();
			});


			$(".arrow").mouseover(function() {
				var isDisabled = $(this).hasClass("disable");
				if(!isDisabled){
					$(this).addClass("hover");
				}
			}).mouseout(function(){
				$(this).removeClass("hover");
			});

			$(document).keydown(function(e) {
				//console.log("e.keyCode", e.keyCode);
				/*
				left = 37
				up = 38
				right = 39
				down = 40
				*/

				//left
				if(e.keyCode == 37){
					if(that.paneInControl == "homepage"){
						$(".arrow#left").click();
					}
					if(that.paneInControl == "subpage"){
						$('a#previous').click();
					}
				}

				//right
				if(e.keyCode == 39){
					if(that.paneInControl == "homepage"){
						$(".arrow#right").click();
					}
					if(that.paneInControl == "subpage"){
						$('a#next').click();
					}
				}
			});

			$("#cover-flow nav a").click(function(e) {
				e.preventDefault();
				that.onCoverClick(this);
			});

			$("#cover-flow nav a").mouseover(function() {
				$(this).addClass("hover");
				that.switchToColor(this);
			}).mouseout(function(){
				$(this).removeClass("hover");
				that.switchToBlack(this);
			});
		},
		sidebarAnimation: function(action, callback){
			var displacement = 0;
			var duration = 300;
			var padding = 10;
			if(action == "close"){
				displacement = -(parseInt($('#sidebar').css("width"),10)) - padding;
				duration = 350;
			}

			$('#sidebar').stop().animate({
				left: displacement
			}, duration, function() {
				// Animation complete.
				callback(true);
			});
		}
};