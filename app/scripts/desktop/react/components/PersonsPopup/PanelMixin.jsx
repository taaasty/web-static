/*global i18n, RelationshipsStore, RelationshipsDispatcher */
import React from 'react';
import NoticeService from '../../services/Notice';

const ERROR_STATE = 'error';
const LOADED_STATE = 'loaded';
const LOADING_STATE = 'loading';

const PanelMixin = {
  getInitialState() {
    return Object.assign(this.getStateFromStore(), { currentState: LOADING_STATE });
  },

  componentWillMount() {
    this.loadPanelData();
  },

  componentDidMount() {
    RelationshipsStore.addChangeListener(this.onStoreChange);
  },

  componentWillUnmount() {
    RelationshipsStore.removeChangeListener(this.onStoreChange);
  },

  hasRelationships() {
    return this.state.relationships && this.state.relationships.length > 0;
  },
  
  isPanelDataLoaded() {
    return this.state.relationships != null;
  },

  isAllRelationshipsLoaded() {
    const { relationships, totalCount } = this.state;

    return relationships && relationships.length === totalCount;
  },

  isLoadingState() {
    return this.state.currentState === LOADING_STATE;
  },

  activateLoadedState() {
    this.safeUpdateState({ currentState: LOADED_STATE });
  },

  activateLoadingState() {
    this.safeUpdateState({ currentState: LOADING_STATE });
  },

  activateErrorState() {
    this.safeUpdateState({ currentState: ERROR_STATE });
  },

  loadPanelData(sincePosition, options) {
    this.safeUpdate(() => this.incrementActivities());
    this.activateLoadingState();

    this.createRequest({
      url: this.relationUrl(),
      data: {
        since_position: sincePosition,
        expose_reverse: 1,
      },
      success: (data) => {
        if (options && options.success) {
          options.success(data);
        } else {
          RelationshipsDispatcher.handleServerAction({
            type: 'relationshipsLoaded',
            relationship: this.relationshipType,
            items: data.relationships,
          });
        }
      },
      error: (data) => {
        this.activateErrorState();
        NoticeService.errorResponse(data);
      },
      complete: () => {
        this.activateLoadedState();
        this.safeUpdate(() => this.decrementActivities());
      },
    });
  },

  loadMoreData() {
    if (this.isLoadingState()) {
      return;
    }

    const { relationships } = this.state;
    const lastLoadedPosition = relationships[relationships.length - 1].position;
    
    this.loadPanelData(lastLoadedPosition, {
      success: (data) => {
        RelationshipsDispatcher.handleServerAction({
          type: 'moreRelationshipsLoaded',
          relationship: this.relationshipType,
          items: data.relationships,
        });
      },
    });
  },

  onStoreChange() {
    this.setState(this.getStateFromStore());
  },

  renderMoreButton() {
    return (
      <div className="popup__more">
        <button
          className="more-button"
          onClick={this.loadMoreData}
        >
          {i18n.t('load_more_button')}
        </button>
      </div>
    );
  },

  messageText(state) {
    switch (state) {
      case ERROR_STATE:
        return i18n.t('persons_popup_error');
      case LOADING_STATE:
        return i18n.t('persons_popup_loading');
      case LOADED_STATE:
        return i18n.t('persons_popup_empty');
      default:
        console.warn('Unknown currentState', state);
        return '';
    }
  },

  renderMessage() {
    return (
      <div className="grid-full">
        <div className="grid-full__middle">
          <div className="popup__text">
            {this.messageText(this.state.currentState)}
          </div>
        </div>
      </div>
    );
  },

  renderPanelContent() {
    const Item = this.itemClass();

    return (
      <ul className="persons">
        {this.state.relationships.map((relationship) => (
           <Item key={relationship.id} relationship={relationship} />
         ))}
      </ul>
    );
  },

  render() {
    return (
      <div className="tabs-panel">
        <div className="scroller scroller--persons" ref="scroller">
          <div className="scroller__pane js-scroller-pane">
            {this.hasRelationships() ? this.renderPanelContent() : this.renderMessage()}
            {!this.isAllRelationshipsLoaded() && this.renderMoreButton()}
          </div>
          <div className="scroller__track js-scroller-track">
            <div className="scroller__bar js-scroller-bar" />
          </div>
        </div>
      </div>
    );
  },
};

export default PanelMixin;
