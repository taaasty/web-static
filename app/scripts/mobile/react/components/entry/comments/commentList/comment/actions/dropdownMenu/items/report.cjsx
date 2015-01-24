{ PropTypes } = React

#TODO: i18n
LINK_TEXT       = 'Пожаловаться на комментарий'
CONFIRM_MESSAGE = 'Вы действительно хотите пожаловаться на комментарий?'

CommentActionsDropdownMenuReportItem = React.createClass
  displayName: 'CommentActionsDropdownMenuReportItem'

  propTypes:
    commentId:       PropTypes.number.isRequired
    onCommentReport: PropTypes.func.isRequired

  render: ->
    <li className="comment__dropdown-popup-item"
        onClick={ @handleClick }>
      <a className="comment__dropdown-popup-link"
         title={ LINK_TEXT }>
        <i className="icon icon--exclamation-mark" />
        <span>{ LINK_TEXT }</span>
      </a>
    </li>

  report: ->
    @props.onCommentReport @props.commentId

  handleClick: ->
    @report() if confirm CONFIRM_MESSAGE

module.exports = CommentActionsDropdownMenuReportItem