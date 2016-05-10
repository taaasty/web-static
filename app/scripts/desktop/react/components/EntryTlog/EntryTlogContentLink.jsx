import React, { PropTypes } from 'react';
import uri from 'urijs';
import { Link } from 'react-router';

function EntryTlogContentLink({ children, entry: { id, url }, show }) {

  return show
    ? <Link to={{ pathname: uri(url).path(), state: { id } }}>
        {children}
      </Link>
    : children;
}

EntryTlogContentLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  entry: PropTypes.object.isRequired,
  show: PropTypes.bool,
};

export default EntryTlogContentLink;
