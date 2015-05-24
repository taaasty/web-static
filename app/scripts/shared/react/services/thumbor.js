let ThumborService = {
  thumborUrl: 'http://thumbor0.tasty0.ru',

  imageUrl({url, path, size}) {
    switch(gon.env) {
      case 'development': return url;
      default:
        return `${this.thumborUrl}/unsafe/${size}/filters:no_upscale()/${path}`;
    }    
  },

  retinaImageUrl({url, path, size}) {
    switch(gon.env) {
      case 'development': return `url 2x`;
      default:
        let retinaSize = size.width * 2 + 'x' + size.height * 2;
        return `${this.thumborUrl}/unsafe/${retinaSize}/filters:no_upscale()/${path} 2x`;
    }    
  }
};

export default ThumborService;