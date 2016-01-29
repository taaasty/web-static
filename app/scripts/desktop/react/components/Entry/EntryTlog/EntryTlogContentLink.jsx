import React, { PropTypes } from 'react';
import uri from 'urijs';
import { Link } from 'react-router';

function EntryTlogContentLink({ children, id, show, url }) {
  return show
    ? window.SPA //FIXME
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
  show: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
};

export default EntryTlogContentLink;
