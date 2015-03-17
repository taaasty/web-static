BaseStore = require './_base'

currentUser = null

CurrentUserStore = _.extend new BaseStore(),

  isLogged: -> currentUser?

  hasDesignBundle: ->
    !!currentUser?.has_design_bundle

  hasVkontakteAuth: ->
    authentications = currentUser?.authentications

    if authentications?
      for authentication in authentications when authentication.provider is 'vkontakte'
        return true

    false

  hasFacebookAuth: ->
    authentications = currentUser?.authentications

    if authentications?
      for authentication in authentications when authentication.provider is 'facebook'
        return true

    false

  getUser:        -> currentUser
  getAccessToken: -> currentUser.api_key.access_token
  getUserpic:     -> currentUser.userpic

  updateUser: (data) ->
    _.extend currentUser, data

  _setupUser: (user) ->
    currentUser = user
    console.debug? 'Залогинен пользователь:', user.slug

module.exports = CurrentUserStore

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