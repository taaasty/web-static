import Api from '../api/api';
import ErrorService from '../../../shared/react/services/Error';
import NoticeService from '../services/Notice';

let FlowActionCreators = {
  create({name, title, picFile, staff}) {
    let formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);

    if (picFile) {
      formData.append('flowpic', picFile);
    }

    staff.forEach((user, i) => {
      formData.append('staff_ids[]', user.id);
    })

    return Api.flow.create(formData)
      .then((flow) => {
        TastyLockingAlertController.show({
          message: "Поток создан! Переходим на страницу потока..",
          action: (flow) => window.location = flow.tlog_url
        });
      })
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Создание нового потока', {
          method: 'FlowActionCreators.create({name, title, picFile, staff})',
          methodArguments: {name, title, picFile, staff},
          response: xhr.responseJSON
        });
      });
  },

  load(url, sinceFlowID, limit) {
    return Api.flow.load(url, sinceFlowID, limit)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Загрузка потоков', {
          method: 'FlowActionCreators.load(url, sinceFlowID, limit)',
          methodArguments: {url, sinceFlowID, limit},
          response: xhr.responseJSON
        });
      });
  }
};

export default FlowActionCreators;