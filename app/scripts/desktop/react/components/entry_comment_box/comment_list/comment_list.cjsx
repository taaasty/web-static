window.EntryCommentBox_CommentList = React.createClass

  propTypes:
    comments:        React.PropTypes.array.isRequired
    entryId:         React.PropTypes.number.isRequired
    entryUrl:        React.PropTypes.string.isRequired
    sharedCommentId: React.PropTypes.number
    user:            React.PropTypes.object
    onDelete:        React.PropTypes.func

  componentDidMount: ->
    if @props.sharedCommentId?
      alert 'К сожалению, данного комментария больше нет' unless @_isSharedCommentExists()

  render: ->
    that = @
    onDelete = => @props.onDelete.apply @, arguments

    commentList = @props.comments.map (comment) ->
      <EntryCommentBox_CommentManager comment={ comment }
                                      commentId={ comment.id }
                                      entryId={ that.props.entryId }
                                      entryUrl={ that.props.entryUrl }
                                      isShared={ that.props.sharedCommentId == comment.id }
                                      onDelete={ onDelete.bind(this, comment) }
                                      key={ comment.id } />

    return <div className="comments__list">{ commentList } </div>

  _isSharedCommentExists: ->
    result = @props.comments.filter (comment) =>
      comment.id == @props.sharedCommentId

    result.length > 0