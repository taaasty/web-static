###* @jsx React.DOM ###

TYPES =
  followings: 'Подписки'
  followers:  'Подписчики'
  guesses:    'Заявки'
  blocked:    'Блокировка'

window.PersonsTabs = PersonsTabs = React.createClass

  propTypes:
    tabs:    React.PropTypes.array
    tabName: React.PropTypes.string.isRequired

  getInitialState: ->
    tabs: @props.tabs ? [{title: TYPES.followings}, {title: TYPES.followers}, {title: TYPES.guesses}]

  componentDidMount: ->
    @getSummaryData() unless @props.tabs

  getSummaryData: (tlogId) ->
    $.ajax
      url: Routes.api.relationships_summary_url()
      success: (data) =>
        tabs = @getFormattedData data
        @setState tabs: tabs
      error: (data) => TastyNotifyController.errorResponse data

  getFormattedData: (data) ->
    tabs = []

    for type, count of data
      index = type.indexOf '_count'
      type  = type.slice 0, index
      title = TYPES[type]

      tab = {
        type:  type
        title: title
        count: count
      }

      tabs.push tab
    tabs

  render: ->
    that = @
    tabs = @state.tabs.map (tab, i) ->
      active = that.props.tabName == tab.type
      `<PersonsTab active={ active }
                   title={ tab.title }
                   count={ tab.count }
                   type={ tab.type }
                   onClick={ that.props.onClick }
                   key={ i }></PersonsTab>`

    return `<nav className="tabs-nav tabs-nav--white">
              <ul className="tabs-nav__list">{ tabs }</ul>
            </nav>`

module.exports = PersonsTabs