###* @jsx React.DOM ###

window.EntryCommentBox_CommentMetaBar = React.createClass

  propTypes:
    comment: React.PropTypes.object.isRequired

  render: ->
   `<span className="comment__meta">
      <span className="comment__reply js-comment-reply" data-user="hmeli-synele">Ответить</span>
      <span className="comment__dot">·</span>
      <a className="comment__date-link" href="#comment-11528585" title="">
        <time className="comment__date js-comment-date" dateTime="2013-05-16T22:40:03">2 месяца назад</time>
      </a>
      <span className="comment__dot">·</span>
      <span className="comment__actions">
        <i className="icon icon--dots"></i>
        <span className="comment__dropdown">
          <a className="comment__dropdown-item js-comment-link" href="#" title="Ссылка на комментарий"><i className="icon icon--hyperlink"></i>Ссылка на комментарий</a>
          <a className="comment__dropdown-item js-comment-complain" href="#" title="Пожаловаться"><i className="icon icon--exclamation-mark"></i>Пожаловаться</a>
          <a className="comment__dropdown-item js-comment-remove" href="#" title="Удалить комментарий"><i className="icon icon--basket"></i>Удалить комментарий</a>
        </span>
      </span>
    </span>`