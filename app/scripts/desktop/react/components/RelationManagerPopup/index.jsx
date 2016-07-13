/*global i18n */
import React, { Component, PropTypes } from 'react';
import TabbedArea from '../Tabs/TabbedArea';
import TabPane from '../Tabs/TabPane';
import PanelRequested from './PanelRequested';
import PanelFollowings from './PanelFollowings';
import PanelFollowers from './PanelFollowers';
import PanelIgnored from './PanelIgnored';
import PanelVkontakte from './PanelVkontakte';
import PanelFacebook from './PanelFacebook';
import Popup from '../Popup';
import { connect } from 'react-redux';
import {
  getRelsToFriend,
  RELS_TO_FRIEND,
} from '../../actions/RelsActions';
import {
  REL_FRIEND_STATE,
} from '../../actions/RelationshipActions';
import { Map } from 'immutable';

const emptyRelUser = Map();

class RelationManagerPopup extends Component {
  componentWillMount() {
    const { getRelsToFriend } = this.props;

    getRelsToFriend();
  }
  render() {
    const { onClose } = this.props;
    const { followingsTotalCount, followings, followingsState, getRelsToFriend } = this.props;

    /*
      followersTotalCount, requestedTotalCount, ignoredTotalCount } = this.props;
    */

    return (
      <Popup
        className="popup--persons popup--dark"
        clue="persons_popup"
        draggable
        onClose={onClose}
        title={i18n.t('persons_popup_header')}
      >
        <TabbedArea>
          <TabPane count={followingsTotalCount} tab={i18n.t('persons_popup.menu.followings')}>
            <PanelFollowings
              loadMoreData={getRelsToFriend}
              relations={followings}
              relationsState={followingsState}
              totalCount={followingsTotalCount}
            />
          </TabPane>
        </TabbedArea>
      </Popup>
    );
      /*
          <TabPane count={followersTotalCount} tab={i18n.t('persons_popup.menu.followers')}>
            <PanelFollowers />
          </TabPane>
          <TabPane count={requestedTotalCount} tab={i18n.t('persons_popup.menu.requested')}>
            <PanelRequested />
          </TabPane>
          <TabPane count={ignoredTotalCount} tab={i18n.t('persons_popup.menu.ignored')}>
            <PanelIgnored />
          </TabPane>
          <TabPane tab={i18n.t('persons_popup.menu.vkontakte')}>
            <PanelVkontakte />
          </TabPane>
          <TabPane tab={i18n.t('persons_popup.menu.facebook')}>
            <PanelFacebook />
          </TabPane>
        </TabbedArea>
      </Popup>
    );
    */
  }
}

RelationManagerPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default connect(
  (state) => {
    const currentUserId = state.currentUser.data.id;
    const followings = state
          .entities
          .get('rel')
          .filter((r) => r.get('readerId') === currentUserId && r.get('state') === REL_FRIEND_STATE)
          .sortBy((r) => r.get('position'))
          .map((r) => r.set('user', state.entities.getIn([ 'tlog', String(r.get('userId')) ], emptyRelUser)));
    const followingsState = state.rels.get(RELS_TO_FRIEND, Map());
    const followingsTotalCount = followingsState.get('unloadedCount', 0) + followings.count();

    return {
      currentUserId,
      followings,
      followingsState,
      followingsTotalCount,
    };
  },
  { getRelsToFriend },
  (stateProps, { getRelsToFriend }, ownProps) => Object.assign(
    {},
    stateProps,
    { getRelsToFriend: getRelsToFriend.bind(null, stateProps.currentUserId) },
    ownProps
  )
)(RelationManagerPopup);
