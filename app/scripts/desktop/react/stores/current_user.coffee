_ = require 'lodash'
BaseStore = require './BaseStore'
CROSSPOST_NONE = 'none'

currentUser = null
CurrentUserStore = _.extend new BaseStore(),

  isLogged: -> currentUser?
  isPrivate: -> currentUser?.is_privacy
  isPremium: -> currentUser?.is_premium

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
  getUserID:      -> currentUser?.id
  getAccessToken: -> currentUser?.api_key.access_token
  getUserpic:     -> currentUser?.userpic

  updateUser: (data) ->
    _.extend currentUser, data

  updateAuthenticationCrosspost: (social, type) ->
    authentications = currentUser?.authentications || []
    a.crossposting_cd = type for a in authentications when a.provider == social

  getOmniauthEnableUrl: (social) ->
    authentications = currentUser?.authentications || []
    authentications.reduce(((acc, el) ->
      if el.provider == social
        el.omniauth_enable_url
      else
        acc
    ), null)

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
    when 'stopFbCrosspost'
      CurrentUserStore.updateAuthenticationCrosspost('facebook', CROSSPOST_NONE);
      CurrentUserStore.emitChange();
    when 'stopTwitterCrosspost'
      CurrentUserStore.updateAuthenticationCrosspost('twitter', CROSSPOST_NONE);
      CurrentUserStore.emitChange();
