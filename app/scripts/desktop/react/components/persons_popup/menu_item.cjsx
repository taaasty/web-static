cx = require 'react/lib/cx'

window.PersonsPopup_MenuItem = React.createClass

  propTypes:
    title:    React.PropTypes.string.isRequired
    isActive: React.PropTypes.bool.isRequired
    onClick:  React.PropTypes.func.isRequired

  render: ->
    menuItemClasses = cx
      'tabs-nav__link': true
      'state--active':  @props.isActive

    return <li className="tabs-nav__item">
             <a title={ this.props.title }
                className={ menuItemClasses }
                onClick={ this.props.onClick }>
               { this.props.title }
               <span className="tabs-nav__count"> { this.props.totalCount }</span>
             </a>
           </li>