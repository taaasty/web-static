###* @jsx React.DOM ###

window.EntryCommentBox_CommentForm = React.createClass

  propTypes:
    user: React.PropTypes.object.isRequired

  render: ->
   `<div className="comment-form">
      <div className="comment-form__table">
        <div className="comment-form__table-cell">
          <form action="?" className="ng-pristine ng-valid">
            <span className="comment-form__avatar">
              <span className="avatar avatar--eighth">
                <span className="avatar__text">M</span>
              </span>
            </span>
            <span className="comment-form__field js-toggle-value">
              <i className="comment-form__field-bg"></i>
              <label className="comment-form__field-label js-toggle-value-label" htmlFor="add-comment-10" style={{ display: 'block' }}>Напишите комментарий</label>
              <textarea className="comment-form__field-textarea js-comment-textarea js-toggle-value-input js-autoresize js-sew" id="add-comment-10" style={{ overflow: 'hidden', 'word-wrap': 'break-word', resize: 'none', height: '20px' }}></textarea>
            </span>
          </form>
        </div>
      </div>
    </div>`