###* @jsx React.DOM ###

window.EntryCommentBox_CommentList = React.createClass

  propTypes:
    comments: React.PropTypes.array.isRequired
    entryId:  React.PropTypes.number.isRequired
    user:     React.PropTypes.object
    onDelete: React.PropTypes.func

  render: ->
    that = @
    onDelete = => @props.onDelete.apply @, arguments
    commentList = @props.comments.map (comment) ->
      `<EntryCommentBox_Comment comment={ comment }
                                entryId={ that.props.entryId }
                                onDelete={ onDelete.bind(this, comment) }
                                key={ comment.id } />`

    `<div className="comments__list">{ commentList } </div>`