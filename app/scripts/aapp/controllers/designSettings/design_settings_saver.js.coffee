AApp.factory 'DesignSettingsSaver', [ '$timeout', '$http', 'DesignSettingsService', ($timeout, $http, DesignSettingsService) ->
  secondsToWaitBeforeSave = 1.5

  class DesignSettingsSaver
    constructor: (scope)->
      @scope = scope
      @scope.$watch 'formData', @debounceUpdate, true

    saveChanges: =>
      options=
        method: 'PUT'
        data:   @scope.formData
        withCredentials: true
        url:    Routes.api.design_settings_url(@scope.tlog_data.slug)

      DesignSettingsService.showLoader()

      $http(options).
        success( -> TastyUtils.notify 'success', 'Настройки сохранены', 2000 ).
        error( (data, status) -> TastyUtils.notifyErrorResponse data ).
        finally( -> DesignSettingsService.hideLoader() )

    debounceUpdate:  (newVal, oldVal) =>
      if newVal != oldVal
        $timeout.cancel @timeout if @timeout
        @timeout = $timeout(@saveChanges, secondsToWaitBeforeSave * 1000 )

]
