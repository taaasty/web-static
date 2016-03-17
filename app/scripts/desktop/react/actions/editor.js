/*global NoticeService, i18n, ga */
import _ from 'lodash';
import Api from '../api/api';
import EditorConstants from '../constants/editor';
import EditorStore from '../stores/EditorStore';
import AppDispatcher from '../dispatchers/dispatcher';
import UuidService from '../../../shared/react/services/uuid';
import ApiHelpers from '../../../shared/helpers/api';
import BrowserHelpers from '../../../shared/helpers/browser';

function createBlobAttachment(image, uuid) {
  return {
    uuid,
    image: {
      geometry: {
        width: image.width,
        height: image.height,
      },
      url: image.src,
    },
  };
}

function prepareEntryData(entryType, pinEntry=false) {
  let data = {},
      title = EditorStore.getEntryValue('title'),
      text = EditorStore.getEntryValue('text'),
      privacy = EditorStore.getEntryPrivacy(),
      imageAttachmentsIDs = EditorStore.getEntryImageAttachmentsIDs(),
      tlogID = EditorStore.getTlogID(),
      imageUrl = EditorStore.getEntryValue('imageUrl'),
      embedUrl = EditorStore.getEntryValue('embedUrl'),
      source = EditorStore.getEntryValue('source');

  imageAttachmentsIDs = imageAttachmentsIDs.length ? imageAttachmentsIDs : [''];

  switch(entryType) {
    case 'text':
      data = {title, text, privacy};
      break;
    case 'anonymous':
      data = {title, text};
      break;
    case 'image':
      data = {
        title, privacy,
        image_url: imageUrl,
        image_attachments_ids: imageAttachmentsIDs,
      };
      break;
    case 'instagram':
    case 'music':
    case 'video':
      data = {
        title, privacy,
        video_url: embedUrl,
      };
      break;
    case 'quote':
      data = {text, source, privacy};
      break;
  }

  // Здесь устанавливаются общие для всех типов постов данные
  if (tlogID != null) data.tlog_id = tlogID;
  if (pinEntry) {
    data.want_to_fix = true;
  }

  return data;
}

let EditorActionCreators = {
  init({entry, tlog, tlogType}) {
    AppDispatcher.handleViewAction({
      entry, tlog, tlogType,
      type: EditorConstants.INIT,
    });
  },

  updateField(key, value) {
    AppDispatcher.handleViewAction({
      key, value,
      type: EditorConstants.UPDATE_FIELD,
    });
  },

  changeEntryType(entryType) {
    AppDispatcher.handleViewAction({
      entryType,
      type: EditorConstants.CHANGE_TYPE,
    });
  },

  changeEntryPrivacy(entryPrivacy) {
    AppDispatcher.handleViewAction({
      entryPrivacy,
      type: EditorConstants.CHANGE_PRIVACY,
    });
  },

  changeTitle(title) {
    this.updateField('title', title);
  },

  changeText(text) {
    this.updateField('text', text);
  },

  changeImageUrl(imageUrl) {
    this.updateField('imageUrl', imageUrl);
  },

  changeEmbedUrl(embedUrl) {
    this.updateField('embedUrl', embedUrl);
  },

  changeEmbedHtml(embedHtml) {
    this.updateField('embedHtml', embedHtml);
  },

  changeSource(source) {
    this.updateField('source', source);
  },

  createImageAttachments(files) {
    let promises = [];

    _.forEach(files, (file) => {
      // Общий uuid для imageAttachment-like blob и imageAttachment
      let uuid = UuidService.generate(),
          uploadFailed = false;

      // Добавляем imageAttachment-like blob объект, назначаем ему uuid
      let image = new Image();
      image.onload = () => {
        let attachments = EditorStore.getEntryValue('imageAttachments') || [],
            newAttachments = [...attachments],
            blobAttachment = createBlobAttachment(image, uuid);

        newAttachments.push(blobAttachment);
        if (!uploadFailed) {
          this.updateField('imageAttachments', newAttachments);
        }
      };
      image.src = BrowserHelpers.createObjectURL(file);

      // Делаем запрос на создание картинки, на успешный ответ заменяем blob с uuid
      let formData = new FormData();
      formData.append('image', file);

      let promise = Api.editor.createImageAttachment(formData)
        .then((imageAttachment) => {
          let attachments = EditorStore.getEntryValue('imageAttachments') || [],
              newAttachments = [...attachments];
          let blobIndex = _.findIndex(newAttachments, (item) => item.uuid === uuid);

          if (blobIndex === -1) {
            // Такого аттачмента локально уже нет, удаляем его на сервере.
            Api.editor.deleteImageAttachment(imageAttachment.id);
          } else {
            newAttachments[blobIndex] = imageAttachment;
          }

          this.updateField('imageAttachments', newAttachments);
        })
        .fail((xhr) => {
          let attachments = EditorStore.getEntryValue('imageAttachments') || [],
              newAttachments = [...attachments];
          let blobIndex = _.findIndex(newAttachments, (item) => item.uuid === uuid);

          uploadFailed = true;
          NoticeService.notifyError(i18n.t('editor_attachment_error', {fileName: file.name}));
          if (blobIndex !== -1) {
            newAttachments.splice(blobIndex, 1);
          }

          this.updateField('imageAttachments', newAttachments);
        });
      promises.push(promise);
    });

    AppDispatcher.handleServerAction({
      type: EditorConstants.ENTRY_CREATING_ATTACHMENTS_START,
    });

    return ApiHelpers.settle(promises)
      .always(() => {
        AppDispatcher.handleServerAction({
          type: EditorConstants.ENTRY_CREATING_ATTACHMENTS_END,
        });
      });
  },

  deleteEmbedUrl() {
    this.changeEmbedUrl(null);
  },

  deleteEmbedHtml() {
    this.changeEmbedHtml(null);
  },

  deleteImageUrl() {
    this.changeImageUrl(null);
  },

  deleteImageAttachments(deleteFromServer) {
    let attachments = EditorStore.getEntryValue('imageAttachments') || [];

    if (deleteFromServer) {
      _.forEach(attachments, (item) => {
        if (!item.entry_id && item.id) {
          Api.editor.deleteImageAttachment(item.id);
        }
      });
    }

    this.updateField('imageAttachments', []);
  },

  createEmbed(embedUrl) {
    return Api.editor.createEmbed(embedUrl);
  },

  pinEntry() {
    AppDispatcher.handleViewAction({
      type: EditorConstants.ENTRY_PIN,
    });

    return this.saveEntry(true);
  },

  saveEntry(pinEntry) {
    return new Promise((resolve, reject) => {
      let entryType = EditorStore.getEntryType();

      // Сохраняем Video, Instagram и Music в video точке
      if (entryType === 'music' || entryType === 'instagram') {
        entryType = 'video';
      }

      AppDispatcher.handleServerAction({
        type: EditorConstants.ENTRY_SAVE,
      });

      function onSuccessCreate(entry) {
        AppDispatcher.handleServerAction({
          type: EditorConstants.ENTRY_SAVE_SUCCESS,
        });

        NoticeService.closeAll();

        function redirect() {
          return resolve(entry);
        }

        if (window.ga) {
          ga('send', 'event', 'UX',
             entry.is_private ? 'CreateAnonymous' : 'CreatePost',
             entry.type, { hitCallback: redirect });
        } else {
          redirect();
        }
        
      }

      function onSuccessEdit(entry) {
        AppDispatcher.handleServerAction({
          type: EditorConstants.ENTRY_SAVE_SUCCESS,
        });
        return resolve(entry);
      }

      function onFail(xhr) {
        AppDispatcher.handleServerAction({
          type: EditorConstants.ENTRY_SAVE_ERROR,
        });
        NoticeService.errorResponse(xhr);
        reject(xhr);
      }

      // Если есть незагруженные аттачменты, ждём пока загрузка не завершится,
      // чтобы отправить данные не выводя лишних сообщений.
      let saveInterval = window.setInterval(saveWhenPossible, 500);

      function saveWhenPossible() {
        if (!EditorStore.isCreatingAttachments()) {
          window.clearInterval(saveInterval);

          const entryID = EditorStore.getEntryID();
          const data = prepareEntryData(entryType, pinEntry);

          if(entryID) {
            let url = ApiRoutes.update_entry_url(entryID, entryType);
            Api.editor.updateEntry(url, data)
              .then(onSuccessEdit)
              .fail(onFail);
          } else {
            let url = ApiRoutes.create_entry_url(entryType);
            Api.editor.createEntry(url, data)
              .then(onSuccessCreate)
              .fail(onFail);
          }
        }
      }
    });
  },
};

export default EditorActionCreators;
