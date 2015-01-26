HeroTlogStatsItem = require './stats/item'
{ PropTypes }  = React

STATS_ENTRIES_COUNT    = (count) -> t 'stats_entries_count', count
STATS_FOLLOWINGS_COUNT = (count) -> t 'stats_followings_count', count
STATS_FOLLOWERS_COUNT  = (count) -> t 'stats_followers_count', count
STATS_DAYS_COUNT       = (count) -> t 'stats_days_count', count

HeroTlogStats = React.createClass
  displayName: 'HeroTlogStats'

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
      entries = <HeroTlogStatsItem
                    href={ url }
                    count={ @props.stats.entries_count }
                    title={ @getTitle('entries') }
                    key="entries" />
    if @props.stats.followings_count?
      followings = <HeroTlogStatsItem
                       count={ @props.stats.followings_count }
                       title={ @getTitle('followings') }
                       key="followings" />
    if @props.stats.followers_count?
      followers = <HeroTlogStatsItem
                      count={ @props.stats.followers_count }
                      title={ @getTitle('followers') }
                      key="followers" />
    if @props.stats.days_count?
      days = <HeroTlogStatsItem
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
      when 'entries'    then STATS_ENTRIES_COUNT @props.stats.entries_count
      when 'followings' then STATS_FOLLOWINGS_COUNT @props.stats.followings_count
      when 'followers'  then STATS_FOLLOWERS_COUNT @props.stats.followers_count
      when 'days'       then STATS_DAYS_COUNT @props.stats.days_count
      else console.warn 'Unknown type of stats of HeroTlogStats component', type

module.exports = HeroTlogStats