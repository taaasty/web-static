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
      audioElement = document.createElement 'audio'
      audioElement.setAttribute 'src', url
      audioElement.play()

      @_cacheElement audioElement

  incomingMessage: ->
    @play _soundList.incomingMessage

  _getCachedElement: (url) ->
    for cache in _cache
      return cache if cache.src is url

  _cacheElement: (audioElement) -> _cache.push audioElement