$ ->
  #$(".video .video__overlay").click ->
  $(".js-video-start").click ->
    $embed = $(@).parents(".video").find(".video__embed")
    $embed.show().append $embed.data("frame")
    $embed.width('100%')
    $embed.height('100%')
    $iframe = $embed.find("iframe")
    $iframe.attr width:   $embed.data('width')  || $embed.width()
    $iframe.attr height:  $embed.data('height') || $embed.height()
