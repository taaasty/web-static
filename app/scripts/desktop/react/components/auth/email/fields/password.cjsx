classnames = require 'classnames'

EmailPasswordField = React.createClass

  propTypes:
    value:      React.PropTypes.string
    isDisabled: React.PropTypes.bool
    isError:    React.PropTypes.bool
    onChange:   React.PropTypes.func.isRequired

  render: ->
    fieldClasses = classnames('form-field', 'form-field--simple', {
      'form-field--error': @props.isError
    })

    return <div className="form-popup__item">
             <div className={ fieldClasses }>
               <AdaptiveInput
                   ref="input"
                   type="password"
                   value={ @props.value }
                   placeholder={ i18n.t('password_field') }
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