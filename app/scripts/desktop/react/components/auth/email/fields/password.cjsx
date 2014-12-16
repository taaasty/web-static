#TODO: i18n
PLACEHOLDER = 'Пароль'

EmailPasswordField = React.createClass

  propTypes:
    value:      React.PropTypes.string
    isDisabled: React.PropTypes.bool
    isError:    React.PropTypes.bool
    onChange:   React.PropTypes.func.isRequired

  render: ->
    fieldClasses = React.addons.classSet
      'form-field':         true
      'form-field--simple': true
      'form-field--error':  @props.isError

    return <div className="form-popup__item">
             <div className={ fieldClasses }>
               <AdaptiveInput
                   type="password"
                   value={ this.props.value }
                   placeholder={ PLACEHOLDER }
                   required={ true }
                   disabled={ this.props.isDisabled }
                   className="form-field__input"
                   onChange={ this.props.onChange } />
               <div className="form-field__bg" />
             </div>
           </div>

module.exports = EmailPasswordField