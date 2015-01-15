ThumborService =
  thumborUrl: 'http://thumbor0.tasty0.ru'

  imageUrl: ({url, path, size}) ->
    switch TastySettings.env
      when 'static-development', 'development' then url
      # when 'development' then url
      else
        @thumborUrl + "/unsafe/#{ size }/filters:no_upscale()/" + path
# filters:no_upscale()
module.exports = ThumborService