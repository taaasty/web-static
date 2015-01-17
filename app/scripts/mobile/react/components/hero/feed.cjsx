{ declension } = require '../../../../shared/helpers/grammar'
{ PropTypes } = React

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
            <span>{ @getEntriesCount() }</span>
          </div>
        </div>
      </div>
    </div>

  getHeroStyles: ->
    backgroundImage: "url('#{ @props.backgroundUrl }')"

  getEntriesCount: ->
    entriesCountDeclension = declension @props.entriesCount, ['запись', 'записи', 'записей']

    "#{ @props.entriesCount } #{ entriesCountDeclension } за 24 часа"

module.exports = HeroFeed