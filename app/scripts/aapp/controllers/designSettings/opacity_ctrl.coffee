AApp.controller 'DesignSettings:OpacityCtrl', ['$scope', '$element',
  ($scope, $element) ->
    $scope.formData = $scope.$parent.formData
    $scope.formData.feedOpacityPercents = $scope.formData.feedOpacity * 100

    feedBg = $ "[tlog-body]"

    setOpacity = (value) ->
      console.log value
      $scope.formData.feedOpacity = value
      $scope.formData.feedOpacityPercents = parseInt( $scope.formData.feedOpacity * 100 )
      $scope.$apply()

      return unless $scope.$parent.isOpen

      feedBg.css opacity: value

    $range = $element.find ".js-form-range-opacity"

    config =
      min : 0,
      max : 1,
      step : 0.01,
      range : "min",
      value : $scope.formData.feedOpacity,
      animate : false,
      orientation : "horizontal",
      # Отключил из-за того что apply накладываются
      #create : (event, ui) ->
        #$range.slider "option", "value", $scope.opacity

      # Вызывается при каждом движении
      slide : (event, ui) ->
        setOpacity ui.value

      # Вызывается когда слайдер отпущен
      change : (event, ui) ->
        setOpacity ui.value

    $range.slider config

    return null
]
