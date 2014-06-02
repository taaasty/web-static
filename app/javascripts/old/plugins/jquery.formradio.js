(function($){
    $.fn.formRadio = function(options){
        var defaults = {
            radio: '.form-radio',
            radioActiveClass: 'form-radio--active'
        };

        function clearRadioActive(radio, className){
            radio.removeClass(className);
        };

        return this.each(function(){
            var settings = $.extend(defaults, options);

            var self = this, $this = $(self),
                $radio = $this.find(settings.radio);

            $this.on('change', function(e){
                clearRadioActive($radio, settings.radioActiveClass);
                $(e.target).parents(settings.radio).addClass(settings.radioActiveClass);
            });

            clearRadioActive($radio, settings.radioActiveClass);
            $radio.each(function(){
                if (this.getElementsByTagName('input')[0].checked) {
                    $(this).addClass(settings.radioActiveClass);
                };
            });
        });
    };
})(jQuery);