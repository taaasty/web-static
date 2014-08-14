CommentsMixin =

  getInitialState: ->
    comments:          []
    totalCount:        null
    isPostError:       false
    isLoadError:       false
    isLoadMoreError:   false
    isPostLoading:     false
    isLoadLoading:     false
    isLoadMoreLoading: false

  componentDidMount: -> @loadCommentList()

  loadCommentList: ->
    @setState isLoadError: false, isLoadLoading: true

    @createRequest
      url: Routes.api.comments_url()
      data: { entry_id: @props.entryId }
      success: (data) =>
        @safeUpdateState =>
          @setState {
            comments:    data.comments
            totalCount:  data.total_count
          }
          $(document).trigger 'domChanged'
      error: (data) =>
        @safeUpdateState => @setState isLoadError: true
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isLoadLoading: false

  loadMoreComments: ->
    @setState isLoadMoreError: false, isLoadMoreLoading: true

    @createRequest
      url: Routes.api.comments_url()
      data:
        entry_id:      @props.entryId
        limit:         @props.limit
        to_comment_id: @state.comments[0].id
      success: (data) =>
        @safeUpdateState =>
          newComments = data.comments.concat @state.comments

          @setState {
            comments:    newComments
            totalCount:  data.total_count
          }
          $(document).trigger 'domChanged'
      error: (data) =>
        @safeUpdateState => @setState isLoadMoreError: true
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isLoadMoreLoading: false

  postComment: (text) ->
    @setState isPostError: false, isPostLoading: true

    @createRequest
      url: Routes.api.comments_url()
      method: 'POST'
      data:
        entry_id: @props.entryId
        text:     text
      success: (comment) =>
        @safeUpdateState =>
          @setState {
            comments:   @state.comments.concat comment
            totalCount: @state.totalCount + 1
          }
          $(document).trigger 'domChanged'
      error: (data) =>
        @safeUpdateState => @setState isPostError: true
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isPostLoading: false

  removeComment: (comment) ->
    newComments = _.without @state.comments, comment
    @setState comments: newComments, totalCount: @state.totalCount - 1

React.mixins.add 'CommentsMixin', [CommentsMixin, RequesterMixin]