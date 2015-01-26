i18n = require 'i18next'
{ PropTypes } = React

ENTRIES_COUNT = (count) -> i18n.t 'feed_entries_count', {count}

HeroFeed = React.createClass
  displayName: 'HeroFeed'

  propTypes:
    title:         PropTypes.string.isRequired
    backgroundUrl: PropTypes.string.isRequired
    entriesCount:  PropTypes.number.isRequired

  render: ->
    <div style={ @getHeroStyles() }
         className="hero">
      <div className="hero__overlay" />
      <div className="hero__content">
        <div className="hero__head">
          <div className="hero__title">
            <span>{ @props.title }</span>
          </div>
          <div className="hero__smalltext">
            <span>{ ENTRIES_COUNT(@props.entriesCount) }</span>
          </div>
        </div>
      </div>
    </div>

  getHeroStyles: ->
    backgroundImage: "url('#{ @props.backgroundUrl }')"

module.exports = HeroFeed