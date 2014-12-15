###* @jsx React.DOM ###

{ PropTypes } = React

#TODO: i18n
TITLE = 'Пожаловаться'

HeroActions_DropdownMenuReportItem = React.createClass

  propTypes:
    userId: PropTypes.number.isRequired

  render: ->
   `<li className="hero__dropdown-popup-item"
        onClick={ this.report }>
      <a className="hero__dropdown-popup-link" href="#">
        <i className="icon icon--exclamation-mark" />
        <span>{ TITLE }</span>
      </a>
    </li>`

  report: -> console.log 'report'

module.exports = HeroActions_DropdownMenuReportItem