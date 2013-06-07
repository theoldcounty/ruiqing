/*
_ swipeOperations.js is responsible for appending swipe actions


swipeOperations
:: init // is invoked on document ready - and looks to bind events if ipad
:: bindEvents // will bind ipad swipe/taps to various elements to ensure they work on the ipad
:: bound // a flag to ensure the events are bound only once
*/

	var swipeOperations = {
		isIpad: false,
		up: function(){
			//alert("go up");
			//console.log("go up");
		},
		down: function(){
			//alert("go down");
			//console.log("go down");
		},
		left: function(){
			if(application.paneInControl == "homepage"){
				$(".arrow#left").click();
			}

			if(application.paneInControl == "subpage"){
				$('a#previous').click();
			}
		},
		right: function(){
			if(application.paneInControl == "homepage"){
				$(".arrow#right").click();
			}

			if(application.paneInControl == "subpage"){
				$('a#next').click();
			}
		},
		init: function(){
			if(navigator.userAgent.match(/iPad/i)){
				this.isIpad = true;
				this.bindEvents();
			}
		},
		bound: false,
		bindEvents: function(){
			var that = this;

			$('body').swipeLeft(function(e){
				that.right();
			});

			$('body').swipeRight(function(e){
				that.left();
			});


			$(".arrow").tap(function(e) {
				that.onArrowClick(this);
			});

			$("#cover-flow nav a").tap(function(e) {
				that.onCoverClick(this);
			});

			this.bound = true;
		}
	};
