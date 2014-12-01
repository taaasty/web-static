###* @jsx React.DOM ###

#TODO: i18n
MESSAGE = 'Сейчас будет создан новый аккаунт #{slug}'

EmailConfirmRegister = React.createClass

  propTypes:
    login:    React.PropTypes.string
    password: React.PropTypes.string

  render: ->
    console.log @getMessage()
    return `<div className="email-register-confirm">
              { MESSAGE }
            </div>`

  getMessage: ->
    # Берём часть email, до собачки.
    #FIXME: Что если такой ник уже есть и принадлежит кому-то другому?
    userSlug = @props.login.match(/.*(?=@)/)[0]

    MESSAGE.replace /#{.+}/, userSlug

module.exports = EmailConfirmRegister