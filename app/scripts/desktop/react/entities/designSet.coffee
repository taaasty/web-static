Design = require './design'

class DesignSet

  constructor: (data) ->
    @origin = new Design data
    @current = new Design data

module.exports = DesignSet