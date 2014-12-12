###* @jsx React.DOM ###

{ PropTypes } = React

#TODO: i18n
TITLE = 'Заблокировать'

HeroActions_DropdownMenuIgnoreItem = React.createClass

  propTypes:
    userId: PropTypes.number.isRequired

  render: ->
   `<li className="hero__dropdown-popup-item"
        onClick={ this.ignore }>
      <a className="hero__dropdown-popup-link" href="#">
        <i className="icon icon--not-allowed" />
        <span>{ TITLE }</span>
      </a>
    </li>`

  ignore: -> console.log 'ignore'

module.exports = HeroActions_DropdownMenuIgnoreItem