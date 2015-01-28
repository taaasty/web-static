{ PropTypes } = React

PageMixin =

  childContextTypes:
    locale: PropTypes.string

  getChildContext: ->
    locale: @props.locale || @context.locale

  getDefaultProps: ->
    locale: TastySettings.locale

module.exports = PageMixin