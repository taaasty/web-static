import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class EntryTlogCommentMetabarAction extends Component {
  state = {
    hover: false,
  };
  getTitle() {
    const { title, hoverTitle } = this.props;
    return this.state.hover && hoverTitle ? hoverTitle : title;
  }
  render() {
    const { icon, onClick } = this.props;
    const iconClasses = classNames('icon', icon);

    return (
      <a
        className="comment__dropdown-item"
        onClick={onClick}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <i className={iconClasses} />
        {this.getTitle()}
      </a>
    );
  }
}

EntryTlogCommentMetabarAction.propTypes = {
  hoverTitle: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default EntryTlogCommentMetabarAction;
