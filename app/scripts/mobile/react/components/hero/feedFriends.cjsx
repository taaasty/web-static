HeroFeed = require './feed'
{ PropTypes } = React

HERO_TITLE = -> t 'feed_friends'

HeroFeedFriends = React.createClass
  displayName: 'HeroFeedFriends'

  propTypes:
    backgroundUrl: PropTypes.string.isRequired
    entriesCount:  PropTypes.number.isRequired

  render: ->
    <HeroFeed {...@props} title={ HERO_TITLE() } />

module.exports = HeroFeedFriends