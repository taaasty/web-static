ThumborService =
  thumbor_url: 'http://thumbor0.tasty0.ru/'

  image_url:  (url, style) ->
    switch TastySettings.env
      when 'static-development', 'development' then url
      else
        url = url.replace /^.*\/assets\//, ''
        @thumbor_url + "unsafe/#{ style }/" + url

module.exports = ThumborService