###* @jsx React.DOM ###

window.EntryCommentBox_CommentList = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    entryId: React.PropTypes.number.isRequired

  getInitialState: ->
    comments:  []
    isError:   false
    isLoading: false

  # componentDidMount: -> @loadCommentList()

  render: ->
    `<div className="comments__list js-comments-list">
      <EntryCommentBox_Comment />
    </div>`

  loadCommentList: ->
    @setState isError: false, isLoading: true

    @createRequest
      url: @relationUrl()
      data:
        since_position: sincePosition
      success: (data) =>
        @safeUpdateState => @props.onLoad('add', total_count: data.total_count, items: data.relationships)
      error:   (data) =>
        @safeUpdateState => @setState isError: true
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isLoading: false
        @decrementActivities()