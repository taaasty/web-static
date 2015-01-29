{ PropTypes } = React

PageMixin =

  propTypes:
    locale: PropTypes.string

  getDefaultProps: ->
    locale: TastySettings.locale

  componentWillMount: ->
    # i18n.setLng @props.locale

module.exports = PageMixin