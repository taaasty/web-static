CommentManager = require './commentList/commentManager'
{ PropTypes } = React

CommentList = React.createClass
  displayName: 'CommentList'

  propTypes:
    entry:           PropTypes.object.isRequired
    comments:        PropTypes.array.isRequired
    onCommentEdit:   PropTypes.func.isRequired
    onCommentDelete: PropTypes.func.isRequired
    onCommentReport: PropTypes.func.isRequired

  render: ->
    commentList = @props.comments.map (comment) =>
      <CommentManager
          entry={ @props.entry }
          comment={ comment }
          onCommentEdit={ @props.onCommentEdit }
          onCommentDelete={ @props.onCommentDelete }
          onCommentReport={ @props.onCommentReport }
          key={ comment.id } />

    return <div className="comments__list">
             { commentList }
           </div>

module.exports = CommentList