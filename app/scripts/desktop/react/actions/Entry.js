import Api from '../api/api';
import ErrorService from '../../../shared/react/services/Error';

let EntryActionCreators = {
  vote(entryID) {
    return Api.entry.vote(entryID)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Голосование за запись', {
          method: 'EntryActionCreators.vote(entryID)',
          methodArguments: {entryID},
          response: xhr.responseJSON
        });
      });
  }
};

export default EntryActionCreators;