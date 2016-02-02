/*global i18n */
import React, { PropTypes } from 'react';
import * as ProjectTypes from '../../../../../shared/react/ProjectTypes';
import Avatar from '../../../../../shared/react/components/common/Avatar';
import { metabarAuthor } from '../../../helpers/EntryMetabarHelpers';
import Voting from '../../common/Voting';

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

    return (
      <span className="meta-item meta-item--comments">
        <span className="meta-item__content">
          <a
            className="meta-item__link"
            href={url + '#comments'}
            title={title}
          >
            {title}
          </a>
        </span>
      </span>
    );
  }

  function renderMetaTlog() {
    const { author, tlog } = entry;
    const authorMeta = metabarAuthor({ host_tlog_id, tlog, author });

    if (authorMeta) {
      return (
        <span className="meta-item meta-item--user">
          <span className="meta-item__content">
            <a
              className="meta-item__link"
              href={tlog.url}
              title={tlog.tag}
            >
              <span className="meta-item__ava">
                <Avatar size={20} userpic={tlog.userpic} />
              </span>
            </a>
            <span
              className="meta-item__author"
              dangerouslySetInnerHTML={{ __html: authorMeta }}
            />
          </span>
        </span>
      );
    }
  }

  return (
    <span className="meta-bar">
      {entry.is_voteable && renderMetaVote()}
      {!!entry.comments_count && renderMetaComments()}
      {renderMetaTlog()}
    </span>
  );
}

EntryBrickMetabar.propTypes = {
  entry: ProjectTypes.tlogEntry.isRequired,
  host_tlog_id: PropTypes.number,
};

export default EntryBrickMetabar;
