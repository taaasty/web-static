import { merge } from 'lodash';
import { decamelize, decamelizeKeys } from 'humps';

function identity(v) {
  return v;
}

export function makeGetUrl(endpoint, params) {
  const paramStr = Object.keys(params)
          .map((k) => params[k] && `${decamelize(k)}=${encodeURIComponent(params[k])}`)
          .filter(identity)
          .join('&');
  return [ endpoint, paramStr ].filter(identity).join('?');
}

export function defaultOpts(state) {
  const csrfNode = document.querySelector('[name="csrf-token"]');
  const opts = {
    mode: 'cors',
    method: 'GET',
    redirect: 'follow',
    credentials: 'same-origin',
    headers: {
      'X-Tasty-Client-Name': 'web_desktop',
      'X-Tasty-Client-Token': 'web',
      'X-Tasty-Client-Version': '0.0.9' || process.env.NODE_ENV.pkgVersion,
    },
  };

  if (state.currentUser.data.apiKey) {
    opts.headers['X-User-Token'] = state.currentUser.data.apiKey.accessToken;
  };

  if (csrfNode) {
    opts.headers['X-CSRF-Token'] = csrfNode.getAttribute('content');
  }

  return opts;
}

export function postOpts(data={}) {
  return (state) => merge(defaultOpts(state), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(decamelizeKeys(data)),
  });
}

export function putOpts(data={}) {
  return (state) => merge(defaultOpts(state), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(decamelizeKeys(data)),
  });
}

export function deleteOpts(data={}) {
  return (state) => merge(defaultOpts(state), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(decamelizeKeys(data)),
  });
}
