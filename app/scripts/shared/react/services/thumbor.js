let ThumborService = {
  thumborWithUrl: gon.thumbor_http_loader,
  thumborWithPath: gon.thumbor,

  newImageUrl(url, size) {
    let width = size.width || '',
        height = size.height || '';

    return thumborWithUrl ? `${this.thumborWithUrl}/unsafe/${width}x${height}/filters:no_upscale()/${url}` : url;
  },

  newRetinaImageUrl(url, size) {
    let width = size.width ? size.width * 2 : '',
        height = size.height ? size.height * 2 : '';

    return thumborWithUrl ? `${this.thumborWithUrl}/unsafe/${width}x${height}/filters:no_upscale()/${url} 2x` : url;
  },

  imageUrl({url, path, size}) {
    return thumborWithPath ? `${this.thumborWithPath}/unsafe/${size}/filters:no_upscale()/${path}` : url;
  },

  retinaImageUrl({url, path, size}) {
    let width = size.width ? size.width * 2 : '',
        height = size.height ? size.height * 2 : '';

    return thumborWithPath ? `${this.thumborWithPath}/unsafe/${width}x${height}/filters:no_upscale()/${path} 2x` : url;
  }
};

export default ThumborService;