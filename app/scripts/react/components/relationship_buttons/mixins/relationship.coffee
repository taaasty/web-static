window.RelationshipMixin =

  componentWillUnmount: -> @clearErrorTimer()

  follow: ->
    @closeError()
    @setState isProcess: true

    @createRequest
      url: Routes.api.change_my_relationship_url @state.relationship.user_id, 'follow'
      method: 'POST'
      success: (data) =>
        @safeUpdateState => @setState relationship: data
      error: (data) =>
        @startErrorTimer()
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isProcess: false

  unfollow: ->
    @closeError()
    @setState isProcess: true

    @createRequest
      url: Routes.api.change_my_relationship_url @state.relationship.user_id, 'unfollow'
      method: 'POST'
      success: (data) =>
        @safeUpdateState => @setState relationship: data
      error: (data) =>
        @startErrorTimer()
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isProcess: false

  cancel: ({ success }) ->
    @closeError()
    @setState isProcess: true

    @createRequest
      url: Routes.api.change_my_relationship_url @state.relationship.user_id, 'cancel'
      method: 'POST'
      success: (data) => success() if success?
      error: (data) =>
        @startErrorTimer()
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isProcess: false

  ignore: ->
    @closeError()
    @setState isProcess: true

    @createRequest
      url: Routes.api.change_my_relationship_url @state.relationship.user_id, 'ignore'
      method: 'POST'
      success: (data) =>
        @safeUpdateState => @setState relationship: data
      error: (data) =>
        @startErrorTimer()
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isProcess: false

  approve: ({ success }) ->
    @closeError()
    @setState isProcess: true

    @createRequest
      url: Routes.api.relationships_by_tlog_approve_url(@props.relationship.reader.id)
      method: 'POST'
      success: (data) => success() if success?
      error:   (data) =>
        @startErrorTimer()
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isProcess: false

  disapprove: ({ success }) ->
    @closeError()
    @setState isProcess: true

    @createRequest
      url: Routes.api.relationships_by_tlog_disapprove_url(@props.relationship.reader.id)
      method: 'POST'
      success: (data) => success() if success?
      error: (data) =>
        @startErrorTimer()
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isProcess: false

React.mixins.add 'RelationshipMixin', [RelationshipMixin, ErrorTimerMixin, RequesterMixin]