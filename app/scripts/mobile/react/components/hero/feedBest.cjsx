i18n     = require 'i18next'
HeroFeed = require './feed'
{ PropTypes } = React

HERO_TITLE = -> i18n.t 'feed_best'

HeroFeedBest = React.createClass
  displayName: 'HeroFeedBest'

  propTypes:
    backgroundUrl: PropTypes.string.isRequired
    entriesCount:  PropTypes.number.isRequired

  render: ->
    <HeroFeed {...@props} title={ HERO_TITLE() } />

module.exports = HeroFeedBest