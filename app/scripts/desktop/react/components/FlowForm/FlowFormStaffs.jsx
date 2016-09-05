/*global i18n */
import React, { PropTypes } from 'react';
import Avatar from '../../../../shared/react/components/common/AvatarCamelCase';
import DropdownButton from '../common/DropdownButton';
import DropdownItem from '../common/DropdownItem';
import { Map } from 'immutable';

const emptyPic = Map();

const STAFF_MODERATOR_ROLE = 'moderator';
const STAFF_ADMIN_ROLE = 'admin';
const STAFF_OWNER_ROLE = 'owner';

function FlowFormStaffs({ canChangeRole, onDelete, onRoleChange, staffs }) {
  function isOwner(staff) {
    return staff.get('role') === STAFF_OWNER_ROLE;
  }

  function renderRoleChanger(staff) {
    if (!isOwner(staff) && canChangeRole) {
      return (
        <DropdownButton
          activeItem={staff.get('role')}
          buttonClassName="button--small button--outline button--icon"
          iconClassName="icon--cogwheel"
          onChange={onRoleChange.bind(null, staff)}
        >
          <DropdownItem title="Модератор" item={STAFF_MODERATOR_ROLE} />
          <DropdownItem title="Администратор" item={STAFF_ADMIN_ROLE} />
        </DropdownButton>
      );
    }
  }

  function renderDeleteButton(staff) {
    if (!isOwner(staff)) {
      return (
        <button
          className="button button--small button--red"
          onTouchTap={onDelete.bind(null, staff)}
        >
          Удалить
        </button>
      );
    }
  }

  function renderStaffList() {
    return (
      <ul className="persons">
        {staffs.map((staff, i) => (
        <li className="person" key={staff.get('user')}>
          <div className="person__in">
            <div className="person__avatar">
              <a href={staff.getIn([ 'user', 'tlogUrl' ], '')} target="_blank">
                <Avatar userpic={staff.getIn([ 'user', 'userpic' ], emptyPic).toJS()} size={48} />
              </a>
            </div>
            <div className="person__desc">
              <a href={staff.getIn([ 'user', 'tlogUrl' ], '')} target="_blank">
                <p className="person__name">
                  {staff.getIn([ 'user', 'name' ], '')}
                </p>
              </a>
              <div className="person__count">
                {i18n.t('tlog.entries_count', { count: staff.getIn([ 'user', 'totalEntriesCount' ], 0) })}
              </div>
            </div>
            <div className="person__actions">
              {renderRoleChanger(staff)}
              {renderDeleteButton(staff)}
            </div>
          </div>
        </li>))
        }
      </ul>
    );
  }

  return staffs.count()
       ? (
         <div className="flow-form__persons">
          <h5 className="flow-form__subtitle">
            {'Модераторы'}
          </h5>
          {renderStaffList()}
        </div>
      )
      : <noscript />;
}

FlowFormStaffs.propTypes = {
  canChangeRole: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRoleChange: PropTypes.func,
  staffs: PropTypes.object.isRequired,
};

FlowFormStaffs.defaultProps = {
  canChangeRole: true,
};

export default FlowFormStaffs;
