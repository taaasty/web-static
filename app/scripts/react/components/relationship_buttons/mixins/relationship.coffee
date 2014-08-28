window.RelationshipMixin =

  componentWillUnmount: -> @clearErrorTimer()

  follow: ->
    @closeError()
    @setState isProcess: true

    @createRequest
      url: Routes.api.change_my_relationship_url @state.relationship.user_id, 'follow'
      method: 'POST'
      success: (data) =>
        @safeUpdateState relationship: data
        TastyEvents.trigger TastyEvents.keys.follow_status_changed(data.user_id), [data.state]
      error: (data) =>
        @startErrorTimer()
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState isProcess: false

  unfollow: ->
    @closeError()
    @setState isProcess: true

    @createRequest
      url: Routes.api.change_my_relationship_url @state.relationship.user_id, 'unfollow'
      method: 'POST'
      success: (data) =>
        @safeUpdateState relationship: data
        TastyEvents.trigger TastyEvents.keys.follow_status_changed(data.user_id), [data.state]
      error: (data) =>
        @startErrorTimer()
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState isProcess: false

  cancel: (options) ->
    @closeError()
    @setState isProcess: true

    @createRequest
      url: Routes.api.change_my_relationship_url @state.relationship.user_id, 'cancel'
      method: 'POST'
      success: (data) =>
        @safeUpdateState relationship: data

        options?.success() if options?.success

        TastyEvents.trigger TastyEvents.keys.follow_status_changed(data.user_id), [data.state]
      error: (data) =>
        @startErrorTimer()
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState isProcess: false

  ignore: ->
    @closeError()
    @setState isProcess: true

    @createRequest
      url: Routes.api.change_my_relationship_url @state.relationship.user_id, 'ignore'
      method: 'POST'
      success: (data) =>
        @safeUpdateState relationship: data
        TastyEvents.trigger TastyEvents.keys.follow_status_changed(data.user_id), [data.state]
      error: (data) =>
        @startErrorTimer()
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState isProcess: false

  approve: (options) ->
    @closeError()
    @setState isProcess: true

    @createRequest
      url: Routes.api.relationships_by_tlog_approve_url(@props.relationship.reader.id)
      method: 'POST'
      success: (data) => options?.success() if options?.success
      error:   (data) =>
        @startErrorTimer()
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState isProcess: false

  disapprove: (options) ->
    @closeError()
    @setState isProcess: true

    @createRequest
      url: Routes.api.relationships_by_tlog_disapprove_url(@props.relationship.reader.id)
      method: 'POST'
      success: (data) => options?.success() if options?.success
      error: (data) =>
        @startErrorTimer()
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState isProcess: false

  _loadRelationship: ->
    @createRequest
      url: Routes.api.get_my_relationship_url(@props.tlogId)
      success: (data) =>
        @safeUpdateState relationship: data
        TastyEvents.trigger TastyEvents.keys.follow_status_changed(data.user_id), [data.state]
      error: (data) =>
        @safeUpdateState isError: true
        TastyNotifyController.errorResponse data

React.mixins.add 'RelationshipMixin', [
  RelationshipMixin, ErrorTimerMixin, RequesterMixin
  ComponentManipulationsMixin
]