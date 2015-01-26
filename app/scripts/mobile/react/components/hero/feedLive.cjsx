i18n     = require 'i18next'
HeroFeed = require './feed'
{ PropTypes } = React

HERO_TITLE = -> i18n.t 'feed_live'

HeroFeedLive = React.createClass
  displayName: 'HeroFeedLive'

  propTypes:
    backgroundUrl: PropTypes.string.isRequired
    entriesCount:  PropTypes.number.isRequired

  render: ->
    <HeroFeed {...@props} title={ HERO_TITLE() } />

module.exports = HeroFeedLive