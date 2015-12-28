import React, { PropTypes } from 'react';

class EntryTlogContentLink {
  render() {
    const { children, show, url } = this.props;

    return show
      ? <a href={url}>{children}</a>
      : children;
  }
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
