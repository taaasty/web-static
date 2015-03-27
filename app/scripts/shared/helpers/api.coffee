ApiHelpers =
  settle: (promises) ->
    d = $.Deferred()
    counter = 0
    results = Array promises.length
    _.forEach promises, (promise,i) ->
      promise
        .then ->
          results[i] = state: "fulfilled", promise: promise
        .fail ->
          results[i] = state: "rejected", promise: promise
        .always ->
          counter++
          progress = (promises.length - (promises.length - counter)) / promises.length
          d.notify progress, promises.length
          d.resolve results if counter == promises.length

    d.promise()

module.exports = ApiHelpers