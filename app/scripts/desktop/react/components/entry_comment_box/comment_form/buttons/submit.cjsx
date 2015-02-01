window.EntryCommentBox_CommentFormSubmit = React.createClass

  propTypes:
    onClick: React.PropTypes.func.isRequired
    visible: React.PropTypes.bool.isRequired

  render: ->
    if @props.visible
      return <button ref="commentFormSubmit"
                     className="comment-form__submit"
                     onClick={ this.props.onClick }>
               { i18n.t('comment_form_submit') }
             </button>
    else
      return <span />