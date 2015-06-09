import { PropTypes } from 'react';
import classnames from 'classnames';

export default class DropdownItem {
  static propTypes = {
    item: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func
  }
  render() {
    let itemClasses = classnames('person__dropdown-item', {
      'state--active': this.props.active
    });

    return (
      <a className={itemClasses} onClick={this.handleClick.bind(this)}>
        {this.props.title}
      </a>
    );
  }
  handleClick(e) {
    e.preventDefault();
    this.props.onClick(this.props.item)
  }
}