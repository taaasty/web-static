###* @jsx React.DOM ###

window.EntryMetabarAuthor = React.createClass

  propTypes:
    user: React.PropTypes.object.isRequired

  render: ->
   `<span className="meta-item meta-item--user state--visible">
      <span className="meta-item__content">
        <a href={ this.props.user.tlog_url }
           title={ this.props.user.name }
           className="meta-item__common meta-item__link">
          <span className="meta-item__ava">
            <UserAvatar user={ this.props.user } size={ 64 } />
          </span>
          { ' ' + this.props.user.name }
        </a>
      </span>
    </span>`