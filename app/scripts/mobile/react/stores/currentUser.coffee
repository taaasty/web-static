assign    = require 'react/lib/Object.assign'
BaseStore = require './_base'

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

module.exports = CurrentUserStore