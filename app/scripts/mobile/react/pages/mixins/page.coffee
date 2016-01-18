{ PropTypes } = React

PageMixin =

  propTypes:
    locale: PropTypes.string.isRequired

  componentWillMount: ->
    i18n.changeLanguage(this.props.locale) unless @props.locale is i18n.language
    moment.locale @props.locale

module.exports = PageMixin
