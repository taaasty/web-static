###* @jsx React.DOM ###

MORE_COMMENTS_LIMIT = 50

window.EntryCommentBox = React.createClass
  mixins: ['CommentsMixin']

  propTypes:
    entryId:            React.PropTypes.number.isRequired
    user:               React.PropTypes.object
    limit:              React.PropTypes.number
    isEntryPage:        React.PropTypes.bool.isRequired
    totalCommentsCount: React.PropTypes.number.isRequired

  getDefaultProps: ->
    limit: MORE_COMMENTS_LIMIT

  render: ->
    if @props.user
      commentForm = `<EntryCommentBox_CommentFormManager user={ this.props.user }
                                                         isEntryPage={ this.props.isEntryPage }
                                                         totalCommentsCount={ this.props.totalCommentsCount }
                                                         disabled={ this.state.isPostLoading }
                                                         entryId={ this.props.entryId }
                                                         onSubmit={ this.postComment } />`

    if @state.comments.length > 0
      commentList = `<EntryCommentBox_CommentList comments={ this.state.comments }
                                                  entryId={ this.props.entryId }
                                                  user={ this.props.user }
                                                  onDelete={ this.removeComment } />`

      if @state.totalCount > @state.comments.length
        loadMoreButton = `<EntryCommentBox_LoadMore totalCount={ this.state.totalCount }
                                                    loadedCount={ this.state.comments.length }
                                                    limit={ this.props.limit }
                                                    onClick={ this.loadMoreComments } />`
    else
      if @state.isLoadError || @state.isLoadMoreError || @state.isPostError
        commentList = `<div>Ошибка загрузки.</div>`
      else if @state.isLoadLoading || @state.isLoadMoreLoading
        commentList = `<div>Загружается список комментариев</div>`

    return `<section className="comments">
              { loadMoreButton }
              { commentList }
              { commentForm }
            </section>`