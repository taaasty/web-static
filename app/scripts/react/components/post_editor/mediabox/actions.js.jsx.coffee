###* @jsx React.DOM ###
#
window.Mediabox_Actions = React.createClass
  propTypes:
    onRotate: React.PropTypes.func
    onDelete: React.PropTypes.func
  render: ->
    actions = []

    if @props.onDelete?
      actions << `<div onClick={this.props.onDelete}
                       className="media-box__action media-box__action--delete"
                       title="Удалить"><span className='icon icon--cross' /></div>`

    if @props.onRotate?
      actions << `<div onClick={this.props.onRotate}
                       className="media-box__action media-box__action--rotate"
                       title="Повернуть"><span className='icon icon--rotate' /></div>`

    `<div className="media-box__actions">
      {actions}
    </div>`


