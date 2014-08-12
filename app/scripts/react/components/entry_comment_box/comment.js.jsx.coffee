###* @jsx React.DOM ###

window.EntryCommentBox_Comment = React.createClass

  propTypes:
    comment: React.PropTypes.object.isRequired

  render: ->
   `<article className="comment">
      <div className="comment__table">
        <div className="comment__table-cell">
          <a className="comment__user" href="http://hmeli-synele.mmm-tasty.ru" title="hmeli-synele">
            <span className="comment__avatar">
              <span className="avatar avatar--seventh">
                <span className="avatar__text">H</span>
              </span>
            </span>
            <span className="comment__username comment__username--bold">hmeli-synele</span>
          </a> Так выпьем же за это!&nbsp;
          <EntryCommentBox_CommentMetaBar comment={ this.props.comment } />
        </div>
      </div>
    </article>`

      # <article className="comment">
      #   <div className="comment__table">
      #     <div className="comment__table-cell">
      #       <a className="comment__user" title="GHOST-writer" href="http://GHOST-writer.mmm-tasty.ru">
      #         <span className="comment__avatar">
      #           <span className="avatar avatar--first">
      #             <span className="avatar__text">G</span>
      #           </span>
      #         </span>
      #         <span className="comment__username comment__username--bold">GHOST-writer</span>
      #       </a> hmeli-synele: &nbsp;
      #       <span className="comment__meta">
      #         <span className="comment__reply js-comment-reply" data-user="GHOST-writer">Ответить</span>
      #         <span className="comment__dot">·</span>
      #         <a className="comment__date-link" href="#comment-11528650" title="">
      #           <time className="comment__date js-comment-date" dateTime="2013-05-16T22:40:03">2 месяца назад</time>
      #         </a>
      #         <span className="comment__dot">·</span>
      #         <span className="comment__actions">
      #           <i className="icon icon--dots"></i>
      #           <span className="comment__dropdown">
      #             <a className="comment__dropdown-item js-comment-link" href="#" title="Ссылка на комментарий"><i className="icon icon--hyperlink"></i>Ссылка на комментарий</a>
      #             <a className="comment__dropdown-item js-comment-complain" href="#" title="Пожаловаться"><i className="icon icon--exclamation-mark"></i>Пожаловаться</a>
      #             <a className="comment__dropdown-item js-comment-remove" href="#" title="Удалить комментарий"><i className="icon icon--basket"></i>Удалить комментарий</a>
      #           </span>
      #         </span>
      #       </span>
      #     </div>
      #   </div>
      # </article>