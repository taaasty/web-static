AApp.controller 'Post', ['$scope', '$element', 'PostCommentsToggleService',
($scope, $element, PostCommentsToggleService) ->
  $scope.entryId = $element.data('id')

  # Устанавливается в Comments controller-е
  #$scope.commentsToggle = ->
  $scope.toggleComments = ->
    $scope.$broadcast 'toggleComments'
    return false

  $scope.loading = false

]
