ThumborService =
  thumbor_url: 'http://thumbor0.tasty0.ru/'

  image_url:  (url, style) ->
    if TastySettings.env is 'static-development'
      return url
    else
      url = url.replace /^.*\/assets\//, ''
      @thumbor_url + "unsafe/#{style}/" + url

module.exports = ThumborService