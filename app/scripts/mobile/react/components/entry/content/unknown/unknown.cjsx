UnknownEntryHeader = require './header'
{ PropTypes } = React

MESSAGE = -> t 'unknown_entry_type'

UnknownEntryContent = React.createClass
  displayName: 'UnknownEntryContent'

  propTypes:
    title: PropTypes.string.isRequired

  render: ->
    <div>
      <UnknownEntryHeader title={ @props.title } />
      <div className="post__content">
        <p>{ MESSAGE() }</p>
      </div>
    </div>

module.exports = UnknownEntryContent