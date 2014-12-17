HeroStatsItem = require './stats/item'
{ declension } = require '../../../../shared/helpers/grammar'
{ PropTypes }  = React

module.exports = React.createClass
  displayName: 'HeroStats'

  propTypes:
    stats: PropTypes.object.isRequired
    user:  PropTypes.object.isRequired

  render: ->
    <div className="hero__stats">
      { this._renderStatsList() }
    </div>

  isTlogPrivate: ->
    @props.user.is_privacy

  _renderStatsList: ->
    if @props.stats.entries_count
      url = @props.user.tlog_url unless @isTlogPrivate()
      entries = <HeroStatsItem
                    href={ url }
                    count={ this.props.stats.entries_count }
                    title={ this.getTitle('entries') }
                    key="entries" />
    if @props.stats.followings_count
      followings = <HeroStatsItem
                       count={ this.props.stats.followings_count }
                       title={ this.getTitle('followings') }
                       key="followings" />
    if @props.stats.followers_count
      followers = <HeroStatsItem
                      count={ this.props.stats.followers_count }
                      title={ this.getTitle('followers') }
                      key="followers" />
    if @props.stats.days_count
      days = <HeroStatsItem
                 count={ this.props.stats.days_count }
                 title={ this.getTitle('days') }
                 key="days" />

    return <div className="hero__stats-list">
             { [entries, followings, followers, days] }
           </div>

  getTitle: (type) ->
    switch type
      when 'entries'    then declension(@props.stats.entries_count, ['пост', 'поста', 'постов'])
      when 'followings' then declension(@props.stats.followings_count, ['подписка', 'подписки', 'подписок'])
      when 'followers'  then declension(@props.stats.followers_count, ['подписчик', 'подписчика', 'подписчиков'])
      when 'days'       then declension(@props.stats.days_count, ['день', 'дня', 'дней']) + ' на тейсти'
      else console.warn 'Unknown type of stats of HeroStats component', type