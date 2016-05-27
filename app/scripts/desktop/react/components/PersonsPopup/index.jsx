/*global i18n, RequesterMixin, CurrentUserStore, RelationshipsStore */
import React, { PropTypes, createClass } from 'react';
import Popup from '../Popup';
import Menu from './Menu';
import PanelRequested from './PanelRequested';
import PanelFollowings from './PanelFollowings';
import PanelFollowers from './PanelFollowers';
import PanelIgnored from './PanelIgnored';
import PanelVkontakte from './PanelVkontakte';
import PanelFacebook from './PanelFacebook';

const DEFAULT_PANEL = 'followings';

const PersonsPopup = createClass({
  displayName: 'PersonsPopup',
  propTypes: {
    close: PropTypes.func.isRequired,
    panelName: PropTypes.string,
  },
  mixins: [ RequesterMixin ],

  getDefaultProps() {
    return {
      panelName: DEFAULT_PANEL,
    };
  },

  getInitialState() {
    return Object.assign(this.getStateFromStores(), { currentTab: this.props.panelName });
  },

  componentDidMount() {
    CurrentUserStore.addChangeListener(this.onStoresChange);
    RelationshipsStore.addChangeListener(this.onStoresChange);
  },

  componentWillUnmount() {
    CurrentUserStore.removeChangeListener(this.onStoresChange);
    RelationshipsStore.removeChangeListener(this.onStoresChange);
  },

  getStateFromStores() {
    return {
      relationships: RelationshipsStore.getRelationships(),
      user: CurrentUserStore.getUser(),
    };
  },
  
  onStoresChange() {
    this.setState(this.getStateFromStores());
  },

  isProfilePrivate() {
    return !!this.state.user.is_privacy;
  },

  selectTab(type) {
    this.setState({ currentTab: type });
  },

  renderCurrentPanel() {
    switch (this.state.currentTab) {
    case 'requested':
      return <PanelRequested />;
    case 'followings':
      return <PanelFollowings />;
    case 'followers':
      return <PanelFollowers />;
    case 'ignored':
      return <PanelIgnored />;
    case 'vkontakte':
      return <PanelVkontakte />;
    case 'facebook':
      return <PanelFacebook />;
    default:
      console.debug('Unknown type of current tab', this.state.currentTab);
      return <div />;
    }
  },

  /**
     # Temporarily exclude guessed tab
     # <PersonsPopup_GuessesPanel isActive={ this.state.currentTab == 'guesses' }
     #                            total_count={ this.state.relationships.guesses.total_count }
     #                            onLoad={ onLoad.bind(this, 'guesses') } />
  */

  render() {
    const { currentTab, user } = this.state;

    return (
      <Popup
        className="popup--persons popup--dark"
        clue="persons_popup"
        draggable
        onClose={this.props.close}
        title={i18n.t('persons_popup_header')}
      >
        <Menu
          currentTab={currentTab}
          onSelect={this.selectTab}
          user={user}
        />
        {this.renderCurrentPanel()}
      </Popup>
    );
  },
});

export default PersonsPopup;
