import Api from '../api/api';
import ErrorService from '../../../shared/react/services/Error';
import NoticeService from '../services/Notice';

let FlowActionCreators = {
  create({name, title, picFile, staff}) {
    let formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('flowpic', picFile);
    staff.forEach((user, i) => {
      formData.append(`staff_ids[${i}]`, user.id);
    })

    return Api.flow.create(formData)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Создание нового потока', {
          method: 'FlowActionCreators.create({name, title, picFile, staff})',
          methodArguments: {name, title, picFile, staff},
          response: xhr.responseJSON
        });
      });
  }
};

export default FlowActionCreators;