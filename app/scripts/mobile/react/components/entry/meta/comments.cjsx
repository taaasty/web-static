{ PropTypes } = React

EntryMetaComments = React.createClass
  displayName: 'EntryMetaComments'

  propTypes:
    commentsCount: PropTypes.number.isRequired
    onClick: PropTypes.func.isRequired

  render: ->
    <div className="meta-comments"
         onClick={ @handleClick }>
      { @props.commentsCount }
    </div>

  handleClick: ->
    @props.onClick()

module.exports = EntryMetaComments