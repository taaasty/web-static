import React, { PropTypes } from 'react';
import UserAvatar from '../UserAvatar';
import { msgDate } from '../../helpers/dateHelpers';
import Image from '../../../../shared/react/components/common/Image';
import { Link } from 'react-router';
import uri from 'urijs';
import { Map } from 'immutable';
import { getEntityLocation } from '../Notifications/NotificationListItem';
import { connect } from 'react-redux';

const emptyUser = Map();

function ActivityItemContainer(props) {
  const {
    item,
    user,
  } = props;
  const tlogUrl = uri(user.get('tlogUrl', '')).path();
  const entityLocation = getEntityLocation(item);

  return (
    <div className="activity-item">
      <div className="activity-item__header">
        <div className="activity-item__avatar-container">
          <Link to={tlogUrl}>
            <UserAvatar size={50} user={user.toJS()} />
          </Link>
        </div>
        <div className="activity-item__title-container">
          <div className="activity-item__title">
            <Link to={tlogUrl}>
              {user.get('slug', '')}
            </Link>
            {' '}
            {item.get('actionText')}
          </div>
          <div className="activity-item__created-at">
            {msgDate(item.get('createdAt'))}
          </div>
        </div>
      </div>
      <div className="activity-item__body">
        <Link to={entityLocation}>
          <div className="activity-item__text">
            {item.get('text')}
          </div>
          {item.get('image') != null && (
            <Image
              className="activity-item__image"
              image={item.get('image', Map()).toJS()}
              maxHeight={160}
            />
          )}
        </Link>
      </div>
    </div>
  );
}

ActivityItemContainer.propTypes = {
  item: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(
  (state, { item }) => {
    const user = state
      .entities
      .getIn(['tlog', String(item.get('sender'))], emptyUser);

    return {
      user,
    };
  }
)(ActivityItemContainer);
