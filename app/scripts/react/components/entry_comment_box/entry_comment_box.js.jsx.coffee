###* @jsx React.DOM ###

MORE_COMMENTS_LIMIT = 50

window.EntryCommentBox = React.createClass
  mixins: ['CommentsMixin']

  propTypes:
    entryId: React.PropTypes.number.isRequired
    user:    React.PropTypes.object.isRequired
    limit:   React.PropTypes.number

  getDefaultProps: ->
    limit: MORE_COMMENTS_LIMIT

  render: ->
    if @props.user
      commentForm = `<EntryCommentBox_CommentForm user={ this.props.user }
                                                  disabled={ this.state.isPostLoading }
                                                  onSubmit={ this.postComment } />`

    if @state.comments.length > 0
      commentList = `<EntryCommentBox_CommentList comments={ this.state.comments } />`

      if @state.totalCount > @state.comments.length
        loadMoreButton = `<EntryCommentBox_LoadMore totalCount={ this.state.totalCount }
                                                    loadedCount={ this.state.comments.length }
                                                    limit={ this.props.limit }
                                                    onClick={ this.loadMoreComments } />`
    else
      if @state.isLoadError || @state.isLoadMoreError || @state.isPostError
        commentList = `<div>Ошибка загрузки.</div>`
      else if @state.isLoading
        commentList = `<div>Загружается список комментариев</div>`
      else
        commentList = `<div>Комментариев нет</div>`

    return `<section className="comments">
              { loadMoreButton }
              { commentList }
              { commentForm }
            </section>`