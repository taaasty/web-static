ThumborService =
  thumborUrl: 'http://thumbor0.tasty0.ru'

  imageUrl: ({url, path, size}) ->
    switch gon.env
      when 'static-development', 'development' then url
      # when 'development' then url
      else
        @thumborUrl + "/unsafe/#{ size }/filters:no_upscale()/" + path

module.exports = ThumborService