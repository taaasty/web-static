import React, { PropTypes } from 'react';
import uri from 'urijs';
import { Link } from 'react-router';

function EntryTlogContentLink(props) {
  const {
    children,
    entry,
    show,
  } = props;
  const id = entry.get('id');
  const url = entry.get('url', entry.get('entryUrl'));

  return show
    ? (
      <Link to={{ pathname: uri(url).path(), state: { id } }}>
        {children}
      </Link>
    )
    : children;
}

EntryTlogContentLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  entry: PropTypes.object.isRequired,
  show: PropTypes.bool,
};

export default EntryTlogContentLink;
