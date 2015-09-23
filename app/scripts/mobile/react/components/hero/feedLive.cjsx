HeroFeed = require './feed'
{ PropTypes } = React

HeroFeedLive = React.createClass
  displayName: 'HeroFeedLive'

  propTypes:
    backgroundUrl: PropTypes.string.isRequired
    currentUser:   PropTypes.object,
    entriesCount:  PropTypes.number.isRequired

  renderWriteButton: ->
    redirect = =>
      window.location.href = Routes.new_entry_url(this.props.currentUser.slug)

    <button className="button button--extra-small button--green"
      onClick={redirect}
    >
      {i18n.t('buttons.hero_live_create_entry')}
    </button>

  render: ->
    <HeroFeed {...@props} title={ i18n.t('feed.live') }>
      <div className="hero__actions hero__actions--visible">
        {this.props.currentUser && this.renderWriteButton()}
      </div>
    </HeroFeed>

module.exports = HeroFeedLive