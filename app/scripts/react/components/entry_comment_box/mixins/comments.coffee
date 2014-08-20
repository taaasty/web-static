CommentsMixin =

  getInitialState: ->
    comments:          []
    totalCount:        null
    sharedCommentId:   null
    isPostError:       false
    isLoadError:       false
    isLoadMoreError:   false
    isPostLoading:     false
    isLoadLoading:     false
    isLoadMoreLoading: false

  componentDidMount: ->
    if fromId = @_getCommentIdFromHash()
      @loadCommentListFromCommentId fromId
    else
      @loadCommentList()

  loadCommentList: ->
    @setState isLoadError: false, isLoadLoading: true

    @createRequest
      url: Routes.api.comments_url()
      data: {
        entry_id: @props.entryId
        limit:    @_getFirstLoadLimit()
      }
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

  loadCommentListFromCommentId: (id) ->
    @setState isLoadError: false, isLoadLoading: true

    @createRequest
      url: Routes.api.comments_url()
      data: {
        entry_id:        @props.entryId
        from_comment_id: id - 1
        limit:           999
      }
      success: (data) =>
        @safeUpdateState =>
          @setState {
            comments:        data.comments
            totalCount:      data.total_count
            sharedCommentId: id
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

  removeComment: (comment) ->
    newComments = _.without @state.comments, comment
    @setState comments: newComments, totalCount: @state.totalCount - 1

  _getFirstLoadLimit: ->
    unless @props.isEntryPage
      if @props.totalCommentsCount > 5 then 3 else @props.totalCommentsCount
    else
      50

  _getCommentIdFromHash: ->
    hash = window.location.hash
    parseInt hash.match(/^#comment-(\d+)/)?[1]

React.mixins.add 'CommentsMixin', [CommentsMixin, RequesterMixin]