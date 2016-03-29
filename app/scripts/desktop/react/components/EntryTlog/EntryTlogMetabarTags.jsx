import React, { PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryTlogMetabarTags({ tags, userSlug }) {
  function renderTag(tag, idx) {
    let separator;

    if (idx < tags.length - 1) {
      separator = <span className="meta-item__common">, </span>;
    }

    return (
      <span key={`tag-${idx}`}>
        <Link
          className="meta-item__common meta-item__link"
          to={uri(Routes.userTag(userSlug, tag)).path()}
        >
          #{tag}
        </Link>
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
