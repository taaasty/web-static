i18n = require 'i18next'
{ PropTypes } = React

LINK_TEXT       = -> i18n.t 'report_comment_item'
CONFIRM_MESSAGE = -> i18n.t 'report_comment_confirm'

CommentActionsDropdownMenuReportItem = React.createClass
  displayName: 'CommentActionsDropdownMenuReportItem'

  propTypes:
    commentId:       PropTypes.number.isRequired
    onCommentReport: PropTypes.func.isRequired

  render: ->
    <li className="comment__dropdown-popup-item"
        onClick={ @handleClick }>
      <a className="comment__dropdown-popup-link"
         title={ LINK_TEXT() }>
        <i className="icon icon--exclamation-mark" />
        <span>{ LINK_TEXT() }</span>
      </a>
    </li>

  report: ->
    @props.onCommentReport @props.commentId

  handleClick: ->
    @report() if confirm CONFIRM_MESSAGE()

module.exports = CommentActionsDropdownMenuReportItem