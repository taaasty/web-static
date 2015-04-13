{ PropTypes } = React

PageMixin =

  propTypes:
    locale: PropTypes.string.isRequired

  componentWillMount: ->
    i18n.setLng @props.locale unless @props.locale is i18n.lng()
    moment.locale @props.locale

module.exports = PageMixin