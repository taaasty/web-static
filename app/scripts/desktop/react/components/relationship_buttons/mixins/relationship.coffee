window.RelationshipMixin =

  componentWillUnmount: -> @clearErrorTimer()

  follow: ->
    @closeError()
    @setState isProcess: true

    @createRequest
      url: ApiRoutes.change_my_relationship_url @state.relationship.user_id, 'follow'
      method: 'POST'
      success: (data) =>
        @safeUpdateState relationship: data
        TastyEvents.trigger TastyEvents.keys.follow_status_changed(data.user_id), [data.state]
      error: (data) =>
        @startErrorTimer()
        NoticeService.errorResponse data
      complete: =>
        @safeUpdateState isProcess: false

  unfollow: ->
    @closeError()
    @setState isProcess: true

    @createRequest
      url: ApiRoutes.change_my_relationship_url @state.relationship.user_id, 'unfollow'
      method: 'POST'
      success: (data) =>
        @safeUpdateState relationship: data
        TastyEvents.trigger TastyEvents.keys.follow_status_changed(data.user_id), [data.state]
      error: (data) =>
        @startErrorTimer()
        NoticeService.errorResponse data
      complete: =>
        @safeUpdateState isProcess: false

  unfollowFromYourself: (options) ->
    @createRequest
      url: ApiRoutes.unfollow_from_yourself_url @props.relationship.reader_id
      method: 'POST'
      data:
        _method: 'DELETE'
      success: ->
        options?.success?()
      error: (data) =>
        NoticeService.errorResponse data

  cancel: (options) ->
    @closeError()
    @setState isProcess: true

    @createRequest
      url: ApiRoutes.change_my_relationship_url @state.relationship.user_id, 'cancel'
      method: 'POST'
      success: (data) =>
        @safeUpdateState relationship: data

        options?.success() if options?.success

        TastyEvents.trigger TastyEvents.keys.follow_status_changed(data.user_id), [data.state]
      error: (data) =>
        @startErrorTimer()
        NoticeService.errorResponse data
      complete: =>
        @safeUpdateState isProcess: false

  ignore: ->
    @closeError()
    @setState isProcess: true

    @createRequest
      url: ApiRoutes.change_my_relationship_url @state.relationship.user_id, 'ignore'
      method: 'POST'
      success: (data) =>
        @safeUpdateState relationship: data
        TastyEvents.trigger TastyEvents.keys.follow_status_changed(data.user_id), [data.state]
      error: (data) =>
        @startErrorTimer()
        NoticeService.errorResponse data
      complete: =>
        @safeUpdateState isProcess: false

  approve: (options) ->
    @activateLoadingState()

    @createRequest
      url: ApiRoutes.relationships_by_tlog_approve_url @props.relationship.reader.id
      method: 'POST'
      data:
        expose_reverse: 1
      success: (relationship) =>
        options?.success?(relationship)
      error: (data) =>
        NoticeService.errorResponse data
      complete: =>
        @activateWaitingState()

  disapprove: (options) ->
    @activateLoadingState()

    @createRequest
      url: ApiRoutes.relationships_by_tlog_disapprove_url @props.relationship.reader.id
      method: 'POST'
      success: (relationship) =>
        options?.success?(relationship)
      error: (data) =>
        NoticeService.errorResponse data
      complete: =>
        @activateWaitingState()

  _loadRelationship: ->
    @createRequest
      url: ApiRoutes.get_my_relationship_url(@props.tlogId)
      success: (data) =>
        @safeUpdateState relationship: data
        TastyEvents.trigger TastyEvents.keys.follow_status_changed(data.user_id), [data.state]
      error: (data) =>
        @safeUpdateState isError: true
        NoticeService.errorResponse data

React.mixins.add 'RelationshipMixin', [
  RelationshipMixin, ErrorTimerMixin, RequesterMixin
  ComponentManipulationsMixin
]