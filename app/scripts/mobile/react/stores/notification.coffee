assign        = require 'react/lib/Object.assign'
BaseStore     = require './_base'
Constants     = require '../constants/constants'
AppDispatcher = require '../dispatcher/dispatcher'

_notifications = []

NotificationStore = assign new BaseStore(),

  initialize: (notifications) ->
    _notifications = notifications

  getAll: ->
    _notifications

module.exports = NotificationStore