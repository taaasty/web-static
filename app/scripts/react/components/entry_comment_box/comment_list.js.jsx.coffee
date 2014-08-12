###* @jsx React.DOM ###

MORE_COMMENTS_LIMIT = 50

window.EntryCommentBox_CommentList = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    entryId:  React.PropTypes.number.isRequired
    comments: React.PropTypes.array.isRequired
    onLoad:   React.PropTypes.func.isRequired

  getInitialState: ->
    total_count:     0
    last_comment_id: null
    isError:         false
    isLoading:       false

  componentDidMount: -> @loadCommentList()

  render: ->
    if @props.comments.length > 0
      commentList = @props.comments.map (comment, i) ->
        `<EntryCommentBox_Comment comment={ comment }
                                  key={ i } />`
    else
      if @state.isError
        commentList = `<div>Ошибка загрузки.</div>`
      else if @state.isLoading
        commentList = `<div>Загружается список комментариев</div>`
      else
        commentList = `<div>Комментариев нет</div>`

    return `<div className="comments__list">{ commentList}</div>`

  loadCommentList: ->
    @setState isError: false, isLoading: true

    @createRequest
      url: Routes.api.comments_url()
      data:
        entry_id: @props.entryId
        limit:    100
      success: (data) =>
        @safeUpdateState => @props.onLoad 'update', {
          comments:        data.comments
          total_count:     data.total_count
          last_comment_id: data.last_comment_id
        }
      error: (data) =>
        @safeUpdateState => @setState isError: true
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isLoading: false