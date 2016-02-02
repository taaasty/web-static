import React, { PropTypes, Component, cloneElement } from 'react';
import classnames from 'classnames';

export default class DropdownButton extends Component {
  static propTypes = {
    activeItem: PropTypes.string,
    iconClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };
  state = {
    activeItem: this.props.activeItem || '',
    open: false,
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.activeItem !== nextProps.activeItem) {
      this.setState({activeItem: nextProps.activeItem});
    }
  }
  render() {
    return (
      <div className="person__dropdown-container"
           onMouseEnter={this.handleMouseEnter.bind(this)}
           onMouseLeave={this.handleMouseLeave.bind(this)}>
        <button className={classnames('button', this.props.buttonClassName)}>
          <i className={classnames('icon', this.props.iconClassName)} />
        </button>
        {this.renderMenu()}
      </div>
    );
  }
  renderMenu() {
    let menuClasses = classnames('person__dropdown', {
      'state--open': this.state.open
    });

    return (
      <div className={menuClasses}>
        {React.Children.map(this.props.children, this.renderMenuItem.bind(this))}
      </div>
    );
  }
  renderMenuItem(child, idx) {
    return cloneElement(child, {
      active: this.props.activeItem === child.props.item,
      onClick: this.handleItemClick.bind(this)
    });
  }
  handleMouseEnter() {
    this.setState({open: true});
  }
  handleMouseLeave() {
    this.setState({open: false});
  }
  handleItemClick(item) {
    if (this.state.activeItem !== item) {
      this.setState({activeItem: item});
      this.props.onChange(item);
    }
  }
}
