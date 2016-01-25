/*global ga, TastyLockingAlertController */
import Api from '../api/api';
import ApiHelpers from '../../../shared/helpers/api';
import ErrorService from '../../../shared/react/services/Error';
import NoticeService from '../services/Notice';

let FlowActionCreators = {
  create({name, title, picFile, staffs}) {
    let formData = ApiHelpers.prepareFormData({
      name, title,
      flowpic: picFile,
      staff_ids: staffs.map((staff) => staff.user.id),
    });

    return Api.flow.create(formData)
      .then((flow) => {
        function redirect() {
          TastyLockingAlertController.show({
            message: 'Поток создан! Переходим на страницу потока...',
            action() { window.location = flow.tlog_url; },
          });
        }

        if (window.ga) {
          ga('send', 'event', 'UX', 'CreateFlow', flow.name, {
            hitCallback: redirect,
          });
        } else {
          redirect();
        }
          
      })
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Создание нового потока', {
          method: 'FlowActionCreators.create({name, title, picFile, staffs})',
          methodArguments: {name, title, picFile, staffs},
          response: xhr.responseJSON,
        });
      });
  },

  update(flowID, {name, slug, title, picFile, is_privacy, is_premoderate}) {
    let formData = ApiHelpers.prepareFormData({
      name, slug, title, is_privacy, is_premoderate, flowpic: picFile,
    });

    return Api.flow.update(flowID, formData)
      .then((flow) => {
        NoticeService.notifySuccess('Поток успешно обновлён');
        return flow;
      })
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Изменение потока', {
          method: 'FlowActionCreators.update(flowID, {name, slug, title, picFile, is_privacy, is_premoderate})',
          methodArguments: {flowID, name, slug, title, picFile, is_privacy, is_premoderate},
          response: xhr.responseJSON,
        });
      });
  },

  addStaff(flowID, userID) {
    return Api.flow.addStaff(flowID, userID)
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Добавление модератора потока', {
          method: 'FlowActionCreators.addStaff(flowID, userID)',
          methodArguments: {flowID, userID},
          response: xhr.responseJSON,
        });
      });
  },

  removeStaff(flowID, userID) {
    return Api.flow.removeStaff(flowID, userID)
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Удаление модератора потока', {
          method: 'FlowActionCreators.removeStaff(flowID, userID)',
          methodArguments: {flowID, userID},
          response: xhr.responseJSON,
        });
      });
  },

  changeStaffRole(flowID, userID, role) {
    return Api.flow.changeStaffRole(flowID, userID, role)
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Изменение роли модератора', {
          method: 'FlowActionCreators.removeStaff(flowID, userID, role)',
          methodArguments: {flowID, userID, role},
          response: xhr.responseJSON,
        });
      });
  },

  load(url, data) {
    return Api.flow.load(url, data)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Загрузка потоков', {
          method: 'FlowActionCreators.load(url, data)',
          methodArguments: {url, data},
          response: xhr.responseJSON,
        });
      });
  },

  loadMine(data) {
    return Api.flow.loadMine(data)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Загрузка моих потоков', {
          method: 'FlowActionCreators.loadMine(data)',
          methodArguments: {data},
          response: xhr.responseJSON,
        });
      });
  },

  loadAvailable(data) {
    return Api.flow.loadAvailable(data)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Загрузка доступных для репостинга потоков', {
          method: 'FlowActionCreators.loadAvailable(data)',
          methodArguments: {data},
          response: xhr.responseJSON,
        });
      });
  },
};

export default FlowActionCreators;
