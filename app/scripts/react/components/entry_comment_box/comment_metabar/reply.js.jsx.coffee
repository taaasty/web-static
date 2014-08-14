###* @jsx React.DOM ###

window.EntryCommentBox_CommentMetaBarReply = React.createClass

  propTypes:
    name:    React.PropTypes.string.isRequired
    entryId: React.PropTypes.number.isRequired

  render: ->
   `<span className="comment__reply"
          onClick={ this.onClick }>
      Ответить
    </span>`

  onClick: ->
    TastyEvents.trigger TastyEvents.keys.comment_replied(@props.entryId), [@props.name]