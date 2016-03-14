/*global i18n */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import EditorTypeSwitcherItem from './TypeSwitcherItem';

const AVAILABLE_TYPES = ['text', 'image', 'instagram', 'music', 'video', 'quote'];
const ENTRY_TYPES = {
  text: {
    title: () => i18n.t('editor_text_type'),
    icon: 'icon--text-circle',
  },
  anonymous: {
    title: () => i18n.t('editor_anonymous_type'),
    icon: 'icon--text-circle',
  },
  image: {
    title: () => i18n.t('editor_image_type'),
    icon: 'icon--image-circle',
  },
  instagram: {
    title: () => i18n.t('editor_instagram_type'),
    icon: 'icon--instagram-circle',
  },
  music: {
    title: () => i18n.t('editor_music_type'),
    icon: 'icon--music-circle',
  },
  video: {
    title: () => i18n.t('editor_video_type'),
    icon: 'icon--video-circle',
  },
  quote: {
    title: () => i18n.t('editor_quote_type'),
    icon: 'icon--quote-circle',
  },
};

function EditorTypeSwitcher({ canChangeType, entryType, loading }) {
  const switcherClasses = classNames('nav-types', {
    'state--loading': loading,
  });

  return (
    <nav className={switcherClasses}>
      {canChangeType
       ? AVAILABLE_TYPES.map((type) =>
         <EditorTypeSwitcherItem
           active={entryType === type}
           icon={ENTRY_TYPES[type].icon}
           key={type}
           title={ENTRY_TYPES[type].title()}
           type={type}
         />)
       : <EditorTypeSwitcherItem
           active
           icon={ENTRY_TYPES[entryType].icon}
           title={ENTRY_TYPES[entryType].title()}
         />
      }
    </nav>
  );
}

EditorTypeSwitcher.propTypes = {
  canChangeType: PropTypes.bool.isRequired,
  entryType: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default EditorTypeSwitcher;
