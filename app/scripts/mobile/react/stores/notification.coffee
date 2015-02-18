_             = require 'lodash'
assign        = require 'react/lib/Object.assign'
BaseStore     = require './_base'
Constants     = require '../constants/constants'
AppDispatcher = require '../dispatcher/dispatcher'

_notifications    = []
_everythingLoaded = false

update = (data) ->
  _.forEach _notifications, (item) ->
    _.extend item, data if item.id == data.id

push = (notifications) ->
  _notifications = _notifications.concat notifications

NotificationStore = assign new BaseStore(),

  initialize: (notifications) ->
    _notifications = notifications

  getAll: ->
    _notifications

  isEverythingLoaded: ->
    _everythingLoaded

module.exports = NotificationStore

NotificationStore.dispatchToken = AppDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when Constants.notifications.LOAD
      notifications = action.notifications.reverse()

      if notifications.length then push(notifications) else _everythingLoaded = true
      NotificationStore.emitChange()

    when Constants.notifications.READ
      update action.notification
      NotificationStore.emitChange()

    when Constants.notifications.READ_ALL
      _.forEach action.notifications, update
      NotificationStore.emitChange()