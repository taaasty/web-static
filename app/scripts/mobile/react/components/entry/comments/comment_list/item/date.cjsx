#FIXME: moment.js

{ PropTypes } = React

module.exports = React.createClass
  displayName: 'EntryComments_CommentListItem_Date'

  propTypes:
    date:      PropTypes.string.isRequired
    entryUrl:  PropTypes.string.isRequired
    commentId: PropTypes.number.isRequired

  render: ->
    <a href={ @_getCommentUrl() }
       className="comment__date">
      { new Date(@props.date).toString() }
    </a>

  _getCommentUrl: -> @props.entryUrl + '#comment-' + @props.commentId