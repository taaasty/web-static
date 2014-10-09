###* @jsx React.DOM ###

window.IndicatorsToolbar = React.createClass

  getInitialState: -> @getStateFromStore()

  componentDidMount: ->
    ConnectionStateStore.addUpdateListener @_onStoreChange

  componentWillUnmount: ->
    ConnectionStateStore.removeUpdateListener @_onStoreChange

  render: ->
    if ConnectionStateStore.CONNECTED_STATE
      indicators = `<div className="toolbar__indicators">
                      <IndicatorsToolbar_Messages />
                      <IndicatorsToolbar_Notifications />
                    </div>`

    return `<nav className="toolbar toolbar--right state--open-indicators">
              { indicators }
            </nav>`

  getStateFromStore: ->
    currentState: ConnectionStateStore.getConnectionState()

  _onStoreChange: ->
    @setState @getStateFromStore()