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

module.exports = BrowserHelpers