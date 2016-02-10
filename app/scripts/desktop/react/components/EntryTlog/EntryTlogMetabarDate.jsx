import React, { PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryTlogMetabarDate({ entry: { created_at: date, id, url } }) {
  function renderLink(text) {
    return window.SPA
      ? <Link to={{ pathname: uri(url).path(), state: { id } }}>
          <span className="meta-item__common">
            {text}
          </span>
        </Link>
      : <a href={url}>
          <span className="meta-item__common">
            {text}
          </span>
        </a>
  }

  const now = moment();
  const createdAt = moment(date);
  let formatDate;

  if (now.diff(createdAt, 'days') < 1) {
    formatDate = createdAt.calendar();
  } else {
    formatDate = createdAt.format(now.year() !== createdAt.year() ? 'D MMMM YYYY' : 'D MMMM');
  }

  return (
    <span className="meta-item meta-item--date">
      <span className="meta-item__content">
        {renderLink(formatDate)}
      </span>
    </span>
  );
}

EntryTlogMetabarDate.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default EntryTlogMetabarDate;
