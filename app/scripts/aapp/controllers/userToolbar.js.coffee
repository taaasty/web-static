AApp.controller 'UserToolbar', ['$scope', '$element', 'DesignSettingsService',
  ($scope, $element, DesignSettingsService) ->

    $scope.showDesignSettings = -> DesignSettingsService.showDesignSettings()
]
