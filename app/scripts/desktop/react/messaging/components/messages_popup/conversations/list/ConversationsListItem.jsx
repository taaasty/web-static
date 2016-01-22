/*global i18n */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';

class ConversationsListItem extends Component {
  renderIndicator() {
    const { hasUnread, hasUnreceived, unreadCount } = this.props;

    if (hasUnread) {
      return <div className="unread-messages__counter">{unreadCount}</div>;
    } else if (hasUnreceived) {
      return <div className="unreceived-messages__counter" />;
    }
  }
  render() {
    const { children, hasUnread, lastMessageAt, onClick } = this.props;

    const listItemClasses = classNames({
      'messages__dialog': true,
      'state--read': !hasUnread,
    });
    const lf = moment.localeData().longDateFormat('L');
    const shortYearLf = lf.replace(/YYYY/g, 'YY');
    const lastMessageAtStr = moment(lastMessageAt).calendar(null, {
      sameDay: 'LT',
      lastDay: `[${i18n.t('messages_date_yesterday')}]`,
      lastWeek: shortYearLf,
      sameElse: shortYearLf,
    });

    return (
      <div className={listItemClasses} onClick={onClick}>
        {this.renderIndicator()}
        {children}
        <span className="messages__date">
          {lastMessageAtStr}
        </span>
      </div>
    );
  }
}

ConversationsListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  hasUnread: PropTypes.bool,
  hasUnreceived: PropTypes.bool,
  lastMessageAt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  unreadCount: PropTypes.number,
};

export default ConversationsListItem;
