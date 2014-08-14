###* @jsx React.DOM ###

window.EntryCommentBox_CommentMetaBarDropdownMenu = React.createClass

  render: ->
    `<span className="comment__actions">
        <i className="icon icon--dots"></i>
        <span className="comment__dropdown">
          <a className="comment__dropdown-item" href="#" title="Ссылка на комментарий"><i className="icon icon--hyperlink"></i>Ссылка на комментарий</a>
          <a className="comment__dropdown-item" href="#" title="Пожаловаться"><i className="icon icon--exclamation-mark"></i>Пожаловаться</a>
          <a className="comment__dropdown-item" href="#" title="Удалить комментарий"><i className="icon icon--basket"></i>Удалить комментарий</a>
        </span>
      </span>`