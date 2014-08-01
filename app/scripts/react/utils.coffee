window.ReactUtils =
  isImagesEqual: (nextImages, currentImages) ->

    return false unless  nextImages.length == currentImages.length

    currentUrls = currentImages.map (i) -> i.src
    nextUrls    = nextImages.map (i) -> i.src

    return  _.isEqual currentUrls, nextUrls
