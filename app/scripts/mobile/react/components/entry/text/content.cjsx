{ PropTypes } = React

TextEntryContent = React.createClass
  displayName: 'TextEntryContent'

  propTypes:
    text: PropTypes.string.isRequired

  render: ->
    <div className="post__content">
      <p>{ @props.text }</p>
    </div>

module.exports = TextEntryContent