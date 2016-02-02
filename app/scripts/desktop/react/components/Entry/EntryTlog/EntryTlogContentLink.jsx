import React, { PropTypes } from 'react';

function EntryTlogContentLink({ children, show, url }) {
  return show
    ? <a href={url}>{children}</a>
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
