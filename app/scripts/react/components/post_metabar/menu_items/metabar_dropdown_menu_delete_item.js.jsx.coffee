###* @jsx React.DOM ###

window.MetabarDropdownMenuDeleteItem = React.createClass

  propTypes:
    entryId: React.PropTypes.number.isRequired
    title:   React.PropTypes.string.isRequired

  render: ->
    `<a onClick={ this.onClick }
        className="meta-item__dropdown-item">
      <i className="icon icon--basket"></i>
      { this.props.title }
    </a>`

  onClick: (e) ->
    e.stopPropagation()
    e.preventDefault()

    console.info "Удаляем пост #{@props.entryId}"