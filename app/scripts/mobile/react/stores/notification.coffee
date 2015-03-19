_             = require 'lodash'
assign        = require 'react/lib/Object.assign'
BaseStore     = require './_base'
Constants     = require '../constants/constants'
AppDispatcher = require '../dispatcher/dispatcher'

_notifications    = {}
_everythingLoaded = false

NotificationStore = assign new BaseStore(),

  initialize: (notifications) ->
    _notifications = {}
    _.forEach notifications, (item) ->
      _notifications[item.id] = item

  getAll: ->
    _notifications

  getAllChrono: ->
    notifications = []

    _.forEach _notifications, (item) ->
      notifications.push item

    notifications = _.sortBy notifications, (item) ->
      -item.id

    notifications

  isEverythingLoaded: ->
    _everythingLoaded

module.exports = NotificationStore

NotificationStore.dispatchToken = AppDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when Constants.notifications.LOAD
      if action.notifications.length
        _.forEach action.notifications, (item) -> _notifications[item.id] = item
      else
        _everythingLoaded = true
      NotificationStore.emitChange()

    when Constants.notifications.READ
      _.extend _notifications[action.notification.id], action.notification
      NotificationStore.emitChange()

    when Constants.notifications.READ_ALL
      _.forEach action.notifications, (item) -> _.extend _notifications[item.id], item
      NotificationStore.emitChange()

    when Constants.messaging.PUSH_NOTIFICATION
      _notifications[action.notification.id] = action.notification
      NotificationStore.emitChange()

    when Constants.messaging.UPDATE_NOTIFICATIONS
      _.forEach action.notifications, (item) -> _.extend _notifications[item.id], item
      NotificationStore.emitChange()