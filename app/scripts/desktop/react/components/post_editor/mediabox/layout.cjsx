cx              = require 'react/lib/cx'
PureRenderMixin = require 'react/lib/ReactComponentWithPureRenderMixin'

window.MediaBox_Layout = React.createClass
  mixins: [PureRenderMixin]

  propTypes:
    children: React.PropTypes.renderable.isRequired

    # loaded: - когда есть картинки
    # - form, info: hidden
    # - actions, display: show
    #
    # insert: - режим с формой для вставки
    # - actions, form: show
    # - info, action_rotate: hidden
    #
    # hidden: - все скрыто (не используется)
    # - all hidden
    #
    # drag-hover
    # - special border color
    #
    # null - по -умолчанию
    # - display, actions: hidden
    # - form, info: show
    #
    state:    React.PropTypes.string
    type:     React.PropTypes.string.isRequired

  getDefaultProps: ->
    state: null

  render: ->
    classes = 'media-box': true

    classes["state--#{ @props.state }"] = true if @props.state?

    mediaBoxClasses = cx classes

    return <figure className={ this.props.type }>
             <div className={ mediaBoxClasses }
                  ref="dropZone">
               { this.props.children }
            </div>
           </figure>