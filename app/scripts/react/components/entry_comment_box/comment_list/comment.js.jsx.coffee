###* @jsx React.DOM ###

HIGHLIGHTING_HIDE_TIMEOUT = 5000

window.EntryCommentBox_Comment = React.createClass

  propTypes:
    comment:  React.PropTypes.object.isRequired
    entryId:  React.PropTypes.number.isRequired
    entryUrl: React.PropTypes.string.isRequired
    isShared: React.PropTypes.bool
    onDelete: React.PropTypes.func

  getInitialState: ->
    isHighlited: false

  componentDidMount: ->
    if @props.isShared
      @_scrollToComment()
      @_highlightComment()

  render: ->
    commentClasses = React.addons.classSet {
      comment: true
      'state--shared': @props.isShared
      'state--highlited': @state.isHighlited
    }

    return `<article className={ commentClasses }>
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
                  <span dangerouslySetInnerHTML={{ __html: this.props.comment.comment_html }} />
                  <EntryCommentBox_CommentMetaBar name={ this.props.comment.user.name }
                                                  commentId={ this.props.comment.id }
                                                  commentCreatedAt={ this.props.comment.created_at }
                                                  canReport={ this.props.comment.can_report }
                                                  canDelete={ this.props.comment.can_delete }
                                                  entryId={ this.props.entryId }
                                                  entryUrl={ this.props.entryUrl }
                                                  onDelete={ this.props.onDelete } />
                </div>
              </div>
            </article>`

  _highlightComment: ->
    @setState isHighlited: true

    setTimeout (=>
      @setState isHighlited: false
    ), HIGHLIGHTING_HIDE_TIMEOUT

  _scrollToComment: ->
    $comment = $( @getDOMNode() )

    # Предотвращаем запоминание положения scrollTop в Chrome и Safari
    $(window).on 'load', ->
      setTimeout (->
        scrollTo(0, $comment.offset().top)
      ), 0

    # Принудительно скроллим к зашаренному комменту, если загрузка страницы
    # закончилась раньше чем мы зарегистрировали callback
    if $(window).scrollTop() != $comment.offset().top
      scrollTo(0, $comment.offset().top)