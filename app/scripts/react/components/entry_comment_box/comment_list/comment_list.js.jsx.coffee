###* @jsx React.DOM ###

MORE_COMMENTS_LIMIT = 50

window.EntryCommentBox_CommentList = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    entryId:  React.PropTypes.number.isRequired
    comments: React.PropTypes.array.isRequired
    onLoad:   React.PropTypes.func.isRequired

  getInitialState: ->
    sinceCommentId: null
    totalCount:     null
    isError:        false
    isLoading:      false

  componentDidMount: -> @loadCommentList()

  render: ->
    if @props.comments.length > 0
      commentList = @props.comments.map (comment, i) ->
        `<EntryCommentBox_Comment comment={ comment }
                                  key={ i } />`

      if @state.totalCount > @props.comments.length
        loadMoreButton = `<EntryCommentBox_LoadMore totalCount={ this.state.totalCount }
                                                    loadedCount={ this.props.comments.length }
                                                    onClick={ this.loadMoreComments } />`
    else
      if @state.isError
        commentList = `<div>Ошибка загрузки.</div>`
      else if @state.isLoading
        commentList = `<div>Загружается список комментариев</div>`
      else
        commentList = `<div>Комментариев нет</div>`

    return `<div className="comments__list">
              { loadMoreButton }
              { commentList }
            </div>`

  loadCommentList: (more) ->
    @setState isError: false, isLoading: true

    if more
      data = { entry_id: @props.entryId, limit: MORE_COMMENTS_LIMIT, since_comment_id: @state.sinceCommentId }
      action = 'more'
    else
      data = { entry_id: @props.entryId }
      action = 'update'

    @createRequest
      url: Routes.api.comments_url()
      data: data
      success: (data) =>
        @safeUpdateState =>
          @setState {
            totalCount: data.total_count
            sinceCommentId: data.comments[0]?.id
          }
          @props.onLoad action, comments: data.comments
      error: (data) =>
        @safeUpdateState => @setState isError: true
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isLoading: false

  loadMoreComments: -> @loadCommentList true