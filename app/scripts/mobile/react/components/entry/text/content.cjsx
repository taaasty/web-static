{ PropTypes } = React

TextEntryContent = React.createClass
  displayName: 'TextEntryContent'

  propTypes:
    text: PropTypes.string.isRequired

  render: ->
    <div className="post__content"
         dangerouslySetInnerHTML={{ __html: @props.text }} />

module.exports = TextEntryContent