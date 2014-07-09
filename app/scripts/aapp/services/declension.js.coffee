AApp.service 'Declension', ->
  # Пример:
  #
  # Declension( $scope.total, [ 'комментарий', 'комментария', 'комментариев' ] )
  #
  Declenstion = (number, titles=[]) ->
    cases = [ 2, 0, 1, 1, 1, 2 ]

    if (number % 100 > 4 && number % 100 < 20)
      idx = 2
    else
      if number % 10 < 5
        i = number % 10
      else
        i = 5
      idx = cases[i]
    return titles[idx]


  return Declenstion
