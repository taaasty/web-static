###* @jsx React.DOM ###

window.MessagesPopup_DialogList = React.createClass

  render: ->
   `<div data-section="dialogs"
         data-title="Мои переписки"
         className="messages__section messages__section--dialogs js-messages-section">
      <div className="messages__body">
        <div className="scroller scroller--dark js-scroller">
          <div className="scroller__pane js-scroller-pane">
            <div className="messages__dialogs js-messages-dialogs">
              <div data-id="1"
                   className="messages__dialog js-messages-dialog">
                <div className="messages__counter">+1</div>
                <span className="messages__user-avatar">
                  <span className="avatar" style={{ 'background-image': 'url(images/avatars/ava_6.png)' }}>
                    <img className="avatar__img" src="images/avatars/ava_6.png" alt="vladaserb" />
                  </span>
                  <span className="messages__user-online"></span>
                </span>
                <div className="messages__dialog-text">
                  <span className="messages__user-name">vladaserb</span> Правоспособность лица может быть поставлена под сомнение…
                </div>
                <span className="messages__date">20 минут назад</span>
              </div>
              <div data-id="2"
                   className="messages__dialog js-messages-dialog">
                <div className="messages__counter">+1</div>
                <span className="messages__user-avatar">
                  <span className="avatar avatar--second">
                    <span className="avatar__text">2</span>
                  </span>
                </span>
                <div className="messages__dialog-text">
                  <span className="messages__user-name">2crabs</span> Еще Шпенглер в "Закате Европы" писал, что капиталистическое…
                </div>
                <span className="messages__date">Сегодня в 18:43</span>
              </div>
              <div data-id="3"
                   className="messages__dialog state--read js-messages-dialog">
                <span className="messages__user-avatar">
                  <span className="avatar avatar--third">
                    <span className="avatar__text">N</span>
                  </span>
                </span>
                <div className="messages__dialog-text">
                  <span className="messages__user-name">nevergreen</span> Социальная парадигма, согласно традиционным представлениям…
                </div>
                <span className="messages__date">Вчера в 20:08</span>
              </div>
              <div data-id="4"
                   className="messages__dialog state--read js-messages-dialog">
                <span className="messages__user-avatar">
                  <span className="avatar avatar--seventh">
                    <span className="avatar__text">B</span>
                  </span>
                  <span className="messages__user-online"></span>
                </span>
                <div className="messages__dialog-text">
                  <span className="messages__user-name">bloodflood</span> В спортзале какой-то бородатый мужик часа полтора бодро бегал…
                </div>
                <span className="messages__date">Вчера в 20:08</span>
              </div>
              <div data-id="5"
                   className="messages__dialog state--read js-messages-dialog">
                <span className="messages__user-avatar">
                  <span className="avatar avatar--seventh">
                    <span className="avatar__text">B</span>
                  </span>
                  <span className="messages__user-online"></span>
                </span>
                <div className="messages__dialog-text">
                  <span className="messages__user-name">bloodflood</span> В спортзале какой-то бородатый мужик часа полтора бодро бегал…
                </div>
                <span className="messages__date">Вчера в 20:08</span>
              </div>
              <div data-id="6"
                   className="messages__dialog state--read js-messages-dialog">
                <span className="messages__user-avatar">
                  <span className="avatar avatar--seventh">
                    <span className="avatar__text">B</span>
                  </span>
                  <span className="messages__user-online"></span>
                </span>
                <div className="messages__dialog-text">
                  <span className="messages__user-name">bloodflood</span> В спортзале какой-то бородатый мужик часа полтора бодро бегал…
                </div>
                <span className="messages__date">Вчера в 20:08</span>
              </div>
              <div data-id="7"
                   className="messages__dialog state--read js-messages-dialog">
                <span className="messages__user-avatar">
                  <span className="avatar avatar--seventh">
                    <span className="avatar__text">B</span>
                  </span>
                  <span className="messages__user-online"></span>
                </span>
                <div className="messages__dialog-text">
                  <span className="messages__user-name">bloodflood</span> В спортзале какой-то бородатый мужик часа полтора бодро бегал…
                </div>
                <span className="messages__date">Вчера в 20:08</span>
              </div>
            </div>
          </div>
          <div className="scroller__track js-scroller-track">
            <div className="scroller__bar js-scroller-bar"></div>
          </div>
        </div>
      </div>
      <footer className="messages__footer">
        <span className="button button--green button--100p js-messages-add">
          <span className="button__inner">
            <span className="button__text">Cоздать переписку</span>
          </span>
        </span>
      </footer>
    </div>`