assign   = require 'react/lib/Object.assign'
Polyglot = require 'node-polyglot'
i18n     = new Polyglot()
{ PropTypes } = React

TMessage = React.createClass
  displayName: 'TMessage'

  propTypes:
    message: PropTypes.string.isRequired
    count:   PropTypes.number

  contextTypes:
    locale: PropTypes.string

  componentWillMount: ->
    locale = @props.locale || @context.locale
    i18n.locale locale

  render: ->
    <span>{ @t(@props.message) }</span>

  getIntlPhrase: (path) ->
    locale    = @props.locale || @context.locale
    phrases   = Phrases[locale]
    pathParts = path.split '.'

    try
      phrase = pathParts.reduce (obj, pathPart) ->
        obj[pathPart]
      , phrases
    finally
      if phrase is undefined
        phrase = ''
        throw new ReferenceError 'Missing translation for path: ' + path

    phrase

  t: (path) ->
    phrase  = @getIntlPhrase path
    options = _: phrase
    options.smart_count = @props.count if @props.count?
    assign options, @props
    i18n.t path, options

module.exports = TMessage