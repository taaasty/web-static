_cache = []
_soundList = {
  'incomingMessage': TastySettings.asset_url + 'sounds/incoming_message.mp3'
}

window.TastySoundController =

  init: ->
    for event, path of _soundList
      audioElement     = document.createElement 'audio'
      audioElement.src = path

      @_cacheElement audioElement

  play: (url) ->
    cachedElement = @_getCachedElement url

    if cachedElement?
      cachedElement.play()
    else
      audioElement     = new Audio()
      audioElement.src = url

      audioElement.play()
      @_cacheElement audioElement

  incomingMessage: ->
    @play _soundList.incomingMessage

  _getCachedElement: (url) ->
    for cache in _cache
      return cache if cache.src is url

  _getCache: -> _cache

  _cacheElement: (audioElement) ->
    _cache.push audioElement

TastySoundController.init()