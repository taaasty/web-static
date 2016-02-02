classnames = require 'classnames'

window.PersonsPopup_MenuItem = React.createClass
  displayName: 'PersonsPopup_MenuItem'

  propTypes:
    title:    React.PropTypes.string.isRequired
    isActive: React.PropTypes.bool.isRequired
    onClick:  React.PropTypes.func.isRequired

  render: ->
    menuItemClasses = classnames('tabs-nav__link', {
      'state--active': @props.isActive
    })

    return <li className="tabs-nav__item">
             <a title={ @props.title }
                className={ menuItemClasses }
                onClick={ @props.onClick }>
               { @props.title }
               <span className="tabs-nav__count"> { @props.totalCount }</span>
             </a>
           </li>