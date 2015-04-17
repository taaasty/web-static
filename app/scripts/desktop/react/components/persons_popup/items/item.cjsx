window.PersonsPopup_PersonItem = React.createClass

  propTypes:
    user:     React.PropTypes.object.isRequired
    children: React.PropTypes.oneOfType([
      React.PropTypes.element, React.PropTypes.array
    ]).isRequired

  render: ->
    <li className="person">
      <div className="person__in">
        <div className="person__avatar">
          <a href={ this.props.user.tlog_url }>
            <UserAvatar
                user={ this.props.user }
                size={ 48 } />
          </a>
        </div>
        <div className="person__desc">
          <a href={ this.props.user.tlog_url }><p className="person__name">{ this.props.user.name }</p></a>
          <div className="person__count">
            { @renderEntriesCount() }
          </div>
        </div>
        <div className="person__actions">{ this.props.children }</div>
      </div>
    </li>

  renderEntriesCount: ->
    count = @props.user.public_entries_count

    <span>
      { count } { i18n.t('entries_count', {count: @props.user.public_entries_count}) }
    </span>