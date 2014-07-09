AApp.filter 'opacityPercentage', ->
  (input) ->
    parseInt(input * 100) + '%'
