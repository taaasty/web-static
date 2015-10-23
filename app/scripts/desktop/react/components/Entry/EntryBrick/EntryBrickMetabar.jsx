import React, { PropTypes } from 'react';
import * as ProjectTypes from '../../../../../shared/react/ProjectTypes';
import Avatar from '../../../../../shared/react/components/common/Avatar';
import { metabarAuthor } from '../../../helpers/EntryMetabarHelpers';
import VotingComponent from '../../common/Voting';

let EntryBrickMetabar = React.createClass({
  propTypes: {
    entry: ProjectTypes.tlogEntry.isRequired,
    host_tlog_id: PropTypes.number,
  },

  render() {
    return (
      <span className="meta-bar">
        {this.renderMetaVote()}
        {this.renderMetaComments()}
        {this.renderMetaTlog()}
      </span>
    );
  },

  renderMetaVote() {
    const { id, rating} = this.props.entry;

    if (rating.is_voteable) {
      return (
        <span className="meta-item meta-item--vote">
          <span className="meta-item__content">
            <VotingComponent entryID={id} rating={rating} />
          </span>
        </span>
      );
    }
  },

  renderMetaComments() {
    const { comments_count: commentsCount, url } = this.props.entry;

    if (commentsCount) {
      let title = i18n.t('comments_count', {count: commentsCount});

      return (
        <span className="meta-item meta-item--comments">
          <span className="meta-item__content">
            <a href={url + '#comments'} title={title} className="meta-item__link">
              {title}
            </a>
          </span>
        </span>
      );
    }
  },

  renderMetaTlog() {
    const { entry: { author, tlog }, host_tlog_id } = this.props;
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
                <Avatar userpic={tlog.userpic} size={20} />
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

  },
});

export default EntryBrickMetabar;
