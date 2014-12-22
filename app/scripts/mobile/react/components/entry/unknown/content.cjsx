{ PropTypes } = React

UnknownEntryContent = React.createClass
  displayName: 'UnknownEntryContent'

  render: ->
    <div className="post__content">
      <p>Неизвестный тип поста</p>
    </div>

module.exports = UnknownEntryContent