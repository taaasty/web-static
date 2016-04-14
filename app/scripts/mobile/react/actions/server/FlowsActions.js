import Constants from '../../constants/constants';
import AppDispatcher from '../../dispatcher/dispatcher';

const FlowsServerActions = {
  loadMore(flows) {
    return AppDispatcher.handleServerAction({
      type: Constants.flows.LOAD_MORE,
      flows,
    });
  },
};

export default FlowsServerActions;
