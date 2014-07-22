window.PostEditor_PersistenceMixin =
  propTypes:
    entry:       React.PropTypes.object.isRequired
    setLoading:  React.PropTypes.func.isRequired
    isLoading:   React.PropTypes.bool.isRequired

  savingUrl: ->
    if @props.entry.id?
      Routes.api.update_entry_url @props.entry
    else
      Routes.api.create_entry_url @props.entry.type

  savingMethod: ->
    if @props.entry.id?
      'PUT'
    else
      'POST'

  saveEntry: ->
    @props.setLoading true
    $.ajax
      url:     @savingUrl()
      method:  @savingMethod()
      data:    @data()
      success: (data) =>
        @props.setLoading false
        @setState entry: data, type: data.type
        _.defer =>
          console.log 'goto', data.entry_url
          window.location.href = data.entry_url unless window.TASTY_ENV=='development'
      error:   (data) =>
        @props.setLoading false
        TastyNotifyController.errorResponse data


