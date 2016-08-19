/*global gon */
function prepareUrl(url) {
  return /^\/\/\S*$/.test(url) ? `http:${url}` : url;
}

function filters(additional=[]) {
  const common = []; //['no_upscale()'];
  const fx = [
    ...common,
    ...additional,
  ];
  return fx.length ? `/filters:${fx.join(':')}` : '';
}

const ThumborService = {
  thumborWithUrl: gon.thumbor_http_loader ? gon.thumbor_http_loader.server_url : null,
  thumborWithPath: gon.thumbor ? gon.thumbor.server_url : null,

  newImageUrl(url, size, filtersArr) {
    url = prepareUrl(url);
    const width = size.width || '';
    const height = size.height || '';

    return this.thumborWithUrl ? `${this.thumborWithUrl}/unsafe/${width}x${height}${filters(filtersArr)}/${url}` : url;
  },

  newRetinaImageUrl(url, size, filtersArr) {
    url = prepareUrl(url);
    const width = size.width ? size.width * 2 : '';
    const height = size.height ? size.height * 2 : '';

    return this.thumborWithUrl ? `${this.thumborWithUrl}/unsafe/${width}x${height}${filters(filtersArr)}/${url} 2x` : url;
  },

  imageUrl({url, path, size}) {
    return this.thumborWithPath ? `${this.thumborWithPath}/unsafe/${size}${filters()}/${path}` : url;
  },

  retinaImageUrl({url, path, size}) {
    url = prepareUrl(url);
    const width = size.width ? size.width * 2 : '';
    const height = size.height ? size.height * 2 : '';

    return this.thumborWithPath ? `${this.thumborWithPath}/unsafe/${width}x${height}${filters()}/${path} 2x` : url;
  },
};

export default ThumborService;
