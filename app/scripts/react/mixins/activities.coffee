ERROR_TIMEOUT = 1000

BaseMixin =
  setActivitiesHandler: (handler) ->
    @activitiesHandler    = handler
    @hasActivities        = handler.hasActivities
    @incrementActivities = handler.increment
    @decrementActivities = handler.decrement


# TODO React.PropsTypes.activitiesHandler
# TODO Создавать объект типа ActivitiesHandler один раз и в следующий раз отдавать кешированый
ram =
  componentWillMount: ->
    @setActivitiesHandler @createActivitiesHandler()

  getInitialState: ->
    activities: 0

  incrementActivities: -> @activitiesHandler.incrementActivities
  decrementActivities: -> @activitiesHandler.decrementActivities

  createActivitiesHandler: ->
    increment = (-> _.defer => @setState activities: ++@state.activities).bind @
    decrement = (-> _.defer => @setState activities: --@state.activities).bind @
    hasActivities = ( -> @state.activities > 0 ).bind @
    activities = ( -> @state.activities ).bind @

    { increment, decrement, hasActivities, activities }

# Добавляется тому, кто активитисы принимает
rau =
  propTypes:
    activitiesHandler: React.PropTypes.object.isRequired

  componentWillMount: ->
    @setActivitiesHandler @props.activitiesHandler

  componentWillReceiveProps: (nextProps) ->
    @setActivitiesHandler nextProps.activitiesHandler

React.mixins.add 'ReactActivitiesMixin', [ram, BaseMixin]
React.mixins.add 'ReactActivitiesUser', [rau, BaseMixin]