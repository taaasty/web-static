###* @jsx React.DOM ###

window.HeroProfileStats = React.createClass
  mixins: [ReactGrammarMixin]

  propTypes:
    stats: React.PropTypes.object.isRequired

  render: ->
    `<div className="hero__stats">
      <div className="hero__stats-list">
        <HeroProfileStatsItem count={ this.props.stats.followers_count }
                              title={ this.getTitle('followers') } />
        <HeroProfileStatsItem count={ this.props.stats.followings_count }
                              title={ this.getTitle('followings') } />
        <HeroProfileStatsItem count={ this.props.stats.favorites_count }
                              title={ this.getTitle('favorites') } />
        <HeroProfileStatsItem count={ this.props.stats.entries_count }
                              title={ this.getTitle('entries') } />
        <HeroProfileStatsItem count={ this.props.stats.comments_count }
                              title={ this.getTitle('comments') } />
        <HeroProfileStatsItem count={ this.props.stats.days_count }
                              title={ this.getTitle('days') } />
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
      else console.log "Неизвестный тип статистики профиля #{type}"