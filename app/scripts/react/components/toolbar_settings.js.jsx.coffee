###* @jsx React.DOM ###
#= require ./settings_radio_item

module.experts = window.ToolbarSettings = React.createClass
  mixins: [ReactShakeMixin, React.addons.LinkedStateMixin]

  propTypes:
    title:       React.PropTypes.string.isRequired
    spinnerLink: React.PropTypes.object.isRequired

  getInitialState: ->
    saving: false
    user:   @props.user

  componentWillMount: ->
    Mousetrap.bind 'esc', @close

  save: (key, value) ->
    console.log 'save', key, value

    @props.spinnerLink.requestChange @props.spinnerLink.value+1

    @state.user[key] = value

    @setState saving: true

    data = {}
    data[key] = value

    $.ajax
      url:      Routes.api.update_profile_url()
      dataType: 'json'
      method:   'put'
      data:     data
      success: (data) =>
        @props.spinnerLink.requestChange @props.spinnerLink.value-1
        @setState saving: false, user: data
        Tasty.user = data

        #TastyNotifyController.notify 'success', "Вам на почту отправлена ссылка для восстановления пароля"
        #ReactApp.closeShellBox()
      error: (data) =>
        @props.spinnerLink.requestChange @props.spinnerLink.value-1
        @setState saving: false
        @shake()
        TastyNotifyController.errorResponse data


  render: ->
    saveCallback = @save

    console.log 'render', @props

    return `<div className="settings">
              <form onSubmit={this.submit}>
                <SettingsHeader 
                saveCallback={saveCallback}
                spinnerLink={this.props.spinnerLink}
                title={this.state.user.title}
                user={this.state.user}/>

                <div className="settings__body">

                    <SettingsRadioItem
                      saveCallback={saveCallback}
                      user={this.state.user}
                      key='is_privacy'
                      title='Закрытый дневник?'
                      description='Управление видимостью вашего дневника. Закрытый дневник виден только тем, на кого вы подписаны.' />

                    <SettingsVkontakteItem 
                      user={this.state.user}
                      />

                    <SettingsRadioItem
                      saveCallback={saveCallback}
                      user={this.state.user}
                      key='is_daylog'
                      title='Тлогодень'
                      description='Это режим отображения, когда на странице показыватются записи только за один день.' />

                    <SettingsRadioItem
                      saveCallback={saveCallback}
                      user={this.state.user}
                      key='is_female'
                      title='Вы - девушка'
                      description='На Тейсти сложилось так, что 7 из 10 пользователей – это девушки. Поэтому по-умолчанию для всех именно такая настройка.' />

                    <SettingsEmailInput 
                      saveCallback={saveCallback}
                      email={this.state.user.email}
                      isConfirmed={this.state.user.is_confirmed}
                      />

                    <SettingsRadioItem
                      saveCallback={saveCallback}
                      user={this.state.user}
                      key='available_notifications'
                      title='Уведомления'
                      description='Вы хотите получать уведомления о всех новых комментариях, подписчиках и личных сообщениях?' />

                    <SettingsPasswordItem 
                      saveCallback={saveCallback}
                      user={this.state.user}
                    />

                    <SettingsAccountsItem user={this.state.user} accounts={[]}/>
                </div>
              </form>
            </div>`
