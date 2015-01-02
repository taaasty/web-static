CommentManager = require './comment_list/comment_manager'
{ PropTypes } = React

CommentList = React.createClass
  displayName: 'CommentList'

  propTypes:
    comments:        PropTypes.array.isRequired
    entry:           PropTypes.object.isRequired
    onCommentDelete: PropTypes.func.isRequired
    onCommentEdit:   PropTypes.func.isRequired

  render: ->
    commentList = @props.comments.map (comment) =>
      <CommentManager
          comment={ comment }
          entry={ @props.entry }
          onDelete={ @props.onCommentDelete.bind(null, comment) }
          onEdit={ @props.onCommentEdit }
          key={ comment.id } />

    return <div className="comments__list">
             { commentList }
           </div>

module.exports = CommentList