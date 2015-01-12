UnknownEntryHeader = require './header'
{ PropTypes } = React

#TODO: i18n
MESSAGE = 'Неизвестный тип поста'

UnknownEntryContent = React.createClass
  displayName: 'UnknownEntryContent'

  propTypes:
    title: PropTypes.string.isRequired

  render: ->
    <div>
      <UnknownEntryHeader title={ @props.title } />
      <div className="post__content">
        <p>{ MESSAGE }</p>
      </div>
    </div>

module.exports = UnknownEntryContent