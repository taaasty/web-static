#  require JSXTransformer
#= require react
#= require react_ujs
#= require_tree ./mixins
#= require_tree ./components
#= require_tree ./controllers

window.ReactApp =
  start: ({userCortex})->
    console.log 'ReactApp start'
    console.debug? "Залогинен пользователь", userCortex.slug.val() if userCortex?

    $(document).on 'page:change', ReactUjs.mountReactComponents

    @shellbox = new ReactShellBox()
    @popup    = new ReactPopup()

    if userCortex?
      $('[toolbar-settings-click]').click =>
        @popup.show ToolbarSettings,
          title:       'Настройки',
          userCortex:   userCortex
    else
      $('[invite-button]').click =>
        @shellbox.show InviterShellBox

    # TODO Сделать что-то типа $('[static-inviter]').renderReactComponent InviterShellBox(fixed: true)
    if ic = document.getElementById 'js-static-inviter-container'
      React.renderComponent InviterShellBox(fixed: true), ic

