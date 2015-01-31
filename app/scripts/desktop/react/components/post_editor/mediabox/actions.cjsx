PureRenderMixin = require 'react/lib/ReactComponentWithPureRenderMixin'

window.MediaBox_Actions = React.createClass
  mixins: [PureRenderMixin]

  propTypes:
    onRotate: React.PropTypes.func
    onDelete: React.PropTypes.func.isRequired

  render: ->
    actions = []

    if @props.onDelete?
      actions.push <div title={ i18n.t('editor_mediabox_delete') }
                        className="media-box__action media-box__action--delete"
                        onClick={ this.props.onDelete }
                        key="delete">
                     <span className="icon icon--cross" />
                   </div>

    if @props.onRotate?
      actions.push <div title={ i18n.t('editor_mediabox_rotate') }
                        className="media-box__action media-box__action--rotate"
                        onClick={ this.props.onRotate }
                        key="rotate">
                     <span className="icon icon--rotate" />
                   </div>

    return <div className="media-box__actions">{ actions }</div>