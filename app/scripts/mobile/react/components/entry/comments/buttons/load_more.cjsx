{ PropTypes } = React

module.exports = React.createClass
  displayName: 'EntryComments_LoadMoreButton'

  propTypes:
    totalCount:  PropTypes.number.isRequired
    loadedCount: PropTypes.number
    limit:       PropTypes.number

  render: ->
    <div className="comments__more">
      <span className="comments__more-link">
        Загрузить оставшиеся 21 комментарий adsf asdf
      </span>
    </div>