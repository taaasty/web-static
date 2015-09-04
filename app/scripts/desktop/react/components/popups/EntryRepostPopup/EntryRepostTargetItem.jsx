import React, { PropTypes } from 'react';
import Avatar from '../../../../../shared/react/components/common/Avatar';

export default class EntryRepostTargetItem {
  static propTypes = {
    target: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
  }
  render() {
    return (
      <article className="user__item">
        <a
          href={this.props.target.tlog_url}
          title={this.props.target.name}
          className="user__link"
          onClick={this.handleClick.bind(this)}
        >
        <span className="user__avatar">
          <Avatar
            userpic={this.props.target.flowpic || this.props.target.userpic}
            size={40}
          />
        </span>
        <span className="user__desc">
          <span className="user__name">{this.props.target.name}</span>
        </span>
      </a>
    </article>
    );
  }
  handleClick(e) {
    e.preventDefault();
    this.props.onSelect();
  }
}