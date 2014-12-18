EntryComments_CommentListItem_User = require './item/user'
EntryComments_CommentListItem_Text = require './item/text'
EntryComments_CommentListItem_Date = require './item/date'
{ PropTypes } = React

module.exports = React.createClass
  displayName: 'EntryComments_CommentListItem'

  propTypes:
    comment:  PropTypes.object.isRequired
    entryUrl: PropTypes.string.isRequired

  render: ->
    <div className="comment">
      <div className="comment__content">
        <EntryComments_CommentListItem_User user={ @props.comment.user } />
        <EntryComments_CommentListItem_Text text={ @props.comment.comment_html } />
        <EntryComments_CommentListItem_Date
            date={ @props.comment.created_at }
            commentId={ @props.comment.id }
            entryUrl={ @props.entryUrl } />
        <div className="comment__actions">
          <i className="icon icon--dots"></i>
          <div className="comment__dropdown-popup">
            <ul className="comment__dropdown-popup-list">
              <li className="comment__dropdown-popup-item">
                <a className="comment__dropdown-popup-link" href="http://taaasty.ru/@news/19364812-android-app#comment-11816303" title="Ссылка на комментарий"><i className="icon icon--hyperlink"></i>Ссылка на комментарий</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    #   <div className="comment">
    #     <div className="comment__content">
    #       <a className="comment__user" href="http://taaasty.ru/@olithexx" title="olithexx" target="_blank">
    #         <span className="comment__avatar">
    #           <span className="avatar" style={{ 'background-image': 'url(http://thumbor0.tasty0.ru/unsafe/64x64/userpic/a7/71/111079_original.png)' }}>
    #             <img className="avatar__img" src="http://thumbor0.tasty0.ru/unsafe/64x64/userpic/a7/71/111079_original.png" alt="olithexx" />
    #           </span>
    #         </span><span className="comment__username">olithexx</span>
    #       </a> <span className="comment__text">У одной меня видимо не раьотают настройки</span> <a className="comment__date" href="http://taaasty.ru/@news/19364812-android-app#comment-11819938">7 ноября</a>
    #       <div className="comment__actions">
    #         <i className="icon icon--dots"></i>
    #         <div className="comment__dropdown-popup">
    #           <ul className="comment__dropdown-popup-list">
    #             <li className="comment__dropdown-popup-item">
    #               <a className="comment__dropdown-popup-link" href="http://taaasty.ru/@news/19364812-android-app#comment-11816303" title="Ссылка на комментарий"><i className="icon icon--hyperlink"></i>Ссылка на комментарий</a>
    #             </li>
    #           </ul>
    #         </div>
    #       </div>
    #     </div>
    #   </div>
    # </div>