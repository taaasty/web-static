function prepareUrl(url) {
  return /^\/\/\S*$/.test(url) ? `http:${url}` : url;
}

let ThumborService = {
  thumborWithUrl: gon.thumbor_http_loader ? gon.thumbor_http_loader.server_url : null,
  thumborWithPath: gon.thumbor ? gon.thumbor.server_url : null,

  newImageUrl(url, size) {
    url = prepareUrl(url);
    let width = size.width || '',
        height = size.height || '';

    return this.thumborWithUrl ? `${this.thumborWithUrl}/unsafe/${width}x${height}/filters:no_upscale()/${url}` : url;
  },

  newRetinaImageUrl(url, size) {
    url = prepareUrl(url);
    let width = size.width ? size.width * 2 : '',
        height = size.height ? size.height * 2 : '';

    return this.thumborWithUrl ? `${this.thumborWithUrl}/unsafe/${width}x${height}/filters:no_upscale()/${url} 2x` : url;
  },

  imageUrl({url, path, size}) {
    return this.thumborWithPath ? `${this.thumborWithPath}/unsafe/${size}/filters:no_upscale()/${path}` : url;
  },

  retinaImageUrl({url, path, size}) {
    url = prepareUrl(url);
    let width = size.width ? size.width * 2 : '',
        height = size.height ? size.height * 2 : '';

    return this.thumborWithPath ? `${this.thumborWithPath}/unsafe/${width}x${height}/filters:no_upscale()/${path} 2x` : url;
  }
};

export default ThumborService;