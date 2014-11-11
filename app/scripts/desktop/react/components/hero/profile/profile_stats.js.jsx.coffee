###* @jsx React.DOM ###

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
      heroStats.push `<HeroProfileStatsItem count={ this.props.stats.followers_count }
                                            title={ this.getTitle('followers') }
                                            onClick={ onClick.bind(this, 'followers') }
                                            key="followers" />`
    if @props.stats.followings_count?
      heroStats.push `<HeroProfileStatsItem count={ this.props.stats.followings_count }
                                            title={ this.getTitle('followings') }
                                            onClick={ onClick.bind(this, 'followings') }
                                            key="followings" />`
    if @props.stats.favorites_count?
      url = Routes.tlog_favorite_entries_path @props.user.slug unless @_isPrivate()

      heroStats.push `<HeroProfileStatsItem href={ url }
                                            count={ this.props.stats.favorites_count }
                                            title={ this.getTitle('favorites') }
                                            key="favorites" />`
    if @props.stats.entries_count?
      url = @props.user.tlog_url unless @_isPrivate()

      heroStats.push `<HeroProfileStatsItem href={ url }
                                            count={ this.props.stats.entries_count }
                                            title={ this.getTitle('entries') }
                                            key="entries" />`
    if @props.stats.comments_count?
      heroStats.push `<HeroProfileStatsItem count={ this.props.stats.comments_count }
                                            title={ this.getTitle('comments') }
                                            key="comments" />`
    if @props.stats.days_count?
      heroStats.push `<HeroProfileStatsItem count={ this.props.stats.days_count }
                                            title={ this.getTitle('days') }
                                            key="days" />`
    if @props.stats.tags_count?
      heroStats.push `<HeroProfileStatsItem count={ this.props.stats.tags_count }
                                            title={ this.getTitle('tags') }
                                            onClick={ onClick.bind(this, 'tags') }
                                            key="tags" />`

    return `<div className="hero__stats">
              <div className="hero__stats-list">{ heroStats }</div>
            </div>`

  getTitle: (type) ->
    switch type
      when 'followers'  then @declension( @props.stats.followers_count, ['подписчик', 'подписчика', 'подписчиков'] )
      when 'followings' then @declension( @props.stats.followings_count, ['подписка', 'подписки', 'подписок'] )
      when 'favorites'  then 'в избранном'
      when 'entries'    then @declension( @props.stats.entries_count, ['пост', 'поста', 'постов'] )
      when 'comments'   then @declension( @props.stats.comments_count, ['комментарий', 'комментария', 'комментариев'] )
      when 'days'       then @declension( @props.stats.days_count, ['день', 'дня', 'дней'] ) + ' на тейсти'
      when 'tags'       then @declension( @props.stats.tags_count, ['тег', 'тега', 'тегов'] )
      else console.log "Неизвестный тип статистики профиля #{type}"

  handleFollowersClick: ($el) ->
    React.renderComponent (
     `<HeroProfileStats_Popup title="Подписчики"
                              toggle={ $el }>
        <HeroProfileStats_FollowersPopup tlogId={ this.props.user.id } />
      </HeroProfileStats_Popup>`
    ), @container

  handleFollowingsClick: ($el) ->
    React.renderComponent (
     `<HeroProfileStats_Popup title="Подписки"
                              toggle={ $el }>
        <HeroProfileStats_FollowingsPopup tlogId={ this.props.user.id } />
      </HeroProfileStats_Popup>`
    ), @container

  handleTagsClick: ($el) ->
    React.renderComponent (
     `<HeroProfileStats_Popup title="Теги"
                              toggle={ $el }>
        <HeroProfileStats_TagsPopup tlogId={ this.props.user.id } />
      </HeroProfileStats_Popup>`
    ), @container

  _isPrivate: -> @props.user.is_privacy