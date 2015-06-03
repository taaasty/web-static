import Avatar from '../../../../shared/react/components/common/Avatar';

let FlowFormStaff = React.createClass({
  propTypes: {
    staff: React.PropTypes.array.isRequired,
    onDelete: React.PropTypes.func.isRequired
  },

  render() {
    if (this.props.staff.length) {
      return (
        <div className="flow-form__persons">
          <h5 className="flow-form__subtitle">Модераторы</h5>
          {this.renderStaffList()}
        </div>
      );
    } else {
      return null;
    }
  },

  renderStaffList() {
    let staffList = this.props.staff.map((staff, i) => {
      return (
        <li className="person" key={staff.id}>
          <div className="person__in">
            <div className="person__avatar">
              <a href="http://taaasty.com/~tallassa">
                <Avatar userpic={staff.userpic} size={48} />
              </a>
            </div>
            <div className="person__desc">
              <a href={staff.tlog_url}>
                <p className="person__name">{staff.name}</p>
              </a>
              <div className="person__count">
                {i18n.t('tlog.entries_count', {count: staff.total_entries_count})}
              </div>
            </div>
            <div className="person__actions">
              <button className="button button--small button--red"
                      onTouchTap={this.props.onDelete.bind(null, staff)}>
                Удалить
              </button>
            </div>
          </div>
        </li>
      );
    });

    return <ul className="persons">{staffList}</ul>;
  }
});

export default FlowFormStaff;