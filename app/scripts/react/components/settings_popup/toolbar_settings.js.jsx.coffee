###* @jsx React.DOM ###
#= require ./settings_radio_item

window.ToolbarSettings = React.createClass
  mixins: ['ReactActivitiesUser', ReactShakeMixin, React.addons.LinkedStateMixin, RequesterMixin]

  propTypes:
    title:         React.PropTypes.string.isRequired
    user:          React.PropTypes.instanceOf(Backbone.Model).isRequired
    onUserChanged: React.PropTypes.func.isRequired

  getInitialState: ->
    isProcess: false
    user:   @props.user

  componentWillMount: ->
    @props.user.on 'change', @updateStateUser
    Mousetrap.bind 'esc', @close

  componentWillUnmount: ->
    @props.user.off 'change', @updateStateUser

  updateStateUser: (user) -> @props.onUserChanged user

  save: (key, value) ->
    console.log 'save', key, value
    @incrementActivities()

    @setState isProcess: true

    data = {}
    data[key] = value

    @createRequest
      url:  Routes.api.update_profile_url()
      data: data
      dataType: 'JSON'
      method:   'PUT'
      success: (data) =>
        TastyEvents.trigger "settings:#{key}:changed", [value]
        if key is 'slug'
          TastyNotifyController.notifySuccess 'Внимание! Сейчас будет произведён переход по новому адресу вашего тлога', 3000
          setTimeout (->
            window.location = data.tlog_url
          ), 3000
        @props.user.set data
      error: (data) =>
        @shake()
        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState => @setState isProcess: false
        @decrementActivities()

  render: ->
    saveCallback = @save

    return `<div className="settings">
              <form>
                <SettingsHeader user={ this.state.user }
                                activitiesHandler={ this.props.activitiesHandler }
                                saveCallback={ saveCallback } />

                <div className="settings__body">
                  <SettingsRadioItem title="Закрытый дневник?"
                                     description="Управление видимостью вашего дневника. Закрытый дневник виден только тем, на кого вы подписаны."
                                     user={ this.state.user }
                                     saveCallback={ saveCallback }
                                     key="is_privacy" />

                  <SettingsRadioItem title="Тлогодень"
                                     description="Это режим отображения, когда на странице показываются записи только за один день."
                                     user={ this.state.user }
                                     saveCallback={ saveCallback }
                                     key="is_daylog" />

                  <SettingsRadioItem title="Вы - девушка"
                                     description="На Тейсти сложилось так, что 7 из 10 пользователей – это девушки. Поэтому по-умолчанию для всех именно такая настройка."
                                     user={ this.state.user }
                                     saveCallback={ saveCallback }
                                     key="is_female" />

                  <SettingsEmailInput email={ this.state.user.get('email') }
                                      isConfirmed={ this.state.user.get('is_confirmed') }
                                      saveCallback={ saveCallback } />

                  <SettingsRadioItem title="Уведомления"
                                     description="Вы хотите получать уведомления о всех новых комментариях, подписчиках и личных сообщениях?"
                                     user={ this.state.user }
                                     saveCallback={ saveCallback }
                                     key="available_notifications"/>

                  <SettingsPasswordItem saveCallback={ saveCallback } />

                  <SettingsAccountsItem accounts={ [] }
                                        user={ this.state.user } />
                </div>
              </form>
            </div>`
