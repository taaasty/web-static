assign        = require 'react/lib/Object.assign'
BaseStore     = require './_base'
Constants     = require '../constants/constants'
AppDispatcher = require '../dispatcher/dispatcher'

#TODO: Login, logout actions

_currentUser = null

extendByMockData = (user) ->
  # Some mock data for better development process
  if localStorage?.getItem('userLogged') is 'true'
    if localStorage.getItem 'userToken'
      user.api_key.access_token = localStorage.getItem 'userToken'

    if localStorage.getItem 'userId'
      user.id = parseInt localStorage.getItem('userId')

  user

CurrentUserStore = assign new BaseStore(),

  initialize: (user) ->
    if user?
      user         = extendByMockData user
      _currentUser = user

      console.debug? 'Залогинен пользователь:', user.slug
    else
      _currentUser = null
      console.debug? 'Без пользователя'

  isLogged: ->
    _currentUser?

  getUser: ->
    _currentUser

  getAccessToken: ->
    _currentUser?.api_key.access_token

  update: (user) ->
    assign _currentUser, user

module.exports = CurrentUserStore

CurrentUserStore.dispatchToken = AppDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when Constants.currentUser.UPDATE
      CurrentUserStore.update action.user
      CurrentUserStore.emitChange()
    when Constants.currentUser.CANCEL_EMAIL_CONFIRMATION
      CurrentUserStore.update(confirmation_email: null)
      CurrentUserStore.emitChange()