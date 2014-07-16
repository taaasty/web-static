#  require JSXTransformer
#= require react
#= require react_ujs
#= require_tree ./mixins
#= require_tree ./components
#= require_tree ./controllers

window.ReactApp =
  
  start: ({user}) ->
    console.log 'ReactApp start'
    console.debug? "Залогинен пользователь", user.get('slug') if user?

    $(document).on 'page:change', ReactUjs.mountReactComponents

    @shellbox = new ReactShellBox()
    @popup    = new ReactPopup()

    # Есть только у юзеров
    $('[toolbar-settings-click]').click =>
      @popup.show ToolbarSettings,
        title: 'Настройки',
        user:   user

    personsContainer = document.querySelectorAll('[popup-persons-container]')[0]
    React.renderComponent PersonsPopup(), personsContainer

    # Есть только у анонимов
    $('[invite-button]').click => @shellbox.show InviterShellBox

    # TODO Сделать что-то типа $('[static-inviter]').renderReactComponent InviterShellBox(fixed: true)
    if ic = document.getElementById 'js-static-inviter-container'
      React.renderComponent InviterShellBox(fixed: true), ic
