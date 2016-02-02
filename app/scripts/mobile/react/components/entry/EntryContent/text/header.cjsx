{ PropTypes } = React

TextEntryHeader = React.createClass
  displayName: 'TextEntryHeader'

  propTypes:
    title: PropTypes.string.isRequired

  render: ->
    <div className="post__header">
      <h1 className="post__title">
        { @props.title }
      </h1>
    </div>

module.exports = TextEntryHeader