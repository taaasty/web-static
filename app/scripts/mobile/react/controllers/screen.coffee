_oldPageName = null

getContainer = ->
  container = document.querySelector '[screen-container]'

  unless container?
    container = document.createElement 'div'
    container.setAttribute 'screen-container', ''
    container.style.height = '100%'
    document.body.appendChild container

  container

switchPageName = (pageName) ->
  oldClassName = document.documentElement.className
  _oldPageName = oldClassName.match(/.*-page/) if _oldPageName is null
  document.documentElement.className = oldClassName.replace /.*-page/, pageName

restorePageName = ->
  oldClassName = document.documentElement.className
  document.documentElement.className = oldClassName.replace /.*-page/, _oldPageName
  _oldPageName = null

ScreenController =

  show: (reactClass, props, pageName) ->
    props.fixed  = true
    container    = getContainer()
    appContainer = document.getElementById 'App'
    appContainer.style.display = 'none'

    switchPageName pageName
    React.render <reactClass {...props} />, container

  close: ->
    container    = getContainer()
    appContainer = document.getElementById 'App'
    appContainer.style.display = ''

    restorePageName()
    setTimeout (->
      React.unmountComponentAtNode container
    ), 0

module.exports = ScreenController