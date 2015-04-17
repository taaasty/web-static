classnames = require 'classnames'

window.EntryCommentBox_Comment = React.createClass

  propTypes:
    comment:     React.PropTypes.object.isRequired
    entryId:     React.PropTypes.number.isRequired
    entryUrl:    React.PropTypes.string.isRequired
    isShared:    React.PropTypes.bool
    onDelete:    React.PropTypes.func

  componentDidMount: -> @_scrollToComment() if @props.isShared

  render: ->
    commentClasses = classnames('comment', {
      'state--highlighted': @props.isShared
    })

    return <article className={ commentClasses }>
             <div className="comment__table">
               <div className="comment__table-cell">
                 <a href={ this.props.comment.user.tlog_url }
                    title={ this.props.comment.user.name }
                    target="_blank"
                    className="comment__user">
                   <span className="comment__avatar">
                     <UserAvatar user={ this.props.comment.user }
                                 size={ 64 } />
                   </span>
                   <span className="comment__username comment__username--bold">{ this.props.comment.user.name } </span>
                 </a>
                 <span dangerouslySetInnerHTML={{__html: this.props.comment.comment_html || ''}} />
                 <EntryCommentBox_CommentMetaBar name={ this.props.comment.user.name }
                                                 commentId={ this.props.comment.id }
                                                 commentCreatedAt={ this.props.comment.created_at }
                                                 canReport={ this.props.comment.can_report }
                                                 canDelete={ this.props.comment.can_delete }
                                                 canEdit={ this.props.comment.can_edit }
                                                 entryId={ this.props.entryId }
                                                 entryUrl={ this.props.entryUrl }
                                                 onDelete={ this.props.onDelete } />
               </div>
             </div>
           </article>

  _scrollToComment: ->
    $comment = $( @getDOMNode() )

    # Предотвращаем запоминание положения scrollTop в Chrome и Safari
    $(window).one 'load', => TastyUtils.scrollToElement @getDOMNode()

    # Принудительно скроллим к зашаренному комменту, если загрузка страницы
    # закончилась раньше чем мы зарегистрировали callback
    if $(window).scrollTop() != $comment.offset().top
      TastyUtils.scrollToElement @getDOMNode()