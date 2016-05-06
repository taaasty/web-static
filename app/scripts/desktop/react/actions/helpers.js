function identity(v) {
  return v;
}

export function makeReqUrl(endpoint, params) {
  const paramStr = Object.keys(params)
          .map((k) => params[k] && `${k}=${encodeURIComponent(params[k])}`)
          .filter(identity)
          .join('&');
  return [ endpoint, paramStr ].filter(identity).join('?');
}
