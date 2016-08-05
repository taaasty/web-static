import React, { PropTypes } from 'react';
import Avatar from '../../../../../../shared/react/components/common/AvatarCamelCase';
import ItemEntryPreviewImage from './ItemEntryPreviewImage';
import { CONVERSATION_PIC_SIZE } from './Item';
import { Map } from 'immutable';

function ItemEntryPic({ entry, entryAuthor, size, title }) {
  const defaultColors = entryAuthor.getIn(['userpic', 'defaultColors'], Map());
  const previewImage = entry.get('previewImage', Map());
  const userpic = {
    defaultColors: defaultColors.toJS(),
    symbol: title[0],
  };

  return !previewImage.isEmpty()
    ? <ItemEntryPreviewImage image={previewImage} size={size} />
    : <Avatar size={size} userpic={userpic} />;
}

ItemEntryPic.propTypes = {
  entry: PropTypes.object.isRequired,
  entryAuthor: PropTypes.object.isRequired,
  size: PropTypes.number,
  title: PropTypes.string.isRequired,
};

ItemEntryPic.defaultProps = {
  size: CONVERSATION_PIC_SIZE,
};

export default ItemEntryPic;
