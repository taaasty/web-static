{ PropTypes } = React

#TODO: i18n
LINK_TEXT = 'Пожаловаться на комментарий'

CommentActionsDropdownMenuReportItem = React.createClass
  displayName: 'CommentActionsDropdownMenuReportItem'

  propTypes:
    commentId: PropTypes.number.isRequired

  render: ->
    <li className="comment__dropdown-popup-item">
      <a className="comment__dropdown-popup-link"
         title={ LINK_TEXT }>
        <i className="icon icon--exclamation-mark" />
        <span>{ LINK_TEXT }</span>
      </a>
    </li>

module.exports = CommentActionsDropdownMenuReportItem