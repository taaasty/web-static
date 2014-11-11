window.ReactShakeMixin =
  shake: ->
    form = $(@getDOMNode())
    animationEnd = "webkitAnimationEnd oanimationend msAnimationEnd animationend"

    form.addClass("shake animated").one animationEnd, ->
      form.removeClass "shake animated"
