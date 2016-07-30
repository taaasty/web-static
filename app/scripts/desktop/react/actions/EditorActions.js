import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { postOpts, putOpts, deleteOpts } from './reqHelpers';
import {
  restoreLastEntryPrivacy,
  restoreExistingAnonymousEntry,
  restoreExistingEntry,
  restoreExistingNewEntry,
  store,
  storeLastEntryPrivacy,
} from '../services/EntryKeeperService';
import {
  getNormalizedKey,
} from '../services/EntryNormalizationService';
import {
  TLOG_TYPE_ANONYMOUS,
  ENTRY_PRIVACY_LIVE,
  ENTRY_PRIVACY_PRIVATE,
  ENTRY_PRIVACY_PUBLIC,
  EDITOR_ENTRY_TYPE_IMAGE,
} from '../constants/EditorConstants';
import { generate as generateUuid } from '../../../shared/react/services/uuid';
import { createObjectURL } from '../../../shared/helpers/browser';

export const EDITOR_SET_ENTRY = 'EDITOR_SET_ENTRY';
export const EDITOR_RESET_ENTRY = 'EDITOR_RESET_ENTRY';
export const EDITOR_SET_PREVIEW = 'EDITOR_SET_PREVIEW';
export const EDITOR_UPDATE_ENTRY = 'EDITOR_UPDATE_ENTRY';
export const EDITOR_SET_INSERT = 'EDITOR_SET_INSERT';
export const EDITOR_SET_LOADING_IMAGE_URL = 'EDITOR_SET_LOADING_IMAGE_URL';
export const EDITOR_ADD_BLOB_ATTACHMENT = 'EDITOR_ADD_BLOB_ATTACHMENT';
export const EDITOR_UPLOAD_ATTACHMENT_REQUEST =
  'EDITOR_UPLOAD_ATTACHMENT_REQUEST';
export const EDITOR_UPLOAD_ATTACHMENT_SUCCESS =
  'EDITOR_UPLOAD_ATTACHMENT_SUCCESS';
export const EDITOR_UPLOAD_ATTACHMENT_FAILURE =
  'EDITOR_UPLOAD_ATTACHMENT_FAILURE';
export const EDITOR_DELETE_ATTACHMENT_REQUEST =
  'EDITOR_DELETE_ATTACHMENT_REQUEST';
export const EDITOR_DELETE_ATTACHMENT_SUCCESS =
  'EDITOR_DELETE_ATTACHMENT_SUCCESS';
export const EDITOR_DELETE_ATTACHMENT_FAILURE =
  'EDITOR_DELETE_ATTACHMENT_FAILURE';

const PRIVACY_TYPES = {
  private: [
    ENTRY_PRIVACY_PUBLIC,
    ENTRY_PRIVACY_PRIVATE,
  ],
  public: [
    ENTRY_PRIVACY_LIVE,
    ENTRY_PRIVACY_PUBLIC,
    ENTRY_PRIVACY_PRIVATE,
  ],
};

function getPrivacyByTlogType(tlogType) {
  const privacy = restoreLastEntryPrivacy();
  const privacyTypes = PRIVACY_TYPES[tlogType];

  if (privacy != null) {
    if (privacyTypes != null) {
      return privacyTypes.indexOf(privacy) >= 0 ? privacy : privacyTypes[0];
    } else {
      return 'public';
    }
  } else {
    return privacyTypes != null ? privacyTypes[0] : 'public';
  }
}

function setEntry(entry) {
  return {
    type: EDITOR_SET_ENTRY,
    entry,
  };
}

export function pinEntry() {

}

export function saveEntry() {

}

export function editorSetEntry(entry, tlogType) {
  if (entry && entry.id) {
    const { id, createdAt, updatedAt } = entry;

    if (tlogType === TLOG_TYPE_ANONYMOUS) {
      return setEntry(restoreExistingAnonymousEntry() || entry);
    } else {
      return setEntry(restoreExistingEntry(id, updatedAt || createdAt) || entry);
    }
  } else {
    if (tlogType === TLOG_TYPE_ANONYMOUS) {
      return setEntry(
        restoreExistingAnonymousEntry() || {
          type: 'anonymous',
          privacy: 'public',
        }
      );
    } else {
      return setEntry(
        restoreExistingNewEntry() || {
          type: 'text',
          privacy: getPrivacyByTlogType(tlogType),
        }
      );
    }
  }
}

export function editorResetEntry() {
  return {
    type: EDITOR_RESET_ENTRY,
  };
}

export function editorSetPreview(flag) {
  return {
    type: EDITOR_SET_PREVIEW,
    preview: flag,
  };
}

export function editorTogglePreview() {
  return (dispatch, getState) => {
    return dispatch(editorSetPreview(!getState()
      .editor.get('preview')));
  };
}

export function updateEntry(key, value) {
  return (dispatch, getState) => {
    dispatch({
      type: EDITOR_UPDATE_ENTRY,
      key,
      value,
    });

    store(getState()
      .editor.get('entry')
      .toJS());
  };
}

export function changeEntryType(entryType) {
  return updateEntry('type', entryType);
}

export function changeEntryPrivacy(privacy) {
  storeLastEntryPrivacy(privacy);

  return updateEntry('privacy', privacy);
}

function setInsertingUrl(value) {
  return {
    type: EDITOR_SET_INSERT,
    value,
  };
}

export function startInsert() {
  return setInsertingUrl(true);
}

export function stopInsert() {
  return setInsertingUrl(false);
}

// EDITOR_ENTRY_TYPE_IMAGE type entries only functions

const imageUrlKey = getNormalizedKey(
  EDITOR_ENTRY_TYPE_IMAGE,
  'imageUrl'
);
const imageAttachmentsKey = getNormalizedKey(
  EDITOR_ENTRY_TYPE_IMAGE,
  'imageAttachments'
);

export function deleteImageAttachment(id) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.imageAttachmentsWithID(id),
      schema: Schemas.NONE,
      types: [
        EDITOR_DELETE_ATTACHMENT_REQUEST,
        EDITOR_DELETE_ATTACHMENT_SUCCESS,
        EDITOR_DELETE_ATTACHMENT_FAILURE,
      ],
      opts: deleteOpts(),
    },
  };
}

function createBlobAttachment({ width, height, src }, uuid) {
  return {
    uuid,
    image: {
      geometry: { width, height },
      url: src,
    },
  };
}

function addBlobAttachment(attachment) {
  return {
    type: EDITOR_ADD_BLOB_ATTACHMENT,
    attachment,
  };
}

export function createImageAttachments(files) {
  return (dispatch) => {
    dispatch(setUploadingFlag(true));

    const promisePool = [].slice.call(files)
      .map((file) => {
        // Общий uuid для imageAttachment-like blob и imageAttachment
        const uuid = generateUuid();
        let failed = false;

        // Добавляем imageAttachment-like blob объект, назначаем ему uuid
        const image = new Image();
        image.onload = () => {
          if (!failed) {
            dispatch(addImageAttachment(createBlobAttachment(image, uuid)));
          }
        };
        image.src = createObjectURL(file);

        // Делаем запрос на создание картинки, на успешный ответ заменяем blob с uuid
        const formData = new FormData();
        formData.append('image', file);

        return dispatch({
            [CALL_API]: {
              endpoint: ApiRoutes.imageAttachments(),
              schema: Schemas.NONE,
              types: [
                EDITOR_UPLOAD_REQUEST,
                EDITOR_UPLOAD_SUCCESS,
                EDITOR_UPLOAD_FAILURE,
              ],
              opts: postOpts(formData),
            },
            uuid,
          })
          .then({ isRemoved } => {

          })
          .catch(() => {
            failed = true;
            NoticeService.notifyError(
              i18n.t('editor_attachment_error', { fileName: file.name })
            );
          });



        Api.editor.createImageAttachment(formData)
          .then((imageAttachment) => {
            let blobIndex = _.findIndex(newAttachments, (item) => item.uuid ===
              uuid);

            if (blobIndex === -1) {
              // Такого аттачмента локально уже нет, удаляем его на сервере.
              Api.editor.deleteImageAttachment(imageAttachment.id);
            } else {
              newAttachments[blobIndex] = imageAttachment;
            }

            this.updateField('imageAttachments', newAttachments);
          })
          .catch(() => {
            let blobIndex = _.findIndex(newAttachments, (item) => item.uuid ===
              uuid);

            failed = true;
            NoticeService.notifyError(
              i18n.t('editor_attachment_error', { fileName: file.name })
            );
            if (blobIndex !== -1) {
              newAttachments.splice(blobIndex, 1);
            }

            this.updateField('imageAttachments', newAttachments);
          });
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
  }
}

export function deleteImages() {
  return (dispatch) => {
    dispatch(updateEntry(imageUrlKey, null));
    // deleteFromServer if existing entry
    // deleteImageAttachments
  };
}

function setLoadingImageUrl(value) {
  return {
    type: EDITOR_SET_LOADING_IMAGE_URL,
    value,
  };
}

export function changeImageUrl(url) {
  return (dispatch) => {
    dispatch(setLoadingImageUrl(true));
    dispatch(updateEntry(imageUrlKey, url));

    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = (data) => {
        dispatch(setLoadingImageUrl(false));
        resolve(data);
      };

      image.onerror = (error) => {
        dispatch(setLoadingImageUrl(false));
        dispatch(updateEntry(imageUrlKey, null));
        reject(error);
      };

      image.src = url;
    });
  };
}
// -end EDITOR_ENTRY_TYPE_IMAGE functions block
