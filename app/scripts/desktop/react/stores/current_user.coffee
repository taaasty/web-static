BaseStore = require './_base'

currentUser = null

window.CurrentUserStore = _.extend new BaseStore(), {

  isLogged:       -> currentUser?
  getUser:        -> currentUser
  getAccessToken: -> currentUser.api_key.access_token
  getUserpic:     -> currentUser.userpic

  updateUser: (data) ->
    _.extend currentUser, data

  _setupUser: (user) ->
    currentUser = user
    console.debug? 'Залогинен пользователь:', user.slug
}

CurrentUserStore.dispatchToken = CurrentUserDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when 'setup'
      CurrentUserStore._setupUser action.user
      CurrentUserStore.emitChange()
    when 'userUpdated'
      CurrentUserStore.updateUser action.user
      CurrentUserStore.emitChange()
    when 'userpicUpdated'
      CurrentUserStore.updateUser(userpic: action.userpic)
      CurrentUserStore.emitChange()
    when 'confirmationEmailCanceled'
      CurrentUserStore.updateUser(confirmation_email: null)
      CurrentUserStore.emitChange()