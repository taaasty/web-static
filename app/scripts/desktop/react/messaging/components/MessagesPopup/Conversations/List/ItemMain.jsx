/*global i18n */
import React, { Component, PropTypes } from 'react';
import ErrorService from '../../../../../../../shared/react/services/Error';
import classNames from 'classnames';
import moment from 'moment';

export function getLastTyping(typing, users) {
  const [ lastTyping ] = Object.keys(typing)
          .map((userId) => ({ userId, ...typing[userId] }))
          .sort((a, b) => (b.eventAt - a.eventAt))
          .map(({ userId }) => {
            const [ user ] = users.filter((u) => u.id === parseInt(userId, 10));

            return user;
          });

  return lastTyping;
};

export function getLastMsgTxt(lastMsg={}) {
  return lastMsg.content_html
    ? lastMsg.content_html
    : lastMsg.attachments && lastMsg.attachments.length
      ? i18n.t('messenger.image')
      : (ErrorService.notifyError(
        'last_message в списке чатов. Пустое поле content_html и пустой attathments',
        {
          id: lastMsg.id,
          conversationId: lastMsg.conversation_id,
        }), i18n.t('messenger.image'));
};

class ItemMain extends Component {
  renderLastMsgStatus() {
    // TODO: detect our msg
    if (lastMsg.author && lastMsg.author.id !== )
  }
  render() {
    const { children, hasUnread, isMuted, lastMessageAt,
            onClick, unreadCount } = this.props;

    const listItemClasses = classNames({
      'messages__dialog': true,
      'state--read': !hasUnread,
      'muted': isMuted,
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
        {!!hasUnread && <div className="unread-messages__counter">{unreadCount}</div>}
        {children}
        {isMuted &&
         <span className="messages__muted">
           <i className="icon icon--mute-on" />
         </span>
        }
        <span className="messages__date">
          {this.renderLastMsgStatus()}
          {lastMessageAtStr}
        </span>
      </div>
    );
  }
}

ItemMain.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  hasUnread: PropTypes.bool,
  hasUnreceived: PropTypes.bool,
  isMuted: PropTypes.bool,
  lastMessageAt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  unreadCount: PropTypes.number,
};

export default ItemMain;
