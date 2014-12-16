window.EntryMetabarComment = React.createClass
  mixins: [ReactGrammarMixin]

  propTypes:
    entryId:            React.PropTypes.number.isRequired
    entryUrl:           React.PropTypes.string.isRequired
    isLogged:           React.PropTypes.bool.isRequired
    totalCommentsCount: React.PropTypes.number.isRequired

  render: ->
    if @props.isLogged
      commentText = <a className="meta-item__common meta__link"
                       title="Прокомментировать"
                       onClick={ this.onClick }>
                      Прокомментировать
                    </a>
    else
      commentText = <a className="meta-item__common meta__link"
                       href={ this.props.entryUrl }
                       title={ this._getNumberOfComments() }>
                      { this._getNumberOfComments() }
                    </a>

    return <span className="meta-item meta-item_comments">
             <span className="meta__content">{ commentText }</span>
           </span>

  onClick: ->
    window.commentsMediator.doCommentClicked @props.entryId

  _getNumberOfComments: ->
    if @props.totalCommentsCount > 0
      @props.totalCommentsCount + ' ' +
      @declension(@props.totalCommentsCount, ['комментарий', 'комментария', 'комментариев'])