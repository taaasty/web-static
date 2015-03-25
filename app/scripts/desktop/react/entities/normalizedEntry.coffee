_ = require 'lodash'

class NormalizedEntry
  # data1
  # data2
  # data3
  # embedHtml
  # embedUrl
  # imageAttachments

  constructor: (data) ->
    _.extend @, data

module.exports = NormalizedEntry