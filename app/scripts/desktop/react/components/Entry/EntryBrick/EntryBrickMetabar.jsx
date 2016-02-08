/*global i18n */
import React, { PropTypes } from 'react';
import * as ProjectTypes from '../../../../../shared/react/ProjectTypes';
import MetabarAuthor from '../../common/MetabarAuthor';
import Voting from '../../common/Voting';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryBrickMetabar({ entry, host_tlog_id }) {
  function renderMetaVote() {
    const { id, rating } = entry;

    return (
      <span className="meta-item meta-item--vote">
        <span className="meta-item__content">
          <Voting entryID={id} rating={rating} />
        </span>
      </span>
    );
  }

  function renderMetaComments() {
    const { comments_count: commentsCount, url } = entry;
    const title = i18n.t('comments_count', {count: commentsCount});

    return window.SPA
      ? <span className="meta-item meta-item--comments">
          <span className="meta-item__content">
            <Link
              className="meta-item__link"
              title={title}
              to={{ pathname: uri(url).path() + '#comments', state: { id: entry.id } }}
            >
              {title}
            </Link>
          </span>
        </span>
      : <span className="meta-item meta-item--comments">
          <span className="meta-item__content">
            <a
              className="meta-item__link"
              href={url + '#comments'}
              title={title}
            >
              {title}
            </a>
          </span>
        </span>;
  }

  return (
    <span className="meta-bar">
      {entry.is_voteable && renderMetaVote()}
      {!!entry.comments_count && renderMetaComments()}
      <MetabarAuthor
        author={entry.author}
        hostTlogId={host_tlog_id}
        tlog={entry.tlog}
      />
    </span>
  );
}

EntryBrickMetabar.propTypes = {
  entry: ProjectTypes.tlogEntry.isRequired,
  host_tlog_id: PropTypes.number,
};

export default EntryBrickMetabar;
