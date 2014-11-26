window.ScreenViewerController =

  loadImages: (obj) ->

  loadImage: (src, onSuccess, onError) ->
    if src?
      image = new Image
      image.src = src
      image.onload = ->
        onSuccess()
      image.onerror = ->
        onError()
        alert src + ": didn't load"

  _loadImage: (src, handleSuccess, handleError) ->
    if src?
      image = new Image
      image.src = src
      image.onload = ->
        handleSuccess()
      image.onerror = ->
        handleError()
        alert src + ": didn't load"