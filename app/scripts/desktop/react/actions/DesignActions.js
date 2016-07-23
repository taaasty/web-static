/*global FormData */
import ApiRoutes from '../../../shared/routes/api';
import BrowserHelpers from '../../../shared/helpers/browser';
import { CALL_API, Schemas } from '../middleware/api';
import { putOpts, postOpts } from './reqHelpers';

export const DESIGN_SET_OPTION = 'DESIGN_SET_OPTION';
export const DESIGN_RESET_CHANGES = 'DESIGN_RESET_CHANGES';
export const DESIGN_SAVE_REQUEST = 'DESIGN_SAVE_REQUEST';
export const DESIGN_SAVE_SUCCESS = 'DESIGN_SAVE_SUCCESS';
export const DESIGN_SAVE_FAILURE = 'DESIGN_SAVE_FAILURE';
export const DESIGN_UPLOAD_BG_REQUEST = 'DESIGN_UPLOAD_BG_REQUEST';
export const DESIGN_UPLOAD_BG_SUCCESS = 'DESIGN_UPLOAD_BG_SUCCESS';
export const DESIGN_UPLOAD_BG_FAILURE = 'DESIGN_UPLOAD_BG_FAILURE';

let bgUploadPromise = Promise.resolve();

export function changeDesignOption(name, value) {
  return {
    type: DESIGN_SET_OPTION,
    name,
    value,
  };
}

export function resetChanges() {
  return {
    type: DESIGN_RESET_CHANGES,
  };
}

export function changeBgImage(tlogId, image) {
  return (dispatch) => {
    const formData = new FormData();
    formData.append('image', image);

    dispatch(changeDesignOption(
      'backgroundImageUrl',
      BrowserHelpers.createObjectURL(image))
    );

    bgUploadPromise = dispatch({
      [CALL_API]: {
        endpoint: ApiRoutes.design_settings_cover_url(tlogId),
        schema: Schemas.NONE,
        types: [
          DESIGN_UPLOAD_BG_REQUEST,
          DESIGN_UPLOAD_BG_SUCCESS,
          DESIGN_UPLOAD_BG_FAILURE,
         ],
        opts: postOpts(formData),
      },
      tlogId,
    })
      .then(({ response }) => dispatch(
        changeDesignOption('backgroundId', response.result.backgroundId))
      );

    return bgUploadPromise;
  };
}

export function saveDesignChanges(tlogId, design) {
  return (dispatch) => {
    return bgUploadPromise.then(() => dispatch({
      [CALL_API]: {
        endpoint: ApiRoutes.design_settings_url(tlogId),
        schema: Schemas.NONE,
        types: [
          DESIGN_SAVE_REQUEST,
          DESIGN_SAVE_SUCCESS,
          DESIGN_SAVE_FAILURE,
        ],
        opts: putOpts(design),
      },
      tlogId,
    }));
  };
}
