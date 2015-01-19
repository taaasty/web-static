HeroFeed = require './feed'
{ PropTypes } = React

#TODO: i18n
HERO_TITLE = 'Лучшее'

HeroFeedBest = React.createClass
  displayName: 'HeroFeedBest'

  propTypes:
    backgroundUrl: PropTypes.string.isRequired
    entriesCount:  PropTypes.number.isRequired

  render: ->
    <HeroFeed {...@props} title={ HERO_TITLE } />

module.exports = HeroFeedBest