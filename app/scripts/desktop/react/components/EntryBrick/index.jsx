/*global i18n */
import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import EntryBrickContent from './EntryBrickContent';
import EntryBrickFlowHeader from './EntryBrickFlowHeader';
import EntryBrickPinHeader from './EntryBrickPinHeader';
import {
  acceptEntry,
  declineEntry,
} from '../../actions/EntryActions';
import { connect } from 'react-redux';
import NoticeService from '../../services/Notice';
import { onlyUpdateForKeys } from 'recompose';

import { ENTRY_TYPES, ENTRY_PINNED_STATE } from '../../constants/EntryConstants';
import { FEED_TYPE_LIVE_FLOW } from '../../constants/FeedConstants';

const emptyState = {};
const emptyEntry = Map();
const emptyAuthor = Map();
const emptyTlog = Map();

function EntryBrick(props) {
  const {
    entry,
    entryState,
    entryAuthor,
    entryTlog,
    feedType,
    hostTlogId,
    moderation,
  } = props;

  function acceptEntry() {
    const {
      acceptUrl,
      acceptAction,
    } = moderation;

    return props.acceptEntry(acceptUrl)
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

  function declineEntry() {
    const {
      declineAction,
      declineUrl,
    } = moderation;

    return props.declineEntry(declineUrl)
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

  function renderFlowHeader() {
    if (hostTlogId == null &&
        !entryAuthor.isEmpty() &&
        entryAuthor.get('id') !== entryTlog.get('id')) {
      return <EntryBrickFlowHeader flow={entryTlog} />;
    }
  }

  const type = entry.get('type');
  const typeClass = ENTRY_TYPES.indexOf(type) != -1 ? type : 'text';

  return (
    <article className={`brick brick--${typeClass}`} data-id={entry.id}>
      {feedType !== FEED_TYPE_LIVE_FLOW && renderFlowHeader()}
      {(entry.get('fixedState') === ENTRY_PINNED_STATE) && <EntryBrickPinHeader />}
      <EntryBrickContent
        entry={entry}
        entryAuthor={entryAuthor}
        entryState={entryState}
        entryTlog={entryTlog}
        hasModeration={!!moderation}
        hostTlogId={hostTlogId}
        onEntryAccept={acceptEntry}
        onEntryDecline={declineEntry}
      />
    </article>
  );
}

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
  {
    acceptEntry,
    declineEntry,
  }
)(onlyUpdateForKeys([
  'entry',
  'entryAuthor',
  'entryId',
  'entryState',
  'entryTlog',
  'feedType',
  'hostTlogId',
  'moderation',
])(EntryBrick));
