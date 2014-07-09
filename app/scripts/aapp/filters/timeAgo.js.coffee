AApp.filter 'timeAgo', ->
  (date) ->
    moment(date).fromNow()

