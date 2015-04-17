TextEntryHeader = require './header'
{ PropTypes } = React

TextEntryContent = React.createClass
  displayName: 'TextEntryContent'

  propTypes:
    title: PropTypes.string.isRequired
    text:  PropTypes.string.isRequired

  render: ->
    <div>
      <TextEntryHeader title={ @props.title } />
      <div className="post__content"
           dangerouslySetInnerHTML={{ __html: @props.text || ''}} />
    </div>

module.exports = TextEntryContent