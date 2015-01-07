assign        = require 'react/lib/Object.assign'
BaseStore     = require './_base'
Constants     = require '../constants/constants'
AppDispatcher = require '../dispatcher/dispatcher'

_comments = {}

initializeComments = (entryId, comments, totalCount) ->
  _comments[entryId] =
    items: comments
    totalCount: totalCount

unshiftComments = (entryId, comments, totalCount) ->
  _comments[entryId] =
    items: comments.concat _comments[entryId].items
    totalCount: totalCount

pushComment = (entryId, comment) ->
  newTotalCount = _comments[entryId].totalCount + 1
  newComments   = _comments[entryId].items[..]
  newComments.push comment

  _comments[entryId] =
    items: newComments
    totalCount: newTotalCount

updateComment = (entryId, comment) ->
  comments = _comments[entryId].items

  for item in comments when item.id == comment.id
    assign item, comment
    break

deleteComment = (entryId, commentId) ->
  newTotalCount = _comments[entryId].totalCount - 1
  newComments   = _comments[entryId].items[..]

  for newComment, i in newComments when newComment.id == commentId
    newComments.splice i, 1
    break

  _comments[entryId] =
    items: newComments
    totalCount: newTotalCount

CommentsStore = assign new BaseStore(),

  getComments: (entryId) ->
    _comments[entryId]?.items

  getTotalCount: (entryId) ->
    _comments[entryId]?.totalCount

module.exports = CommentsStore

CommentsStore.dispatchToken = AppDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when Constants.entry.INITIALIZE_COMMENTS
      { entryId, comments, totalCount } = action

      initializeComments entryId, comments, totalCount
      CommentsStore.emitChange()
    when Constants.entry.LOAD_COMMENTS
      { entryId, comments, totalCount } = action

      unshiftComments entryId, comments, totalCount
      CommentsStore.emitChange()
    when Constants.entry.DELETE_COMMENT
      { entryId, commentId } = action

      deleteComment entryId, commentId
      CommentsStore.emitChange()
    when Constants.entry.CREATE_COMMENT
      { entryId, comment } = action

      pushComment entryId, comment
      CommentsStore.emitChange()
    when Constants.entry.EDIT_COMMENT
      { entryId, comment } = action

      updateComment entryId, comment
      CommentsStore.emitChange()