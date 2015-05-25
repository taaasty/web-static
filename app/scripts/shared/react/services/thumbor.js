let ThumborService = {
  thumborWithPath: 'http://thumbor0.tasty0.ru',
  thumborWithUrl: 'http://thumbor4.tasty0.ru',

  newImageUrl(url, size) {
    let width = size.width || '',
        height = size.height || '';

    return `${this.thumborWithUrl}/unsafe/${width}x${height}/filters:no_upscale()/${url}`;
  },

  newRetinaImageUrl(url, size) {
    let width = size.width ? size.width * 2 : '',
        height = size.height ? size.height * 2 : '';

    return `${this.thumborWithUrl}/unsafe/${width}x${height}/filters:no_upscale()/${url} 2x`;
  },

  imageUrl({url, path, size}) {
    switch(gon.env) {
      case 'development':
      case 'static-development': return url;
      default:
        return `${this.thumborWithPath}/unsafe/${size}/filters:no_upscale()/${path}`;
    }    
  },

  retinaImageUrl({url, path, size}) {
    switch(gon.env) {
      case 'development':
      case 'static-development': return `url 2x`;
      default:
        let retinaSize = size.width * 2 + 'x' + size.height * 2;
        return `${this.thumborWithPath}/unsafe/${retinaSize}/filters:no_upscale()/${path} 2x`;
    }    
  }
};

export default ThumborService;