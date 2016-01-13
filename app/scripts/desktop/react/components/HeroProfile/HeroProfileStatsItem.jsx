/*global $ */
import React, { PropTypes } from 'react';
import classnames from 'classnames';

function HeroProfileStatsItem({ count, href, onClick, title }) {
  function handleClick(ev) {
    if (onClick) {
      ev.preventDefault();
      onClick($(ev.currentTarget));
    }
  }

  function renderLink() {
    return (
      <a
        className="hero__stats-link"
        href={href}
        title={`${count} ${title}`}
      >
        <strong>
          {count}
        </strong>
        {title}
      </a>
    );
  }

  function renderButton() {
    return (
      <span>
        <strong>
          {count}
        </strong>
        {title}
      </span>
    );
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
      {href ? renderLink() : renderButton()}
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
