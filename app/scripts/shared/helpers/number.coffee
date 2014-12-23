NumberHelpers =

  formatNumber: (rawNumber, round, delimiter = ' ') ->
    number = parseInt rawNumber

    if round?
      number = Math.ceil( number / round ) * round

    number.toString().replace /\B(?=(\d{3})+(?!\d))/g, delimiter

  reduceNumber: (rawNumber, delimiter = ' ') ->
    number = parseInt rawNumber

    if number > 1000  
      number = Math.floor(number / 1000) + 'k+'

    number

module.exports = NumberHelpers