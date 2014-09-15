window.isMobile = ->
  userAgent = navigator.userAgent || navigator.vendor || window.opera
  (/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent)

