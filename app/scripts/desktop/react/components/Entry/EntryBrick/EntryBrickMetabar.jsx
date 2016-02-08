/*global i18n */
import React, { PropTypes } from 'react';
import * as ProjectTypes from '../../../../../shared/react/ProjectTypes';
import Avatar from '../../../../../shared/react/components/common/Avatar';
import { metabarAuthor } from '../../../helpers/EntryMetabarHelpers';
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

  function renderAvatar() {
    const { tlog } = entry;

    return window.SPA
      ? <Link
          className="meta-item__link"
          title={tlog.tag}
          to={uri(tlog.url).path()}
        >
          <span className="meta-item__ava">
            <Avatar size={20} userpic={tlog.userpic || tlog.author.userpic} />
          </span>
        </Link>
      : <a
          className="meta-item__link"
          href={tlog.url}
          title={tlog.tag}
        >
          <span className="meta-item__ava">
            <Avatar size={20} userpic={tlog.userpic || tlog.author.userpic} />
          </span>
        </a>;
  }

  function renderMetaTlog() {
    const { author, tlog } = entry;
    const authorMeta = metabarAuthor({ host_tlog_id, tlog, author });

    if (authorMeta) {
      return (
        <span className="meta-item meta-item--user">
          <span className="meta-item__content">
            {renderAvatar()}
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
