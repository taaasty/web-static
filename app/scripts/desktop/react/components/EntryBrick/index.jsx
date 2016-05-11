import React, { Component, PropTypes } from 'react';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
import EntryBrickContent from './EntryBrickContent';
import EntryBrickFlowHeader from './EntryBrickFlowHeader';
import EntryBrickPinHeader from './EntryBrickPinHeader';
import {
  voteEntry,
  acceptEntry,
  declineEntry,
} from '../../actions/EntryActions';
import { connect } from 'react-redux';

import { ENTRY_TYPES, ENTRY_PINNED_STATE } from '../../constants/EntryConstants';
import { FEED_TYPE_LIVE_FLOW } from '../../constants/FeedConstants';

class EntryBrick extends Component {
  voteEntry() {
    this.props.voteEntry(this.props.entryId)
      .then((data) => {
        if (window.ga) {
          window.ga('send', 'event', 'UX', 'Like');
        }
        return data;
      });
    // TODO: restore PostAuth logic
  }
  acceptEntry() {
    const { acceptEntry, moderation: { acceptUrl, acceptAction } } = this.props;

    return acceptEntry(acceptUrl)
      .then(() => {
        NoticeService.notifySuccess(i18n.t('messages.entry_accept_success'));

        switch(acceptAction) {
          case 'delete':
            //this.setState({visible: false, hasModeration: false});
            break;
          case 'nothing':
            //this.setState({hasModeration: false});
            break;
        }
      });
  }
  declineEntry() {
    const { declineEntry, moderation: { declineAction, declineUrl } } = this.props;

    declineEntry(declineUrl)
      .then(() => {
        NoticeService.notifySuccess(i18n.t('messages.entry_decline_success'));

        switch(declineAction) {
          case 'delete':
            //this.setState({visible: false, hasModeration: false});
            break;
          case 'nothing':
            //this.setState({hasModeration: false});
            break;
        }
      });
  }
  getBrickClasses() {
    const { type } = this.props.entry;
    const typeClass = ENTRY_TYPES.indexOf(type) != -1 ? type : 'text';

    return `brick brick--${typeClass}`;
  }
  renderFlowHeader() {
    const { entry: { author, tlog }, hostTlogId } = this.props;

    if (hostTlogId == null && author && tlog && author.id !== tlog.id) {
      return <EntryBrickFlowHeader flow={tlog} />;
    }
  }
  renderPinHeader() {
    if (this.props.entry.fixedState === ENTRY_PINNED_STATE) {
      return <EntryBrickPinHeader />;
    }
  }
  render() {
    const { entry, feedType, hostTlogId } = this.props;

    return (
      <article className={this.getBrickClasses()} data-id={entry.id}>
        {feedType !== FEED_TYPE_LIVE_FLOW && this.renderFlowHeader()}
        {this.renderPinHeader()}
        <EntryBrickContent
          entry={entry}
          hasModeration={false}
          hostTlogId={hostTlogId}
          onEntryAccept={this.acceptEntry.bind(this)}
          onEntryDecline={this.declineEntry.bind(this)}
        />
      </article>
    );
  }
};

EntryBrick.propTypes = {
  acceptEntry: PropTypes.func.isRequired,
  declineEntry: PropTypes.func.isRequired,
  entry: ProjectTypes.tlogEntry.isRequired,
  entryId: PropTypes.number,
  feedType: PropTypes.string,
  hostTlogId: PropTypes.number,
  moderation: PropTypes.object,
  voteEntry: PropTypes.func.isRequired,
};

export default connect(
  (state, ownProps) => {
    const entry = {};

    return Object.assign({}, ownProps, { entry });
  },
  { voteEntry, acceptEntry, declineEntry }
)(EntryBrick);
