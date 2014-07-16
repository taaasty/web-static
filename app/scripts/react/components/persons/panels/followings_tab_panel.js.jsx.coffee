###* @jsx React.DOM ###

window.FollowingsTabPanel = FollowingsTabPanel = React.createClass

  getInitialState: ->
    data: []

  componentWillMount: -> @getPanelData()

  componentWillUnmount: ->
    # Отменяем xhr запрос если пользователь не дождался загрузки данных и
    # переключился на другую вкладку
    # http://stackoverflow.com/a/446626/3800881
    @xhr.abort()

  getPanelData: ->
    @xhr = $.ajax
      url: Routes.api.relationships_to_url()
      data:
        status: 1
      success: (persons) =>
        sortedPersons = _.sortBy( persons, (person) ->person.position )
        @setState data: sortedPersons
        @props.onReady()
      error: (data, type) =>
        TastyNotifyController.errorResponse data unless type is 'abort'

  render: ->
    if @state.data
      persons = @state.data.map (person, i) ->
        `<FollowingsTabPanelItem person={ person } key={ i }></FollowingsTabPanelItem>`

      `<div className="tabs-panel">
        <div className="scroller scroller--persons js-scroller">
          <div className="scroller__pane js-scroller-pane">
            <ul className="persons">{ persons }</ul>
          </div>
          <div className="scroller__track js-scroller-track">
            <div className="scroller__bar js-scroller-bar"></div>
          </div>
        </div>
      </div>`
    else
      `<div className="tabs-panel">
        <div className="scroller scroller--persons js-scroller">
          <div className="scroller__pane js-scroller-pane">
            <div className="popup__text">Пусто</div>
          </div>
          <div className="scroller__track js-scroller-track">
            <div className="scroller__bar js-scroller-bar"></div>
          </div>
        </div>
      </div>`

module.exports = FollowingsTabPanel