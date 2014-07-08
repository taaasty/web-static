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

    if user?
      $('[toolbar-settings-click]').click =>
        @popup.show ToolbarSettings,
          title: 'Настройки',
          user:   user
    else
      $('[invite-button]').click =>
        @shellbox.show InviterShellBox

    # TODO Сделать что-то типа $('[static-inviter]').renderReactComponent InviterShellBox(fixed: true)
    if ic = document.getElementById 'js-static-inviter-container'
      React.renderComponent InviterShellBox(fixed: true), ic

    # Calendar
    calendarContainer = document.querySelectorAll('[calendar-container]')[0]
    if calendarContainer?
      calendar = Calendar
        date:
          day:  31
          info: 'декабря<br /> воскресенье<br /> 23:34'
        periods: Tasty.calendar.periods

      React.renderComponent calendar, calendarContainer
