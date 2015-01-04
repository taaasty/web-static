CurrentUserStore = require '../stores/current_user'

CurrentUserMixin =

  getInitialState: ->
    @getStateFromStore()

  componentDidMount:    -> CurrentUserStore.addChangeListener @onStoreChange
  componentWillUnmount: -> CurrentUserStore.removeChangeListener @onStoreChange

  isLogged: -> @state.logged

  getStateFromStore: ->
    user:   CurrentUserStore.getUser()
    logged: CurrentUserStore.isLogged()

  onStoreChange: ->
    @setState @getStateFromStore()

module.exports = CurrentUserMixin