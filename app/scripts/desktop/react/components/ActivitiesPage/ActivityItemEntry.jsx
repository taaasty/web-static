import React, { PropTypes } from 'react';
import { msgDate } from '../../helpers/dateHelpers';
import ActivityItemWrapper from './ActivityItemWrapper';
import { getEntityLocation } from '../Notifications/NotificationListItem';
import Image from '../../../../shared/react/components/common/Image';
import MetabarAuthor from '../common/MetabarAuthor';
import uri from 'urijs';
import { Link } from 'react-router';
import { Map } from 'immutable';

function ActivityItemEntry(props) {
  const {
    entry,
    entryAuthor,
    item,
    user,
  } = props;
  const entityLocation = getEntityLocation(item);
  const actionText = (
    <span>
      {item.get('actionText')}
      {' '}
      <Link to={entityLocation}>
        {'\u00ab'}
        {entry.get('titleTruncated')}
        {'\u00bb'}
      </Link>
    </span>
  );

  return (
    <ActivityItemWrapper
      date={msgDate(item.get('createdAt'))}
      text={actionText}
      user={user}
    >
      <div className="activity-item__body">
        <Link to={entityLocation}>
          <div className="activity-item__text">
            {entry.get('textTruncated')}
          </div>
          {item.get('image') != null && (
            <Image
              className="activity-item__image"
              image={item.get('image', Map()).toJS()}
              maxHeight={160}
            />
          )}
        </Link>
        <div className="activity-item__entry-author">
          <MetabarAuthor
            author={entryAuthor}
            size={20}
            tlog={entryAuthor}
          />
        </div>
      </div>
    </ActivityItemWrapper>
  );
}

ActivityItemEntry.propTypes = {
  entry: PropTypes.object.isRequired,
  entryAuthor: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default ActivityItemEntry;
