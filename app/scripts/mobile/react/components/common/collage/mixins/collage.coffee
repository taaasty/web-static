assign = require 'react/lib/Object.assign'

#TODO: refactor;
#TODO: probably will be better rewrite width & height values of cloned images
#      instead of creating *Collage keys.

CollageMixin =

  makeRows: (images) ->
    rows      = []
    rowIndex  = 0
    rowWidth  = 0
    newImages = JSON.parse JSON.stringify images

    @calculateImagesRatio newImages

    newImages.forEach (image, i) =>
      assign image,
        width:  @getItemNewWidth image, @props.minRowHeight
        height: @props.minRowHeight
        margin: @props.margin

      if i == 0 || rowWidth + image.width < @props.width
        rows[rowIndex] ?= []
        rows[rowIndex].push image
        rowWidth += image.width + image.margin * 2
      else
        @stretchRow rows[rowIndex], rowWidth
        rows[rowIndex + 1] = [image]
        rowWidth = image.width + image.margin * 2
        rowIndex++

      if i == newImages.length - 1
        @stretchRow rows[rowIndex], rowWidth

    rows

  stretchRow: (row, rowWidth) ->
    rowHeight      = row[0].height + row[0].margin * 2
    requiredHeight = Math.round(rowHeight / rowWidth * @props.width)
    resultWidth    = 0
    lastElement    = row[row.length - 1]

    row.forEach (image, i) =>
      assign image,
        width:  @getItemNewWidth image, (requiredHeight - @props.margin * 2)
        height: requiredHeight - @props.margin * 2

      resultWidth += image.width + image.margin * 2

    lastElement.width = lastElement.width + lastElement.margin * 2 + (@props.width - resultWidth) - @props.margin * 2

  getItemNewWidth: (item, newHeight) ->
    Math.round newHeight * item.ratio

  calculateImagesRatio: (images) ->
    images.forEach (image) ->
      image.ratio = image.width / image.height

module.exports = CollageMixin