{ PropTypes } = React

module.exports = React.createClass
  displayName: 'EntryComments_CommentListItem_Text'

  propTypes:
    text: PropTypes.string.isRequired

  render: ->
    <span className="comment__text"
          dangerouslySetInnerHTML={{ __html: @props.text }} />