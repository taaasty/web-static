UnknownEntryHeader = require './header'
{ PropTypes } = React

UnknownEntryContent = React.createClass
  displayName: 'UnknownEntryContent'

  propTypes:
    title: PropTypes.string.isRequired

  render: ->
    <div>
      <UnknownEntryHeader title={ @props.title } />
      <div className="post__content">
        <p>{ i18n.t('entry.unknown_type') }</p>
      </div>
    </div>

module.exports = UnknownEntryContent