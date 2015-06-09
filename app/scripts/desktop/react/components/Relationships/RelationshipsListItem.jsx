import Avatar from '../../../../shared/react/components/common/Avatar';

let RelationshipsListItem = React.createClass({
  propTypes: {
    relationship: React.PropTypes.object.isRequired
  },

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },

  render() {
    let user = this.props.relationship.reader || this.props.relationship.user;

    return (
      <li className="person">
        <div className="person__in">
          <div className="person__avatar">
            <a href={user.tlog_url}>
              <Avatar userpic={user.userpic} size={48} />
            </a>
          </div>
          <div className="person__desc">
            <a href={user.tlog_url}>
              <p className="person__name">
                {user.name}
              </p>
            </a>
            <div className="person__count">
              {i18n.t('tlog.entries_count', {count: user.public_entries_count})}
            </div>
          </div>
          <div className="person__actions">
            {this.props.children}
          </div>
        </div>
      </li>
    );
  }
});

export default RelationshipsListItem;