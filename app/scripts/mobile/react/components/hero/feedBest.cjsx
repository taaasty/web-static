HeroFeed = require './feed'
{ PropTypes } = React

HeroFeedBest = React.createClass
  displayName: 'HeroFeedBest'

  propTypes:
    backgroundUrl: PropTypes.string.isRequired
    entriesCount:  PropTypes.number.isRequired

  render: ->
    <HeroFeed {...@props} title={ i18n.t('feed_best') } />

module.exports = HeroFeedBest