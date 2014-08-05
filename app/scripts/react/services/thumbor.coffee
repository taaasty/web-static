window.ThumborService =
  thumbor_url: 'http://thumbor0.tasty0.ru/'
  image_url:  ({url, style}) ->
    url = url.replace /^.*\/assets\//, ''
    @thumbor_url + "unsafe/#{style}/" + url

