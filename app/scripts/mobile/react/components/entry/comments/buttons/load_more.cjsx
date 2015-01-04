{ PropTypes }  = React

CommentsLoadMoreButton = React.createClass
  displayName: 'CommentsLoadMoreButton'

  propTypes:
    title:   PropTypes.string.isRequired
    onClick: PropTypes.func.isRequired

  render: ->
    <span className="comments__more-link"
          onClick={ @props.onClick }>
      { @props.title }
    </span>

module.exports = CommentsLoadMoreButton