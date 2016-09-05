/*global i18n */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import uri from 'urijs';
import Tooltip from '../common/Tooltip';
import RelationButton from '../RelationButton';
import FlowBrickAvatar from './FlowBrickAvatar';
import { REL_NONE_STATE, REL_GUESSED_STATE } from '../../actions/RelationshipActions';
import { ENTRY_PINNED_STATE } from '../../constants/EntryConstants';
import { connect } from 'react-redux';
import { Map } from 'immutable';

const emptyRel = Map();

class FlowBrick extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.relState !== nextProps.relState;
  }
  renderFollowButton() {
    const { relId, relState } = this.props;

    return (relState === REL_NONE_STATE || relState === REL_GUESSED_STATE)
         ? <span onClick={(ev) => { ev.stopPropagation(); ev.preventDefault(); }}>
             <RelationButton relId={relId} />
           </span>
         : null;
  }
  render() {
    const { flow } = this.props;

    return (
      <article className="brick brick--flow">
        <Link to={uri(flow.get('tlogUrl')).path()} >
          {flow.get('fixedState') === ENTRY_PINNED_STATE &&
           <div className="brick__notice">
             <i className="icon icon--pin" />
             {i18n.t('flow.pinned_header')}
           </div>
          }
          <div className="brick__media">
            {this.renderFollowButton()}
            <FlowBrickAvatar flowpic={flow.get('flowpic')} />
          </div>
          <div className="brick__body">
            <h3 className="brick__title">
              {flow.get('name')}
            </h3>
            <p className="brick__caption">
              {flow.get('title')}
            </p>
            <div className="brick__data">
              <div className="brick__data-item">
                <Tooltip title={i18n.t('flow_brick.followers_count_tooltip')}>
                  <i className="icon icon--friends" />
                  <span>
                    {flow.get('followersCount')}
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }
}

FlowBrick.propTypes = {
  flow: PropTypes.object.isRequired,
  relId: PropTypes.string.isRequired,
  relState: PropTypes.string.isRequired,
};

export default connect(
  (state, { flow }) => {
    const relId = `${flow.get('id')}-${state.currentUser.data.id}`;
    const relState = state.entities.getIn([ 'rel', relId ], emptyRel).get('state', REL_NONE_STATE);

    return {
      flow,
      relId,
      relState,
    };
  }
)(FlowBrick);
