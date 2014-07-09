AApp.controller 'DesignSettings:RadioCtrl', ['$scope', '$element', ($scope, $element) ->
  key = $element.data 'key'

  unless key?
    console.log "No data-key for #{$element}"
    return

  body = $ "body"

  activeClass= 'form-radio--active'

  $scope.formData = $scope.$parent.formData

  elementsHash = {}

  elements = $element.find '.form-radio'
  elements.each (index, radioElement) ->
    el = $ radioElement
    value = el.find('input').val()
    elementsHash[value] = el

  $scope.change = ->
    $scope.select $scope.formData[key]
    return

  $scope.clearAll = ->
    elements.each (index, radioElement) ->
      $(radioElement).removeClass activeClass

  prefix = 'tlog-'+key.toLowerCase()+'-'

  $scope.select = (value) ->
    $scope.clearAll()

    $scope.setBodyClass value

  $scope.setBodyClass = (value) ->
    # КОгда подключаетя этот контроллер он портит body

    elementsHash[value].addClass activeClass

    return unless $scope.$parent.isOpen

    values = Object.keys elementsHash

    # Привязать это через какой-то скоуп или контроллер
    classes = values.map((value) -> prefix+value).join ' '
    body.removeClass(classes).addClass prefix+value

  $scope.select $scope.formData[key]

]
