import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class DropdownAction extends Component {
  state = {
    hover: false,
  };
  getTitle() {
    const { title, hoverTitle } = this.props;
    return this.state.hover && hoverTitle ? hoverTitle : title;
  }
  render() {
    const { icon, onClick, url } = this.props;
    const iconClasses = classnames('icon', icon);

    return (
      <a
        className="meta-item__dropdown-item"
        href={url}
        onClick={onClick}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        {!!icon && <i className={iconClasses} />}
        {this.getTitle()}
      </a>
    );
  }
}

DropdownAction.propTypes = {
  hoverTitle: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.string, PropTypes.array,
  ]).isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default DropdownAction;
