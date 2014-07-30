###* @jsx React.DOM ###

window.MetabarDropdownMenuReportItem = React.createClass

  propTypes:
    entryId: React.PropTypes.number.isRequired

  render: ->
    `<a onClick={ this.onClick }
        className="meta-item__dropdown-item">
      <i className="icon icon--exclamation-mark"></i>
      Пожаловаться
    </a>`

  onClick: (e) ->
    e.stopPropagation()
    e.preventDefault()

    console.info "Принимаем жалобу пользователя на пост #{@props.entryId}"