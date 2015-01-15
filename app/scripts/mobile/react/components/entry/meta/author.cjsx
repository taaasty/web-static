UserAvatar = require '../../common/avatar/user'
{ PropTypes } = React

EntryMetaAuthor = React.createClass
  displayName: 'EntryMetaAuthor'

  propTypes:
    author: PropTypes.object.isRequired

  render: ->
    <a className="meta-author"
       href={ @props.author.tlog_url }>
      <span className="meta-author__avatar">
        <UserAvatar
            user={ @props.author }
            size={ 28 } />
      </span>
      <span>
        { @getUserSlug() }
      </span>
    </a>

  getUserSlug: ->
    " @#{ @props.author.slug }"

module.exports = EntryMetaAuthor