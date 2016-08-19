import React, { PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryTlogMetabarDate(props) {
  const {
    entry,
  } = props;
  const id = entry.get('id');
  const date = entry.get('createdAt');
  const url = entry.get('url', entry.get('entryUrl'));

  function renderLink(text) {
    return (
      <Link to={{ pathname: uri(url).path(), state: { id } }}>
        <span className="meta-item__common">
          {text}
        </span>
      </Link>
    );
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
