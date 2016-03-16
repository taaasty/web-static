import React, { PropTypes } from 'react';
import UserAvatar from '../UserAvatar';
import { Link } from 'react-router';
import uri from 'urijs';

function PeopleItem({ title, user }) {
  return (
    <article className="people-item">
      <div className="people-item__inner">
        <Link className="people-item__link" to={uri(user.tlog_url).path()}>
          <div className="people-item__avatar">
            <UserAvatar size={110} user={user} />
          </div>
          <h3 className="people-item__name">
            {user.slug}
          </h3>
          <p
            className="people-item__desc"
            dangerouslySetInnerHTML={{ __html: title || user.title || '' }}
          />
        </Link>
      </div>
    </article>
  );
}

PeopleItem.displayName = 'PeopleItem';

PeopleItem.propTypes = {
  title: PropTypes.string,
  user: PropTypes.object.isRequired,
};

export default PeopleItem;
