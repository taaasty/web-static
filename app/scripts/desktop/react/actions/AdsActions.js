import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts } from './reqHelpers';
import { startsWith } from 'lodash';

export const ADS_PREFIX = 'ad-';

export const ADS_REQUEST = 'ADS_REQUEST';
export const ADS_SUCCESS = 'ADS_SUCCESS';
export const ADS_FAILURE = 'ADS_FAILURE';

export const ADS_SET_AD = 'ADS_SET_AD';

export function isAdsId(entryId) {
  return startsWith(entryId, ADS_PREFIX);
}

export function composeAdsId(entryId) {
  return `${ADS_PREFIX}${entryId}`;
}

export function decomposeAdsId(id='') {
  const r = new RegExp(`^${ADS_PREFIX}`);

  return String(id).replace(r, '');
}

export function setAd() {
  return {
    type: ADS_SET_AD,
  };
}

export function fetchAds() {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.ads(),
      schema: Schemas.ADS_COLL,
      types: [
        ADS_REQUEST,
        ADS_SUCCESS,
        ADS_FAILURE,
      ],
      opts: defaultOpts,
    },
  };
}
