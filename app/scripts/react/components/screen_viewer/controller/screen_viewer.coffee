window.ScreenViewerController =

  loadImages: (obj) ->

  loadImage: (src, successFn, errorFn) ->
    if src?
      image = new Image
      image.src = src
      image.onload = ->
        successFn()
        return
      image.onerror = ->
        console.log src + ": didn't load"