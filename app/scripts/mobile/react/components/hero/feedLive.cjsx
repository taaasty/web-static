HeroFeed = require './feed'
{ PropTypes } = React

#TODO: i18n
HERO_TITLE = 'Прямой эфир'

HeroFeedLive = React.createClass
  displayName: 'HeroFeedLive'

  propTypes:
    backgroundUrl: PropTypes.string.isRequired
    entriesCount:  PropTypes.number.isRequired

  render: ->
    <HeroFeed {...@props} title={ HERO_TITLE } />

module.exports = HeroFeedLive