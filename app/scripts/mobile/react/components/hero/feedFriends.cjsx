HeroFeed = require './feed'
{ PropTypes } = React

HeroFeedFriends = React.createClass
  displayName: 'HeroFeedFriends'

  propTypes:
    backgroundUrl: PropTypes.string.isRequired
    entriesCount:  PropTypes.number.isRequired

  render: ->
    <HeroFeed {...@props} title={ i18n.t('feed.friends') } />

module.exports = HeroFeedFriends