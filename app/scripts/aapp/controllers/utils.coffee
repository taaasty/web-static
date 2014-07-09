window.AApp.controller 'Utils', ['$scope', ($scope) ->

  $scope.goToInvite = ->
    scrollTop = $(document).height() - $(window).height()
    $("html, body").animate {scrollTop: scrollTop}, 300, 'swing'
    return false

  ]
