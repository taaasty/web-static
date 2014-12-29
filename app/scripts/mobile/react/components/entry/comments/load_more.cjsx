Spinner                = require '../../common/spinner/spinner'
CommentsLoadMoreButton = require './buttons/load_more'
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
    content = if @props.loading
      <div className="comments__loader">
        <Spinner size={ 14 } />
      </div>
    else
       <CommentsLoadMoreButton
           title={ @getTitle() }
           onClick={ @props.onClick } />

    <div className="comments__more">
      { content }
    </div>

  getTitle: ->
    remainingCount      = @props.totalCount - @props.loadedCount
    possibleCount       = @props.loadedCount + @props.limit
    remainingDeclension = declension remainingCount, ['комментарий', 'комментария', 'комментариев']

    if possibleCount < @props.totalCount
      "Загрузить еще #{ @props.limit } комментариев"
    else
      "Загрузить оставшиеся #{ remainingCount } #{ remainingDeclension }"

module.exports = CommentsLoadMore