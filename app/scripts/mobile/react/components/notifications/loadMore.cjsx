Spinner                     = require '../common/spinner/spinner'
NotificationsLoadMoreButton = require './buttons/loadMore'
{ PropTypes }  = React

NotificationsLoadMore = React.createClass
  displayName: 'NotificationsLoadMore'

  propTypes:
    loading: PropTypes.bool.isRequired
    onClick: PropTypes.func.isRequired

  render: ->
    if @props.loading
      <div className="loader">
        <Spinner size={ 30 } />
      </div>  
    else
      <NotificationsLoadMoreButton onClick={ @props.onClick } />

module.exports = NotificationsLoadMore