import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import EditorVoteButton from '../buttons/Vote';
import EditorPrivacyButton from '../buttons/Privacy';
import EditorPreviewButton from '../buttons/Preview';
import EditorSaveButton from '../buttons/Save';

import { ENTRY_PINNED_STATE, ENTRY_AWAITING_PAYMENT_STATE } from '../../../constants/EntryConstants';

const ENTRY_PRIVACY_PRIVATE = 'private';
const ENTRY_PRIVACY_PUBLIC = 'public';
const ENTRY_PRIVACY_LIVE = 'live';
const TLOG_TYPE_PRIVATE = 'private';
//const TLOG_TYPE_PUBLIC = 'public';
const TLOG_TYPE_ANONYMOUS = 'anonymous';

class EditorActions extends Component {
  state = {
    preview: false,
  }
  componentWillUpdate(nextProps, nextState) {
    //TODO: Применятор для показа превью
    if (this.state.preview !== nextState.preview) {
      if (nextState.preview) {
        $('body').removeClass('tlog-mode-minimal').addClass('tlog-mode-full');
      } else {
        $('body').removeClass('tlog-mode-full').addClass('tlog-mode-minimal');
      }
    }
  }
  handleVoteButtonClick() {
    if (this.props.loading) {
      return;
    }
    const newEntryPrivacy = this.isEntryLive() ? ENTRY_PRIVACY_PUBLIC : ENTRY_PRIVACY_LIVE;
    this.props.onChangePrivacy(newEntryPrivacy);
  }
  handlePrivacyButtonClick() {
    if (this.props.loading) {
      return;
    }
    const newEntryPrivacy = this.isEntryPrivate() ? ENTRY_PRIVACY_PUBLIC : ENTRY_PRIVACY_PRIVATE;
    this.props.onChangePrivacy(newEntryPrivacy);
  }
  onPinEntryButtonClick() {
    const { loading, pinOrderUrl } = this.props;

    if (loading || this.isPinned()) {
      return;
    }

    this.props.onPinEntry(pinOrderUrl);
  }
  isEntryForCurrentUser() {
    if (this.props.tlog != null) {
      return this.props.tlog.id == this.props.userID;
    }
    return true;
  }
  isEntryLive() {
    return this.props.entryPrivacy == ENTRY_PRIVACY_LIVE;
  }
  isEntryPrivate() {
    return this.props.entryPrivacy == ENTRY_PRIVACY_PRIVATE;
  }
  isTlogPrivate() {
    return this.props.tlogType == TLOG_TYPE_PRIVATE;
  }
  isTlogAnonymous() {
    return this.props.tlogType == TLOG_TYPE_ANONYMOUS;
  }
  isVotable() {
    return (!(this.isTlogAnonymous() || this.isEntryPrivate() ||
              this.isTlogPrivate()) || !this.isEntryForCurrentUser());
  }
  isPinned() {
    return this.props.pinState === ENTRY_PINNED_STATE;
  }
  isAwaitingPayment() {
    return this.props.pinState === ENTRY_AWAITING_PAYMENT_STATE;
  }
  togglePreview() {
    if (this.props.loading) {
      return;
    }

    this.setState({preview: !this.state.preview});
  }
  saveEntry() {
    if (this.props.loading) {
      return;
    }

    this.props.onSaveEntry();
  }
  renderPinEntryButton() {
    const { canPinEntry, pinnedTill } = this.props;
    const isPinned = this.isPinned();

    if (!((isPinned && pinnedTill) || canPinEntry) || !this.isVotable()) {
      return null;
    }

    const pinnedTillStr = moment(pinnedTill).format('H:mm D MMMM');
    const buttonClasses = classnames({
      'button': true,
      'post-settings-button': true,
      'post-settings-promotion-button': true,
      '__promoted': isPinned,
    });
    const buttonText = isPinned
      ? i18n.t('buttons.editor.pin_entry_promoted', { date: pinnedTillStr })
      : this.isAwaitingPayment()
        ? i18n.t('buttons.editor.pin_entry_awaiting_payment')
        : i18n.t('buttons.editor.pin_entry');

    return (
      <div className="post-action post-action--button" onClick={this.onPinEntryButtonClick.bind(this)}>
        <button className={buttonClasses}>
          {buttonText}
        </button>
      </div>
    );
  }
  renderVoteButton() {
    if (this.isVotable()) {
      return (
        <div className="post-action post-action--button">
          <EditorVoteButton enabled={this.isEntryLive()} onClick={this.handleVoteButtonClick.bind(this)} />
        </div>
      );
    }
  }
  renderPrivacyButton() {
    if (this.isEntryForCurrentUser() && !this.isTlogAnonymous()) {
      return (
        <div className="post-action post-action--button">
          <EditorPrivacyButton
            live={this.isEntryLive()}
            onClick={this.handlePrivacyButtonClick.bind(this)}
            private={this.isEntryPrivate()}
          />
        </div>
      );
    }
  }
  renderSpinner() {
    if (this.props.loading) {
      return (
        <div className="post-action post-action--loader">
          <Spinner size={8} />
        </div>
      );
    }
  }
  render() {
    const { loading, tlog } = this.props;
    const actionsClasses = classnames({
      'post-actions': true,
      'state--loading': loading,
    });

    return (
      <div className={actionsClasses}>
        {this.renderSpinner()}
        {this.renderPinEntryButton()}
        {this.renderVoteButton()}
        {this.renderPrivacyButton()}
        <div className="post-action post-action--button">
          <EditorPreviewButton onClick={this.togglePreview.bind(this)} />
        </div>
        <div className="post-action post-action--button">
          <div className="button-group">
            <EditorSaveButton
              entryForCurrentUser={this.isEntryForCurrentUser()}
              onClick={this.saveEntry.bind(this)}
              private={this.isEntryPrivate()}
              tlog={tlog}
            />
          </div>
        </div>
      </div>
    );
  }
}

// <div className="post-action post-action--button">
//   <button className="button button--outline button--gray">
//     Привязать пост к потоку
//   </button>
// </div>

EditorActions.propTypes = {
  canPinEntry: PropTypes.bool,
  entryPrivacy: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onChangePrivacy: PropTypes.func.isRequired,
  onPinEntry: PropTypes.func.isRequired,
  onSaveEntry: PropTypes.func.isRequired,
  pinOrderUrl: PropTypes.string,
  pinState: PropTypes.string,
  pinnedTill: PropTypes.string,
  tlog: PropTypes.object,
  tlogType: PropTypes.string.isRequired,
  userID: PropTypes.number.isRequired,
};

export default EditorActions;
