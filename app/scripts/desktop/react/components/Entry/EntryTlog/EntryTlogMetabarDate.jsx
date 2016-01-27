import React, { PropTypes } from 'react';
import moment from 'moment';

function EntryTlogMetabarDate({ date, url }) {
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
        <a href={url}>
          <span className="meta-item__common">
            {formatDate}
          </span>
        </a>
      </span>
    </span>
  );
}

EntryTlogMetabarDate.propTypes = {
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default EntryTlogMetabarDate;
