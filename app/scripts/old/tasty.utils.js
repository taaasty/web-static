(function($){
    Tasty.setCookie = function(key,value){
        var domain = '.'+window.location.host.replace(/([a-z0-9-]+)\.([a-z0-9-]+\.[a-z0-9-]+)/i,'$2')
        docCookies.setItem('popup-firends-active',1,Infinity,'/',domain);
    };

    Tasty.getCookie = function(key){
        return docCookies.getItem(key);
    }

    Tasty.declension = function( number, titles ){
        var cases = [ 2, 0, 1, 1, 1, 2 ];
        return titles[ (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5] ];
    }

    Tasty.centerHorizontally = function (element){
        $(element).each(function(){
            var e = $(this);
            e.css("margin-left", -(e.width() / 2));
        });
    };

    Tasty.onMousewheel = function(e, d){
        e.stopPropagation();

        if ((this.scrollTop === (this.scrollHeight - this.offsetHeight) && d < 0) || (this.scrollTop === 0 && d > 0)) {
            e.preventDefault();
        }
    };
})(jQuery);
