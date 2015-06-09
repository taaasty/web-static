import Avatar from '../../../../shared/react/components/common/Avatar';
import DropdownButton from '../common/DropdownButton';
import DropdownItem from '../common/DropdownItem';

const STAFF_MODERATOR_ROLE = 'moderator',
      STAFF_ADMIN_ROLE = 'admin',
      STAFF_OWNER_ROLE = 'owner';

let FlowFormStaffs = React.createClass({
  propTypes: {
    staffs: React.PropTypes.array.isRequired,
    canChangeRole: React.PropTypes.bool,
    onRoleChange: React.PropTypes.func,
    onDelete: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      canChangeRole: true
    };
  },

  render() {
    if (this.props.staffs.length) {
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
    let staffList = this.props.staffs.map((staff, i) => {
      return (
        <li className="person" key={staff.user.id}>
          <div className="person__in">
            <div className="person__avatar">
              <a href={staff.user.tlog_url} target="_blank">
                <Avatar userpic={staff.user.userpic} size={48} />
              </a>
            </div>
            <div className="person__desc">
              <a href={staff.user.tlog_url} target="_blank">
                <p className="person__name">{staff.user.name}</p>
              </a>
              <div className="person__count">
                {i18n.t('tlog.entries_count', {count: staff.user.total_entries_count})}
              </div>
            </div>
            <div className="person__actions">
              {this.renderRoleChanger(staff)}
              {this.renderDeleteButton(staff)}
            </div>
          </div>
        </li>
      );
    });

    return <ul className="persons">{staffList}</ul>;
  },

  renderRoleChanger(staff) {
    if (!this.isOwner(staff) && this.props.canChangeRole) {
      return (
        <DropdownButton
            activeItem={staff.role}
            iconClassName="icon--cogwheel"
            buttonClassName="button--small button--outline button--icon"
            onChange={this.props.onRoleChange.bind(this, staff)}>
          <DropdownItem title="Модератор" item={STAFF_MODERATOR_ROLE} />
          <DropdownItem title="Администратор" item={STAFF_ADMIN_ROLE} />
        </DropdownButton>
      );
    }
  },

  renderDeleteButton(staff) {
    if (!this.isOwner(staff)) {
      return (
        <button className="button button--small button--red"
                onTouchTap={this.props.onDelete.bind(null, staff)}>
          Удалить
        </button>
      );
    }
  },

  isOwner(staff) {
    return staff.role === STAFF_OWNER_ROLE;
  }
});

export default FlowFormStaffs;