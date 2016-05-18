import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import EntryBrickContent from './EntryBrickContent';
import EntryBrickFlowHeader from './EntryBrickFlowHeader';
import EntryBrickPinHeader from './EntryBrickPinHeader';
import {
  acceptEntry,
  declineEntry,
} from '../../actions/EntryActions';
import { connect } from 'react-redux';

import { ENTRY_TYPES, ENTRY_PINNED_STATE } from '../../constants/EntryConstants';
import { FEED_TYPE_LIVE_FLOW } from '../../constants/FeedConstants';

const emptyState = {};
const emptyEntry = Map();
const emptyAuthor = Map();
const emptyTlog = Map();

class EntryBrick extends Component {
  shouldComponentUpdate(nextProps) {
    const { entry, entryAuthor, entryId, entryState, entryTlog,
            feedType, hostTlogId, moderation } = this.props;

    return (
      entry !== nextProps.entry ||
      entryAuthor !== nextProps.entryAuthor ||
      entryId !== nextProps.entryId ||
      entryState !== nextProps.entryState ||
      entryTlog !== nextProps.entryTlog ||
      feedType !== nextProps.feedType ||
      hostTlogId !== nextProps.hostTlogId ||
      moderation !== nextProps.moderation
    );
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
    const type = this.props.entry.get('type');
    const typeClass = ENTRY_TYPES.indexOf(type) != -1 ? type : 'text';

    return `brick brick--${typeClass}`;
  }
  renderFlowHeader() {
    const { entryAuthor, entryTlog, hostTlogId } = this.props;

    if (hostTlogId == null &&
        !entryAuthor.isEmpty() &&
        entryAuthor.get('id') !== entryTlog.get('id')) {
      return <EntryBrickFlowHeader flow={entryTlog} />;
    }
  }
  renderPinHeader() {
    if (this.props.entry.get('fixedState') === ENTRY_PINNED_STATE) {
      return <EntryBrickPinHeader />;
    }
  }
  render() {
    console.count('brickItem');
    const { entry: immEntry, entryAuthor: immEntryAuthor, entryState,
            entryTlog: immEntryTlog, feedType, hostTlogId, moderation } = this.props;
    // TODO: move immutable structure down the pros chain
    const jsEntry = immEntry.toJS();
    const jsEntryAuthor = immEntryAuthor.toJS();
    const jsEntryTlog = immEntryTlog.toJS();

    const entry = Object.assign({}, jsEntry, entryState, {
      url: jsEntry.url || jsEntry.entryUrl,
      author: jsEntryAuthor,
      tlog: jsEntryTlog,
    });

    return (
      <article className={this.getBrickClasses()} data-id={entry.id}>
        {feedType !== FEED_TYPE_LIVE_FLOW && this.renderFlowHeader()}
        {this.renderPinHeader()}
        <EntryBrickContent
          entry={entry}
          hasModeration={!!moderation}
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
  entry: PropTypes.object.isRequired,
  entryAuthor: PropTypes.object.isRequired,
  entryId: PropTypes.number.isRequired,
  entryState: PropTypes.object.isRequired,
  entryTlog: PropTypes.object.isRequired,
  feedType: PropTypes.string,
  hostTlogId: PropTypes.number,
  moderation: PropTypes.object,
};

export default connect(
  (state, ownProps) => {
    const { entryId } = ownProps;
    const { entryState, entities } = state;
    const entry = entities.getIn([ 'entry', String(entryId) ], emptyEntry);
    const entryAuthor = entities.getIn([ 'tlog', String(entry.get('author')) ], emptyAuthor);
    const entryTlog = entities.getIn([ 'tlog', String(entry.get('tlog')) ], emptyTlog);
    const moderation = null; // TODO: implement when premod enabled

    return Object.assign({}, ownProps, {
      entry,
      entryAuthor,
      entryTlog,
      moderation,
      entryState: entryState[entryId] || emptyState,
    });
  },
  { acceptEntry, declineEntry }
)(EntryBrick);
