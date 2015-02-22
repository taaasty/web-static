_ = require 'lodash'

ConnectStoreMixin = (listenableStore) ->

  getInitialState: ->
    @getStateFromStore()

  componentWillMount: ->
    if _.isArray(listenableStore)
      _.forEach listenableStore, (store) =>
        store.addChangeListener @onStoreChange
    else
      listenableStore.addChangeListener @onStoreChange

  componentWillUnmount: ->
    if _.isArray(listenableStore)
      _.forEach listenableStore, (store) =>
        store.removeChangeListener @onStoreChange
    else
      listenableStore.removeChangeListener @onStoreChange

  onStoreChange: ->
    @setState @getStateFromStore()  

module.exports = ConnectStoreMixin