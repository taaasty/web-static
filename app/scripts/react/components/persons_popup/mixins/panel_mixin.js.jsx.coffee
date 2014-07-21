###* @jsx React.DOM ###
#
window.PersonsPopup_PanelMixin =

  getInitialState: ->
    relationships: null
    isError:       false

  componentDidMount: ->
    @$scroller = $ @refs.scroller.getDOMNode()

    @scroller = @$scroller.baron
      scroller: ".js-scroller-pane"
      bar:      ".js-scroller-bar"
      track:    ".js-scroller-track"
      barOnCls: "scroller--tracked"
      pause:    0

    # TODO Специально вызывается два раза, один раз иногда не срабатывает
    @$scroller.trigger("sizeChange").trigger('sizeChange')

    @getPanelData()

  componentWillUnmount: ->
    @abortActiveRequests()

  getPanelData: ->
    console.error 'getPanelData when xhr' if @xhr?
    @props.activitiesHandler.increment()
    @setState isError: false
    req = @createRequest
      url:     @relationUrl()
      success: (relationships) =>
        @setState relationships: relationships
      error:   (data) =>
        TastyNotifyController.errorResponse data

        @safeUpdateState data, -> @setState isError: true

    req.always @props.activitiesHandler.decrement

  componentDidUpdate: ->
    @scroller.update()
    @$scroller.trigger("sizeChange").trigger('sizeChange')

  removeRelationshipByIndex: (index) ->
    newRelationships = this.state.relationships
    newRelationships.splice index, 1
    @setState relationships: newRelationships

  render: ->
    if @state.relationships
      if @state.relationships.length > 0
        itemClass = @itemClass
        relationships = @state.relationships.map (relationship, i) =>
          itemClass relationship: relationship, key: i, onRequestEnd: @removeRelationshipByIndex

        panelContent = `<ul className="persons">{ relationships }</ul>`
      else
        panelContent = `<div className="popup__text">Список пуст.</div>`
    else
      if @state.isError
        panelContent = `<div className="popup__text">Ошибка загрузки.</div>`
      else
        panelContent = `<div className="popup__text">Загружаю..</div>`

    return `<div className="tabs-panel">
              <div className="scroller scroller--persons" ref="scroller">
                <div className="scroller__pane js-scroller-pane">
                  { panelContent }
                </div>
                <div className="scroller__track js-scroller-track">
                  <div className="scroller__bar js-scroller-bar"></div>
                </div>
              </div>
            </div>`

# TODO Use react-mixin-manager
_.extend window.PersonsPopup_PanelMixin, window.RequesterMixin
