/*global i18n */
import React, { PropTypes } from 'react';
import moment from 'moment';
import Image from '../../../../../../shared/react/components/common/Image';
import ImgFromFile from '../ImgFromFile';
import uri from 'urijs';
import { Link } from 'react-router';
import Tooltip from '../../../../components/common/Tooltip';
import UserSlug from '../../../../components/UserSlug';
import { List } from 'immutable';

function MessageContents(props) {
  const {
    maxWidth,
    message,
    messageAuthor,
    showSlug,
    showSupportInfo,
  } = props;

  function renderAttachments() {
    const attachments = message.get('attachments', List());
    const files = message.get('files', List());

    if (attachments.count() > 0) {
      return attachments.map((img, idx) => (
        <div className="messages__img" key={`msg-attach-${idx}`}>
          <a href={img.get('url')} target="_blank">
            <Image
              image={img.toJS()}
              isRawUrl
              maxWidth={maxWidth}
            />
          </a>
        </div>)).valueSeq();
    } else if (files.count() > 0) {
      return files.map((file, idx) => (
        <div className="messages__img" key={`msg-file-${idx}`}>
          <ImgFromFile file={file} />
        </div>)).valueSeq();
    } else {
      return null;
    }
  }

  function renderSupportIcon() {
    const supportInfo = i18n.t('messenger.support_info', {
      browser: message.get('browser'),
      platform: message.get('platform'),
      locale: messageAuthor.get('locale'),
      id: messageAuthor.get('id'),
      email: messageAuthor.get('email'),
      gender: i18n.t('gender', { context: messageAuthor.get('gender') }),
      private: i18n.t(messageAuthor.get('isPrivacy') ? 'yes' : 'no'),
      premium: i18n.t(messageAuthor.get('isPremium') ? 'yes' : 'no'),
      design_bundle: i18n.t(messageAuthor.get('hasDesignBundle') ? 'yes' : 'no'),
      registered_at: moment(messageAuthor.get('createdAt')).format('LL'),
    });

    return (
      <Tooltip
        container=".messages"
        html
        placement="top"
        title={supportInfo}
      >
        <i className="icon icon--exclamation-mark message-support-info" />
      </Tooltip>
    );
  }

  function renderUserSlug() {
    return (
      <span className="messages__user-name">
        <Link to={uri(messageAuthor.get('tlogUrl', '')).path()}>
          <UserSlug showAsStar user={messageAuthor} />
          {showSupportInfo && renderSupportIcon()}
        </Link>
      </span>
    );
  }

  return (
    <div>
      {showSlug && renderUserSlug()}
      <span
        className="messages__text"
        dangerouslySetInnerHTML={{ __html: message.get('contentHtml', '') }}
      />
      <div className="messages__img-container">
        {renderAttachments()}
      </div>
    </div>
  );
}

MessageContents.displayName = 'MessageContents';

MessageContents.propTypes = {
  maxWidth: PropTypes.number.isRequired,
  message: PropTypes.object.isRequired,
  messageAuthor: PropTypes.object.isRequired,
  showSlug: PropTypes.bool.isRequired,
  showSupportInfo: PropTypes.bool.isRequired,
};

MessageContents.defaultProps = {
  maxWidth: 220,
  showSlug: false,
  showSupportInfo: false,
};

export default MessageContents;
