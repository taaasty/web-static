import React, { PropTypes } from 'react';

export default class EntryTlogCommentMetabarDate {
  static propTypes = {
    url: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  };
  render() {
    let now = moment(),
        createdAt = moment(this.props.date);

    let date;
    if (now.diff(createdAt, 'seconds') < 5) {
      date = createdAt.subtract(5, 's').fromNow();
    } else if (now.diff(createdAt, 'minutes') < 180) {
      date = createdAt.fromNow()
    } else if (now.diff(createdAt, 'days') < 1) {
      date = createdAt.calendar()
    } else {
      date = createdAt.format(now.year() !== createdAt.year() ? 'D MMMM YYYY' : 'D MMMM');
    }

    return (
      <a className="comment__date-link" href={this.props.url}>
        <span className="comment__date">{date}</span>
      </a>
    );
  }
}
