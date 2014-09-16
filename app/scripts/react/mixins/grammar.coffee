window.ReactGrammarMixin =

  declension: (number, titles) ->
    cases = [ 2, 0, 1, 1, 1, 2 ]
    return titles[2] if (number % 100 > 4 && number % 100 < 20)
    if (number % 10 < 5)
      titles[cases[number % 10]]
    else
      titles[cases[5]]

  timeAgo: (date) ->
    now = moment()
    createdAt = moment date

    if now.diff(createdAt, 'minutes') < 180
      # "2 часа назад"
      date = createdAt.fromNow()
    else if now.diff(createdAt, 'days') < 1
      # "Сегодня в 10:49"
      date = createdAt.calendar()
    else
      if now.year() != createdAt.year()
        # "9 августа 2013"
        date = createdAt.format 'D MMMM YYYY'
      else
        # "9 августа"
        date = createdAt.format 'D MMMM'

    date