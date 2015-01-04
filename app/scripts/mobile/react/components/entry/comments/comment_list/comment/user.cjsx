UserAvatar = require '../../../../common/avatar/user'
{ PropTypes } = React

CommentUser = React.createClass
  displayName: 'CommentUser'

  propTypes:
    user: PropTypes.object.isRequired

  render: ->
    <a href={ @props.user.tlog_url }
       className="comment__user"
       target="_blank"
       title={ @props.user.slug }>
      <span className="comment__avatar">
        <UserAvatar
            user={ @props.user }
            size={ 42 } />
      </span>
      <span className="comment__username">
        { @props.user.slug }
      </span>
    </a>

module.exports = CommentUser