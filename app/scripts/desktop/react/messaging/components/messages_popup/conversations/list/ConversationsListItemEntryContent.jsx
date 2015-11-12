import React, { PropTypes } from 'react';

class ConversationsListItemEntryContent {
  render() {
    const { preview_image, text, url } = this.props.entry;

    return (
      <div>
        {preview_image &&
          <div className="messages__dialog-media">
            <Image
              image={preview_image}
              maxHeight={58}
              maxWidth={58}
            />
          </div>
        }
        <div className="messages__dialog-text">
          {text}
        </div>
      </div>
    );

  }
}

ConversationsListItemEntryContent.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default ConversationsListItemEntryContent;
