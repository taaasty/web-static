BrowserHelpers =

  whichTransitionEvent: ->
    el = document.createElement 'fakeelement'

    transitions =
      'transition'      : 'transitionend'
      'OTransition'     : 'oTransitionEnd'
      'MozTransition'   : 'transitionend'
      'WebkitTransition': 'webkitTransitionEnd'

    for t of transitions when el.style[t]?
      return transitions[t]

  isSupportsOrientationChangeEvent: ->
    # Chrome, Safari, Dolphin
    typeof window.orientation is 'number'

  getCurrentOrientation: ->
    if @isSupportsOrientationChangeEvent()
      switch window.orientation
        when 0, 180  then 'Portrait'
        when -90, 90 then 'Landscape'
    else
      # FF
      orientation = screen.orientation || screen.mozOrientation || screen.msOrientation
      switch
        when (/portrait/).test orientation  then 'Portrait'
        when (/landscape/).test orientation then 'Landscape'

  createObjectURL: (file) ->
    if window.URL && window.URL.createObjectURL
      window.URL.createObjectURL file
    else if window.webkitURL
      window.webkitURL.createObjectURL file
    else
      null

module.exports = BrowserHelpers