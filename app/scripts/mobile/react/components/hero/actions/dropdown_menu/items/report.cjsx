{ PropTypes } = React

#TODO: i18n
TITLE = 'Пожаловаться'

module.exports = React.createClass
  displayName: 'HeroActions_DropdownMenuReportItem'

  propTypes:
    userId: PropTypes.number.isRequired

  render: ->
    <li className="hero__dropdown-popup-item"
        onClick={ @report }>
      <a className="hero__dropdown-popup-link" href="#">
        <i className="icon icon--exclamation-mark" />
        <span>{ TITLE }</span>
      </a>
    </li>

  report: -> console.log 'report'