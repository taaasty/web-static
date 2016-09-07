import React, { Component, PropTypes } from 'react';
import { msgDate } from '../../helpers/dateHelpers';
import ActivityItemWrapper from './ActivityItemWrapper';
import { getEntityLocation } from '../Notifications/NotificationListItem';
import Image from '../../../../shared/react/components/common/Image';
import MetabarAuthor from '../common/MetabarAuthor';
import { Link } from 'react-router';
import { Map } from 'immutable';
import {
  NOTIFICATION_FRIEND,
} from '../../actions/NotificationsActions';
import Spinner from '../../../../shared/react/components/common/Spinner';

const REQUIRED_FIELDS = [
  'titleTruncated',
];

class ActivityItemEntry extends Component {
  componentWillMount() {
    const {
      getTlogEntry,
      item,
    } = this.props;

    getTlogEntry(item.get('entityId'), false, REQUIRED_FIELDS);
  }
  renderActionText() {
    const {
      entry,
      item,
    } = this.props;

    return (
      <span>
        {item.get('actionText')}
        {' '}
        <Link to={getEntityLocation(item)}>
          {'\u00ab'}
          <span dangerouslySetInnerHTML={{ __html: entry.get('titleTruncated', '...') }} />
          {'\u00bb'}
        </Link>
      </span>
    );
  }
  render() {
    const {
      entry,
      entryAuthor,
      isFetchingEntry,
      item,
      user,
    } = this.props;
    const entityLocation = getEntityLocation(item);

    return (
      <ActivityItemWrapper
        date={msgDate(item.get('createdAt'))}
        text={this.renderActionText()}
        user={user}
      >
        {isFetchingEntry && (
          <div className="activity-item__fetching-overlay">
            <div className="activity-item__spinner">
              <Spinner size={24} />
            </div>
          </div>
        )}
        <div className="activity-item__body">
          <Link to={entityLocation}>
            <div 
              className="activity-item__text"
              dangerouslySetInnerHTML={{ __html: entry.get('textTruncated') }}
            />
            {item.get('image') != null && (
              <Image
                className="activity-item__image"
                image={item.get('image', Map()).toJS()}
                maxHeight={160}
              />
            )}
          </Link>
          {(!entryAuthor.isEmpty() && item.get('type') === NOTIFICATION_FRIEND) && (
            <div className="activity-item__entry-author">
              <MetabarAuthor
                author={entryAuthor}
                size={20}
                tlog={entryAuthor}
              />
            </div>
          )}
        </div>
      </ActivityItemWrapper>
    );
  }
}

ActivityItemEntry.propTypes = {
  entry: PropTypes.object.isRequired,
  entryAuthor: PropTypes.object.isRequired,
  getTlogEntry: PropTypes.func.isRequired,
  isFetchingEntry: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default ActivityItemEntry;
