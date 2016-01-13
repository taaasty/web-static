import React, { PropTypes } from 'react';

export default class EntryRepostTargetSearch {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };
  render() {
    return (
      <input
        type="text"
        defaultValue={this.props.value}
        placeholder="Поиск.."
        className="user__search"
        onChange={this.handleChange.bind(this)}
      />
    );
  }
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
}
