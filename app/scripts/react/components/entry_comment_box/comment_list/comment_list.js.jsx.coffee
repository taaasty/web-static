###* @jsx React.DOM ###

window.EntryCommentBox_CommentList = React.createClass

  propTypes:
    comments: React.PropTypes.array.isRequired

  render: ->
    commentList = @props.comments.map (comment) ->
      `<EntryCommentBox_Comment comment={ comment } key={ comment.id } />`

    `<div className="comments__list">{ commentList } </div>`