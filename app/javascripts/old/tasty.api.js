//API Stub

TastyAPI = {
    settings: {
        host: null,
        domain: 'mmm-tasty.ru',
        url: 'ajax',
    },

    request: function(controller,_method,itemId,options){
        if(typeof itemId != "number"){
            options = itemId;
            itemId = null;
        }
        if(typeof options == 'undefined'){
            options = {};
        }

        var url = TastyAPI.url(controller,_method,itemId);

        var method = 'POST';
        if (_method == 'delete') { method = 'DELETE'; }
        var xhr = new XMLHttpRequest();
        var form = new FormData();

        if(typeof options.data == "undefined"){
            options.data = {yeah:"_"}
        }

        if(typeof options.data == "object"){
            for(key in options.data){
                var value = options.data[key];
                if(value !== null){
                    form.append(key,value);
                }
            }
        }
        if(typeof options.data != "undefined"){
          if (_method == 'delete') { method = 'DELETE'; } else { method = 'POST'; }
        }else{options.data = {yeah:"_"}}

        xhr.onreadystatechange=stateHandler;
        xhr.upload.addEventListener("progress",progressHandler);

        xhr.open(method, url);
        var token = $("meta[name='csrf-token']").attr("content");
        xhr.setRequestHeader("X-CSRF-Token", token);
        xhr.send(form);

        function stateHandler(event){
            if (xhr.readyState==4) {
                var data = null;

                try {
                    data = JSON.parse(xhr.responseText);
                } catch(e) {}

                if(data == null) {
                    data = { response_code: 500, error: { code: "unknown", message: "Неизвестная ошибка, повторите попытку позже" } };
                }

                if (data != null && parseInt(data.response_code) == 200) {
                    successHandler(data.data);
                    completeHandler(data.data);
                } else {
                    errorHandler(data.error);
                    completeHandler(data.error);
                }
            }
        }

        function successHandler(data){
            if(typeof options.success == "function"){
                options.success(data);
            }
        }

        function completeHandler(data){
            if(typeof options.complete == "function"){
                options.complete(data);
            }
        }

        function progressHandler(event){
            if(typeof options.progress == "function"){
                var progress = (event.loaded * 100) / event.total;
                options.progress(progress);
            }
        }

        function errorHandler(data){
            if(typeof options.error == "function"){
                options.error(data);
            }
        }
    },

    host: function(){
        return 'http://'+window.location.host;
    },

    url: function(controller, method, itemId){
        return TastyAPI._urlGlue([
            TastyAPI.host(),
            TastyAPI.settings.url,
            controller,itemId, method ]);
    },

    _urlGlue: function(segments){
        return segments
            .filter(function(e){return (typeof e != 'undefined' && e);})
            .join('/');
    }
};
