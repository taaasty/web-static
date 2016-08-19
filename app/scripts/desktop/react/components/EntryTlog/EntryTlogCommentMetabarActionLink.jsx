import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import uri from 'urijs';

class EntryTlogCommentMetabarActionLink extends Component {
  state = {
    hover: false,
  };
  getTitle() {
    const { title, hoverTitle } = this.props;
    return this.state.hover && hoverTitle ? hoverTitle : title;
  }
  render() {
    const { entryId, icon, url } = this.props;
    const iconClasses = classNames('icon', icon);

    return (
      <Link
        className="comment__dropdown-item"
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        to={{ pathname: uri(url).path(), hash: uri(url).hash(), state: { id: entryId } }}
      >
        <i className={iconClasses} />
        {this.getTitle()}
      </Link>
    );
  }
}

EntryTlogCommentMetabarActionLink.propTypes = {
  entryId: PropTypes.number.isRequired,
  hoverTitle: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default EntryTlogCommentMetabarActionLink;
