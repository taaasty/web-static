import React, { PropTypes } from 'react';
import { msgDate } from '../../helpers/dateHelpers';
import ActivityItemWrapper from './ActivityItemWrapper';
import { Link } from 'react-router';
import uri from 'urijs';
import PeopleItem from '../PeoplePage/PeopleItem';

function ActivityItemRel(props) {
  const {
    item,
    relUser,
    user,
  } = props;
  const relUserUrl = uri(relUser.get('tlogUrl', '')).path();
  const actionText = (
    <span>
      {item.get('actionText')}
      {' '}
      <Link to={relUserUrl}>
        {relUser.get('tag')}
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
        <PeopleItem isSmall user={relUser} />
      </div>
    </ActivityItemWrapper>
  );
}

ActivityItemRel.propTypes = {
  item: PropTypes.object.isRequired,
  relUser: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default ActivityItemRel;
