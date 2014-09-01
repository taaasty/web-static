defaults =
  hoverClass: "_hover"
  onStart: ->
  onProgress: ->
  onSuccess: ->
  onReady: ->
  onReaderLoad: ->
  dropables: null # Areas where user can drop files
  inputs: null # <input type=file> elements

class window.FileReceiver
  constructor: (options) ->
    @url = null
    @dragging = 0
    @tests =
      fileReader: typeof FileReader isnt "undefined"
      dnd: "draggable" of document.createElement("span")
      formData: !!window.FormData
      progress: "upload" of new XMLHttpRequest

    @settings = $.extend({}, defaults, options)
    @errors = []
    @accept = [
      "image/png"
      "image/jpeg"
      "image/gif"
    ]

    if @tests.fileReader or @tests.dnd

      @settings.dropables.forEach (dropable) =>
        $(dropable).
          on("dragenter", @dragenter).
          on("dragleave", @dragleave).
          on("dragover", @noPropagation).
          on("dragend", @noPropagation).
          on("drop", @drop)

      @settings.inputs.forEach (input) =>
        $(input).on "change", @changeInput

  _error: (msg) ->
    @errors.push msg

  noPropagation: (e) =>
    e.stopPropagation()
    if e.preventDefault
      e.preventDefault()
    else
      e.returnValue = false

  dragenter: (event) =>
    @dragging++
    target = event.currentTarget
    $(target).addClass @settings.hoverClass
    return

  dragleave: (event) =>
    @dragging--
    target = event.currentTarget
    $(target).removeClass @settings.hoverClass  if @dragging is 0
    return

  drop: (event) =>
    @dragging = 0
    event.preventDefault()
    target = event.currentTarget
    $(target).removeClass @settings.hoverClass
    files = event.originalEvent.dataTransfer.files
    @readFile files[0]  if files.length > 0
    return

  changeInput: (event) =>
    files = event.target.files
    @readFile files[0]  if files.length > 0
    return

  readFile: (file) ->
    $cover = $(@settings.cover)
    tests = @tests
    formData = (if tests.formData then new FormData() else null)
    if @accept.indexOf(file.type) is -1

      #if (file.type.indexOf("image") == -1) { Можем организовать для всех картинок - bmp и т.д.
      @_error "загрузить можно только изображения"
    else
      formData.append "file", file  if tests.formData
      reader = new FileReader()
      @settings.onStart()
      reader.onload = (e) =>
        url = e.target.result
        $cover.css "background-image", "url(" + url + ")"
        $cover.data "file", file
        @settings.onReaderLoad url
        return

      reader.readAsDataURL file
      @settings.onReady file
    return

  toggleInput: (input, state) ->
    @coverInput.forEach (input) ->
      if state
        $(input).removeAttr "disabled"
      else
        $(input).attr "disabled", "disabled"
      return

    return