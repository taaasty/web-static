#= require react
#= require react_ujs
#= require_tree ./services
#= require_tree ./mixins
#= require_tree ./components/post_editor/mixins
#= require_tree ./components
#= require_tree ./controllers

window.ReactApp =
  
  start: ({user}) ->
    console.log 'ReactApp start'
    console.debug? "Залогинен пользователь", user.get('slug') if user?
    personsContainer = $('<\div>', {'popup-persons-container': ''}).appendTo('body').get(0)

    $(document).on 'page:change', ReactUjs.mountReactComponents

    @shellbox = new ReactShellBox()
    @popup    = new ReactPopup()

    # Есть только у юзеров
    $('[toolbar-settings-click]').click =>
      @popup.show ToolbarSettings,
        title: 'Настройки',
        user:   user

    $('[toolbar-design-settings-click]').click =>
      # Hello Angular
      $(document).trigger 'SHOW_DESIGN_SETTINGS'

    $('[toolbar-friends-click]').click =>
      React.renderComponent PersonsPopup(), personsContainer

    # Есть только у анонимов
    $('[invite-button]').click => @shellbox.show InviterShellBox

    # TODO Сделать что-то типа $('[static-inviter]').renderReactComponent InviterShellBox(fixed: true)
    if ic = document.getElementById 'js-static-inviter-container'
      React.renderComponent InviterShellBox(fixed: true), ic



window.ReactUtils=
  isImagesEqual: (nextImages, currentImages) ->

    return false unless  nextImages.length == currentImages.length

    currentUrls = currentImages.map (i) -> i.src
    nextUrls    = nextImages.map (i) -> i.src

    return  _.isEqual currentUrls, nextUrls
