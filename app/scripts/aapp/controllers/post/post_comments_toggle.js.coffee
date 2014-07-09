AApp.service 'PostCommentsToggleService', [ '$rootScope', ($rootScope)->
  SHOW_COMMENTS = 'SHOW_COMMENTS'

  #@showLoader = ->
    #loader.toggleClass "state--hidden", false

  #@hideLoader = ->
    #loader.toggleClass "state--hidden", true

  @showComments = ->
    $rootScope.$emit SHOW_COMMENTS

  @registerShowCommentsCollaback = (callback) ->
    $rootScope.$on SHOW_COMMENTS, callback

  return @
]

  #debugger
  #DesignSettingService =
    #show: ->
      #debugger
      #$rootScope.$emit 'showDesignSettings'

