###* @jsx React.DOM ###

FIRST_ROW_RATIO = 2.5
NEXT_ROWS_RATIO = 4

module.experts = window.ImagesCollage = React.createClass
  propTypes:
    imageUrls: React.PropTypes.array

  getDefaultProps: ->
    item: ".collage__item"    # блок с картинкой
    img: ".collage__item-img" # селектор на картинку внутри item

    lastClass: "is--last"     # последний в строке
    prefixClass: "collage--"       # выставляются классы big, когда идёт сначала большая картинка - collage--big

    margin: 0                 # отступы между картинками
    preload: true             # сами грузятся картинки или уже загружены на странице

    #preload: true

  render: ->
    imageElements = @props.imageUrls.map (url) =>
      @renderImageItem imageUrl: url

    return `<div className="collage">{imageElements}</div>`
    #self = this
    #options = self.options
    #elements = self.elements
    #margin = options.margin
    #lastClass = options.lastClass
    #elements.collage.width elements.collage.width()
    #elements.item.show()
    #self.data.imgs = buildImgsData(imgs, elements.collage.width(), margin, lastClass)
    #self.data.type = self.data.imgs.type
    #elements.collage.addClass options.prefixClass + self.data.type  unless typeof self.data.type is "undefined"
    #i = 0
    #countImgs = self.data.imgs.length

    #while i < countImgs
      #img = self.data.imgs[i]
      #css =
        #width: img._width
        #height: img._height

      #imgs.eq(i).css css
      #imgs.eq(i).closest(options.item).addClass(img.mod).css css
      #i++
    #elements.item.hide()
    #imgs.closest(options.item).fadeIn 300
    #return

  renderImageItem: ({imageUrl, alt})->
    `<a class="collage__item" href={imageUrl} data-fancybox-group="1" target="_blank">
      <img class="collage__item-img" src={imageUrl} alt={alt} />
    </a>`

  # Убрал, потому что это лопает картинки из blob: + "?" + Date.now();
  buildImgsData: (data, cntWidth, margin, lastClass) ->
    return data  if data.length is 0
    item = undefined
    ratio = undefined
    totalRatio = 0
    i = undefined
    i = 0
    while i < data.length
      item = data[i]
      ratio = item.width / item.height
      item.ratio = ratio
      totalRatio += ratio
      i++
    iterator = [
      data
      0
    ]
    if data.length is 1
      item = data[0]
      item._width = Math.min(item.width, cntWidth)
      item._height = Math.round(item._width / item.ratio)
    else if totalRatio >= FIRST_ROW_RATIO + NEXT_ROWS_RATIO or data.length is 2
      buildRows data, cntWidth, margin, lastClass
    else if data[0].ratio > 1
      data.type = "rows"
      rows = []
      rows.push getRow(iterator, data[0].ratio)
      pushNextRows rows, iterator, cntWidth, margin, lastClass
    else
      data.type = "big"
      bigItem = data[0]
      vertSumRatio = 0
      vertMargin = (data.length - 2) * margin
      rowWidth = cntWidth - margin - 1
      rowHeight = undefined
      vertWidth = undefined
      totalVertHeight = 0
      i = 1
      while i < data.length
        item = data[i]
        vertSumRatio += 1 / item.ratio
        i++
      vertWidth = Math.round((rowWidth - bigItem.ratio * vertMargin) / (1 + bigItem.ratio * vertSumRatio))
      rowHeight = Math.round((rowWidth - vertWidth) / bigItem.ratio)
      if vertWidth < 0.2 * rowWidth
        buildRows data, cntWidth, margin, lastClass
      else
        i = 0
        while i < data.length
          item = data[i]
          if i is 0
            item._width = rowWidth - vertWidth
            item._height = rowHeight
          else
            item._width = vertWidth
            item._height = Math.round(vertWidth / item.ratio)
            totalVertHeight += item._height
          i++
        data[0]._width += rowWidth - data[0]._width - vertWidth
        item = data[data.length - 1]
        item._height += rowHeight - totalVertHeight - (data.length - 2) * margin
    data
  buildRows = (data, cntWidth, margin, lastClass) ->
    rows = []
    iterator = [
      data
      0
    ]
    rows.push getRow(iterator, FIRST_ROW_RATIO)
    pushNextRows rows, iterator, cntWidth, margin, lastClass
    data.type = "rows"
    return
  pushNextRows = (rows, iterator, cntWidth, margin, lastClass) ->
    data = iterator[0]
    i = 0
    rows.push getRow(iterator, NEXT_ROWS_RATIO + (i++ % 2) * 0.5)  while iterator[1] < data.length
    lastRow = rows.pop()
    if lastRow.volume < NEXT_ROWS_RATIO * 0.65
      if rows.length is 0
        rows.push lastRow
      else
        prevLastRow = rows[rows.length - 1]
        prevLastRow.ratio += lastRow.ratio
        Array::push.apply prevLastRow, lastRow
    else
      rows.push lastRow
    rowWidth = undefined
    rowHeight = undefined
    rowTotalWidth = undefined
    row = undefined
    ii = undefined
    item = undefined
    i = 0
    while i < rows.length
      row = rows[i]
      rowWidth = cntWidth - margin * (row.length - 1) - 1
      rowHeight = Math.round(rowWidth / row.ratio)
      rowTotalWidth = 0
      ii = 0
      while ii < row.length
        item = row[ii]
        if ii is row.length - 1
          item.mod = lastClass
        else
          
          #delete item.mod;
          item.mod = `undefined`
          try
            delete item.mod
        item._height = rowHeight
        item._width = Math.round(rowHeight * item.ratio)
        rowTotalWidth += item._width
        ii++
      item = row[row.length - 1]
      item._width += rowWidth - rowTotalWidth
      i++
    return
  getRow = (iterator, maxRatio) ->
    row = []
    item = undefined
    row.ratio = 0
    row.volume = 0
    while row.volume < maxRatio
      item = iterator[0][iterator[1]++]
      break  unless item
      row.push item
      row.ratio += item.ratio
      row.volume += Math.max(item.ratio, 1 / item.ratio)
    if row.volume - maxRatio > 0.15 * maxRatio and row.length isnt 1
      lastItem = row.pop()
      row.ratio -= lastItem.ratio
      row.volume -= Math.max(lastItem.ratio, 1 / lastItem.ratio)
      iterator[1]--
    row

  cleanup: ->
    self = this
    options = self.options
    elements = self.elements
    self.data = {}
    elements.collage.removeAttr("style").removeClass options.prefixClass + self.data.type
    elements.item.removeAttr("style").removeClass self.options.lastClass
    elements.img.removeAttr "style"
    return

  update: ->
    self = this
    options = self.options
    elements = self.elements
    elements.item = elements.collage.find(options.item)
    elements.img = elements.collage.find(options.img)
    @cleanup()
    imgs = undefined
    if options.preload
      imgs = elements.img.filter(->
        this  unless $.data(this, "error")
      )
    else
      imgs = elements.img
    return  if imgs.length is 0
    @create imgs
    return


  preload: (fn) ->
    self = this
    elements = self.elements
    count = elements.item.length
    loaded = 0
    elements.img.one("load error", (e) ->
      if e.type is "error"
        count--
        $.data this, "error", true
      else
        loaded++
      if loaded >= count
        imgs = elements.img.filter(->
          this  unless $.data(this, "error")
        )
        fn imgs: imgs
      return
    ).each ->
      @src = @src
      return

    return
