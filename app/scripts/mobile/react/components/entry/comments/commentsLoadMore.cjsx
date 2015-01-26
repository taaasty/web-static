Spinner                = require '../../common/spinner/spinner'
CommentsLoadMoreButton = require './buttons/loadMore'
{ PropTypes }  = React

LOAD_MORE_COMMENTS           = (count) -> t 'load_more_comments', count
LOAD_MORE_COMMENTS_REMAINING = (count) -> t 'load_more_comments_remaining', count

CommentsLoadMore = React.createClass
  displayName: 'CommentsLoadMore'

  propTypes:
    totalCount:         PropTypes.number.isRequired
    loadedCount:        PropTypes.number
    loadPerTime:        PropTypes.number
    loading:            PropTypes.bool.isRequired
    onCommentsLoadMore: PropTypes.func.isRequired

  render: ->
    <div className="comments__more">
      { @renderContent() }
    </div>

  renderContent: ->
    if @props.loading
      <div className="comments__loader">
        <Spinner size={ 14 } />
      </div>
    else
      <CommentsLoadMoreButton
          title={ @getTitle() }
          onClick={ @props.onCommentsLoadMore } />

  getTitle: ->
    remainingCount = @props.totalCount - @props.loadedCount
    possibleCount  = @props.loadedCount + @props.loadPerTime

    if possibleCount < @props.totalCount
      LOAD_MORE_COMMENTS @props.loadPerTime
    else
      LOAD_MORE_COMMENTS_REMAINING remainingCount

module.exports = CommentsLoadMore