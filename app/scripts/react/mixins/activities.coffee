ERROR_TIMEOUT = 1000

# TODO React.PropsTypes.activitiesHandler
#
window.ReactActivitiesMixin =

  activitiesHandler: ->
    increment = (-> _.defer => @setState activities: ++@state.activities).bind @
    decrement = (-> _.defer => @setState activities: --@state.activities).bind @

    { increment, decrement }
