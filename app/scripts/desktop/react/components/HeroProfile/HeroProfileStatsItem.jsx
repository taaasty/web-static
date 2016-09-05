/*global $ */
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import uri from 'urijs';

function HeroProfileStatsItem({ count, href, onClick, title }) {
  function handleClick(ev) {
    if (onClick) {
      ev.preventDefault();
      onClick($(ev.currentTarget));
    }
  }

  const statsItemClasses = classnames({
    'hero__stats-item': true,
    'hero__stats-item-handler': onClick,
  });

  return (
    <div
      className={statsItemClasses}
      onClick={handleClick}
    >
      {href
        ? (
          <Link
            className="hero__stats-link"
            title={`${count} ${title}`}
            to={uri(href).path()}
          >
            <strong>
              {count}
            </strong>
            {title}
          </Link>
        )
        : (
          <span>
            <strong>
              {count}
            </strong>
            {title}
          </span>
        )
      }
    </div>
  );
}

HeroProfileStatsItem.propTypes = {
  count: PropTypes.number.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default HeroProfileStatsItem;
