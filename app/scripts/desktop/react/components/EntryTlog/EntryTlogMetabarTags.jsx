import React, { PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryTlogMetabarTags(props) {
  const {
    tags,
    userSlug,
  } = props;

  if (!tags || tags.count() === 0) {
    return <noscript />;
  }

  function renderTag(tag, idx) {
    return (
      <span key={`tag-${idx}`}>
        <Link
          className="meta-item__common meta-item__link"
          to={uri(Routes.userTag(userSlug, tag)).path()}
        >
          #{tag}
        </Link>
        {(idx < tags.count() - 1) && (
          <span className="meta-item__common">
            {', '}
          </span>
        )}
      </span>
    );
  }

  return (
    <span className="meta-item meta-item--tags">
      <span className="meta-item__content">
        {tags.map(renderTag).valueSeq()}
      </span>
    </span>
  );
}

EntryTlogMetabarTags.propTypes = {
  tags: PropTypes.object.isRequired,
  userSlug: PropTypes.string.isRequired,
};

export default EntryTlogMetabarTags;
