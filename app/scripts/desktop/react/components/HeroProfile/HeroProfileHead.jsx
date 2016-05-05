import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import UserSlug from '../UserSlug';
import uri from 'urijs';

function HeroProfileHead({ user }) {
  const { title, tlogUrl } = user;

  return (
    <div className="hero__head">
      <div className="hero__mask" />
      <div className="hero__title">
        <span>
          <Link to={uri(tlogUrl).path()}>
            <UserSlug user={user} />
          </Link>
        </span>
      </div>
      <div className="hero__text">
        <span dangerouslySetInnerHTML={{ __html: title || '' }} />
      </div>
    </div>
  );
}

HeroProfileHead.propTypes = {
  user: PropTypes.object.isRequired,
};

export default HeroProfileHead;
