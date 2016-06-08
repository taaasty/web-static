import React, { PropTypes } from 'react';
import UserAvatar from '../UserAvatar';
import UserSlug from '../UserSlug';
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
          <div className="people-item__name">
            <UserSlug user={user} />
          </div>
          <div className="people-item__footer">
            <div
              className="people-item__desc"
              dangerouslySetInnerHTML={{ __html: title || user.title || '' }}
            />
            <div className="">
              {user.}
              <div className="people-item__followers"
                {i18n.t()}
              </div>
            </div>
          </div>
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
