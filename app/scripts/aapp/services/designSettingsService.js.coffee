AApp.service 'DesignSettingsService', [ '$rootScope', ($rootScope)->
  SHOW_DESIGN_SETTINGS = 'SHOW_DESIGN_SETTINGS'

  loader            = $ '.js-popup-loader'

  @showLoader = ->
    loader.toggleClass "state--hidden", false

  @hideLoader = ->
    loader.toggleClass "state--hidden", true

  #@showDesignSettings = ->
    #$rootScope.$emit SHOW_DESIGN_SETTINGS

  @setDesignSettingsCallback = (callback) ->
    $(document).on SHOW_DESIGN_SETTINGS, callback

  return @
]

  #debugger
  #DesignSettingService =
    #show: ->
      #debugger
      #$rootScope.$emit 'showDesignSettings'
