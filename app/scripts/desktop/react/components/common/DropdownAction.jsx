import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class DropdownAction extends Component {
  state = {
    hover: false,
  }
  getTitle() {
    const { title, hoverTitle } = this.props;
    return this.state.hover && hoverTitle ? hoverTitle : title;
  }
  render() {
    const iconClasses = classnames('icon', this.props.icon);

    return (
      <a
        className="meta-item__dropdown-item"
        href={this.props.url}
        onClick={this.props.onClick}
        onMouseEnter={() => this.setState({hover: true})}
         onMouseLeave={() => this.setState({hover: false})}
      >
        <i className={iconClasses} />
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
