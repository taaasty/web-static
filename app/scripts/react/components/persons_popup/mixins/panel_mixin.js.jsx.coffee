###* @jsx React.DOM ###
#
window.PersonsPopup_PanelMixin =

  propTypes:
    isActive:      React.PropTypes.bool.isRequired
    onLoad:        React.PropTypes.func.isRequired

  getInitialState: ->
    isError:   false
    isLoading: false

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

  componentWillUnmount: -> @abortActiveRequests()

  getPanelData: ->
    console.error 'getPanelData when xhr' if @xhr?
    @incrementActivities()
    @setState isError: false, isLoading: true
    req = @createRequest
      url: @relationUrl()
      success: (relationships, status, data) =>
        @safeUpdateState => @props.onLoad(relationships)
      error:   (data) =>
        @safeUpdateState => @setState isError: true
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isLoading: false
        @decrementActivities()

  componentDidUpdate: ->
    @scroller.update()
    @$scroller.trigger("sizeChange").trigger('sizeChange')

  removeRelationshipByIndex: (index) ->
    newRelationships = @props.relationships.slice()
    newRelationships.splice index, 1
    @props.onLoad(newRelationships)

  render: ->
    panelClasses = React.addons.classSet 'tabs-panel': true, 'state--hidden': !@props.isActive

    if @props.relationships
      if @props.relationships.length > 0
        itemClass = @itemClass
        relationships = @props.relationships.map (relationship, i) =>
          itemClass relationship: relationship, key: i, onRequestEnd: @removeRelationshipByIndex

        panelContent = `<ul className="persons">{ relationships }</ul>`
    else
      if @state.isError
        panelContent = `<div className="popup__text">Ошибка загрузки.</div>`
      else if @state.isLoading
        panelContent = `<div className="popup__text">Загружаю..</div>`
      else
        panelContent = `<div className="popup__text">Список пуст.</div>`

    return `<div className={ panelClasses }>
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
