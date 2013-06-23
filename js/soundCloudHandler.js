/*
_ swiperHandler.js is responsible for appending swipe actions


swiperHandler
*/


$.App.soundCloudHandler = {
	init: function(){
		console.log("start swiper stuff");
		//bind events
		this.bindSoundCloudEvents();
	},
	swapSoundCloud: function(el){
		this.fabricateIframeSoundCloud($(el).data("soundcloudid"));
	},
	fabricateIframeSoundCloud: function(soundId){
		var src = "https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F"+soundId+"&amp;color=fe2502&amp;auto_play=false&amp;show_artwork=true";
		var iframeTemplate = '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="'+src+'"></iframe>';
		
		var holder = $('#soundcloudholder .iframewrap');
		holder.fadeOut(130, function(){
			holder.empty().html(iframeTemplate).fadeIn(130);	
		})
	},
	bindSoundCloudEvents: function(){
		var that = this;
		$('.audiolist li a').click(function(e) {
			e.preventDefault();
			that.swapSoundCloud(this);
		});
	}
}