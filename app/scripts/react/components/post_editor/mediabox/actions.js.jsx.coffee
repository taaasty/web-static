###* @jsx React.DOM ###
#
window.MediaBox_Actions = React.createClass
  mixins: [React.addons.PureRenderMixin]
  propTypes:
    onRotate: React.PropTypes.func
    onDelete: React.PropTypes.func.isRequired
  render: ->
    actions = []

    if @props.onDelete?
      actions.push `<div key='delete' onClick={this.props.onDelete}
                       className="media-box__action media-box__action--delete"
                       title="Удалить"><span className='icon icon--cross' /></div>`

    if @props.onRotate?
      actions.push `<div key='rotate' onClick={this.props.onRotate}
                       className="media-box__action media-box__action--rotate"
                       title="Повернуть"><span className='icon icon--rotate' /></div>`

    `<div className="media-box__actions">{actions}</div>`


