###* @jsx React.DOM ###

window.HeroProfileStats = React.createClass
  mixins: [ReactGrammarMixin]

  propTypes:
    tlogId: React.PropTypes.number.isRequired
    stats:  React.PropTypes.object.isRequired

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

    `<div className="hero__stats">
      <div className="hero__stats-list">
        <HeroProfileStatsItem count={ this.props.stats.followers_count }
                              title={ this.getTitle('followers') }
                              onClick={ onClick.bind(this, 'followers') } />
        <HeroProfileStatsItem count={ this.props.stats.followings_count }
                              title={ this.getTitle('followings') }
                              onClick={ onClick.bind(this, 'followings') } />
        <HeroProfileStatsItem count={ this.props.stats.favorites_count }
                              title={ this.getTitle('favorites') } />
        <HeroProfileStatsItem count={ this.props.stats.entries_count }
                              title={ this.getTitle('entries') } />
        <HeroProfileStatsItem count={ this.props.stats.comments_count }
                              title={ this.getTitle('comments') } />
        <HeroProfileStatsItem count={ this.props.stats.days_count }
                              title={ this.getTitle('days') } />
        <HeroProfileStatsItem count={ this.props.stats.tags_count }
                              title={ this.getTitle('tags') }
                              onClick={ onClick.bind(this, 'tags') } />
      </div>
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
        <HeroProfileStats_FollowersPopup tlogId={ this.props.tlogId } />
      </HeroProfileStats_Popup>`
    ), @container

  handleFollowingsClick: ($el) ->
    React.renderComponent (
     `<HeroProfileStats_Popup title="Подписки"
                              toggle={ $el }>
        <HeroProfileStats_FollowingsPopup tlogId={ this.props.tlogId } />
      </HeroProfileStats_Popup>`
    ), @container

  handleTagsClick: ($el) ->
    React.renderComponent (
     `<HeroProfileStats_Popup title="Теги"
                              toggle={ $el }>
        <HeroProfileStats_TagsPopup tlogId={ this.props.tlogId } />
      </HeroProfileStats_Popup>`
    ), @container