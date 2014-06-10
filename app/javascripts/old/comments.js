(function($){
    Comments = function(container, options){
        if (!container ) return false;
        this.settings = $.extend({},this.settings, options);
        this.container = $(container);
        this._init();
    };

    Comments.prototype = {
        //elemnets
        container: null, // текущий пост
        comments: null, // комментарии к посту
        commentsList: null, // список комментариев
        commentTextarea: null,
        commentsToggler: null, // переключатель комментариев
        spinner: null, // лоадер к комментарм
        tmplComments: null, // шаблон для контейнера комментариев
        tmplComment: null, // шаблон комментария
        tmplAvatar: null, // шаблон комментария

        //state vars
        loading: false,
        shown: false,

        //useful info
        lastCommentId: null, // id of the last rendered comment
        commentsShown: 0,

        data: [],//array of comments


        _init: function(){
            var container = this.container;
            var opts = this.settings;

            if(this.settings.commentsCount !== null) {
                this.settings.onUpdateCommentsCount(this.settings.commentsCount);
            }

            this.commentsToggler = container.find(opts.commentsToggler);
            this.tmplComments = $( opts.tmplComments );
            this.tmplComment  = $( opts.tmplComment );
            this.tmplAvatar   = $( opts.tmplAvatar );
            this.spinner = container.find( opts.spinner );
            this.loadedIds = [];

            this.renderContainerComments();

            this._initEvents();

            if (this.settings.opened) {
                this.settings.numberVisible = null
                this.toggleComments(true);
                this.getComments();
            };
        },

        _initEvents: function(){
            this.commentsToggler.on('click', function(event){
                event.preventDefault();
                if(!this.loading){
                    this.toggleComments();
                }
            }.bind(this));

            this.container.on('click', this.settings.commentReply, this.commentReply.bind(this));
            this.container.on('click', this.settings.commentDelete, this.commentDelete.bind(this));
            this.container.on('click', this.settings.commentReport, this.commentReport.bind(this));
            this.container.on('keydown', this.commentTextarea, this.addComments.bind(this));
            this.container.on('click', this.settings.commentsMoreLink, this.getCommentsAll.bind(this))
        },

        getComments: function(loaded){
            if(this.loading == true){
                return;
            }

            this.toggleLoading(true);

            TastyAPI.request('comment', 'find', {
                data: {
                    entry_id: this.settings.entryId,
                    order: 'asc'
                },
                success: function (data) {
                    this.toggleLoading(false);

                    this.settings.onUpdateCommentsCount(data.count);

                    if (!(data.comments instanceof Array) || data.comments.length == 0) {
                        loaded(data);
                    } else {
                        this.data = data.comments;

                        this.renderContainerComments();
                        this.renderComments(data.comments, this.settings.numberVisible);
                        this._updateContainer();

                        if (this.commentTextarea.hasClass('js-sew')) {
                            this.sew(data.comments);
                        }

                        loaded(data);
                    }
                }.bind(this),
                error: function (error) {
                    TastyUtils.notify('error', error.message);
                    this.toggleLoading(false);
                }.bind(this)
            });
        },

        getCommentsAll: function(event){
            event.preventDefault();
            this.renderComments(this.data,null);
            this.renderContainerComments();
        },

        _commentContainerData: function(){
            var visible = this.settings.numberVisible;
            var total = this.data.length;
            var more = ( total > visible ) ? total - visible : 0;
            var id = this.container.index();

            return {
                id: id, // id для привязки тексэрии и лейбл
                total: total, // количество комментов к посту
                more: more, // сколько ещё комментов не показано
                loadMore: "Загрузить все "+total+" "+this.declension(total),
                url : this.url // ссылка на пост
            };
        },

        _updateContainer: function(){
            var data = this._commentContainerData();
            var more = this.comments.find(this.settings.commentsMore);
            if(this.commentsShown >= this.data.length){
                more.hide();
            }else{
                more.show()
            }
            more.find('a')
                .attr('title', data.loadMore)
                .html(data.loadMore);
        },

        renderContainerComments: function(){
            var opts = this.settings;
            var data = this._commentContainerData();

            if(this.comments != null){
                this._updateContainer();
                return;
            }

            var html = this.tmplComments.render([data]);

            this.container.append(html);

            this.comments = this.container.find(opts.comments);
            this.commentTextarea = this.container.find(opts.commentTextarea);

            if (this.commentTextarea.hasClass('js-autoresize'))
                this.commentTextarea.autosize();

            this.commentsList = this.container.find(opts.commentsList);

            this.container.find(opts.toggleValue).toggleValue();
        },

        _collectDataComment : function( data ){
            var letter = data.author.username.toUpperCase().charAt(0);
            var styles = [
                'first', 'second', 'third', 'fourth', 'fifth'
            ];
            var index = 90 - letter.charCodeAt(0)
            var style = styles[Math.round(index/(styles.length+1))]

            return {
                id: data.id, // id коммента
                text: data.text, // содержимое коммента
                createdAt: data.created_at.rfc822, // дата создания комментария
                createdAgo: $.timeago(new Date(data.created_at.rfc822)),
                authorName: data.author.username,
                authorPic: data.author.userpic,
                authorUrl: data.author.url,
                avatarStyle: style,
                avatarLetter: letter,
                can_delete: data.can_delete,
                can_report: data.can_report
            };
        },

        renderComments : function(data,limit,own){
            var opts = this.settings;
            var last = this.lastCommentId;
            if(typeof limit == 'undefined')
                limit = null;

            if(own){
                this.renderOwnComment(this._collectDataComment(data[0]));

            }else{
                data = data.filter(function(c){return this.loadedIds.indexOf(c.id) == -1}.bind(this));

                if(limit !== null){
                    data = data.splice(data.length-limit,limit);
                }

                data.reverse()
                    .map(this._collectDataComment)
                    .map(this.renderComment.bind(this));
            }
        },

        renderOwnComment: function(comment){
            //this.lastCommentId = comment.id;
            this.commentsShown++;
            comment.avatarHtml = this.tmplAvatar.render(comment);
            var html = this.tmplComment.render(comment);

            this.commentsList.append(html);
            /*this.commentsList
             .find('> :last')
             .hide()
             .fadeIn(300)
             .find(this.settings.commentReply);*/
        },

        renderComment: function(comment){
            if(this.loadedIds.indexOf(comment.id) > -1){
                return;
            }
            this.loadedIds.push(comment.id);
            this.commentsShown++;
            comment.avatarHtml = this.tmplAvatar.render(comment);

            var html = this.tmplComment.render(comment);

            this.commentsList.prepend(html);
            this.commentsList
                .find('> :last')
                .hide()
                .fadeIn(300)
                .find(this.settings.commentReply);
        },

        toggleComments: function(value){
            this.shown = (typeof value == 'undefined') ? !this.shown : value;

            if(this.shown){
                if(this.lastCommentId === null){
                    this.getComments(this.showComments.bind(this));
                }else{
                    this.showComments();
                }
            } else {
                this.hideComments();
            }
        },

        showComments: function() {
            var hiddenClass = this.settings.hiddenClass;

            this.comments.fadeIn(300, function(){
                $(this).removeClass(hiddenClass);
            });

            $.scrollTo(this.comments, 500, {offset:-50});

            $(this.commentTextarea).focus();
        },

        hideComments: function() {
            var hiddenClass = this.settings.hiddenClass;

            this.comments.fadeOut(300, function(){
                $(this).addClass(hiddenClass);
            });
        },

        toggleLoading: function(value){
            this.loading = (typeof value == 'undefined') ? !this.loading : value;
            this.spinner.toggleClass(this.settings.hiddenClass, !this.loading);
        },

        sew : function( data ){ // выбор получаетелей при наборе @
            var values = [];

            for ( var i = 0, tmpObj, val, countUsers = data.length; i < countUsers; i++ ) {
                if ( val != data[i].author.username ) { // нужна проверка на своё имя
                    val = data[i].author.username;
                    tmp = { val : val, meta : val };
                    values.push( tmp );
                }
            };

            this.commentTextarea.sew({ values : values });
        },

        commentReply: function(event){
            var user = $(event.target).data('user');
            this.commentTextarea.focus().val( '@' + user + ' ' );
        },

        commentReport: function(event){
            var commentId = $(event.target).data('id');

            $('.confirmation').show();
            $('body').addClass('confirmation-enabled');
            $('.confirmation .confirmation__text').html("Вы действительно хотите пожаловаться на комментарий?");
            $('.confirmation .button__text').html("Подать жалобу");

            $('.confirmation .button').off('click').on('click', function() {
                $('.confirmation').hide();
                $('body').removeClass('confirmation-enabled');

                TastyAPI.request('comment', 'report', commentId, {
                    success: function (data) {
                        TastyUtils.notify('success', "Спасибо, жалоба на комментарий принята!");
                    },
                    error: function (error) {
                        TastyUtils.notify('error', error.message);
                    }
                });
            });

            event.preventDefault();
        },

        commentDelete: function(event){
            var commentId = $(event.target).data('id');
            var comment = $('#comment-'+commentId);
            var context = this;

            $('.confirmation').show();
            $('body').addClass('confirmation-enabled');
            $('.confirmation .confirmation__text').html("Вы действительно хотите удалить комментарий?");
            $('.confirmation .button__text').html("Удалить комментарий");

            $('.confirmation .button').off('click').on('click', function() {
                $('.confirmation').hide();
                $('body').removeClass('confirmation-enabled');

                TastyAPI.request('comment', 'delete', commentId, {
                    success: function (data) {
                        $(comment).fadeOut(500,function(){
                            $(comment).slideUp(200,function(){$(this).remove();});
                        });

                        TastyUtils.notify('success', "Комментарий удален");

                        context.settings.onUpdateCommentsCount(data.count);
                    },
                    error: function (error) {
                        TastyUtils.notify('error', error.message);
                    }
                });
            });

            event.preventDefault();
        },

        addComments: function(event){
            var urlAdd = this.settings.urlAdd;

            if (event.which == 13) {
                event.preventDefault();

                var element = $(event.target);
                var value = event.target.value;

                element.attr('disabled', 'disabled');

                TastyAPI.request('comment', 'save', {
                    data: {
                        entry_id: this.settings.entryId,
                        text: value
                    },
                    success: function (data) {
                        this.settings.onUpdateCommentsCount(data.count);
                        this.renderComments([data.comment],null,true);
                        element.val('').trigger('blur');
                        element.attr('disabled', null);
                    }.bind(this),
                    error: function (error) {
                        TastyUtils.notify('error', error.message);
                        element.attr('disabled', null);
                    }
                });
            }
        },

        declension : function( number ){
            var titles = [ 'комментарий', 'комментария', 'комментариев' ],
                cases = [ 2, 0, 1, 1, 1, 2 ];

            return titles[ (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5] ];
        }
    };

    Comments.prototype.settings = {
        opened: false,
        hidden: true,
        numberVisible: 7,
        urlGet: null,
        urlAdd: null,
        entryId: null,
        comments : '.js-comments',
        commentsList : '.js-comments-list',
        commentReply : '.js-comment-reply',
        commentDelete : '.js-comment-delete',
        commentReport : '.js-comment-report',
        commentDate : '.js-comment-date',
        commentTextarea : '.js-comment-textarea',
        //commentsForm : '.js-comment-form',
        commentsMore : '.js-comments-more',
        commentsMoreLink : '.js-comments-more-link',
        commentsToggler : '.js-comments-toggle',
        spinner : '.js-comments-spinner',
        toggleValue : '.js-toggle-value',
        hiddenClass : 'state--hidden',
        tmplComments : '#tmpl-comments',
        tmplComment : '#tmpl-comment',
        tmplAvatar : '#tmpl-comment-avatar',

        commentsCount: null,
        onUpdateCommentsCount: function() {}
    };
})(jQuery);
