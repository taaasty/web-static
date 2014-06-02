(function($){
	$.fn.toggleValue = function(options){
		var defaults = {
			input: '.js-toggle-value-input',
			label: '.js-toggle-value-label'
		};

	  	function toggle(input, label){
			setTimeout(function() {
				var value = input.val(),
					display = (value == '' || typeof value == 'undefined') ? 'block' : 'none';

				label.css({'display': display});
			}, 0);
		};

		return this.each(function(){
			var settings = $.extend(defaults, options); // TODO

			var self = this, $this = $(self),
				$input = $this.find(settings.input),
				$label = $this.find(settings.label);

			toggle($input, $label);

 	        $input
 	        	.on('focus' , function(){
					$label.css({'display': 'none'});
				})
				.on('blur paste' , function(){
					toggle($input, $label);
				});
		});
	};
})(jQuery);