window.ReactGrammarMixin = ReactGrammarMixin =

  declension: (number, titles) ->
    cases = [ 2, 0, 1, 1, 1, 2 ]
    return titles[2] if (number % 100 > 4 && number % 100 < 20)
    if (number % 10 < 5)
      titles[cases[number % 10]]
    else
      titles[cases[5]]

module.exports = ReactGrammarMixin