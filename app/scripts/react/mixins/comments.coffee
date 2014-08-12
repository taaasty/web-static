CommentsMixin =

  getInitialState: ->
    comments:          []
    totalCount:        null
    toCommentId:       null
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
            toCommentId: data.comments[0]?.id
          }
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
        to_comment_id: @state.toCommentId
      success: (data) =>
        @safeUpdateState =>
          newComments = data.comments.concat @state.comments

          @setState {
            comments:    newComments
            totalCount:  data.total_count
            toCommentId: data.comments[0]?.id
          }
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
        @safeUpdateState => @setState comments: @state.comments.concat comment
      error: (data) =>
        @safeUpdateState => @setState isPostError: true
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isPostLoading: false

React.mixins.add 'CommentsMixin', [CommentsMixin, RequesterMixin]