{ PropTypes } = React

PageMixin =

  propTypes:
    locale: PropTypes.string

  getDefaultProps: ->
    locale: TastySettings.locale

  componentWillMount: ->
    i18n.setLng @props.locale unless @props.locale is i18n.lng()

module.exports = PageMixin