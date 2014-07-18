ERROR_TIMEOUT = 1000

window.ReactActivitiesMixin =

  activitiesHandler: ->
    increment = (-> _.defer => @setState activities: ++@state.activities).bind @
    decrement = (-> _.defer => @setState activities: --@state.activities).bind @

    { increment, decrement }