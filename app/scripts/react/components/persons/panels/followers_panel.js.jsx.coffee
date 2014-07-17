###* @jsx React.DOM ###

FOLLOWER_STATE = 1

window.PersonsPopup_FollowersPanel = React.createClass

  getInitialState: ->
    relationships: null

  componentWillMount: -> @getPanelData()

  componentWillUnmount: ->
    # Отменяем xhr запрос если пользователь не дождался загрузки данных и
    # переключился на другую вкладку
    # http://stackoverflow.com/a/446626/3800881
    @xhr.abort()

  getPanelData: ->
    @xhr = $.ajax
      url: Routes.api.relationships_by_url()
      data:
        status: FOLLOWER_STATE
      success: (relationships) =>
        @setState relationships: relationships
        @props.onReady()
      error: (data, type) =>
        TastyNotifyController.errorResponse data

  render: ->
    if @state.relationships

      if @state.relationships.length>0
        relationships = @state.relationships.map (relationship, i) ->
          `<PersonsPopup_FollowerRelationship relationship={ relationship }
                                              key={ i }></PersonsPopup_FollowerRelationship>`

        panelContent = `<ul className="persons">{ relationships }</ul>`
      else
      panelContent = `<div className="popup__text">Вы ни за кем не следите</div>`

    else
      panelContent = `<div className="popup__text">Загружаю..</div>`

    return `<div className="tabs-panel">
              <div className="scroller scroller--persons js-scroller">
                <div className="scroller__pane js-scroller-pane">
                  { panelContent }
                </div>
                <div className="scroller__track js-scroller-track">
                  <div className="scroller__bar js-scroller-bar"></div>
                </div>
              </div>
            </div>`

module.exports = PersonsPopup_FollowersPanel
