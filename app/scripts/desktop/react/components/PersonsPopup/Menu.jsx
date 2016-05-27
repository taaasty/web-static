/*global i18n, RequesterMixin, RelationshipsStore, RelationshipsDispatcher */
import React, { PropTypes, createClass } from 'react';
import ApiRoutes from '../../../../shared/routes/api';
import NoticeService from '../../services/Notice';
import MenuItem from './MenuItem';

const Menu = createClass({
  displayName: 'PersonsPopupMenu',
  propTypes: {
    currentTab: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  },
  mixins: [ RequesterMixin ],

  getInitialState() {
    return this.getStateFromStore();
  },

  componentWillMount() {
    if (!this.isSummaryLoaded()) {
      this.loadSummary();
    }
  },

  componentDidMount() {
    RelationshipsStore.addSummaryChangeListener(this.onStoreChange);
  },

  componentWillUnmount() {
    RelationshipsStore.removeSummaryChangeListener(this.onStoreChange);
  },

  getStateFromStore() {
    return {
      followersTotalCount: RelationshipsStore.getFollowersTotalCount(),
      followingsTotalCount: RelationshipsStore.getFollowingsTotalCount(),
      guessedTotalCount: RelationshipsStore.getGuessedTotalCount(),
      ignoredTotalCount: RelationshipsStore.getIgnoredTotalCount(),
      requestedTotalCount: RelationshipsStore.getRequestedTotalCount(),
    };
  },
  
  onStoreChange() {
    this.setState(this.getStateFromStore());
  },

  isProfilePrivate() {
    return !!this.props.user.is_privacy;
  },

  isSummaryLoaded() {
    return RelationshipsStore.isSummaryLoaded();
  },

  loadSummary() {
    this.createRequest({
      url: ApiRoutes.relationships_summary_url(),
      success: (summary) => {
        RelationshipsDispatcher.handleServerAction({
          type: 'summaryLoaded',
          summary,
        });
      },
      error: (data) => {
        NoticeService.errorResponse(data);
      },
    });
  },

  render() {
    const { currentTab, onSelect } = this.props;
    const { followingsTotalCount, followersTotalCount,
            requestedTotalCount, ignoredTotalCount } = this.state;

    return (
      <nav className="tabs-nav tabs-nav--white">
        <ul className="tabs-nav__list">
          <MenuItem 
            isActive={currentTab === 'followings'}
            onClick={onSelect.bind(null, 'followings')}
            title={i18n.t('persons_popup_menu_followings')}
            totalCount={followingsTotalCount}
          />
          <MenuItem
            isActive={currentTab === 'followers'}
            onClick={onSelect.bind(null, 'followers')}
            title={i18n.t('persons_popup_menu_followers')}
            totalCount={followersTotalCount}
          />
          {this.isProfilePrivate() &&
           <MenuItem
             isActive={currentTab === 'requested'}
             onClick={onSelect.bind(null, 'requested')}
             title={i18n.t('persons_popup_menu_requested')}
             totalCount={requestedTotalCount}
           />}
           <MenuItem
             isActive={currentTab === 'ignored'}
             onClick={onSelect.bind(null, 'ignored')}
             title={i18n.t('persons_popup_menu_ignored')}
             totalCount={ignoredTotalCount}
           />
           <MenuItem
             isActive={currentTab === 'vkontakte'}
             onClick={onSelect.bind(null, 'vkontakte')}
             title={i18n.t('persons_popup_menu_vkontakte')}
           />
           <MenuItem
             isActive={currentTab === 'facebook'}
             onClick={onSelect.bind(null, 'facebook')}
             title={i18n.t('persons_popup_menu_facebook')}
           />
        </ul>
      </nav>
    );
  },
});

export default Menu;
