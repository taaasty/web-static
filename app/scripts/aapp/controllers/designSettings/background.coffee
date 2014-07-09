AApp.controller 'DesignSettings:BackgroundCtrl', ['$scope', '$element', 'DesignSettingsService',
($scope, $element, DesignSettingsService) ->
  coverPixel        = $ ".js-cover-pixel"

  sendCover = (file) ->
    DesignSettingsService.showLoader()

    $('.js-upload-cover-input').fileupload
      paramName: 'file'
      url:   Routes.api.design_settings_cover_url($scope.$parent.tlog_data.slug)
      send:  files: [file]
      done:  -> 
        BackgroundCheck.refresh()
        TastyUtils.notify 'success', 'Настройки сохранены', 2000
      fail: (e,data) ->
        TastyUtils.notifyErrorResponse data.response().jqXHR
      always: ->
        DesignSettingsService.hideLoader()

  # Попытка делать через jquery file upload
  #uploadable = ->
    #hoverClass = "state--drag-hover"

    #dropZone = $('.js-drop-cover')
    #dropZone.on 'dragenter', -> dropZone.addClass hoverClass
    ##dropZone.on 'dragleave', -> dropZone.removeClass hoverClass

    #$('.js-upload-cover-input').fileupload
      #dropZone: dropZone
      #paramName: 'file'
      #url: Routes.api.design_settings_cover_url(tlog_slug)
      #
  setFormCover = (url)->
    coverPixel.css('background-image', 'url(' + url + ')')

  $scope.open = ->
    new FileReceiver # инициализируем загрузку ковера в настройках дизайна
      hoverClass: "state--drag-hover"
      cover:      ".js-cover"
      dropables:  [".js-drop-cover"]
      inputs:     [".js-upload-cover-input"]
      onReady:    (file) -> sendCover file
      onReaderLoad: (url) -> setFormCover url

  DesignSettingsService.setDesignSettingsCallback $scope.open

  return null
]

