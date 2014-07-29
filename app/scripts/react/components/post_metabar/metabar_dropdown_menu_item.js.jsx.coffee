###* @jsx React.DOM ###

window.MetabarDropdownMenuItem = React.createClass

  propTypes:
    icon:     React.PropTypes.string.isRequired
    title:    React.PropTypes.string.isRequired
    active:   React.PropTypes.bool
    callback: React.PropTypes.func

  getInitialState: ->
    isHover: false

  render: ->
    `<a onClick={ this.handleClick }
       onMouseEnter={ this.handleMouseEnter }
       onMouseLeave={ this.handleMouseLeave }
       className="meta-item__dropdown-item">
      <i className={ "icon icon--" + this.props.icon }></i>
      { this.getTitle() }
    </a>`

  getTitle: ->
    return @getActiveTitle() if @props.active

    switch @props.key
      when 'favorite' then 'Добавить в избранное'
      when 'watch'    then 'Подписаться'
      else @props.title

  getActiveTitle: ->
    if @state.isHover
      switch @props.key
        when 'favorite' then 'Удалить из избранного'
        when 'watch'    then 'Отписаться'
    else
      switch @props.key
        when 'favorite' then 'В избранном'
        when 'watch'    then 'Подписан'

  handleClick: (e) ->
    e.stopPropagation()
    @props.callback() if @props.callback?

  handleMouseEnter: -> @setState isHover: true

  handleMouseLeave: -> @setState isHover: false