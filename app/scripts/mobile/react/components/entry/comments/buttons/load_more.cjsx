{ PropTypes } = React

module.exports = React.createClass
  displayName: 'EntryComments_LoadMoreButton'

  propTypes:
    totalCount:  PropTypes.number.isRequired
    loadedCount: PropTypes.number
    limit:       PropTypes.number

  render: ->
    <div className="comments__more">
      <span className="comments__more-link">Загрузить оставшиеся 21 комментарий adsf asdf</span>
    </div>

  # mixins: [ReactGrammarMixin]

  # propTypes:
  #   totalCount:  React.PropTypes.number.isRequired
  #   loadedCount: React.PropTypes.number.isRequired
  #   limit:       React.PropTypes.number.isRequired
  #   onClick:     React.PropTypes.func.isRequired

  # render: ->
  #   <div onClick={ this.props.onClick }
  #        className="comments__more">
  #     <a title={ this._getTitle() }
  #        className="comments__more-link">
  #       { this._getTitle() }
  #     </a>
  #   </div>

  # _getTitle: ->
  #   remainingCount = @props.totalCount - @props.loadedCount
  #   remainingDeclension = @declension remainingCount, ['комментарий', 'комментария', 'комментариев']
  #   possibleCount  = @props.loadedCount + @props.limit

  #   if possibleCount < @props.totalCount
  #     "Загрузить еще #{ @props.limit } комментариев"
  #   else
  #     "Загрузить оставшиеся #{ remainingCount } #{ remainingDeclension }"