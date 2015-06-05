import RelationshipActionCreators from '../../actions/Relationship';
import Relationships from './Relationships';

const ERROR_STATE = 'error',
      LOADED_STATE = 'loaded',
      LOADING_STATE = 'loading';

let RelationshipsContainer = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired,
    actions: React.PropTypes.array
  },

  getInitialState() {
    return {
      relationships: [],
      sincePosition: null,
      hasMore: true,
      currentState: LOADING_STATE
    };
  },

  componentDidMount() {
    this.loadRelationships()
  },

  render() {
    return (
      <Relationships
          relationships={this.state.relationships}
          actions={this.props.actions}
          state={this.state.currentState}
          canLoad={this.state.currentState === LOADED_STATE && this.state.hasMore}
          onLoadMore={this.loadRelationships} />
    );
  },

  loadRelationships() {
    let { url } = this.props;
    let { sincePosition } = this.state;

    this.setState({currentState: LOADING_STATE});

    RelationshipActionCreators.load(url, sincePosition, 10)
      .then((relationshipsInfo) => {
        //Adapter:)
        relationshipsInfo = {
          items: relationshipsInfo.relationships,
          has_more: relationshipsInfo.relationships.length == 10,
          next_since_position: relationshipsInfo.relationships[relationshipsInfo.relationships.length - 1].position
        };

        if (this.isMounted()) {
          this.setState({
            relationships: this.state.relationships.concat(relationshipsInfo.items),
            hasMore: relationshipsInfo.has_more,
            sincePosition: relationshipsInfo.next_since_position,
            currentState: LOADED_STATE
          });
        }
      })
      .fail(() => {
        if (this.isMounted()) {
          this.setState({hasMore: false, currentState: ERROR_STATE});
        }
      });
  }
});

export default RelationshipsContainer;


// #TODO: Refactor. Every panel type should have separate component instead of generic one 


// window.PersonsPopup_PanelMixin =

//   getInitialState: ->
//     _.extend @getStateFromStore(), currentState: LOADING_STATE

//   componentWillMount: ->
//     @loadPanelData()

//   componentDidMount: ->
//     RelationshipsStore.addChangeListener @onStoreChange

//   componentWillUnmount: ->
//     RelationshipsStore.removeChangeListener @onStoreChange

//   render: ->
//     Item = @itemClass()

//     if @hasRelationships()
//       relationships = @state.relationships.map (relationship) =>
//         <Item relationship={ relationship } key={ relationship.id } />

//       panelContent = <ul className="persons">{ relationships }</ul>
//     else
//       switch @state.currentState
//         when ERROR_STATE   then messageText = i18n.t 'persons_popup_error'
//         when LOADING_STATE then messageText = i18n.t 'persons_popup_loading'
//         when LOADED_STATE  then messageText = i18n.t 'persons_popup_empty'
//         else console.warn 'Unknown currentState', @state.currentState

//       panelContent = <div className="grid-full">
//                        <div className="grid-full__middle">
//                          <div className="popup__text">
//                            { messageText }
//                          </div>
//                        </div>
//                      </div>

//     unless @isAllRelationshipsLoaded()
//       loadMoreButton = <LoadMoreButton onClick={ this.loadMoreData } />

//     return <div className="tabs-panel">
//              <div className="scroller scroller--persons" ref="scroller">
//                <div className="scroller__pane js-scroller-pane">
//                  { panelContent }
//                  { loadMoreButton }
//                </div>
//                <div className="scroller__track js-scroller-track">
//                  <div className="scroller__bar js-scroller-bar"></div>
//                </div>
//              </div>
//            </div>

//   hasRelationships:         -> @state.relationships?.length > 0
//   isPanelDataLoaded:        -> @state.relationships?
//   isAllRelationshipsLoaded: -> @state.relationships?.length == @state.totalCount

//   isLoadingState: -> @state.currentState is LOADING_STATE

//   activateLoadedState:  -> @safeUpdateState(currentState: LOADED_STATE)
//   activateLoadingState: -> @safeUpdateState(currentState: LOADING_STATE)
//   activateErrorState:   -> @safeUpdateState(currentState: ERROR_STATE)

//   loadPanelData: (sincePosition, options) ->
//     @safeUpdate => @incrementActivities()
//     @activateLoadingState()

//     @createRequest
//       url: @relationUrl()
//       data:
//         since_position: sincePosition
//         expose_reverse: 1
//       success: (data) =>
//         if options?.success
//           options.success(data)
//         else
//           RelationshipsDispatcher.handleServerAction
//             type: 'relationshipsLoaded'
//             relationship: @relationshipType
//             items: data.relationships
//       error: (data) =>
//         @activateErrorState()
//         NoticeService.errorResponse data
//       complete: =>
//         @activateLoadedState()
//         @safeUpdate => @decrementActivities()

//   loadMoreData: ->
//     return if @isLoadingState()

//     lastLoadedPosition = @state.relationships[@state.relationships.length - 1].position
//     @loadPanelData lastLoadedPosition,
//       success: (data) =>
//         RelationshipsDispatcher.handleServerAction
//           type: 'moreRelationshipsLoaded'
//           relationship: @relationshipType
//           items: data.relationships

//   onStoreChange: ->
//     @setState @getStateFromStore()

// React.mixins.add 'PersonsPopup_PanelMixin', [
//   PersonsPopup_PanelMixin, window.RequesterMixin, 'ReactActivitiesUser',
//   ComponentManipulationsMixin, ScrollerMixin
// ]












// import NotificationStore from '../../stores/NotificationStore';
// import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
// import NotificationActionCreators from '../../actions/Notification';
// import Notifications from './Notifications';

// let NotificationsContainer = React.createClass({
//   propTypes: {
//     notifications: React.PropTypes.array.isRequired,
//     loading: React.PropTypes.bool.isRequired,
//     loadingMore: React.PropTypes.bool.isRequired,
//     error: React.PropTypes.bool.isRequired,
//     everythingLoaded: React.PropTypes.bool.isRequired,
//     onUpdate: React.PropTypes.func
//   },

//   componentDidMount() {
//     NotificationActionCreators.load();
//   },

//   componentDidUpdate() {
//     if (this.props.onUpdate != null) this.props.onUpdate();
//   },

//   componentWillUnmount() {
//     this.props.notifications.forEach((notification) => {
//       if (notification.read_at === null) this.markAsRead(notification.id);
//     });
//   },

//   render() {
//     let actions = {
//       onNotificationRead: this.markAsRead,
//       onLoadMore: this.loadMore
//     };

//     return <Notifications {...this.props} {...actions} />;
//   },

//   markAsRead(notificationID) {
//     NotificationActionCreators.markAsRead(notificationID);
//   },

//   loadMore() {
//     let { notifications } = this.props;
//     let sinceID = notifications[notifications.length - 1].id;

//     NotificationActionCreators.loadMore(sinceID);
//   }
// });

// NotificationsContainer = connectToStores(NotificationsContainer, [NotificationStore], (props) => ({
//   notifications: NotificationStore.getAllChrono(),
//   loading: NotificationStore.isLoading(),
//   loadingMore: NotificationStore.isLoadingMore(),
//   error: NotificationStore.isError(),
//   everythingLoaded: NotificationStore.isEverythingLoaded()
// }));

// export default NotificationsContainer;