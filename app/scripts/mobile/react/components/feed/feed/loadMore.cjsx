Spinner            = require '../../common/spinner/spinner'
FeedLoadMoreButton = require './buttons/loadMore'
{ PropTypes }  = React

FeedLoadMore = React.createClass
  displayName: 'FeedLoadMore'

  propTypes:
    loading: PropTypes.bool.isRequired
    onClick: PropTypes.func.isRequired

  render: ->
    <div className="feed__more">
      { @renderContent() }
    </div>

  renderContent: ->
    if @props.loading
      <div className="loader">
        <Spinner size={ 30 } />
      </div>
    else
      <FeedLoadMoreButton onClick={ @props.onClick } />

module.exports = FeedLoadMore