assign = require 'react/lib/Object.assign'

min = (arr, prop) ->
  currentMin = arr[0][prop]

  arr.forEach (value) ->
    currentMin = value[prop] if value[prop] < currentMin

  currentMin

max = (arr, prop) ->
  currentMax = arr[0][prop]

  arr.forEach (value) ->
    currentMax = value[prop] if value[prop] > currentMax

  currentMax

CollageMixin =

  processImages: (images) ->
    newImages   = @calculateImagesRatio images
    maxRatioSum = max(newImages, 'ratio') # * @props.countInARow
    minRatioSum = min newImages, 'ratio'

    rows  = []
    index = 0

    while newImages.length
      rows[index] = []
      currRatioSum = 0

      while maxRatioSum - currRatioSum >= minRatioSum # While space in a row greater than the narrowest image
        for image in newImages
          if maxRatioSum - currRatioSum >= image.ratio # If we still have enought space for image then add it
            rows[index].push image
            currRatioSum += image.ratio
            newImages = newImages.filter (img) -> img isnt image
            break

        if newImages.length then minRatioSum = min newImages, 'ratio' else break

      widthPerRatio = @props.width / currRatioSum # Calculating scale for the row

      for image in rows[index]
        assign image,
          width: image.ratio * widthPerRatio
          widthPercentage: @props.width / 100 * (image.ratio * widthPerRatio)
          height: image.width / image.ratio

      index++

    rows

  calculateImagesRatio: (images) ->
    imagesWithRatio = JSON.parse JSON.stringify images
    imagesWithRatio.forEach (image) ->
      image.ratio = image.width / image.height

    imagesWithRatio

module.exports = CollageMixin