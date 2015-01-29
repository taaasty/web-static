HeroFeed = require './feed'
{ PropTypes } = React

HeroFeedLive = React.createClass
  displayName: 'HeroFeedLive'

  propTypes:
    backgroundUrl: PropTypes.string.isRequired
    entriesCount:  PropTypes.number.isRequired

  render: ->
    <HeroFeed {...@props} title={ i18n.t('feed_live') } />

module.exports = HeroFeedLive