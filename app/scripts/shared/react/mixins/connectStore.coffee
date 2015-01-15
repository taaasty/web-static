ConnectStoreMixin = (listenableStore) ->

  getInitialState: ->
    @getStateFromStore()

  componentDidMount: ->
    listenableStore.addChangeListener @onStoreChange

  componentWillUnmount: ->
    listenableStore.removeChangeListener @onStoreChange

  onStoreChange: ->
    @setState @getStateFromStore()  

module.exports = ConnectStoreMixin