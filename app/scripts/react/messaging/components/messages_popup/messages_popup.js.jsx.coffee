###* @jsx React.DOM ###

MESSAGES_POPUP_TITLE  = 'Мои переписки'
MESSAGES_THREAD_TITLE = 'Переписка с #{name}'
CONVERSATIONS_STATE           = 'conversations'
CREATE_NEW_CONVERSATION_STATE = 'createNewConversation'
THREAD_STATE                  = 'thread'

window.MessagesPopup = React.createClass
  mixins: [ReactUnmountMixin, 'ReactActivitiesMixin', RequesterMixin]

  getInitialState: -> @getStateFromStore()

  componentDidMount: ->
    MessagesPopupStateStore.addChangeListener @_onStoreChange

  componentWillUnmount: ->
    MessagesPopupStateStore.removeChangeListener @_onStoreChange

  render: ->
    popupTitle = @getPopupTitle()

    switch @state.currentState
      when CONVERSATIONS_STATE
        content = `<MessagesPopup_Conversations />`
      when CREATE_NEW_CONVERSATION_STATE
        content = `<MessagesPopup_CreateNewConversation />`
      when THREAD_STATE
        content = `<MessagesPopup_Thread conversationId={ this.state.currentConversationId } />`

    unless @isConversationsState()
      backButton = `<MessagesPopup_UIBackButton onClick={ this.handleBackButtonClick } />`

    return `<Popup hasActivities={ this.hasActivities() }
                   title={ popupTitle }
                   type="messages"
                   isDraggable={ true }
                   colorScheme="light"
                   position={{ top: 30, left: 30 }}
                   className="popup--messages"
                   onClose={ this.unmount }>

              <div className="messages">
                { backButton }
                { content }
              </div>

            </Popup>`

  isConversationsState:         -> @state.currentState is CONVERSATIONS_STATE
  isCreateNewConversationState: -> @state.currentState is CREATE_NEW_CONVERSATION_STATE
  isThreadState:                -> @state.currentState is THREAD_STATE

  getStateFromStore: ->
    currentState:          MessagesPopupStateStore.getCurrentState()
    currentConversationId: MessagesPopupStateStore.getCurrentConversationId()

  getPopupTitle: ->
    if @isThreadState()
      conversation  = ConversationsStore.getConversation @state.currentConversationId
      recipientSlug = conversation.recipient.slug
      popupTitle    = MESSAGES_THREAD_TITLE.replace(/#{.+}/, recipientSlug)
    else
      popupTitle = MESSAGES_POPUP_TITLE

    popupTitle


  handleBackButtonClick: ->
    MessagingDispatcher.handleViewAction {
      type: 'clickBackButton'
    }

  _onStoreChange: ->
    @setState @getStateFromStore()

# Статика
#
# <!-- Popup Messages -->
# <div class="popup popup--messages popup--light js-messages">
#     <div class="popup__header">
#         <div class="popup__headbox js-popup-headbox">
#             <h3 class="popup__title">Мои переписки</h3>
#         </div>
#         <div class="popup__loader state--hidden js-popup-loader">
#             <span class="spinner spinner--8x8"><span class="spinner__icon"></span></span>
#         </div>
#         <div class="popup__close js-popup-close">
#             <div class="popup__icon popup__icon--close">h</div>
#         </div>
#     </div>
#     <div class="popup__body">
#         <div class="messages">
#             <div class="messages__back js-messages-back state--hidden">
#                 <i class="icon icon--left-arrow"></i>
#             </div>
#             <div class="messages__section messages__section--dialogs js-messages-section" data-section="dialogs" data-title="Мои переписки">
#                 <!--<div class="messages__header">
#                     <h3 class="messages__title">Мои переписки</h3>
#                 </div>-->
#                 <div class="messages__body">
#                     <div class="scroller scroller--dark js-scroller">
#                         <div class="scroller__pane js-scroller-pane">
#                             <div class="messages__dialogs js-messages-dialogs">
#                                 <div class="messages__dialog js-messages-dialog" data-id="1">
#                                     <div class="messages__counter">+1</div>
#                                     <span class="messages__user-avatar">
#                                         <span class="avatar" style="background-image: url(images/avatars/ava_6.png);">
#                                             <img class="avatar__img" src="images/avatars/ava_6.png" alt="vladaserb" />
#                                         </span>
#                                         <span class="messages__user-online"></span>
#                                     </span>
#                                     <div class="messages__dialog-text"><span class="messages__user-name">vladaserb</span> Правоспособность лица может быть поставлена под сомнение…</div>
#                                     <span class="messages__date">20 минут назад</span>
#                                 </div>
#                                 <div class="messages__dialog js-messages-dialog" data-id="2">
#                                     <div class="messages__counter">+1</div>
#                                     <span class="messages__user-avatar">
#                                         <span class="avatar avatar--second">
#                                             <span class="avatar__text">2</span>
#                                         </span>
#                                     </span>
#                                     <div class="messages__dialog-text"><span class="messages__user-name">2crabs</span> Еще Шпенглер в "Закате Европы" писал, что капиталистическое…</div>
#                                     <span class="messages__date">Сегодня в 18:43</span>
#                                 </div>
#                                 <div class="messages__dialog state--read js-messages-dialog" data-id="3">
#                                     <span class="messages__user-avatar">
#                                         <span class="avatar avatar--third">
#                                             <span class="avatar__text">N</span>
#                                         </span>
#                                     </span>
#                                     <div class="messages__dialog-text"><span class="messages__user-name">nevergreen</span> Социальная парадигма, согласно традиционным представлениям…</div>
#                                     <span class="messages__date">Вчера в 20:08</span>
#                                 </div>
#                                 <div class="messages__dialog state--read js-messages-dialog" data-id="4">
#                                     <span class="messages__user-avatar">
#                                         <span class="avatar avatar--seventh">
#                                             <span class="avatar__text">B</span>
#                                         </span>
#                                         <span class="messages__user-online"></span>
#                                     </span>
#                                     <div class="messages__dialog-text"><span class="messages__user-name">bloodflood</span> В спортзале какой-то бородатый мужик часа полтора бодро бегал…</div>
#                                     <span class="messages__date">Вчера в 20:08</span>
#                                 </div>
#                                 <div class="messages__dialog state--read js-messages-dialog" data-id="5">
#                                     <span class="messages__user-avatar">
#                                         <span class="avatar avatar--seventh">
#                                             <span class="avatar__text">B</span>
#                                         </span>
#                                         <span class="messages__user-online"></span>
#                                     </span>
#                                     <div class="messages__dialog-text"><span class="messages__user-name">bloodflood</span> В спортзале какой-то бородатый мужик часа полтора бодро бегал…</div>
#                                     <span class="messages__date">Вчера в 20:08</span>
#                                 </div>
#                                 <div class="messages__dialog state--read js-messages-dialog" data-id="6">
#                                     <span class="messages__user-avatar">
#                                         <span class="avatar avatar--seventh">
#                                             <span class="avatar__text">B</span>
#                                         </span>
#                                         <span class="messages__user-online"></span>
#                                     </span>
#                                     <div class="messages__dialog-text"><span class="messages__user-name">bloodflood</span> В спортзале какой-то бородатый мужик часа полтора бодро бегал…</div>
#                                     <span class="messages__date">Вчера в 20:08</span>
#                                 </div>
#                                 <div class="messages__dialog state--read js-messages-dialog" data-id="7">
#                                     <span class="messages__user-avatar">
#                                         <span class="avatar avatar--seventh">
#                                             <span class="avatar__text">B</span>
#                                         </span>
#                                         <span class="messages__user-online"></span>
#                                     </span>
#                                     <div class="messages__dialog-text"><span class="messages__user-name">bloodflood</span> В спортзале какой-то бородатый мужик часа полтора бодро бегал…</div>
#                                     <span class="messages__date">Вчера в 20:08</span>
#                                 </div>
#                             </div>
#                         </div>
#                         <div class="scroller__track js-scroller-track">
#                             <div class="scroller__bar js-scroller-bar"></div>
#                         </div>
#                     </div>
#                 </div>
#                 <footer class="messages__footer">
#                     <span class="button button--green button--100p js-messages-add">
#                         <span class="button__inner">
#                             <span class="button__text">Cоздать переписку</span>
#                         </span>
#                     </span>
#                 </footer>
#             </div>

#             <div class="messages__section messages__section--recipients js-messages-section" data-section="recipients" data-title="Cоздать переписку">
#                 <div class="messages__body">
#                     <div class="messages__box">
#                         <div class="messages__chooser js-messages-chooser">
#                             <div class="messages__chooser-button js-messages-chooser-button">
#                                 <span class="messages__chooser-button-text">Введите имя</span>
#                             </div>
#                             <div class="messages__chooser-dropdown">
#                                 <input class="messages__chooser-input js-messages-chooser-input" type="text" value="" />
#                                 <div class="messages__chooser-results js-messages-chooser-results"></div>
#                             </div>
#                         </div>
#                         <div class="messages__field">
#                             <input class="js-messages-select-recipients" type="hidden" style="width: 100%;" data-placeholder="Введите имя" />
#                         </div>
#                         <div class="messages__hint">Начните вводить имя друга, которому хотите написать сообщение</div>
#                     </div>
#                 </div>
#             </div>

#             <div class="messages__section messages__section--thread js-messages-section" data-section="thread">
#                 <header class="messages__header">
#                     <div class="messages__hero" style="background-image: url(images/images/1.jpg);">
#                         <div class="messages__hero-overlay"></div>
#                         <div class="messages__hero-box">
#                             <div class="messages__hero-avatar">
#                                 <span class="avatar" style="background-image: url(images/avatars/ava_6.png);">
#                                     <img class="avatar__img" src="images/avatars/ava_6.png" alt="vladaserb" />
#                                 </span>
#                             </div>
#                             <div class="messages__hero-name">vladaserb</div>
#                         </div>
#                     </div>
#                 </header>
#                 <div class="messages__body">
#                     <div class="scroller scroller--dark scroller--messages js-scroller">
#                         <div class="scroller__pane js-scroller-pane">
#                             <div class="messages__list">
#                                 <div class="messages__list-cell js-messages-list">
#                                     <div class="messages__empty state--hidden">
#                                         <div class="messages__empty-text">Здесь будут отображаться сообщения</div>
#                                     </div>
#                                     <div class="message message--from">
#                                         <span class="messages__user-avatar">
#                                             <span class="avatar avatar--eighth">
#                                                 <span class="avatar__text">M</span>
#                                             </span>
#                                         </span>
#                                         <div class="messages__bubble">
#                                             <span class="messages__user-name">madwotrld</span> Правоспособность лица может быть поставлена под сомнение, если понятие политического участия методологически…
#                                         </div>
#                                         <span class="messages__date">Вчера в 20:08</span>
#                                     </div>
#                                     <div class="message message--to">
#                                         <span class="messages__user-avatar">
#                                             <span class="avatar" style="background-image: url(images/avatars/ava_6.png);">
#                                                 <img class="avatar__img" src="images/avatars/ava_6.png" alt="vladaserb" />
#                                             </span>
#                                         </span>
#                                         <div class="messages__bubble">
#                                             <span class="messages__user-name">vladaserb</span> Бред какой-то. Сама придумала?
#                                         </div>
#                                         <span class="messages__date">18 минут назад</span>
#                                     </div>
#                                     <div class="message message--from">
#                                         <span class="messages__user-avatar">
#                                             <span class="avatar avatar--eighth">
#                                                 <span class="avatar__text">M</span>
#                                             </span>
#                                         </span>
#                                         <div class="messages__bubble">
#                                             <span class="messages__user-name">madwotrld</span> Нет,<br /> <a href="http://vesna.yandex.ru" title="http://vesna.yandex.ru">http://vesna.yandex.ru</a><br /> подсказал
#                                         </div>
#                                         <span class="messages__date">Только что</span>
#                                     </div>
#                                 </div>
#                             </div>
#                         </div>
#                         <div class="scroller__track js-scroller-track">
#                             <div class="scroller__bar js-scroller-bar"></div>
#                         </div>
#                     </div>
#                 </div>
#                 <footer class="messages__footer">
#                     <div class="message-form">
#                         <span class="messages__user-avatar">
#                             <span class="avatar avatar--eighth">
#                                 <span class="avatar__text">M</span>
#                             </span>
#                         </span>
#                         <textarea class="message-form__textarea" placeholder="Ваше сообщение…"></textarea>
#                     </div>
#                 </footer>
#             </div>

#             <div class="messages__section messages__section--thread js-messages-section" data-section="empty">
#                 <header class="messages__header">
#                     <div class="messages__hero" style="background-image: url(images/images/1.jpg);">
#                         <div class="messages__hero-overlay"></div>
#                         <div class="messages__hero-box">
#                             <div class="messages__hero-avatar">
#                                 <span class="avatar" style="background-image: url(images/avatars/ava_6.png);">
#                                     <img class="avatar__img" src="images/avatars/ava_6.png" alt="vladaserb" />
#                                 </span>
#                             </div>
#                             <div class="messages__hero-name">vladaserb</div>
#                         </div>
#                     </div>
#                 </header>
#                 <div class="messages__body">
#                     <div class="scroller scroller--dark scroller--messages js-scroller">
#                         <div class="scroller__pane js-scroller-pane">
#                             <div class="messages__list">
#                                 <div class="messages__list-cell js-messages-list">
#                                     <div class="messages__empty">
#                                         <div class="messages__empty-text">Здесь будут отображаться сообщения</div>
#                                     </div>
#                                 </div>
#                             </div>
#                         </div>
#                         <div class="scroller__track js-scroller-track">
#                             <div class="scroller__bar js-scroller-bar"></div>
#                         </div>
#                     </div>
#                 </div>
#                 <footer class="messages__footer">
#                     <div class="message-form">
#                         <span class="messages__user-avatar">
#                             <span class="avatar avatar--eighth">
#                                 <span class="avatar__text">M</span>
#                             </span>
#                         </span>
#                         <textarea class="message-form__textarea" placeholder="Ваше сообщение…"></textarea>
#                     </div>
#                 </footer>
#             </div>
#         </div>
#     </div>
# </div>
# <!-- end Popup Messages -->

# <script>
#   var $messages = $(".js-messages");

#   $messages.on("click", ".js-messages-dialog", function(){
#     $messages.find(".js-messages-section[data-section='dialogs']").hide();
#     $messages.find(".js-messages-section[data-section='thread']").show();
#     $messages.find(".js-popup-headbox").hide();
#     $messages.find(".js-messages-section[data-section='thread']").find(".js-scroller").trigger("sizeChange");
#     $messages.find(".js-messages-back").removeClass("state--hidden");
#   });

#   $messages.on("click", ".js-messages-back", function(){
#     $messages.find(".js-popup-headbox").show();
#     $messages.find(".js-messages-back").addClass("state--hidden");
#     $messages.find(".js-messages-section[data-section='dialogs']").show();
#     $messages.find(".js-messages-section[data-section='thread']").hide();
#   });

#   $messages.on("click", ".messages__chooser-result", function(){
#     $messages.find(".js-messages-section[data-section='dialogs']").hide();
#     $messages.find(".js-messages-section[data-section='recipients']").hide();
#     $messages.find(".js-messages-section[data-section='empty']").show();
#     $messages.find(".js-popup-headbox").hide();
#     $messages.find(".js-messages-section[data-section='empty']").find(".js-scroller").trigger("sizeChange");
#     $messages.find(".js-messages-back").removeClass("state--hidden");
#   });
# </script>
