###* @jsx React.DOM ###

window.SettingsTitle = React.createClass

  propTypes:
    title:        React.PropTypes.string.isRequired
    saveCallback: React.PropTypes.func.isRequired

  getInitialState: ->
    title: @props.title

  render: ->
   `<div className="hero-simple__text">
      <EditableField defaultValue={ this.state.title }
                     placeholder="Введите небольшое описание вашего тлога"
                     onEditEnd={ this.onEditEnd } />
    </div>`

  onEditEnd: (title) ->
    if title isnt @state.title
      @setState title: title
      @props.saveCallback 'title', title