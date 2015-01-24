{ PropTypes } = React

EntryMetaComments = React.createClass
  displayName: 'EntryMetaComments'

  propTypes:
    commentsCount: PropTypes.number.isRequired

  render: ->
    <div className="meta-comments">
      { @props.commentsCount }
    </div>

module.exports = EntryMetaComments