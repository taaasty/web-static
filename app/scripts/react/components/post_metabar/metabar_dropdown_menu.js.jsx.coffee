###* @jsx React.DOM ###

DROPDOWN_CLOSED = 'closed'
DROPDOWN_OPENED_BY_HOVER = 'openedByHover'
DROPDOWN_OPENED_BY_CLICK = 'openedByClick'

window.MetabarDropdownMenu = React.createClass

  propTypes:
    entryId:     React.PropTypes.number.isRequired
    isFavorited: React.PropTypes.bool.isRequired
    isWatching:  React.PropTypes.bool.isRequired
    entryUrl:    React.PropTypes.string.isRequired
    editUrl:     React.PropTypes.string.isRequired
    canEdit:     React.PropTypes.bool
    canFavorite: React.PropTypes.bool
    canWatch:    React.PropTypes.bool
    canReport:   React.PropTypes.bool
    canDelete:   React.PropTypes.bool

  getInitialState: ->
    currentState: DROPDOWN_CLOSED

  render: ->
    actionList = []
    menuClasses = React.addons.classSet {
      'meta-item__dropdown': true
      'state--open': @isOpen()
    }

    if @props.canEdit
      actionList.push `<MetabarDropdownMenuItem title="Редактировать"
                                                icon="pencil"
                                                href={ this.props.editUrl }
                                                key="edit" />`
    actionList.push `<MetabarDropdownMenuItem title="Ссылка на запись"
                                              icon="hyperlink"
                                              href={ this.props.entryUrl }
                                              key="link" />`
    if @props.canFavorite
      actionList.push `<MetabarDropdownMenuFavoriteItem entryId={ this.props.entryId }
                                                        isFavorited={ this.props.isFavorited }
                                                        title="Добавить в избранное"
                                                        key="favorite" />`
    if @props.canWatch
      actionList.push `<MetabarDropdownMenuWatchItem entryId={ this.props.entryId }
                                                     isWatching={ this.props.isWatching }
                                                     title="Подписаться на комментарии"
                                                     key="watch" />`
    if @props.canReport
      actionList.push `<MetabarDropdownMenuReportItem entryId={ this.props.entryId }
                                                      title="Пожаловаться"
                                                      key="report" />`
    if @props.canDelete
      actionList.push `<MetabarDropdownMenuDeleteItem entryId={ this.props.entryId }
                                                      title="Удалить"
                                                      key="delete" />`

    return `<span onClick={ this.onClick }
                  onMouseEnter={ this.onMouseEnter }
                  onMouseLeave={ this.onMouseLeave }
                  className="meta-item__content">
              <i className="meta-item__common icon icon--dots"></i>
              <span className={ menuClasses }>{ actionList }</span>
            </span>`

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