import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
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
    const iconClasses = classnames('icon', this.props.icon);

    return (
      <Link
        className="meta-item__dropdown-item"
        onClick={this.props.onClick}
        onMouseEnter={() => this.setState({hover: true})}
        onMouseLeave={() => this.setState({hover: false})}
        to={uri(this.props.url).path()}
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
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default DropdownAction;
