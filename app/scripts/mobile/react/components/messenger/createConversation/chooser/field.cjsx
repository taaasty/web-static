_ = require 'lodash'
{ PropTypes } = React

MessengerChooserField = React.createClass
  displayName: 'MessengerChooserField'

  propTypes:
    value:    PropTypes.string.isRequired
    onChange: PropTypes.func.isRequired

  getDefaultProps: ->
    value: ''

  render: ->
    <input type="text"
           value={ @props.value }
           className="messages__chooser-input"
           onChange={ @handleChange } />

  handleChange: (e) ->
    value = _.trim e.target.value
    @props.onChange value

module.exports = MessengerChooserField