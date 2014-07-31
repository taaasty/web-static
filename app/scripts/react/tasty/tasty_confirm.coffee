window.TastyConfirm =
  init: ->
    Mousetrap.bind 'esc', @close
    $(".confirmation__close, .confirmation__fader").click @close

  close: ->
    $("body").removeClass "confirmation-enabled"
    $(".confirmation").hide()

  show: ({message, button, callback}) ->
    $(".confirmation").show()
    $("body").addClass "confirmation-enabled"
    $(".confirmation .confirmation__text").html message
    $(".confirmation .button__text").html button
    $(".confirmation .button").off("click").on "click", ->
      $(".confirmation").hide()
      $("body").removeClass "confirmation-enabled"
      callback.call()

TastyConfirm.init()