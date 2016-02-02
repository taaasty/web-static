import React, { PropTypes } from 'react';
import uri from 'urijs';
import { Link } from 'react-router';

function EntryTlogContentLink({ children, entry: { id, tlog, url },  show }) {
  return show
    ? window.SPA && !tlog.is_flow //FIXME
      ? <Link to={{ pathname: uri(url).path(), state: { id } }}>
          {children}
        </Link>
      : <a href={url}>{children}</a>
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
