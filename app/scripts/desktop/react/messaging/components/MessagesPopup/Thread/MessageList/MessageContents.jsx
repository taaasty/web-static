/*global i18n */
import React, { PropTypes } from 'react';
import moment from 'moment';
import Image from '../../../../../../../shared/react/components/common/Image';
import ImgFromFile from '../ImgFromFile';
import { browserHistory } from 'react-router';
import uri from 'urijs';
import Tooltip from '../../../../../components/common/Tooltip';
import UserSlug from '../../../../../components/UserSlug';

function MessageContents(props) {
  const { maxWidth, message, messageInfo, showSlug, showSupportInfo } = props;
  function handleClickUser(ev) {
    ev.preventDefault();
    browserHistory.push({ pathname: uri(messageInfo.user.tlog_url).path() });
  }

  function renderAttachments() {
    const { attachments, files } = message;

    if (attachments && attachments.length) {
      return attachments.map((img) => (
        <div className="messages__img">
          <a href={img.url} target="_blank">
            <Image
              image={img}
              isRawUrl
              maxWidth={maxWidth}
            />
          </a>
        </div>));
    } else if (files && files.length) {
      return files.map((file) => (
        <div className="messages__img">
          <ImgFromFile file={file} />
        </div>));
    } else {
      return null;
    }
  }

  function renderSupportIcon() {
    const { user } = messageInfo;
    const { browser, platform } = message;
    const { gender, locale, id, email, is_privacy, is_premium,
            has_design_bundle, created_at } = user;

    const support_info = i18n.t('messenger.support_info', {
      browser,
      platform,
      locale,
      id,
      email,
      gender: i18n.t('gender', { context: gender }),
      private: i18n.t(is_privacy ? 'yes' : 'no'),
      premium: i18n.t(is_premium ? 'yes' : 'no'),
      design_bundle: i18n.t(has_design_bundle ? 'yes' : 'no'),
      registered_at: moment(created_at).format('LL'),
    });

    return (
      <Tooltip
        container=".messages"
        html
        placement="top"
        title={support_info}
      >
        <i className="icon icon--exclamation-mark message-support-info" />
      </Tooltip>
    );
  }

  function renderUserSlug() {
    const { tlog_url } = messageInfo.user;

    return (
      <span className="messages__user-name">
        <a href={tlog_url} onClick={handleClickUser}>
          <UserSlug showAsStar user={messageInfo.user} />
          {showSupportInfo && renderSupportIcon()}
        </a>
      </span>
    );
  }

  return (
    <div>
      {showSlug && renderUserSlug()}
      <span
        className="messages__text"
        dangerouslySetInnerHTML={{ __html: message.content_html || '' }}
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
  messageInfo: PropTypes.object.isRequired,
  showSlug: PropTypes.bool.isRequired,
  showSupportInfo: PropTypes.bool.isRequired,
};

MessageContents.defaultProps = {
  maxWidth: 220,
  showSlug: false,
  showSupportInfo: false,
};

export default MessageContents;
