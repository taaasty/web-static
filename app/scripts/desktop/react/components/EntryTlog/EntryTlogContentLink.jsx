import React, { PropTypes } from 'react';
import uri from 'urijs';
import { Link } from 'react-router';

function EntryTlogContentLink({ children, entry: { id, url },  isFeed, show }) {

  return show
    ? window.SPA //FIXME
      ? <Link to={{ pathname: uri(url).path(), state: { id, isFeed } }}>
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
