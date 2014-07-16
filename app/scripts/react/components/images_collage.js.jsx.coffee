###* @jsx React.DOM ###

FIRST_ROW_RATIO = 2.5
NEXT_ROWS_RATIO = 4

module.experts = window.ImagesCollage = React.createClass
  propTypes:
    imageUrls: React.PropTypes.array

  getDefaultProps: ->
    itemClass:  ".collage__item"    # блок с картинкой
    lastItemClass:  "is--last"      # последний в строке

    imageClass: ".collage__item-img" # селектор на картинку внутри item

    classPrefix: "collage--"    # выставляются классы big, когда идёт сначала большая картинка - collage--big

    margin: 0                 # отступы между картинками
    preload: true             # сами грузятся картинки или уже загружены на странице

  getInitialState: ->
    images: []

  componentDidMount: ->
    $node = $ @getDOMNode()
    $node.width  $node.width()
    $node.height '800px'
    #$collage = $node.find('.collage')
    #$collage.show()
    @loadImages()

  containerWidth: -> $(@getDOMNode()).width()

  loadImages: ->
    imageElements = @props.imageUrls.map (src) =>
      image = new Image src: src
      image.src = src
      ImagesLoaded(image).on 'done', (instance) =>
        image.ratio = image.width / image.height
        @state.images.push image
        @setState images: @state.images

  render: ->
    key = 0
    imageElements = @state.images.map (image) =>
      image.key = key+=1
      image.isLast = @state.images.length == key
      @renderImageItem image

    return `<div className="collage">{imageElements}</div>`

    #self.data.imgs = buildImgsData(imgs, elements.collage.width(), margin, lastClass)
    #self.data.type = self.data.imgs.type
    #elements.collage.addClass options.prefixClass + self.data.type  unless typeof self.data.type is "undefined"
    #i = 0
    #countImgs = self.data.imgs.length

  getTotalRatio: ->
    totalRatio = 0
    @state.images.map (image) -> totalRatio += image.ratio
    return totalRatio

  renderImageItem: (image)->
    itemClasses = {}
    itemClasses[@props.itemClass] = true
    itemClasses[@props.lastItemClass] = image.isLast
    `<a className={React.addons.classSet(itemClasses)} key={image.key} href={image.src} data-fancybox-group={image.key} target="_blank">
      <img className={this.props.imageClass} src={image.src} width={image.width} height={image.height} alt={image.alt} />
    </a>`

  # Убрал, потому что это лопает картинки из blob: + "?" + Date.now();
  buildImgsData: (data, cntWidth, margin, lastClass) ->
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
