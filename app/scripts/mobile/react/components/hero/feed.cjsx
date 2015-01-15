{ declension } = require '../../../../shared/helpers/grammar'
{ PropTypes } = React

#TODO: i18n
TITLE = 'Прямой эфир'

HeroFeed = React.createClass
  displayName: 'HeroFeed'

  propTypes:
    background:   PropTypes.object.isRequired
    entriesCount: PropTypes.number.isRequired

  render: ->
    <div style={ @getHeroStyles() }
         className="hero">
      <div className="hero__overlay" />
      <div className="hero__content">
        <div className="hero__head">
          <div className="hero__title">
            <span>{ TITLE }</span>
          </div>
          <div className="hero__smalltext">
            <span>{ @getEntriesCount() }</span>
          </div>
        </div>
      </div>
    </div>

  getHeroStyles: ->
    #TODO: Get optimized background through ThumborService
    backgroundUrl = @props.background.url

    backgroundImage: "url('#{ backgroundUrl }')"

  getEntriesCount: ->
    entriesCountDeclension = declension @props.entriesCount, ['запись', 'записи', 'записей']

    "#{ @props.entriesCount } #{ entriesCountDeclension } за 24 часа"

module.exports = HeroFeed