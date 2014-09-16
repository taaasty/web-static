#= require react
#= require react-mixin-manager
#= require react_ujs
#= require react-draggable/dist/react-draggable
#= require ./utils
#= require ./shared/is_mobile
#= require_tree ./entities
#= require_tree ./services
#= require_tree ./mixins
#= require_tree ./messaging
#= require_tree ./components/post_editor/mixins/
#= require_tree ./components/post_editor/editors/mixins
#= require_tree ./components/entry_comment_box/mixins
#= require_tree ./components/relationship_buttons/mixins
#= require_tree ./components
#= require_tree ./controllers
#= require_tree ./mediators

window.ReactApp =

  start: ({ user }) ->
    console.log 'ReactApp start'

    $(document).on 'page:change', ReactUjs.mountReactComponents

    @shellbox = new ReactShellBox()
    @popup    = new ReactPopup()

    # Есть только у анонимов
    $('[invite-button]').click => @shellbox.show InviterShellBox

    # TODO Сделать что-то типа $('[static-inviter]').renderReactComponent InviterShellBox(fixed: true)
    if ic = document.getElementById 'js-static-inviter-container'
      React.renderComponent InviterShellBox(fixed: true), ic

    if user?.features?.chat
      messagesContainer = $('<\div>', {'popup-messages-container': ''}).appendTo('body').get(0)

      # window.messaging = new MessagingService debug: true, user: user
      # window.messaging.connect
      #  success: success
      #  error: error

      if messagesContainer
        React.renderComponent MessagesPopup(), messagesContainer

