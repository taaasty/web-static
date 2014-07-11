###* @jsx React.DOM ###

window.PersonsTabs = PersonsTabs = React.createClass

  propTypes:
    tabs: React.PropTypes.array.isRequired
    activeType: React.PropTypes.string.isRequired

  render: ->
    that = @
    tabs = @props.tabs.map (tab, i) ->
      active = that.props.activeType == tab.type
      `<PersonsTab active={ active }
                   title={ tab.title }
                   count={ tab.count }
                   type={ tab.type}
                   onClick={ that.props.onClick }
                   key={ i }></PersonsTab>`

    return `<nav className="tabs-nav tabs-nav--white">
              <ul className="tabs-nav__list">{ tabs }</ul>
            </nav>`

module.exports = PersonsTabs