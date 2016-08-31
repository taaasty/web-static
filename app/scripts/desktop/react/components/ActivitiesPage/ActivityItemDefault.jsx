import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Image from '../../../../shared/react/components/common/Image';
import { msgDate } from '../../helpers/dateHelpers';
import { getEntityLocation } from '../Notifications/NotificationListItem';
import ActivityItemWrapper from './ActivityItemWrapper';
import { Map } from 'immutable';

function ActivityItemDefault(props) {
  const {
    item,
    user,
  } = props;
  const entityLocation = getEntityLocation(item);

  return (
    <ActivityItemWrapper
      date={msgDate(item.get('createdAt'))}
      text={item.get('actionText')}
      user={user}
    >
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
    </ActivityItemWrapper>
  );
}

ActivityItemDefault.propTypes = {
  item: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default ActivityItemDefault;
