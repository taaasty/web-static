import React, { PropTypes } from 'react';

export default class EntryTlogMetabarDate {
  static propTypes = {
    url: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }
  render() {
    let now = moment(),
        createdAt = moment(this.props.date);

    let date;
    if (now.diff(createdAt, 'days') < 1) {
      date = createdAt.calendar();
    } else {
      date = createdAt.format(now.year() !== createdAt.year() ? 'D MMMM YYYY' : 'D MMMM');
    }

    return (
      <span className="meta-item meta-item--date">
        <span className="meta-item__content">
          <a href={this.props.url}>
            <span className="meta-item__common">{date}</span>
          </a>
        </span>
      </span>
    );
  }
}