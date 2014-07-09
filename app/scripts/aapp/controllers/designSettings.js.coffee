AApp.controller 'DesignSettings', ['$scope', '$element', 'DesignSettingsService', 'DesignSettingsDragable', 'DesignSettingsSaver',
  ($scope, $element, DesignSettingsService, DesignSettingsDragable, DesignSettingsSaver) ->
    $scope.tlog_data  = $element.data('tlog')
    $scope.formData   = $scope.tlog_data.design

    # мы его все равно загружаем отдельно, нечего ему тут болтаться
    delete $scope.formData['background_url']

    $scope.open = ->
      $scope.isOpen = true
      # Restore old position from cookie
      #$element.css "top: 10; left: 10"
      $element.show()
      DesignSettingsDragable.draggable $element
      #uploadable()
      return false

    $scope.close = ->
      $scope.isOpen = false
      $element.hide()
      return false

    new DesignSettingsSaver $scope
    DesignSettingsService.setDesignSettingsCallback $scope.open

    return null
  ]





    #$scope.formTestData = # Данные для тестирования
      #feedColor:   'black'
      #headerColor: 'white'
      #feedOpacity:    90
      #fontType:    'sans'
      #coverAlign:  'justify'
