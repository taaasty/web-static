###* @jsx React.DOM ###

window.PersonsPopup_MenuItem = PersonsPopup_MenuItem = React.createClass

  propTypes:
    title:  React.PropTypes.string.isRequired
    type:   React.PropTypes.string.isRequired
    isActive: React.PropTypes.bool.isRequired
    count:  React.PropTypes.number

  handleClick: (e) ->
    e.preventDefault()
    @props.onClick(@props.type)

  render: ->
    linkClasses = React.addons.classSet 'tabs-nav__link': true, 'state--active': @props.isActive

    return `<li className="tabs-nav__item">
              <a title={ this.props.title }
                 className={ linkClasses }
                 onClick={ this.handleClick }>
                { this.props.title }
                <span className="tabs-nav__count"> { this.props.count }</span>
              </a>
            </li>`

module.exports = PersonsPopup_MenuItem
