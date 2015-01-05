Spinner                = require '../../common/spinner/spinner'
CommentsLoadMoreButton = require './buttons/loadMore'
{ declension } = require '../../../../../shared/helpers/grammar'
{ PropTypes }  = React

CommentsLoadMore = React.createClass
  displayName: 'CommentsLoadMore'

  propTypes:
    totalCount:  PropTypes.number.isRequired
    loadedCount: PropTypes.number
    limit:       PropTypes.number
    loading:     PropTypes.bool.isRequired
    onClick:     PropTypes.func.isRequired

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
          onClick={ @props.onClick } />

  getTitle: ->
    remainingCount      = @props.totalCount - @props.loadedCount
    possibleCount       = @props.loadedCount + @props.limit
    remainingDeclension = declension remainingCount, ['комментарий', 'комментария', 'комментариев']

    if possibleCount < @props.totalCount
      "Загрузить еще #{ @props.limit } комментариев"
    else
      "Загрузить оставшиеся #{ remainingCount } #{ remainingDeclension }"

module.exports = CommentsLoadMore