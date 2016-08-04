import React, { PropTypes } from 'react';
import Avatar from '../../../../../../shared/react/components/common/AvatarCamelCase';
import ItemEntryPreviewImage from './ItemEntryPreviewImage';
import { CONVERSATION_PIC_SIZE } from './Item';
import { Map } from 'immutable';

function ItemEntryPic({ entry, size, title }) {
  const defaultColors = entry.getIn(
    ['author', 'userpic', 'defaultColors'],
    Map()
  );
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
  size: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

ItemEntryPic.defaultProps = {
  size: CONVERSATION_PIC_SIZE,
};

export default ItemEntryPic;
