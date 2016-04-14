import Constants from '../../constants/constants';
import AppDispatcher from '../../dispatcher/dispatcher';
import Api from '../../api/api';
import FlowsServerActions from '../server/FlowsActions';
import NotifyController from '../../controllers/notify';

const FlowsViewActions = {
  init(flows, sort) {
    return AppDispatcher.handleViewAction({
      type: Constants.flows.INIT,
      flows,
      sort,
    });
  },

  loadMore(sort, page, limit) {
    AppDispatcher.handleViewAction({
      type: Constants.flows.REQUEST,
    });

    return Api.flows.get(sort, page, limit)
      .then(FlowsServerActions.loadMore)
      .fail((err) => {
        NotifyController.errorResponse(err);
        AppDispatcher.handleServerAction({
          type: Constants.flows.ERROR,
          error: err.responseJSON,
        });
      });
  },
};

export default FlowsViewActions;
