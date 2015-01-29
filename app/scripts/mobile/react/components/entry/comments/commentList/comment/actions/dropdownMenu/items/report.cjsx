{ PropTypes } = React

CommentActionsDropdownMenuReportItem = React.createClass
  displayName: 'CommentActionsDropdownMenuReportItem'

  propTypes:
    commentId:       PropTypes.number.isRequired
    onCommentReport: PropTypes.func.isRequired

  render: ->
    <li className="comment__dropdown-popup-item"
        onClick={ @handleClick }>
      <a className="comment__dropdown-popup-link">
        <i className="icon icon--exclamation-mark" />
        <span>{ i18n.t('report_comment_item') }</span>
      </a>
    </li>

  report: ->
    @props.onCommentReport @props.commentId

  handleClick: ->
    @report() if confirm i18n.t 'report_comment_confirm'

module.exports = CommentActionsDropdownMenuReportItem