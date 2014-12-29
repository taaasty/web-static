{ PropTypes } = React

CommentText = React.createClass
  displayName: 'CommentText'

  propTypes:
    text: PropTypes.string.isRequired

  render: ->
    <span className="comment__text"
          dangerouslySetInnerHTML={{ __html: @props.text }} />

module.exports = CommentText