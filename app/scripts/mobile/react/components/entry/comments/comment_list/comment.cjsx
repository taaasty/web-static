CommentUser    = require './comment/user'
CommentText    = require './comment/text'
CommentDate    = require './comment/date'
CommentActions = require './comment/actions'
{ PropTypes } = React

Comment = React.createClass
  displayName: 'Comment'

  propTypes:
    comment:     PropTypes.object.isRequired
    entry:       PropTypes.object.isRequired
    onDelete:    PropTypes.func.isRequired
    onEditStart: PropTypes.func.isRequired

  render: ->
    <div className="comment">
      <div className="comment__content">
        <CommentUser user={ @props.comment.user } />
        <CommentText text={ @props.comment.comment_html } />
        <CommentDate
            date={ @props.comment.created_at }
            commentId={ @props.comment.id }
            entryUrl={ @props.entry.entry_url } />
        <CommentActions {...@props} />
      </div>
    </div>

module.exports = Comment