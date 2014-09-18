CHANGE_EVENT = 'change'

currentUser = null

window.CurrentUserStore = _.extend {}, EventEmitter.prototype, {

  emitChange:            -> @emit CHANGE_EVENT
  addChangeListener:     (callback) -> @on   CHANGE_EVENT, callback
  removedChangeListener: (callback) -> @off  CHANGE_EVENT, callback
  isLogged:              -> currentUser?
  getUser:               -> currentUser
  getAccessToken:        -> currentUser.api_key.access_token
  getUserpic:            -> currentUser.userpic

  _setupUser: (user) ->
    currentUser = user
    console.debug? 'Залогинен пользователь:', user.slug
}

CurrentUserStore.dispatchToken = CurrentUserDispatcher.register (payload) ->

  switch payload.type
    # TODO updateUserpic, updateNames (title, slug, name), updateBackground, updateDesign
    when CurrentUserDispatcher.TYPE_SETUP
      CurrentUserStore._setupUser payload.user
      CurrentUserStore.emitChange()
      break