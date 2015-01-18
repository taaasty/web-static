ConnectStoreMixin = (listenableStore) ->

  getInitialState: ->
    @getStateFromStore()

  componentWillMount: ->
    listenableStore.addChangeListener @onStoreChange

  componentWillUnmount: ->
    listenableStore.removeChangeListener @onStoreChange

  onStoreChange: ->
    @setState @getStateFromStore()  

module.exports = ConnectStoreMixin