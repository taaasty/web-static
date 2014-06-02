function PostEditor(){this._init()};
PostEditor.prototype = {
    post: {
        id: 0,
        type: 'unlock',
        local: false,

        text:  {title:'', text: ''},
        quote: {source:'', text: ''},
        image: {title:'', file: null,rotation:0},
        video: {title:'', url: null},
    },

    saving: false,
    storageKey: null,

    _init: function(){
        var editorElement = $(".js-post-editor");

        this.post.id = editorElement.data("id");
        this.post.type = editorElement.data("type");
        //console.log(this.post,editorElement,editorElement.data("post-type"));
        if(!(this.post.id > 0))
            this.post.id = 0;

        this.storageKey = 'post-'+(this.post.id);

        //trying to load locally stored post
        try{
            var saved = JSON.parse(localStorage.getItem(this.storageKey));
            saved.local = true;
            if(typeof saved.text.text != 'undefined'
                &&typeof saved.quote.text != 'undefined'
                &&typeof saved.image.title != 'undefined'
                &&typeof saved.video.title != 'undefined'
                ){
                this.post = saved;
            }
        }catch(e){}


        if(this.post.id > 0){
            $(".js-back").attr('href', $(".js-back").data('url'));
        }else{
            this.post.id = 0;
        }

        //trying to load post from dom
        if(!this.post.local || this.post.id == null){
            console.log('saved post');
            //this.activateType(this.post.id, this.post.type);
        }


        if(typeof this.post.type != "undefined" && (this.post.id >0 && this.post.type)) {
            this.activateType(this.post.id, this.post.type);
        }

        //post types
        $(".js-back").on("click", function(e){
            if(this.post.id > 0) {
                return false;
            } else if(this.post.type != null){
                this.activateIndex();
                return false;
            } else {
                return true;
            }
        }.bind(this));

        $(".js-switcher-type-post").on("click", function(e){
            var type = $(e.currentTarget).data("type-post");
            this.activateType(this.post.id, type);
            return false;
        }.bind(this));

        //post editor mode
        var modes = ["full", "minimal"];
        var activeClass = "state--active";
        var is_full = $('body').hasClass('tlog-mode-full');

        $(".js-tasty-editor-post-preview").on("click", function(){
            $('body').removeClass("tlog-mode-" + (is_full?'full':'minimal'));

            is_full = !is_full;
            $(this).toggleClass(activeClass, is_full);
            $('body').addClass("tlog-mode-" + (is_full?'full':'minimal'));
        });

        $(".js-tasty-editor-post-save").on("click", function(){
            this.saveRemote();
        }.bind(this));

        //privacy
        $(".js-tasty-editor-post-option").on("click", function(event){
            var current = $(".js-tasty-editor-post-option.state--active").removeClass('state--active').data('value');
            var newValue = $(event.currentTarget).addClass('state--active').data('value');
            $(".js-tasty-editor-post-button-settings")
                .removeClass('state--'+current)
                .addClass('state--'+newValue);
            this.post.privacy = newValue;
        }.bind(this));

        //userbar
        $('.toolbar').hide();
    },

    saveLocal: function(){
        console.log('saving localy',this.storageKey, this.post);

        if(this.post){
            localStorage.setItem(this.storageKey,JSON.stringify(this.post));
        }else{
            localStorage.setItem(this.storageKey,null);
        }
    },

    saveRemote: function(){
        if(this.saving){
            return;
        }

        $('.post-actions').addClass('state--loading');
        var type    = this.post.type;
        var id      = this.post.id;
        var privacy = this.post.privacy;
        if(!privacy){
            privacy = 'unlock';
        }

        var data = {id: id, type: type, privacy: privacy};

        for(key in this.post[type]){
            data[key]=this.post[type][key];
        }

        console.log(this.post);

        if(type=='image'){
            if(data['url'] && data['file']){
                if(data['file'] instanceof File){
                    data['url'] = null;
                }else{
                    data['file'] = null;
                }
            }
        }

        var options = {
            data: data,
            progress: function(p){
                $('.js-tasty-editor-image-loader-fill').css({width: p+'%'});
            },
            success: this.onSaveSuccess.bind(this),
            error:  this.onSaveError.bind(this),
            complete: function(){
                $('.post-actions').removeClass('state--loading');
                this.saving=false;
            }.bind(this),
        };

        this.saving = true;
        if(id>0){
            TastyAPI.request('entry','save',this.post.id,options);
        }else{
            TastyAPI.request('entry','save',options);
        }

    },

    onSaveSuccess: function(data){
        console.log('save', data);
        this.post = null;
        this.saveLocal();
        window.location.href = data.url;
    },

    onSaveError: function(error){
        $('.js-tasty-editor-image-loader-fill').width(0);
        console.log('error', error);
        Tasty.notify('error', error.message);
    },

    activateIndex: function(){
        $('body').addClass("no-scroll");
        $('.tasty-editor').html('');
        var postType = this.post.type;
        setTimeout(function(){
            $('body').addClass("types-posts-enabled")
                .removeClass("edited-post-" + postType);
        }.bind(this),50);

        this.post.type = null;
    },

    activateType: function(postId,postType){
        this.post.type = postType;
        this.saveLocal();

        $('body').removeClass("no-scroll");
        setTimeout(function(){
            $('body').removeClass("types-posts-enabled")
                .addClass("edited-post-" + postType);
        },50);

        this['post'+postType]();
    },

    posttext:function(){
        var title = $('.js-tasty-editor-text-title').get(0);
        var text = $('.js-tasty-editor-text-content').get(0);
        var titleEditor, contentEditor;

        contentEditor = this.buildRich(text,'post__content',function(core){
            this.post.text.text = contentEditor.getContent();
            this.saveLocal();
        }.bind(this));
        titleEditor = this.buildPoor(title,'post__title',function(core){
            this.post.text.title = titleEditor.getContent();
            this.saveLocal();
        }.bind(this));

        if(titleEditor.isEmpty() && this.post.text.title.length>0){
            titleEditor.setContent(this.post.text.title);
        }
        titleEditor._onChange();

        if(contentEditor.isEmpty() || this.post.text.text.length>0){
            contentEditor.setContent(this.post.text.text);
        }
        contentEditor._onChange();

    },

    postquote:function(){
        var text =  $('.js-tasty-editor-quote').get(0);
        var title = $('.js-tasty-editor-quote-caption').get(0);
        var titleEditor, contentEditor;

        contentEditor = this.buildPoor(text,'',function(core){
            this.post.quote.text = contentEditor.getContent();
            this.saveLocal();
        }.bind(this));
        titleEditor = this.buildPoor(title,'',function(core){
            this.post.quote.source = titleEditor.getContent();
            this.saveLocal();
        }.bind(this));

        if(titleEditor.isEmpty() && this.post.quote.source.length>0){
            titleEditor.setContent(this.post.quote.source);
        }
        titleEditor._onChange();

        if(contentEditor.isEmpty() || this.post.quote.text.length>0) {
            contentEditor.setContent(this.post.quote.text);
        }
        contentEditor._onChange();
    },

    postimage:function(){
        var setImageUrl = function(url){
            display.html('');
            display.append(image);
            image.src = url;
            console.log('setting url');
            this.post.image.url = url;
            this.post.file = null;
            media.removeClass('state--insert');
            this.saveLocal();
        }.bind(this);

        $('.js-tasty-editor-image-loader-fill').width(0);

        var cont = $('.post--image');

        var prefix = '.js-tasty-editor-image-';

        var image = new Image();
        var width = null;
        var height = null;
        var aspect = null;
        var angle  = 0;

        var display = $('.js-tasty-editor-image-display');
        var drop    = $('.js-tasty-editor-image-drop');
        var media    = $('.js-tasty-editor-image-drop');
        var input   = $('.js-tasty-editor-image-file');
        var caption = $('.js-tasty-editor-image-caption');
        var remove  = $('.js-tasty-editor-image-delete');
        var rotate  = $('.js-tasty-editor-image-rotate');
        var formToggle = $('.js-tasty-editor-image-form-toggle');
        var formClose  = $('.js-tasty-editor-image-form-close');
        var formUrl    = $('.js-tasty-editor-image-form-url');

        var asd = new FileReceiver({ // инициализируем загрузку ковера в настройках дизайна
            hoverClass: 'state--drag-hover',
            cover: '.blah-blah-blah-please-remove-me',
            dropables: [drop],
            inputs: ['.js-tasty-editor-image-file'],
            onReady: function(file){
                this.post.image.file = file;
                this.post.image.url = null;
                //this.setValue('layout-cover',file);
            }.bind(this),
            onReaderLoad: function(url) {
                image.src=url;
                this.post.image.url = url;
                this.saveLocal();
            }.bind(this),
            onStart: function(){
                display.html('');
                display.append(image);
            }
        });

        console.log(asd);

        formToggle.off('click').on('click',function(){
            media.addClass('state--insert');
            formUrl.focus();
            return false;
        });

        formClose.off('click').on('click',function(){
            media.removeClass('state--insert');
            return false;
        });

        formUrl.off('keyup').on("keyup", function(event){
            if(event.keyCode == 13){
                var value = $(event.target).val();
                setImageUrl(value);
            }
        }.bind(this));

        formUrl.off('paste').on("paste", function(event){
            var value = event.originalEvent.clipboardData.getData('text/plain');
            setImageUrl(value);
        }.bind(this));

        this.post.image.url = formUrl.val();

        image.addEventListener('load', function(){
            display.show();

            drop.addClass('state--loaded');
            width = $(image).width();
            height = $(image).height();
            aspect = width/height;
            angle = 0;
            console.log('load',width,height);
        });

        remove.off('click').on('click',function(){
            $(display).html('');
            image.src = '';
            media.removeClass('state--loaded');
            media.removeClass('state--insert');
            formUrl.val('');
        });

        rotate.off('click').on('click',function(){
            var img = display.find('img');
            img.removeClass('rotate--'+angle);

            angle += 90;
            if(angle>270) angle = 0;

            this.post.image.rotation = angle;

            if(angle == 90 || angle == 270){
                img.width('auto');
                img.height(width);
                img.css({transformOrigin: 'left top 0'});
                var top,bottom,left;
                if(angle == 90){
                    top = 0;
                    bottom = 0;
                    left = width;
                }else{//270
                    top = Math.floor(width*aspect);
                    bottom = width*-1;
                    left = 0;
                }
                img.css({marginTop:top+'px', marginBottom: bottom+'px', marginLeft: left+'px'});
            }else{
                img.css({transformOrigin: '50% 50% 0', marginLeft: 0, marginTop:0,marginBottom:0});
                img.width(width);
                img.height(height);
            }

            img.addClass('rotate--'+angle);

            return false;
        }.bind(this));

        var title = caption.get(0);
        titleEditor = this.buildRich(title,'post__title',function(core){
            this.post.image.title = titleEditor.getContent();
            this.saveLocal();
        }.bind(this));


        if(titleEditor.isEmpty() && this.post.image.title.length>0) {
            titleEditor.setContent(this.post.image.title);
        }

        titleEditor._onChange();

        if(media.hasClass('state--loaded')) {
            this.post.image.url = $('img', display).attr('src');
        }

        if(this.post.image.url){
            setImageUrl(this.post.image.url);
        }
    },

    postvideo:function(){
        var sendURL = function(url,self){
            $('.post-actions').addClass('state--loading');
            TastyAPI.request('utils','embed', {
                data:{url:url},
                success:function(result){
                    var post = $('#tmpl-post-video').render({
                        url:result.url,
                        code:result.code,
                        cover:result.thumbnail.url
                    });

                    this.post.video.url=result.url;
                    this.saveLocal();

                    display.html($(post).html());
                    $('.video__cover', display).css('height', '400px'); // hack
                    Tasty.setupVideos();

                    if(titleEditor.isEmpty()) {
                        titleEditor.setContent(result.title);
                    }

                    media.addClass('state--loaded');
                }.bind(this),
                error: function(error){
                    Tasty.notify('error', error.message);
                },
                complete:function(){
                    $('.post-actions').removeClass('state--loading');
                },
            });
        }.bind(this);

        var media   = $('.post--video .media-box');
        var display = $('.js-tasty-editor-video-display');
        var caption = $('.js-tasty-editor-video-caption')
        var remove  = $('.js-tasty-editor-video-delete');

        var formToggle = $('.js-tasty-editor-video-form-toggle');
        var formClose  = $('.js-tasty-editor-video-form-close');
        var formUrl    = $('.js-tasty-editor-video-form-url');

        var cont = $('.post--video');

        formToggle.off('click').on('click',function(){
            media.addClass('state--insert');
            formUrl.val('');
            formUrl.focus();
            return false;
        });

        formClose.off('click').on('click',function(){
            media.removeClass('state--insert');
            return false;
        });

        formUrl.off('keyup').on("keyup", function(event){
            if(event.keyCode == 13){
                var value = $(event.target).val();
                sendURL(value);
                media.removeClass('state--insert');
            }
        }.bind(this));

        formUrl.off('paste').on("paste", function(event){
            var value = event.originalEvent.clipboardData.getData('text/plain');
            sendURL(value);
            media.removeClass('state--insert');
        }.bind(this));


        this.post.video.url = formUrl.val();

        remove.click(function(){
            media.removeClass('state--loaded');
            media.removeClass('state--insert');
            formUrl.val('');
        });

        titleEditor = this.buildRich(caption.get(0),'post__title',function(core){
            this.post.video.title = titleEditor.getContent();
            this.saveLocal();
        }.bind(this));

        if(titleEditor.isEmpty() && this.post.video.title.length>0) {
            titleEditor.setContent(this.post.video.title);
        }

        titleEditor._onChange();

        if(media.hasClass('state--loaded')) {
            this.post.video.url = $('.video__embed', display).data('url');
            Tasty.setupVideos();
        } else if(this.post.video.url){
            sendURL(this.post.video.url);
        }
    },

    buildRich: function(element,className,change){
        var core=new TastyEditor.Core(element,{
            selector:'tasty-editor '+className,
            selectorPrefix:'tasty-editor-',
            multiline: true,
        });
        var ui = new TastyEditor.UI(core,this._uiRich);
        var link = this._buildButtonLink(core,ui);
        ui.addButton('&lt;a /&gt;',link);

        core.addChangeListener(change);

        return core;
    },

    buildPoor: function(element,className,change){
        var core=new TastyEditor.Core(element,{
            selector:'tasty-editor '+className,
            selectorPrefix:'tasty-editor-',
            multiline: false,
        });
        var ui = new TastyEditor.UI(core,this._uiPoor);

        core.addChangeListener(change);

        return core;
    },

    _buildButtonLink: function(core,ui){
        var enabled = false;
        var link = new TastyEditor.Button('link',core,ui);
        link.allow = ['a'];

        link.onInit  = function(ui,core){
            var code = $(
                    '<div class="tasty-editor-link">'
                    +'<i class="tasty-editor-link-x">h</i>'
                    +'<input class="tasty-editor-link-input" placeholder="Вставьте ссылку" value="" type="text">'
                    +'</div>'
            );
            var input = code.find('input');
            var remove = code.find('.tasty-editor-link-x');

            code.appendTo(this.toolbar.find('.tasty-editor-toolbar-inner'));

            remove.on("click",function(){
                ui.toolbar.removeClass('mode--link');
                core.focus();
                input.val('');
                core.exec('unlink');
            });
            input.on("change keyup input",function(event){
                if(input.val().length > 0){
                    //  remove.removeClass('state--hidden');
                }else{
                    //  remove.addClass('state--hidden');
                }

                core.focus();
                core.exec('link',input.val());
                console.log(event);

                if(event.type == "keyup" && event.keyCode == 13){
                    console.log('return');
                    input.val('');
                    ui.toolbar.addClass('mode--link');
                }else{
                    input.focus();
                }
            });
        };
        link.onClick = function(ui,core){
            core.focus();
            var is_link = this.core.query('link');
            if(!is_link){
                ui.toolbar.addClass('mode--link');
            }else{
                core.exec('unlink');
            }
        };
        link.onUpdate  = function(){};
        link.getStatus = function(){
            return (this.core.query('link') ? 'active':'inactive');
        }.bind(link);

        return link;
    },

    _uiRich: {
        onInit: function(ui){
            var core = ui.core;
            var doc = core.doc;
            var holder = core.holder;
            var placeholderText = $(core.holder).data('placeholder');

            var toolbar = $(
                    '<div class="tasty-editor-toolbar state--hidden">'
                    +  '<div class="tasty-editor-toolbar-inner">'
                    +    '<i class="tasty-editor-arr"></i>'
                    +    '<div class="tasty-editor-buttons"></div>'
                    +  '</div>'
                    +'</div>');

            toolbar.addClass('state--hidden');

            ui.placeholder = $('<div style="position: absolute">');
            ui.placeholder.addClass(core.formatClassName('placeholder'));
            ui.placeholder.html(placeholderText);

            ui.placeholder.on('click', function(){
                $(core.buffer).focus();
            });

            $(core.buffer).focus(function(){
                if(!core.isEmpty()){
                    $(ui.placeholder).addClass('state--hidden');
                }
            });

            $(core.buffer).blur(function(){
                if(core.isEmpty()){
                    ui.placeholder.removeClass('state--hidden');
                }
            });

            holder.insertBefore(toolbar.get(0), core.buffer);
            holder.insertBefore(ui.placeholder.get(0), core.buffer);

            ui.toolbar = toolbar;

            if(!core.isEmpty()){
                ui.placeholder.addClass('state--hidden');
            }
        },

        onUpdate: function(ui,core){
            if(core.range == null || core.range.collapsed){
                $(ui.toolbar).addClass('state--hidden');
            }else{
                var toolbar= $(ui.toolbar);
                toolbar.removeClass('state--hidden');

                var offset = $(ui.core.holder).offset();
                var rect = core.range.getBoundingClientRect();

                var top  = rect.top - offset.top - toolbar.height();
                var left = rect.left - offset.left - ((toolbar.width() - rect.width)/2);

                $(ui.toolbar).css({top:top, left:left});
            }

            for(bid in ui.buttons){
                var button  = ui.buttons[bid];
                var classes = [];

                button.object.onUpdate(ui,core);
                button.object.getElement().className = button.object.getClassList().join(" ");
            }
        },

        onChange: function(ui,core){
            if(!core.isEmpty()) {
                ui.placeholder.addClass('state--hidden');
            } else {
                ui.placeholder.removeClass('state--hidden');
            }
        },

        onAdd: function(ui,core,title, object){
            var container = ui.toolbar.find('.tasty-editor-buttons');
            var element = $('<div>');
            element.attr('class','tasty-editor-button tasty-editor-button-'+object.name);
            element.appendTo(container);
            element.html(title)
            object.setElement(element.get(0));
        }
    },//end _uiRich

    _uiPoor:{
        onInit: function(ui){
            var core = ui.core;
            var doc = core.doc;
            var holder = core.holder;
            var placeholderText = $(core.holder).data('placeholder');

            ui.placeholder = $('<div style="position: absolute;">');
            ui.placeholder.addClass(core.formatClassName('placeholder'));
            ui.placeholder.html(placeholderText);

            ui.placeholder.on('click', function(){
                $(core.buffer).focus();
            });

            $(core.buffer).focus(function(){
                if(!core.isEmpty()){
                    $(ui.placeholder).addClass('state--hidden');
                }
            });

            $(core.buffer).blur(function(){
                if(core.isEmpty()){
                    ui.placeholder.removeClass('state--hidden');
                }
            });

            holder.insertBefore(ui.placeholder.get(0), core.buffer);

            if(!core.isEmpty()){
                ui.placeholder.addClass('state--hidden');
            }
        },
        onChange: function(ui,core){
            if(core.getContent().length > 0) {
                ui.placeholder.addClass('state--hidden');
            } else {
                ui.placeholder.removeClass('state--hidden');
            }
        },
        onUpdate: function(ui,core){}
    }//end _uiPoor
};
