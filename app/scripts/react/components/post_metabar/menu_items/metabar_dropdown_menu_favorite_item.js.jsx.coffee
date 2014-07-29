###* @jsx React.DOM ###

window.MetabarDropdownMenuFavoriteItem = React.createClass

  propTypes:
    isFavorited: React.PropTypes.bool.isRequired
    entryId:     React.PropTypes.number.isRequired
    title:       React.PropTypes.string.isRequired

  getInitialState: ->
    isFavorited: @props.isFavorited ? false
    isHover:     false

  render: ->
    iconClasses = React.addons.classSet {
      'icon': true
      'icon--star': true
      'icon--star-fill': @state.isFavorited
    }

    return `<a onClick={ this.onClick }
               onMouseEnter={ this.onMouseEnter }
               onMouseLeave={ this.onMouseLeave }
               className="meta-item__dropdown-item">
              <i className={ iconClasses }></i>
              { this.getTitle() }
            </a>`

  getTitle: ->
    if @state.isFavorited
      if @state.isHover then 'Удалить из избранного' else 'В избранном'
    else
      'Добавить в избранное'

  onClick: (e) ->
    e.stopPropagation()
    e.preventDefault()

    @setState isFavorited: !@state.isFavorited
    if !@state.isFavorited
      console.info "Пост #{@props.entryId} добавлен в избранное"
    else
      console.info "Пост #{@props.entryId} удалён из избранного"

  onMouseEnter: -> @setState isHover: true
  onMouseLeave: -> @setState isHover: false