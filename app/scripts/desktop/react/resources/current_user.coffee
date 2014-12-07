CurrentUserResource =

  update: ({data, beforeSend, success, error, complete}) ->
    $.ajax
      url: ApiRoutes.update_profile_url()
      method: 'PUT'
      data: data
      beforeSend: beforeSend
      success: success
      error: error
      complete: complete

module.exports = CurrentUserResource

  #   @incrementActivities()

  #   @setState isProcess: true

  #   data = {}
  #   data[key] = value

  #   @createRequest
  #     url:  ApiRoutes.update_profile_url()
  #     data: data
  #     dataType: 'JSON'
  #     method:   'PUT'
  #     success: (data) =>
  #       TastyEvents.trigger TastyEvents.keys.user_property_changed( key, @props.user.id ), [value]

  #       if key is 'slug'
  #         TastyLockingAlertController.show
  #           title:   'Внимание!'
  #           message: "Сейчас будет произведён переход по новому адресу вашего тлога (#{ data.tlog_url })"
  #           action:  -> window.location = data.tlog_url

  #       @props.user.set data
  #     error: (data) =>
  #       @shake()
  #       TastyNotifyController.errorResponse data
  #     complete: =>
  #       @safeUpdateState isProcess: false
  #       @decrementActivities()

  # index: ({data, success, error}) ->
  #   Requester.request
  #     url: ApiRoutes.operator_categories_url()
  #     data: data
  #     success: (categories) ->
  #       success?(categories)
  #     error: (xhr, status, err) ->
  #       error?(err || status)

  # get: ({categoryId, success, error}) ->
  #   Requester.request
  #     url: ApiRoutes.operator_category_url categoryId
  #     success: (category) ->
  #       success?(category)
  #     error: (xhr, status, err) ->
  #       error?(err || status)

  # create: ({data, success, error}) ->
  #   Requester.request
  #     url: ApiRoutes.operator_categories_url()
  #     method: 'POST'
  #     data: data
  #     success: (category) ->
  #       success?(category)
  #     error: (xhr, status, err) ->
  #       error?(err || status)

  # update: ({data, categoryId, success, error}) ->
  #   Requester.request
  #     url: ApiRoutes.operator_category_url categoryId
  #     method: 'PUT'
  #     data: data
  #     success: (category) ->
  #       success?(category)
  #     error: (xhr, status, err) ->
  #       error?(err || status)

  # delete: ({categoryId, success, error}) ->
  #   Requester.request
  #     url: ApiRoutes.operator_category_url categoryId
  #     method: 'DELETE'
  #     error: (xhr, status, err) ->
  #       error?(err || status)
  #     success: (response) ->
  #       success?(response)