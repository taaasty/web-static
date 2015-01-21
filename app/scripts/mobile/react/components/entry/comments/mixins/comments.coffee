CommentsMixin =

  loadMoreComments: ->
    entryId     = @props.entry.id
    toCommentId = @state.comments[0].id
    limit       = @props.limit

    @activateLoadingState()

    @getFlux().actions.loadComments entryId, toCommentId, limit
      .then @activateShowState
      .fail @activateErrorState

module.exports = CommentsMixin