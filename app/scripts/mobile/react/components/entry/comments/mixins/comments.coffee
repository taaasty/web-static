EntryViewActions = require '../../../../actions/view/entry'

CommentsMixin =

  loadMoreComments: ->
    entryId     = @props.entry.id
    toCommentId = @state.comments[0].id
    limit       = @props.limit

    @activateLoadingState()

    EntryViewActions.loadComments entryId, toCommentId, limit
      .then @activateShowState
      .fail @activateErrorState

module.exports = CommentsMixin