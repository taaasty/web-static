EntryComments_CommentListItem = require './comment_list/item'
{ PropTypes } = React

module.exports = React.createClass
  displayName: 'EntryComments_CommentList'

  propTypes:
    comments: PropTypes.array.isRequired
    entryUrl: PropTypes.string.isRequired

  render: ->
    commentList = @props.comments.map (comment) =>
      <EntryComments_CommentListItem
          comment={ comment }
          entryUrl={ @props.entryUrl }
          key={ comment.id } />

    return <div className="comments__list">
             { commentList }
           </div>