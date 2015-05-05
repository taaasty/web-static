window.HeroProfileStats = React.createClass
  mixins: [ReactGrammarMixin]

  propTypes:
    stats: React.PropTypes.object.isRequired
    user:  React.PropTypes.object.isRequired

  componentDidMount: ->
    @container = document.querySelectorAll('[popup-hero-stats-container]')[0]

    unless @container
      @container = $('<\div>', {'popup-hero-stats-container': ''}).appendTo('body').get 0

  render: ->
    onClick = (type, $el) ->
      switch type
        when 'followers'  then @handleFollowersClick $el
        when 'followings' then @handleFollowingsClick $el
        when 'tags'       then @handleTagsClick $el
        else console.log "Неизвестный тип статистики профиля #{type}"

    heroStats = []

    if @props.stats.followers_count?
      heroStats.push <HeroProfileStatsItem
                         count={ this.props.stats.followers_count }
                         title={ i18n.t('stats_followers_count', {count: @props.stats.followers_count}) }
                         onClick={ onClick.bind(this, 'followers') }
                         key="followers" />
    if @props.stats.followings_count?
      heroStats.push <HeroProfileStatsItem
                         count={ this.props.stats.followings_count }
                         title={ i18n.t('stats_followings_count', {count: @props.stats.followings_count}) }
                         onClick={ onClick.bind(this, 'followings') }
                         key="followings" />
    if @props.stats.favorites_count?
      url = Routes.tlog_favorite_entries_path @props.user.slug unless @_isPrivate()

      heroStats.push <HeroProfileStatsItem
                         href={ url }
                         count={ this.props.stats.favorites_count }
                         title={ i18n.t('stats_favorites_count') }
                         key="favorites" />
    if @props.stats.entries_count?
      url = @props.user.tlog_url unless @_isPrivate()

      heroStats.push <HeroProfileStatsItem
                         href={ url }
                         count={ this.props.stats.entries_count }
                         title={ i18n.t('stats_entries_count', {count: @props.stats.entries_count}) }
                         key="entries" />
    if @props.stats.comments_count?
      heroStats.push <HeroProfileStatsItem
                         count={ this.props.stats.comments_count }
                         title={ i18n.t('stats_comments_count', {counts: @props.stats.comments_count}) }
                         key="comments" />
    if @props.stats.days_count?
      heroStats.push <HeroProfileStatsItem count={ this.props.stats.days_count }
                                           title={ i18n.t('stats_days_count', {count: @props.stats.days_count}) }
                                           key="days" />
    if @props.stats.tags_count?
      heroStats.push <HeroProfileStatsItem count={ this.props.stats.tags_count }
                                           title={ i18n.t('stats_tags_count', {count: @props.stats.tags_count}) }
                                           onClick={ onClick.bind(this, 'tags') }
                                           key="tags" />

    return <div className="hero__stats">
             <div className="hero__stats-list">{ heroStats }</div>
           </div>

  handleFollowersClick: ($el) ->
    React.render (
      <HeroProfileStats_Popup
          title={ i18n.t('followers') }
          toggle={ $el }>
        <HeroProfileStats_FollowersPopup tlogId={ this.props.user.id } />
      </HeroProfileStats_Popup>
    ), @container

  handleFollowingsClick: ($el) ->
    React.render (
      <HeroProfileStats_Popup
          title={ i18n.t('followings') }
          toggle={ $el }>
        <HeroProfileStats_FollowingsPopup tlogId={ this.props.user.id } />
      </HeroProfileStats_Popup>
    ), @container

  handleTagsClick: ($el) ->
    React.render (
      <HeroProfileStats_Popup
          title={ i18n.t('tags') }
          toggle={ $el }>
        <HeroProfileStats_TagsPopup
            userID={this.props.user.id}
            userSlug={this.props.user.slug} />
      </HeroProfileStats_Popup>
    ), @container

  _isPrivate: -> @props.user.is_privacy