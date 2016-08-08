/*global i18n */
import React, { PropTypes } from 'react';
import ItemEntryPreviewImage from '../Conversations/List/ItemEntryPreviewImage';

function GroupHeaderForm(props) {
  const {
    avatar,
    disabled,
    topic,
    updateGroupSettings,
  } = props;

  function handleAvatarChange(ev) {
    const reader = new window.FileReader();
    const file = ev.target.files[0];

    if (!file || !(file instanceof File)) {
      return;
    }

    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        updateGroupSettings({
          avatar: {
            file,
            isFile: true,
            url: ev.target.result,
            geometry: {
              width: img.width,
              height: img.height,
            },
          },
        });
      };
      img.src = ev.target.result;
    };

    reader.readAsDataURL(file);
  }

  function handleTopicChange(ev) {
    updateGroupSettings({ topic: ev.target.value || '' });
  }

  return (
    <div className="messages__dialog messages__dialog--discussion">
      <div className="messages__user-avatar">
        {avatar && avatar.get('url')
         ? <ItemEntryPreviewImage image={avatar} isRawUrl={avatar.get('isFile')} />
         : <i className="icon icon--instagram-circle --group-default" />
        }
        <input
          accept="image/png,image/jpeg,image/gif"
          className="messages__group-avatar-input"
          disabled={disabled}
          onChange={handleAvatarChange}
          size="10"
          type="file"
        />
      </div>
      <div className="messages__dialog-text --group-header">
        <div className="messages__entry-data-container">
          <div className="messages__topic-name">
            <input
              disabled={disabled}
              onChange={handleTopicChange}
              placeholder={i18n.t('messenger.group.topic_placeholder')}
              type="text"
              value={topic}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

GroupHeaderForm.propTypes = {
  avatar: PropTypes.object,
  disabled: PropTypes.bool.isRequired,
  topic: PropTypes.string,
  updateGroupSettings: PropTypes.func.isRequired,
};

export default GroupHeaderForm;
