HeroStatsItem = require './stats/item'
{ declension } = require '../../../../shared/helpers/grammar'
{ PropTypes }  = React

HeroStats = React.createClass
  displayName: 'HeroStats'

  propTypes:
    stats:  PropTypes.object.isRequired
    author: PropTypes.object.isRequired

  render: ->
    <div className="hero__stats">
      { @renderStatsList() }
    </div>

  renderStatsList: ->
    if @props.stats.entries_count?
      url = @props.author.tlog_url unless @isTlogPrivate()
      entries = <HeroStatsItem
                    href={ url }
                    count={ @props.stats.entries_count }
                    title={ @getTitle('entries') }
                    key="entries" />
    if @props.stats.followings_count?
      followings = <HeroStatsItem
                       count={ @props.stats.followings_count }
                       title={ @getTitle('followings') }
                       key="followings" />
    if @props.stats.followers_count?
      followers = <HeroStatsItem
                      count={ @props.stats.followers_count }
                      title={ @getTitle('followers') }
                      key="followers" />
    if @props.stats.days_count?
      days = <HeroStatsItem
                 count={ @props.stats.days_count }
                 title={ @getTitle('days') }
                 key="days" />

    return <div className="hero__stats-list">
             { [entries, followings, followers, days] }
           </div>

  isTlogPrivate: ->
    @props.author.is_privacy

  getTitle: (type) ->
    switch type
      when 'entries'    then declension(@props.stats.entries_count, ['пост', 'поста', 'постов'])
      when 'followings' then declension(@props.stats.followings_count, ['подписка', 'подписки', 'подписок'])
      when 'followers'  then declension(@props.stats.followers_count, ['подписчик', 'подписчика', 'подписчиков'])
      when 'days'       then declension(@props.stats.days_count, ['день', 'дня', 'дней']) + ' на тейсти'
      else console.warn 'Unknown type of stats of HeroStats component', type

module.exports = HeroStats