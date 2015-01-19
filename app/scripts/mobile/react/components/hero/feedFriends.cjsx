HeroFeed = require './feed'
{ PropTypes } = React

#TODO: i18n
HERO_TITLE = 'Подписки'

HeroFeedFriends = React.createClass
  displayName: 'HeroFeedFriends'

  propTypes:
    backgroundUrl: PropTypes.string.isRequired
    entriesCount:  PropTypes.number.isRequired

  render: ->
    <HeroFeed {...@props} title={ HERO_TITLE } />

module.exports = HeroFeedFriends