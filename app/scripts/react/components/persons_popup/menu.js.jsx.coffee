###* @jsx React.DOM ###

FOLLOWINGS = 'Подписки'
FOLLOWERS  = 'Подписчики'
REQUESTS   = 'Заявки'
GUESSES    = 'Рекомендации'
IGNORES    = 'Блокировка'

# TODO Вынести состояния в константы, а текста в i18n
window.PersonsPopup_Menu = React.createClass

  propTypes:
    user:          React.PropTypes.object.isRequired
    relationships: React.PropTypes.object.isRequired
    currentTab:    React.PropTypes.string.isRequired
    onSelect:      React.PropTypes.func.isRequired

  render: ->
    onSelect = (type) -> @props.onSelect(type)

    if @_isProfilePrivate()
      requestsMenuItem = `<PersonsPopup_MenuItem isActive={ this.props.currentTab == "requests" }
                                                 count={ this.getCount(this.props.relationships.requests) }
                                                 title={ REQUESTS }
                                                 onClick={ onSelect.bind(this, 'requests') } />`

    return `<nav className="tabs-nav tabs-nav--white">
              <ul className="tabs-nav__list">
                <PersonsPopup_MenuItem isActive={ this.props.currentTab == "followings" }
                                       count={ this.getCount(this.props.relationships.followings) }
                                       title={ FOLLOWINGS }
                                       onClick={ onSelect.bind(this, 'followings') } />

                <PersonsPopup_MenuItem isActive={ this.props.currentTab == "followers" }
                                       count={ this.getCount(this.props.relationships.followers) }
                                       title={ FOLLOWERS }
                                       onClick={ onSelect.bind(this, 'followers') } />

                <PersonsPopup_MenuItem isActive={ this.props.currentTab == "guesses" }
                                       count={ this.getCount(this.props.relationships.guesses) }
                                       title={ GUESSES }
                                       onClick={ onSelect.bind(this, 'guesses') } />

                { requestsMenuItem }

                <PersonsPopup_MenuItem isActive={ this.props.currentTab == "ignores" }
                                       count={ this.getCount(this.props.relationships.ignores) }
                                       title={ IGNORES }
                                       onClick={ onSelect.bind(this, 'ignores') } />

              </ul>
            </nav>`

  getCount: (value) -> value.total_count

  _isProfilePrivate: -> @props.user.is_privacy