###* @jsx React.DOM ###

DROPDOWN_CLOSED = 'closed'
DROPDOWN_OPENED_BY_HOVER = 'openedByHover'
DROPDOWN_OPENED_BY_CLICK = 'openedByClick'

window.MetabarDropdownMenu = React.createClass

  propTypes:
    entryId:     React.PropTypes.number.isRequired
    isFavorited: React.PropTypes.bool.isRequired
    isWatching:  React.PropTypes.bool.isRequired
    canEdit:     React.PropTypes.bool
    canFavorite: React.PropTypes.bool
    canWatch:    React.PropTypes.bool
    canReport:   React.PropTypes.bool
    canDelete:   React.PropTypes.bool

  getInitialState: ->
    currentState: DROPDOWN_CLOSED
    isFavorited:  @props.isFavorited
    isWatching:   @props.isWatching

  render: ->
    actionList = []
    menuClasses = React.addons.classSet {
      'meta-item__dropdown': true
      'state--open': @isOpen()
    }

    if @props.canEdit
      actionList.push `<MetabarDropdownMenuItem title="Редактировать"
                                                icon="pencil"
                                                callback={ this.handleEditSelect }
                                                key="edit" />`
    actionList.push `<MetabarDropdownMenuItem title="Ссылка на запись"
                                              icon="hyperlink"
                                              callback={ this.handleLinkSelect }
                                              key="link" />`
    if @props.canFavorite
      actionList.push `<MetabarDropdownMenuItem active={ this.state.isFavorited }
                                                title="Добавить в избранное"
                                                icon="star"
                                                callback={ this.manageFavorite }
                                                key="favorite" />`
    if @props.canWatch
      actionList.push `<MetabarDropdownMenuItem active={ this.state.isWatching }
                                                title="Подписаться на комментарии"
                                                icon="comments-subscribe"
                                                callback={ this.manageWatching }
                                                key="watch" />`
    if @props.canReport
      actionList.push `<MetabarDropdownMenuItem title="Пожаловаться"
                                                icon="exclamation-mark"
                                                callback={ this.handleComplainSelect }
                                                key="complain" />`
    if @props.canDelete
      actionList.push `<MetabarDropdownMenuItem title="Удалить"
                                                icon="basket"
                                                callback={ this.handleDeleteSelect }
                                                key="delete" />`

    return `<span onClick={ this.onClick }
                  onMouseEnter={ this.onMouseEnter }
                  onMouseLeave={ this.onMouseLeave }
                  className="meta-item__content">
              <i className="meta-item__common icon icon--dots"></i>
              <span className={ menuClasses }>{ actionList }</span>
            </span>`

  handleEditSelect: ->
    console.info "Редактируем пост #{@props.entryId}"

  handleLinkSelect: ->
    console.info "Получаем ссылку на пост #{@props.entryId}"

  handleComplainSelect: ->
    console.info "Принимаем жалобу пользователя на пост #{@props.entryId}"

  handleDeleteSelect: ->
    console.info "Удаляем пост #{@props.entryId}"

  manageWatching: ->
    @setState isWatching: !@state.isWatching
    if !@state.isWatching
      console.info "Оформлена подписка на комментарии поста #{@props.entryId}"
    else
      console.info "Отменена подписка на комментарии поста #{@props.entryId}"

  manageFavorite: ->
    @setState isFavorited: !@state.isFavorited
    if !@state.isFavorited
      console.info "Пост #{@props.entryId} добавлен в избранное"
    else
      console.info "Пост #{@props.entryId} удалён из избранного"

  onClick: ->
    switch @state.currentState
      when DROPDOWN_CLOSED          then @setState currentState: DROPDOWN_OPENED_BY_CLICK
      when DROPDOWN_OPENED_BY_CLICK then @setState currentState: DROPDOWN_CLOSED
      when DROPDOWN_OPENED_BY_HOVER then @setState currentState: DROPDOWN_CLOSED
      else console.error? "Unknown state.currentState", @state.currentState

  onMouseEnter: ->
    if @state.currentState == DROPDOWN_CLOSED
      @setState currentState: DROPDOWN_OPENED_BY_HOVER

  onMouseLeave: ->
    if @state.currentState == DROPDOWN_OPENED_BY_HOVER
      @setState currentState: DROPDOWN_CLOSED

  isOpen: -> @state.currentState != DROPDOWN_CLOSED