###* @jsx React.DOM ###

{ PropTypes } = React

Entry = React.createClass

  propTypes:
    type: PropTypes.string

  render: ->
    `<div className="post post--image">
      <div className="post__content">
        <div className="media-image">
          <img src="http://thumbor0.tasty0.ru/cR3S6yo2SujdW9y2KRCSwitXeGQ=/604x381/att/57/65/15900238_234360_19187271_44c72095e92b7e9cd26931f0.jpg" />
        </div>
        <p>
          Здесь, на границе, листопад.<br /> И хоть в округе одни дикари,<br /> А ты — за тысячу миль отсюда,<br /> Две чашки всегда на моём столе.
        </p>
      </div>
      <div className="post__meta">
        <div className="meta-voting">18</div>
        <div className="meta-comments">345</div>
        <div className="meta-actions">
          <div className="meta-actions__dropdown-popup">
            <ul className="meta-actions__dropdown-popup-list">
              <li className="meta-actions__dropdown-popup-item">
                <a className="meta-actions__dropdown-popup-link" href="#">
                  <i className="icon icon--pencil" />
                  <span>Редактировать</span>
                </a>
              </li>
              <li className="meta-actions__dropdown-popup-item">
                <a className="meta-actions__dropdown-popup-link" href="#">
                  <i className="icon icon--hyperlink" />
                  <span>Ссылка на запись</span>
                </a>
              </li>
              <li className="meta-actions__dropdown-popup-item">
                <a className="meta-actions__dropdown-popup-link" href="#">
                  <i className="icon icon--star" />
                  <span>Добавить в избранное</span>
                </a>
              </li>
              <li className="meta-actions__dropdown-popup-item">
                <a className="meta-actions__dropdown-popup-link" href="#">
                  <i className="icon icon--comments-subscribe" />
                  <span>Подписаться на комментарии</span>
                </a>
              </li>
              <li className="meta-actions__dropdown-popup-item">
                <a className="meta-actions__dropdown-popup-link" href="#">
                  <i className="icon icon--exclamation-mark" />
                  <span>Пожаловаться</span>
                </a>
              </li>
              <li className="meta-actions__dropdown-popup-item">
                <a className="meta-actions__dropdown-popup-link" href="#">
                  <i className="icon icon--basket" />
                  <span>Удалить</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="post__comments">
        <div className="comments">
          <div className="comments__more">
            <span className="comments__more-link">Загрузить оставшиеся 21 комментарий adsf asdf</span>
          </div>
          <div className="comments__list">
            <div className="comment">
              <div className="comment__content">
                <a className="comment__user" href="http://taaasty.ru/@kem" title="kem" target="_blank">
                  <span className="comment__avatar">
                    <span className="avatar" style={{ 'background-image': 'url(http://thumbor0.tasty0.ru/unsafe/64x64/userpic/cf/8a/148627_original.jpg)' }}>
                      <img className="avatar__img" src="http://thumbor0.tasty0.ru/unsafe/64x64/userpic/cf/8a/148627_original.jpg" alt="kem" />
                    </span>
                  </span>
                  <span className="comment__username">kem</span>
                </a> <span className="comment__text">Скажите пожалуйста, как добавлять запись с голосовалкой?)</span> <a className="comment__date" href="http://taaasty.ru/@news/19364812-android-app#comment-11819938">7 ноября</a>
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
            <div className="comment">
              <div className="comment__content">
                <a className="comment__user" href="http://taaasty.ru/@olithexx" title="olithexx" target="_blank">
                  <span className="comment__avatar">
                    <span className="avatar" style={{ 'background-image': 'url(http://thumbor0.tasty0.ru/unsafe/64x64/userpic/a7/71/111079_original.png)' }}>
                      <img className="avatar__img" src="http://thumbor0.tasty0.ru/unsafe/64x64/userpic/a7/71/111079_original.png" alt="olithexx" />
                    </span>
                  </span><span className="comment__username">olithexx</span>
                </a> <span className="comment__text">У одной меня видимо не раьотают настройки</span> <a className="comment__date" href="http://taaasty.ru/@news/19364812-android-app#comment-11819938">7 ноября</a>
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
          </div>
          <form className="comment-form">
            <button className="comment-form__submit">Отпр</button>
            <div className="comment-form__field">
              <textarea className="comment-form__field-textarea" placeholder="Добавить комментарий" />
            </div>
          </form>
        </div>
      </div>
    </div>`

module.exports = Entry