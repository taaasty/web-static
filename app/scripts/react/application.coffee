#= require react
#= require react-mixin-manager
#= require react_ujs
#= require react-draggable/dist/react-draggable
#= require ./utils
#= require_tree ./entities
#= require_tree ./services
#= require_tree ./mixins
#= require_tree ./stores
#= require_tree ./dispatchers
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

    if user?
      if localStorage.getItem 'mockMessages'
        window.messagingService = new MessagingServiceMock
          user: CurrentUserStore.getUser()
      else
        window.messagingService = new MessagingService
          user: CurrentUserStore.getUser()
