{ PropTypes } = React

#TODO: i18n
TITLE = 'Заблокировать'

module.exports = React.createClass
  displayName: 'HeroActions_DropdownMenuIgnoreItem'

  propTypes:
    userId: PropTypes.number.isRequired

  render: ->
    <li className="hero__dropdown-popup-item"
        onClick={ this.ignore }>
      <a className="hero__dropdown-popup-link" href="#">
        <i className="icon icon--not-allowed" />
        <span>{ TITLE }</span>
      </a>
    </li>

  ignore: -> console.log 'ignore'