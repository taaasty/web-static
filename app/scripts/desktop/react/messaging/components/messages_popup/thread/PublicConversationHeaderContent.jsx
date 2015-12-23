import React, { PropTypes } from 'react';
import Image from '../../../../../../shared/react/components/common/Image';

class PublicConversationHeaderContent {
  render() {
    const { preview_image, title } = this.props.entry;

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
          {title}
        </div>
      </div>
    );

  }
}

PublicConversationHeaderContent.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default PublicConversationHeaderContent;
