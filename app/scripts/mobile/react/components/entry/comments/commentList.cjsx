CommentManager = require './commentList/commentManager'
{ PropTypes } = React

CommentList = React.createClass
  displayName: 'CommentList'

  propTypes:
    comments: PropTypes.array.isRequired
    entry:    PropTypes.object.isRequired

  render: ->
    commentList = @props.comments.map (comment) =>
      <CommentManager
          comment={ comment }
          entry={ @props.entry }
          key={ comment.id } />

    return <div className="comments__list">
             { commentList }
           </div>

module.exports = CommentList