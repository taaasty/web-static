import React, { PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';

function EntryTlogMetabarTags({ tags, userSlug }) {
  function renderTag(tag, idx) {
    let separator;

    if (idx < tags.length - 1) {
      separator = <span className="meta-item__common">, </span>;
    }

    return (
      <span key={`tag-${idx}`}>
        <a
          className="meta-item__common meta-item__link"
          href={Routes.userTag(userSlug, tag)}
          target="_blank"
        >
          #{tag}
        </a>
        {separator}
      </span>
    );
  }

  return (
    <span className="meta-item meta-item--tags">
      <span className="meta-item__content">
        {tags.map(renderTag)}
      </span>
    </span>
  );
}

EntryTlogMetabarTags.propTypes = {
  tags: PropTypes.array.isRequired,
  userSlug: PropTypes.string.isRequired,
};

export default EntryTlogMetabarTags;
