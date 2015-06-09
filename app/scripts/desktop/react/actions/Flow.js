import Api from '../api/api';
import ApiHelpers from '../../../shared/helpers/api';
import ErrorService from '../../../shared/react/services/Error';
import NoticeService from '../services/Notice';

let FlowActionCreators = {
  create({name, title, picFile, staffs}) {
    let formData = ApiHelpers.prepareFormData({
      name, title,
      flowpic: picFile,
      staff_ids: staffs.map((staff) => staff.user.id)
    });

    return Api.flow.create(formData)
      .then((flow) => {
        TastyLockingAlertController.show({
          message: "Поток создан! Переходим на страницу потока..",
          action() {
            window.location = flow.tlog_url
          }
        });
      })
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Создание нового потока', {
          method: 'FlowActionCreators.create({name, title, picFile, staffs})',
          methodArguments: {name, title, picFile, staffs},
          response: xhr.responseJSON
        });
      });
  },

  update(flowID, {name, slug, title, picFile}) {
    let formData = ApiHelpers.prepareFormData({
      name, slug, title, flowpic: picFile
    });

    return Api.flow.update(flowID, formData)
      .then((flow) => {
        NoticeService.notifySuccess('Поток успешно обновлён');
        return flow;
      })
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Изменение потока', {
          method: 'FlowActionCreators.update(flowID, {name, slug, title, picFile})',
          methodArguments: {flowID, name, slug, title, picFile},
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