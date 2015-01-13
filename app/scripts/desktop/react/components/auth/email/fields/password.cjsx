cx = require 'react/lib/cx'

#TODO: i18n
PLACEHOLDER = 'Пароль'

EmailPasswordField = React.createClass

  propTypes:
    value:      React.PropTypes.string
    isDisabled: React.PropTypes.bool
    isError:    React.PropTypes.bool
    onChange:   React.PropTypes.func.isRequired

  render: ->
    fieldClasses = cx
      'form-field':         true
      'form-field--simple': true
      'form-field--error':  @props.isError

    return <div className="form-popup__item">
             <div className={ fieldClasses }>
               <AdaptiveInput
                   ref="input"
                   type="password"
                   value={ @props.value }
                   placeholder={ PLACEHOLDER }
                   required={ true }
                   disabled={ @props.isDisabled }
                   className="form-field__input"
                   onChange={ @props.onChange } />
               <div className="form-field__bg" />
             </div>
           </div>

  getValue: ->
    @refs.input.getValue()

module.exports = EmailPasswordField