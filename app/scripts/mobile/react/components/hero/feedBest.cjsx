HeroFeed = require './feed'
{ PropTypes } = React

HERO_TITLE = -> t 'feed_best'

HeroFeedBest = React.createClass
  displayName: 'HeroFeedBest'

  propTypes:
    backgroundUrl: PropTypes.string.isRequired
    entriesCount:  PropTypes.number.isRequired

  render: ->
    <HeroFeed {...@props} title={ HERO_TITLE() } />

module.exports = HeroFeedBest