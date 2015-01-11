assign = require 'react/lib/Object.assign'

#TODO: refactor;
#TODO: probably will be better rewrite width & height values of cloned images
#      instead of creating *Collage keys.

CollageMixin =

  processImages: (images) ->
    rows = []
    rowIndex = 0
    rowWidth = 0
    newImages = @calculateImagesRatio images

    newImages.forEach (image, i) =>
      assign image,
        widthCollage:  @getItemNewWidth image, 150
        heightCollage: 150
        marginCollage: @props.margin

      if i == 0 || rowWidth + image.widthCollage < @props.width
        rows[rowIndex] ?= []
        rows[rowIndex].push image
        rowWidth += image.widthCollage + image.marginCollage * 2
      else
        @stretchRow rows[rowIndex], rowWidth
        rows[rowIndex + 1] = [image]
        rowWidth = image.widthCollage + image.marginCollage * 2
        rowIndex++

      if i == newImages.length - 1
        @stretchRow rows[rowIndex], rowWidth

    rows

  stretchRow: (row, rowWidth) ->
    rowHeight        = row[0].heightCollage + row[0].marginCollage * 2
    requiredWidth    = @props.width
    requiredHeight   = rowHeight / rowWidth * requiredWidth
    resultWidth      = 0
    lastElementWidth = 0

    row.forEach (image, i) =>
      assign image,
        widthCollage:  @getItemNewWidth image, (requiredHeight - @props.margin * 2)
        heightCollage: requiredHeight - @props.margin * 2

      resultWidth += image.widthCollage + image.marginCollage * 2

    lastElementWidth = row[row.length - 1].widthCollage + row[row.length - 1].marginCollage * 2 + (requiredWidth - resultWidth) - @props.margin * 2
    row[row.length - 1].widthCollage = lastElementWidth

  getItemNewWidth: (item, newHeight) ->
    Math.round newHeight * item.ratio

  calculateImagesRatio: (images) ->
    imagesWithRatio = JSON.parse JSON.stringify images

    imagesWithRatio.forEach (image) ->
      image.ratio = image.width / image.height

    imagesWithRatio

module.exports = CollageMixin