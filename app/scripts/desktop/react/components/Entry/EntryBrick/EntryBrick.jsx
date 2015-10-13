import React, { PropTypes } from 'react';
import * as ProjectTypes from '../../../../../shared/react/ProjectTypes';
import EntryActionCreators from '../../../actions/Entry';
import EntryBrickContent from './EntryBrickContent';
import EntryBrickFlowHeader from './EntryBrickFlowHeader';

const ENTRY_TYPES = [
  'text', 'image', 'video', 'quote', 'link', 'song', 'code',
];

let EntryBrick = React.createClass({
  propTypes: {
    entry: ProjectTypes.tlogEntry.isRequired,
    host_tlog_id: PropTypes.number,
    moderation: PropTypes.object,
  },

  getInitialState() {
    return {
      visible: true,
      hasModeration: !!this.props.moderation,
    };
  },

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.hasModeration != nextState.hasModeration ||
      this.state.visible != nextState.visible
    );
  },

  renderFlowHeader() {
    const { entry: { author, tlog }, host_tlog_id } = this.props;
    if (host_tlog_id == null && author && tlog && author.id !== tlog.id) {
      return <EntryBrickFlowHeader flow={tlog} />;
    }
  },

  render() {
    const { entry } = this.props;

    if (this.state.visible) {
      return (
          <article className={this.getBrickClasses()} data-id={entry.id}>
          {this.renderFlowHeader()}
          <EntryBrickContent
            entry={entry}
            hasModeration={this.state.hasModeration}
            host_tlog_id={this.props.host_tlog_id}
            onEntryAccept={this.acceptEntry}
            onEntryDecline={this.declineEntry}
          />
        </article>
      );
    } else {
      return null;
    }
  },

  getBrickClasses() {
    let { type } = this.props.entry;
    let typeClass = ENTRY_TYPES.indexOf(type) != -1 ? type : 'text';

    return `brick brick--${typeClass}`;
  },

  acceptEntry() {
    EntryActionCreators.accept(this.props.moderation.accept_url)
      .then(() => {
        let { accept_action } = this.props.moderation;

        if (this.isMounted()) {
          switch(accept_action) {
            case 'delete':
              this.setState({visible: false, hasModeration: false});
              break;
            case 'nothing':
              this.setState({hasModeration: false});
              break;
          }
        }
      });
  },

  declineEntry() {
    EntryActionCreators.decline(this.props.moderation.decline_url)
      .then(() => {
        let { decline_action } = this.props.moderation;

        if (this.isMounted()) {
          switch(decline_action) {
            case 'delete':
              this.setState({visible: false, hasModeration: false});
              break;
            case 'nothing':
              this.setState({hasModeration: false});
              break;
          }
        }
      });
  }
});

export default EntryBrick;
