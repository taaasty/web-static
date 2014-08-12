###* @jsx React.DOM ###

MORE_COMMENTS_LIMIT = 50

window.EntryCommentBox_LoadMore = React.createClass
  mixins: [ReactGrammarMixin]

  propTypes:
    totalCount:  React.PropTypes.number.isRequired
    loadedCount: React.PropTypes.number.isRequired
    onClick:     React.PropTypes.func.isRequired

  render: ->
   `<div onClick={ this.props.onClick }
         className="comments__more">
      <a title={ this._getTitle() }
         className="comments__more-link">
        { this._getTitle() }
      </a>
    </div>`

  _getTitle: ->
    remainingCount = @props.totalCount - @props.loadedCount
    remainingDeclension = @declension remainingCount, ['комментарий', 'комментария', 'комментариев']
    possibleCount  = @props.loadedCount + MORE_COMMENTS_LIMIT

    if possibleCount < @props.totalCount
      "Загрузить еще #{MORE_COMMENTS_LIMIT} комментариев"
    else
      "Загрузить оставшиеся #{ remainingCount } #{ remainingDeclension }"