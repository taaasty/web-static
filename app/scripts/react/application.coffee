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

    Tasty.setupFeedHeaderScrolls()
    Hero.start()

    # User Toolbar
    userToolbarContainer = document.querySelectorAll('[user-toolbar-container]')[0]
    if userToolbarContainer?
      React.renderComponent UserToolbar({ user }), userToolbarContainer

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