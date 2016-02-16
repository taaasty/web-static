import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import uri from 'urijs';

class DropdownAction extends Component {
  state = {
    hover: false,
  };
  getTitle() {
    const { title, hoverTitle } = this.props;
    return this.state.hover && hoverTitle ? hoverTitle : title;
  }
  render() {
    const { icon, onClick, state, url } = this.props;
    const iconClasses = classNames('icon', icon);

    return (
      <Link
        className="meta-item__dropdown-item"
        onClick={onClick}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        to={{pathname: uri(url).path(), state }}
      >
        <i className={iconClasses} />
        {this.getTitle()}
      </Link>
    );
  }
}

DropdownAction.propTypes = {
  hoverTitle: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.string, PropTypes.array,
  ]).isRequired,
  onClick: PropTypes.func,
  state: PropTypes.object,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default DropdownAction;
