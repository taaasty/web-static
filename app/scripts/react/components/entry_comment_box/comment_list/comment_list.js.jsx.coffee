###* @jsx React.DOM ###

window.EntryCommentBox_CommentList = React.createClass

  propTypes:
    comments: React.PropTypes.array.isRequired
    entryId:  React.PropTypes.number.isRequired

  render: ->
    that = @
    commentList = @props.comments.map (comment) ->
      `<EntryCommentBox_Comment comment={ comment }
                                entryId={ that.props.entryId }
                                key={ comment.id } />`

    `<div className="comments__list">{ commentList } </div>`