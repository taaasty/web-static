import React, { PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryTlogCommentMetabarDate({ date, entryId, url }) {
  const now = moment();
  const createdAt = moment(date);

  let formatDate;
  if (now.diff(createdAt, 'seconds') < 5) {
    formatDate = createdAt.subtract(5, 's').fromNow();
  } else if (now.diff(createdAt, 'minutes') < 180) {
    formatDate = createdAt.fromNow();
  } else if (now.diff(createdAt, 'days') < 1) {
    formatDate = createdAt.calendar();
  } else {
    formatDate = createdAt.format(now.year() !== createdAt.year() ? 'D MMMM YYYY' : 'D MMMM');
  }

  return (
    <Link className="comment__date-link" to={{ pathname: uri(url).path(), state: { id: entryId } }}>
      <span className="comment__date">
        {formatDate}
      </span>
    </Link>
  );
}

EntryTlogCommentMetabarDate.propTypes = {
  date: PropTypes.string.isRequired,
  entryId: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

export default EntryTlogCommentMetabarDate;
