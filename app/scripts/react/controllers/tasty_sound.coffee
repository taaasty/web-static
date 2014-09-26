_cache = []
_soundList = {
  'incomingMessage': 'sounds/incoming_message.wav'
}

window.TastySoundController =

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
    url = @_getAbsoluteUrl _soundList.incomingMessage
    @play url

  _getAbsoluteUrl: (relativeUrl) ->
    TastySettings.asset_url + relativeUrl

  _getCachedElement: (url) ->
    for cache in _cache
      return cache if cache.src is url

  _getCache: -> _cache

  _cacheElement: (audioElement) -> _cache.push audioElement